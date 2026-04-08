"use client";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

const Providers = ({ children, locale, messages }: ProvidersProps) => (
  <NextIntlClientProvider locale={locale} messages={messages}>
    <SessionProvider>{children}</SessionProvider>
  </NextIntlClientProvider>
);

export default Providers;
