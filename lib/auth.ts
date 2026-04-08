import { type NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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

    // ──────── Email/Senha (Credentials — TODO) ────────
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize() {
        // TODO: implementar autenticação com email/senha
        return null;
      },
    }),
  ],

  // ─────────────────────────────────────────────────────
  // 🔄 Callbacks
  // ─────────────────────────────────────────────────────
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        try {
          const { data } = await supabaseAdmin
            .from("profiles")
            .select("is_pro, subscription_status, auth_provider, avatar_url")
            .eq("id", token.sub)
            .single();

          if (data) {
            session.user.image = data.avatar_url ?? session.user.image ?? null;
            session.user.is_pro = data.is_pro ?? false;
            session.user.subscription_status = data.subscription_status ?? "inactive";
            session.user.provider = data.auth_provider ?? null;
          }
        } catch (error) {
          console.error("Erro ao sincronizar perfil:", error);
        }
      }
      return session;
    },

    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        await supabaseAdmin.from("profiles").upsert(
          {
            id: user.id,
            email: user.email,
            name: user.name ?? null,
            avatar_url: user.image ?? null,
            auth_provider: account?.provider ?? null,
            last_login: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
      } catch (error) {
        console.error("Erro ao salvar perfil no Supabase:", error);
        // Não bloqueia o login se falhar
      }

      return true;
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
