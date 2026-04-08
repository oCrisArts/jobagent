import type { Metadata } from "next";
import "@/styles/globals.scss";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Sync.IA — Encontre sua vaga com IA",
  description: "Agente inteligente para busca de vagas e adaptação de currículo com sincronização Figma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
        {/* Plugin de Figma para HTML to Design */}
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        ></script>
      </body>
    </html>
  );
}
