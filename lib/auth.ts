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
// 🔍 Logger para erros de autenticação
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
  debug: (context: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[AUTH DEBUG ${timestamp}] ${context}:`, data);
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
        authLogger.debug("Credentials:Authorize:Start", { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          authLogger.error("Credentials", "Email ou senha não fornecidos");
          throw new Error("Email e senha são obrigatórios");
        }

        const { email, password } = credentials;
        authLogger.debug("Credentials:Authorize:Input", { email, passwordLength: password?.length });

        try {
          // Buscar usuário no Supabase
          authLogger.debug("Credentials:Authorize:FetchingUser", { email });
          const { data: existingUser, error: fetchError } = await supabaseAdmin
            .from("users")
            .select("id, email, name, plan_type, resumes_count, ssi_score, ats_score, password")
            .eq("email", email)
            .single();
          
          authLogger.debug("Credentials:Authorize:FetchResult", { existingUser: !!existingUser, fetchError: fetchError?.message || null });

          if (fetchError && fetchError.code !== "PGRST116") {
            // PGRST116 = not found, outros erros são críticos
            authLogger.error("Credentials:Fetch", fetchError);
            throw new Error("Erro ao consultar usuário");
          }

          if (!existingUser) {
            // Usuário não existe - criar automaticamente (signup implícito)
            authLogger.debug("Credentials:UserNotFound", { email });
            authLogger.info("Credentials:SignupImplicit", { email });
            
            const newUser = {
              id: uuidv4(),
              email,
              password, // TODO: Em produção, usar bcrypt.hash()
              plan_type: 'free',
              resumes_count: 0,
              ssi_score: 0,
              ats_score: 0,
            };
            
            const { data: createdUser, error: insertError } = await supabaseAdmin
              .from("users")
              .insert(newUser)
              .select()
              .single();
            
            if (insertError || !createdUser) {
              authLogger.error("Credentials:Signup", insertError);
              throw new Error("Erro ao criar usuário");
            }
            
            authLogger.info("Credentials:SignupSuccess", { email, userId: createdUser.id });
            
            return {
              id: createdUser.id,
              email: createdUser.email,
              name: createdUser.name,
              plan_type: createdUser.plan_type || "free",
              resumes_count: createdUser.resumes_count || 0,
              ssi_score: createdUser.ssi_score || 0,
              ats_score: createdUser.ats_score || 0,
            };
          }

          // Usuário existe - validar senha
          authLogger.debug("Credentials:Login:ValidatingPassword", { userId: existingUser.id });
          // Em produção: usar bcrypt.compare
          if (existingUser.password !== password) {
            authLogger.error("Credentials:Password", "Senha incorreta");
            authLogger.debug("Credentials:Login:PasswordMismatch", { userId: existingUser.id });
            throw new Error("CredentialsSignin");
          }

          authLogger.info("Credentials:Login:Success", { email, userId: existingUser.id });

          authLogger.debug("Credentials:Login:ReturningUser", { userId: existingUser.id });
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
          authLogger.debug("Credentials:Authorize:ErrorThrown", { error: error instanceof Error ? error.message : String(error) });
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
      authLogger.debug("Session:Callback:Start", { userId: token.sub, hasSession: !!session.user });
      
      if (session.user && token.sub) {
        // token.sub aqui já é o UUID correto gerado pelo banco de dados
        session.user.id = token.sub;

        try {
          // ⚠️ MUDANÇA AQUI: Lemos diretamente da tabela "users", e adicionamos o ats_score
          authLogger.debug("Session:Callback:FetchingUserData", { userId: token.sub });
          const { data, error } = await supabaseAdmin
            .from("users")
            .select("plan_type, resumes_count, ssi_score, ats_score")
            .eq("id", token.sub)
            .single();
          
          authLogger.debug("Session:Callback:FetchResult", { hasData: !!data, hasError: !!error });

          if (!error && data) {
            // Mapeamos os dados para a sessão, com fallbacks de segurança
            session.user.plan_type = data.plan_type || 'free';
            session.user.resumes_count = data.resumes_count || 0;
            session.user.ssi_score = data.ssi_score || 0;
            session.user.ats_score = data.ats_score || 0;
            session.user.is_pro = data.plan_type === "pro" || data.plan_type === "enterprise";
            authLogger.debug("Session:Callback:UserDataUpdated", { 
              userId: token.sub, 
              plan_type: session.user.plan_type,
              is_pro: session.user.is_pro 
            });
          } else if (error) {
            authLogger.error("Session:Callback:FetchError", error);
          }
        } catch (error) {
          console.error("Erro ao sincronizar dados na sessão:", error);
          authLogger.error("Session:Callback:Error", error);
        }
      }
      authLogger.debug("Session:Callback:ReturningSession", { userId: session.user?.id });
      return session;
    },

    async redirect({ url, baseUrl }) {
      authLogger.debug("Redirect:Callback", { url, baseUrl });
      
      // Redirecionamento padrão para /inicio após login
      if (url.startsWith("/")) {
        // Se for /iniciar, redirecionar para /inicio
        if (url === "/iniciar" || url === "/") {
          authLogger.debug("Redirect:ToInicio", { from: url });
          return `${baseUrl}/inicio`;
        }
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      authLogger.debug("Redirect:Fallback", { to: `${baseUrl}/inicio` });
      return `${baseUrl}/inicio`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      authLogger.debug("SignIn:Callback", { 
        provider: account?.provider, 
        email: user?.email,
        hasCredentials: !!credentials 
      });
      
      // Permitir login OAuth sempre
      if (account?.provider === "google" || account?.provider === "linkedin") {
        authLogger.info("OAuth:SignIn", { provider: account.provider, email: user.email });
        return true;
      }
      
      if (account?.provider === "credentials") {
        authLogger.info("Credentials:SignIn", { email: user?.email });
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