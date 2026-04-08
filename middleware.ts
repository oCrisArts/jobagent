import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'pt'];
const defaultLocale = 'en';

/**
 * Detecta idioma preferido do usuário
 * Prioridade: Cookie > Padrão
 */
function getPreferredLocale(request: NextRequest): string {
  // Verificar cookie existente
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Usar padrão
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── i18n: ADICIONAR LOCALE AO COOKIE (sem mudar URL) ───────────────
  const locale = getPreferredLocale(request);
  const response = NextResponse.next();
  
  // Apenas setar cookie se for diferente do atual
  if (request.cookies.get('NEXT_LOCALE')?.value !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 ano
      httpOnly: false,
      sameSite: 'lax',
    });
  }

  return response;
}

// ── MATCHER: Aplica middleware em todas as rotas ─────────────────────
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
