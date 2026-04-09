"use client";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import AuthErrorToast from "@/components/ui/AuthErrorToast";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

const Providers = ({ children, locale, messages }: ProvidersProps) => (
  <NextIntlClientProvider locale={locale} messages={messages}>
    <SessionProvider>
      <AuthErrorToast />
      {children}
    </SessionProvider>
  </NextIntlClientProvider>
);

export default Providers;
