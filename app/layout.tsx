import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobAgent — Encontre sua vaga com IA",
  description: "Agente inteligente que busca vagas e adapta seu currículo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="h-full bg-gray-950 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
