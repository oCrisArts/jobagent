import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "JobAgent — Encontre sua vaga com IA",
  description: "Agente inteligente para busca de vagas e adaptação de currículo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body className="h-full bg-[#0A0A0F] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
