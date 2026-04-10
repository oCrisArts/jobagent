import type { Metadata } from "next";
import { Suspense } from "react";
import "@/styles/globals.scss";
import Providers from "./providers";
import Navigation from "@/components/shared/Navigation";
import AuthModal from "@/components/ui/AuthModal";
import AuthErrorToast from "@/components/ui/AuthErrorToast";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Sync.IA — Encontre sua vaga com IA",
  description: "Agente inteligente para busca de vagas e adaptação de currículo com sincronização Figma",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%237c3aed'>🚀</text></svg>" },
    ],
  },
};

const SUPPORTED_LOCALES = ["pt", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as
    | SupportedLocale
    | undefined;
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(
    cookieLocale as SupportedLocale
  )
    ? (cookieLocale as SupportedLocale)
    : "pt";

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      // ✅ BDD: Prevenção de Hydration Error
      suppressHydrationWarning
    >
      <head>
        {/* FontAwesome para ícones */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className="has-background-dark"
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={messages}>
          {/* 🧭 Navegação Híbrida Global */}
          <Navigation />

          {/* 🔑 AuthModal Global */}
          <AuthModal />

          {/* 🔔 Auth Error Toast */}
          <Suspense>
            <AuthErrorToast />
          </Suspense>

          {/* 📄 Main Content */}
          <main>
            {children}
          </main>
        </Providers>

        {/* Figma HTML to Design */}
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        ></script>
      </body>
    </html>
  );
}
