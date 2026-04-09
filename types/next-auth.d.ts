import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Retornado pelo `useSession`, `getSession` e recebido como prop na página
   */
  interface Session {
    user: {
      id: string;
      plan_type: string;
      resumes_count: number;
      ssi_score: number;
      is_pro: boolean;
    } & DefaultSession["user"]
  }

  /**
   * O objeto User que o banco de dados retorna
   */
  interface User {
    id: string;
    plan_type?: string;
    resumes_count?: number;
    ssi_score?: number;
    is_pro?: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Retornado pelo callback jwt */
  interface JWT {
    id: string;
  }
}