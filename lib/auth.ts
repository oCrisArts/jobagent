import { type NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// ─────────────────────────────────────────────────────────
// 🔐 Supabase Admin Client (Server-side apenas)
// Usa SERVICE_ROLE_KEY para bypass do RLS
// ─────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Variáveis de ambiente SUPABASE não configuradas");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ─────────────────────────────────────────────────────────
// � Logger para erros de autenticação
// ─────────────────────────────────────────────────────────
const authLogger = {
  error: (context: string, error: any) => {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[AUTH ERROR ${timestamp}] ${context}:`, errorMessage);
    // Em produção, enviar para serviço de logs
  },
  info: (context: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[AUTH INFO ${timestamp}] ${context}:`, data);
  },
};

// ─────────────────────────────────────────────────────────
// 📋 NextAuth Options
// ─────────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  // Adapter com SERVICE_ROLE_KEY para bypass do RLS
  adapter: SupabaseAdapter({
    url: supabaseUrl,
    secret: serviceRoleKey,
  }),

  providers: [
    // ──────── Google OAuth ────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // ──────── LinkedIn OAuth (OIDC) ────────
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? null,
          email: profile.email ?? null,
          image: profile.picture ?? null,
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),

    // ──────── Credentials (Email/Senha) ────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          authLogger.error("Credentials", "Email ou senha não fornecidos");
          throw new Error("Email e senha são obrigatórios");
        }

        const { email, password } = credentials;

        try {
          // Buscar usuário no Supabase
          const { data: existingUser, error: fetchError } = await supabaseAdmin
            .from("users")
            .select("id, email, name, plan_type, resumes_count, ssi_score, ats_score, password")
            .eq("email", email)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            // PGRST116 = not found, outros erros são críticos
            authLogger.error("Credentials:Fetch", fetchError);
            throw new Error("Erro ao consultar usuário");
          }

          if (!existingUser) {
            // Usuário não existe - criar novo (cadastro automático)
            authLogger.info("Credentials:Signup", { email });

            const newUserId = uuidv4();
            const { data: newUser, error: createError } = await supabaseAdmin
              .from("users")
              .insert({
                id: newUserId,
                email: email,
                name: email.split("@")[0], // Nome temporário baseado no email
                password: password, // Em produção, usar bcrypt
                plan_type: "free",
                resumes_count: 0,
                ssi_score: 0,
                ats_score: 0,
                email_verified: new Date().toISOString(),
              })
              .select()
              .single();

            if (createError) {
              authLogger.error("Credentials:Create", createError);
              throw new Error("Erro ao criar usuário");
            }

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              plan_type: newUser.plan_type,
              resumes_count: newUser.resumes_count,
              ssi_score: newUser.ssi_score,
              ats_score: newUser.ats_score,
            };
          }

          // Usuário existe - validar senha
          // Em produção: usar bcrypt.compare
          if (existingUser.password !== password) {
            authLogger.error("Credentials:Password", "Senha incorreta");
            throw new Error("E-mail ou senha incorretos");
          }

          authLogger.info("Credentials:Login", { email, userId: existingUser.id });

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            plan_type: existingUser.plan_type || "free",
            resumes_count: existingUser.resumes_count || 0,
            ssi_score: existingUser.ssi_score || 0,
            ats_score: existingUser.ats_score || 0,
          };
        } catch (error) {
          authLogger.error("Credentials:Authorize", error);
          throw error;
        }
      },
    }),
  ],

  // ─────────────────────────────────────────────────────
  // 🔄 Callbacks
  // ─────────────────────────────────────────────────────
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // token.sub aqui já é o UUID correto gerado pelo banco de dados
        session.user.id = token.sub;

        try {
          // ⚠️ MUDANÇA AQUI: Lemos diretamente da tabela "users", e adicionamos o ats_score
          const { data, error } = await supabaseAdmin
            .from("users")
            .select("plan_type, resumes_count, ssi_score, ats_score")
            .eq("id", token.sub)
            .single();

          if (!error && data) {
            // Mapeamos os dados para a sessão, com fallbacks de segurança
            session.user.plan_type = data.plan_type || 'free';
            session.user.resumes_count = data.resumes_count || 0;
            session.user.ssi_score = data.ssi_score || 0;
            session.user.ats_score = data.ats_score || 0;
            session.user.is_pro = data.plan_type === "pro" || data.plan_type === "enterprise";
          }
        } catch (error) {
          console.error("Erro ao sincronizar dados na sessão:", error);
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirecionamento padrão para /inicio após login
      if (url.startsWith("/")) {
        // Se for /iniciar, redirecionar para /inicio
        if (url === "/iniciar" || url === "/") {
          return `${baseUrl}/inicio`;
        }
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return `${baseUrl}/inicio`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // Permitir login OAuth sempre
      if (account?.provider === "google" || account?.provider === "linkedin") {
        authLogger.info("OAuth:SignIn", { provider: account.provider, email: user.email });
        return true;
      }
      return true;
    },
  },

  // ─────────────────────────────────────────────────────
  // ⚙️ Configuração
  pages: {
    signIn: "/",
    error: "/",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  secret: process.env.NEXTAUTH_SECRET!,
};