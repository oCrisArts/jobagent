import { type NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
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

    // ──────── Email Provider (Resend) ────────
    EmailProvider({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      server: {
        host: "smtp.resend.com",
        port: 587,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY!,
        },
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