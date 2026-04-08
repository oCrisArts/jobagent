import type { Metadata } from "next";
import "@/styles/globals.scss";
import Providers from "./providers";
import Navigation from "@/components/shared/Navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Sync.IA — Encontre sua vaga com IA",
  description: "Agente inteligente para busca de vagas e adaptação de currículo com sincronização Figma",
};

const SUPPORTED_LOCALES = ["pt", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as SupportedLocale | undefined;
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)
    ? (cookieLocale as SupportedLocale)
    : "pt";

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="has-background-dark">
        <Providers locale={locale} messages={messages}>
          {/* 🧭 Global Navigation (Desktop/Mobile Hybrid) */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            {children}
          </main>
        </Providers>
        
        {/* Plugin de Figma para HTML to Design */}
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        ></script>
      </body>
    </html>
  );
}