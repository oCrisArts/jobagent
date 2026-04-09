import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan_type: string;
      resumes_count: number;
      ssi_score: number;
      ats_score: number;
      is_pro: boolean;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    plan_type?: string;
    resumes_count?: number;
    ssi_score?: number;
    ats_score?: number;
    is_pro?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}