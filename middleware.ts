import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {match as matchLocale} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['pt', 'en'];
const defaultLocale = 'pt';

/**
 * Detecta idioma preferido do usuário
 * Prioridade: Cookie > Padrão
 */
function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  try {
    const headers = Object.fromEntries(request.headers.entries());
    const languages = new Negotiator({headers}).languages();
    return matchLocale(languages, locales, defaultLocale);
  } catch (error) {
    // Fallback para locale padrão se headers forem inválidos (ex: Playwright)
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

// Manter URL limpa, sem segmento de locale.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
