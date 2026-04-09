import { type NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────
// 🔐 Supabase Admin Client (Server-side apenas)
// ─────────────────────────────────────────────────────────
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─────────────────────────────────────────────────────────
// 📋 NextAuth Options
// ─────────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  // O Adapter já cria o usuário na tabela public.users perfeitamente.
  // E o nosso Trigger no banco de dados cria o public.profiles automaticamente!
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
          // Buscamos as colunas corretas do novo Schema
          const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("plan_type, resumes_count, ssi_score")
            .eq("id", token.sub)
            .single();

          if (!error && data) {
            // Mapeamos os dados modernos para a sessão
            session.user.plan_type = data.plan_type;
            session.user.resumes_count = data.resumes_count;
            session.user.ssi_score = data.ssi_score;
            session.user.is_pro = data.plan_type === "pro" || data.plan_type === "enterprise";
          }
        } catch (error) {
          console.error("Erro ao sincronizar perfil na sessão:", error);
        }
      }
      return session;
    },

    // O callback signIn manual foi REMOVIDO pois o banco de dados faz isso sozinho agora!

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/iniciar`;
    },
  },

  // ─────────────────────────────────────────────────────
  // ⚙️ Configuração
  // ─────────────────────────────────────────────────────
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