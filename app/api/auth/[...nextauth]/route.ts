import NextAuth, { type NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────
// 🔐 Supabase Client (Server-side)
// ─────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─────────────────────────────────────────────────────────
// 📋 NextAuth Options
// ─────────────────────────────────────────────────────────
const options: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  providers: [
    // ──────── Google OAuth ────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // ──────── LinkedIn OAuth ────────
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    // ──────── Email/Senha (Credentials) ────────
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Implementar autenticação com email/senha
        // Por enquanto, retorna null (desabilitado)
        return null;
      },
    }),
  ],

  // ─────────────────────────────────────────────────────
  // 🔄 Callbacks para sincronizar dados
  // ─────────────────────────────────────────────────────
  callbacks: {
    async session({ session, user }) {
      // Adiciona ID do usuário à sessão
      if (session.user) {
        session.user.id = user.id;
        // Sincroniza com Supabase se necessário
        try {
          const { data } = await supabase
            .from("users")
            .select("id, is_pro, subscription_status")
            .eq("id", user.id)
            .single();

          if (data) {
            (session.user as any).is_pro = data.is_pro;
            (session.user as any).subscription_status = data.subscription_status;
          }
        } catch (error) {
          console.error("Erro ao sincronizar usuário:", error);
        }
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // ✅ BDD: Quando usuário faz login
      // Então o sistema OBRIGATORIAMENTE salva no Supabase via Adapter
      // E define com limite Free (is_pro: false)

      if (!user.email) return false;

      try {
        // Verifica se usuário já existe
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        // Se não existe, cria com defaults
        if (!existingUser) {
          await supabase.from("users").insert({
            id: user.id,
            email: user.email,
            name: user.name || profile?.name,
            image: user.image || profile?.image,
            is_pro: false, // ✅ Padrão Free
            subscription_status: "free",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }

        return true;
      } catch (error) {
        console.error("Erro ao criar usuário no Supabase:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      // Redireciona para /iniciar após login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/iniciar";
    },
  },

  // ─────────────────────────────────────────────────────
  // ⚙️ Configuração
  // ─────────────────────────────────────────────────────
  pages: {
    signIn: "/", // Landing page para login
    error: "/", // Redireciona erros para landing
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET!,
};

// ─────────────────────────────────────────────────────
// 📤 Export Handler
// ─────────────────────────────────────────────────────
const handler = NextAuth(options);

export { handler as GET, handler as POST };
