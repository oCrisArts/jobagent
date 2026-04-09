import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
// O "as any" é o truque mágico para o Next.js 15 parar de brigar 
// com as tipagens antigas do NextAuth v4 no App Router.
export const GET = handler as any;
export const POST = handler as any;

//export { handler as GET, handler as POST };
