import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'pt'];
const defaultLocale = 'en';

/**
 * Detecta idioma preferido do usuário
 * Prioridade: Cookie > Header Accept-Language > Padrão
 */
function getPreferredLocale(request: NextRequest): string {
  // 1. Verificar cookie existente
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Usar Accept-Language header
  const headers = new Headers(request.headers);
  const languages = new Negotiator({ headers }).languages();
  try {
    const preferredLocale = match(languages, locales as any, defaultLocale);
    return preferredLocale;
  } catch {
    return defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── i18n: ADICIONAR LOCALE AO COOKIE (sem mudar URL) ───────────────
  const locale = getPreferredLocale(request);
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 ano
    httpOnly: false,
    sameSite: 'lax',
  });

  // ── ROTAS PÚBLICAS (Deslogado) ─────────────────────────────────────
  const publicRoutes = ['/', '/checkout', '/api/auth', '/api/payment'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // ── ROTAS PRIVADAS (Logado) ───────────────────────────────────────
  const privateRoutes = ['/iniciar', '/buscar', '/evoluir', '/conectar'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // ── CRIAR CLIENT SUPABASE (verificar auth) ─────────────────────────
  let supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete(name);
        },
      },
    }
  );

  // ── VERIFICAR SESSÃO ───────────────────────────────────────────────
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ── LÓGICA DE REDIRECIONAMENTO ─────────────────────────────────────

  // Se está em rota PRIVADA e NÃO tem sessão → redireciona para /
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se está em rota PÚBLICA (/) e TEM sessão → redireciona para /iniciar
  if (pathname === '/' && session) {
    return NextResponse.redirect(new URL('/iniciar', request.url));
  }

  // Se tenta acessar /api/ → permite (API routes)
  if (pathname.startsWith('/api/')) {
    return response;
  }

  return response;
}

// ── MATCHER: Aplica middleware em todas as rotas ─────────────────────
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
