import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      is_pro: boolean;
      subscription_status: string;
      provider: string | null;
    };
  }
}
