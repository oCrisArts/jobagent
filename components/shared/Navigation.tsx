'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * 🧭 Navigation Global Híbrida + i18n + Hydration Safe
 * 
 * ✅ BDD Implementado:
 * - Cenário A: Visitante (Landing, deslogado) - Âncoras suaves + i18n
 * - Cenário B: Logado Desktop - Top Navbar com links
 * - Cenário C: Logado Mobile - Bottom Navigation Bar (App-like)
 * - isMounted state para evitar hydration mismatch
 */
export default function Navigation() {
  const { data: session } = useSession();
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  
  // ✅ BDD: isMounted para evitar hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ─────────────────────────────────────────────────────
  // 🔄 Montar componente no cliente (hydration safe)
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detectar mudança de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─────────────────────────────────────────────────────
  // ⚠️ Retornar null até montar no cliente
  // ─────────────────────────────────────────────────────
  if (!isMounted) {
    return null; // ✅ Evita hydration mismatch
  }

  // ─────────────────────────────────────────────────────
  // 👤 CENÁRIO A: Visitante (Deslogado - Landing)
  // ─────────────────────────────────────────────────────
  if (!session) {
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label={t('ariaLabel')}
        style={{ background: '#1A1D27', borderBottom: '1px solid #2A2D3A' }}
      >
        <div className="navbar-brand">
          <Link href="/" className="navbar-item has-text-weight-bold">
            <span className="icon has-text-primary">
              <i className="fas fa-rocket"></i>
            </span>
            <span>{t('brandName')}</span>
          </Link>
        </div>

        <div className="navbar-menu" id="navbarMenu">
          <div className="navbar-end">
            {/* ✅ BDD: Âncoras suaves (Smooth Scroll) */}
            <a href="#produto" className="navbar-item">
              {t('linkProduto')}
            </a>
            <a href="#pricing" className="navbar-item">
              {t('linkPrecos')}
            </a>

            {/* ✅ CTA: Botão Entrar */}
            <div className="navbar-item">
              <div className="buttons">
                <button
                  id="nav-login-btn"
                  className="button is-primary"
                  onClick={() => {
                    // TODO: Abrir AuthModal via Context/State
                    const event = new CustomEvent('openAuthModal');
                    window.dispatchEvent(event);
                  }}
                  aria-label={t('ctaSignIn')}
                >
                  {t('ctaSignIn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ─────────────────────────────────────────────────────
  // 💻 CENÁRIO B: Desktop (Logado)
  // ─────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <nav
        className={`navbar is-fixed-top ${isScrolled ? 'has-shadow' : ''}`}
        role="navigation"
        aria-label={t('ariaLabel')}
        style={{ background: '#1A1D27', borderBottom: '1px solid #2A2D3A' }}
      >
        <div className="navbar-brand">
          <Link href="/inicio" className="navbar-item has-text-weight-bold">
            <span className="icon has-text-primary">
              <i className="fas fa-rocket"></i>
            </span>
            <span>{t('brandName')}</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {/* ✅ Links Principais */}
            <Link
              href="/inicio"
              className={`navbar-item ${
                pathname === '/inicio' ? 'is-active' : ''
              }`}
            >
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>{t('linkInicio')}</span>
            </Link>

            <Link
              href="/vagas"
              className={`navbar-item ${
                pathname === '/vagas' ? 'is-active' : ''
              }`}
            >
              <span className="icon">
                <i className="fas fa-briefcase"></i>
              </span>
              <span>{t('linkVagas')}</span>
            </Link>

            <Link
              href="/curriculos"
              className={`navbar-item ${
                pathname === '/curriculos' ? 'is-active' : ''
              }`}
            >
              <span className="icon">
                <i className="fas fa-file-pdf"></i>
              </span>
              <span>{t('linkCurriculos')}</span>
            </Link>

            <Link
              href="/network"
              className={`navbar-item ${
                pathname === '/network' ? 'is-active' : ''
              }`}
            >
              <span className="icon">
                <i className="fas fa-network-wired"></i>
              </span>
              <span>{t('linkNetwork')}</span>
            </Link>
          </div>

          <div className="navbar-end">
            {/* ✅ Dropdown Perfil */}
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" style={{ alignItems: 'center', gap: '0.5rem' }}>
                {session.user?.image ? (
                  <figure id="user-avatar" className="image is-32x32" style={{ margin: 0, flexShrink: 0 }}>
                    <img
                      className="is-rounded"
                      src={session.user.image}
                      alt={session.user.name ?? 'Avatar'}
                      referrerPolicy="no-referrer"
                      style={{ objectFit: 'cover', width: '32px', height: '32px' }}
                    />
                  </figure>
                ) : (
                  <span className="icon">
                    <i className="fas fa-user-circle"></i>
                  </span>
                )}
                <span>{session.user?.name || t('profile')}</span>
              </a>
              <div className="navbar-dropdown is-right">
                <Link href="/perfil" className="navbar-item">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-cog"></i>
                    </span>
                    <span>{t('myAccount')}</span>
                  </span>
                </Link>
                <hr className="navbar-divider" />
                <a
                  className="navbar-item"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>{t('logout')}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ─────────────────────────────────────────────────────
  // 📱 CENÁRIO C: Mobile (Logado - App Like)
  // ─────────────────────────────────────────────────────
  return (
    <>
      {/* Top Mobile Bar (Minimal) */}
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        style={{ background: '#1A1D27', borderBottom: '1px solid #2A2D3A' }}
      >
        <div className="navbar-brand" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0 1rem',
            }}
          >
            <Link href="/inicio" className="has-text-weight-bold">
              <span className="icon has-text-primary">
                <i className="fas fa-rocket"></i>
              </span>
            </Link>

            {/* ✅ Perfil Icon Mobile */}
            <button
              className="button is-white is-small"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('profile')}
              style={{ padding: '2px', borderRadius: '50%' }}
            >
              {session.user?.image ? (
                <figure className="image is-32x32" style={{ margin: 0 }}>
                  <img
                    className="is-rounded"
                    src={session.user.image}
                    alt={session.user.name ?? 'Avatar'}
                    referrerPolicy="no-referrer"
                    style={{ objectFit: 'cover', width: '32px', height: '32px' }}
                  />
                </figure>
              ) : (
                <span className="icon">
                  <i className="fas fa-user-circle"></i>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menu Dropdown Mobile */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '1rem',
              background: '#1A1D27',
              border: '1px solid #2A2D3A',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              minWidth: '200px',
              zIndex: 999,
            }}
          >
            <Link
              href="/perfil"
              className="navbar-item"
              style={{ display: 'block', padding: '12px 16px' }}
            >
              {t('myAccount')}
            </Link>
            <hr style={{ margin: '8px 0' }} />
            <a
              className="navbar-item"
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                display: 'block',
                padding: '12px 16px',
                color: '#ff6b6b',
                cursor: 'pointer',
              }}
            >
              {t('logout')}
            </a>
          </div>
        )}
      </nav>

      {/* ✅ Bottom Navigation Bar (Mobile - App Like) */}
      <div
        className="navbar-bottom"
        role="navigation"
        aria-label={t('mobileNav')}
      >
        <Link
          href="/inicio"
          className={`navbar-item ${
            pathname === '/inicio' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-home"></i>
          </div>
          <div className="label">{t('linkInicio')}</div>
        </Link>

        <Link
          href="/vagas"
          className={`navbar-item ${pathname === '/vagas' ? 'is-active' : ''}`}
        >
          <div className="icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="label">{t('linkVagas')}</div>
        </Link>

        <Link
          href="/curriculos"
          className={`navbar-item ${
            pathname === '/curriculos' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-file-pdf"></i>
          </div>
          <div className="label">{t('linkCV')}</div>
        </Link>

        <Link
          href="/network"
          className={`navbar-item ${
            pathname === '/network' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-network-wired"></i>
          </div>
          <div className="label">{t('linkNetwork')}</div>
        </Link>
      </div>
    </>
  );
}
