import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    return { 
      messages: (await import(`./messages/en.json`)).default,
      timeZone: 'America/Sao_Paulo' // <-- Correção adicionada aqui
    };
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'America/Sao_Paulo' // <-- Correção adicionada aqui
  };
});