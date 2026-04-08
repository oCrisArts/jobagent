'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * 🧭 Navigation Global Híbrida
 * 
 * Comportamento:
 * 1. Visitante (sem login): Landing Page com âncoras suaves
 * 2. Desktop (com login): Top Navbar com links principais
 * 3. Mobile (com login): Bottom Navigation Bar (estilo app nativo)
 */
export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mudança de scroll para efeito visual
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar tamanho da tela para responsividade
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─────────────────────────────────────────────────────────
  // 👤 CENÁRIO 1: Visitante na Landing (Deslogado)
  // ─────────────────────────────────────────────────────────
  if (!session) {
    return (
      <nav className="navbar is-fixed-top" role="navigation">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item has-text-weight-bold">
            <span className="icon has-text-primary">
              <i className="fas fa-rocket"></i>
            </span>
            <span>Sync.IA</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            {/* Âncoras da Landing Page */}
            <a href="#produto" className="navbar-item">
              Produto
            </a>
            <a href="#pricing" className="navbar-item">
              Preços
            </a>

            {/* Botão Entrar */}
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-primary"
                  onClick={() => {
                    // TODO: Abrir AuthModal
                    console.log('Abrir AuthModal');
                  }}
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ─────────────────────────────────────────────────────────
  // 🖥️ CENÁRIO 2: Desktop (Logado)
  // ─────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <nav
        className={`navbar is-fixed-top ${isScrolled ? 'has-shadow' : ''}`}
        role="navigation"
      >
        <div className="navbar-brand">
          <Link href="/iniciar" className="navbar-item has-text-weight-bold">
            <span className="icon has-text-primary">
              <i className="fas fa-rocket"></i>
            </span>
            <span>Sync.IA</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link href="/iniciar" className="navbar-item">
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>Início</span>
            </Link>
            <Link href="/buscar" className="navbar-item">
              <span className="icon">
                <i className="fas fa-briefcase"></i>
              </span>
              <span>Vagas</span>
            </Link>
            <Link href="/evoluir" className="navbar-item">
              <span className="icon">
                <i className="fas fa-file-pdf"></i>
              </span>
              <span>Currículos</span>
            </Link>
            <Link href="/conectar" className="navbar-item">
              <span className="icon">
                <i className="fas fa-network-wired"></i>
              </span>
              <span>Network</span>
            </Link>
          </div>

          <div className="navbar-end">
            {/* Dropdown Perfil */}
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <span className="icon">
                  <i className="fas fa-user-circle"></i>
                </span>
                <span>{session.user?.name || 'Perfil'}</span>
              </a>
              <div className="navbar-dropdown">
                <Link href="/perfil" className="navbar-item">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-cog"></i>
                    </span>
                    <span>Minha Conta</span>
                  </span>
                </Link>
                <hr className="navbar-divider" />
                <a
                  className="navbar-item"
                  onClick={() => signOut()}
                >
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Sair</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ─────────────────────────────────────────────────────────
  // 📱 CENÁRIO 3: Mobile (Logado - App Like)
  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Top Mobile Bar (minimal) */}
      <nav className="navbar is-fixed-top" role="navigation">
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
            <Link href="/iniciar" className="has-text-weight-bold">
              <span className="icon has-text-primary">
                <i className="fas fa-rocket"></i>
              </span>
            </Link>

            {/* Perfil no topo */}
            <button
              className="button is-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="icon">
                <i className="fas fa-user-circle"></i>
              </span>
            </button>
          </div>
        </div>

        {/* Menu dropdown mobile */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '1rem',
              background: '$color-surface-card',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              minWidth: '200px',
              zIndex: 999,
            }}
          >
            <Link
              href="/perfil"
              className="navbar-item"
              style={{ display: 'block', padding: '12px 16px' }}
            >
              Minha Conta
            </Link>
            <hr style={{ margin: '8px 0' }} />
            <a
              className="navbar-item"
              onClick={() => signOut()}
              style={{
                display: 'block',
                padding: '12px 16px',
                color: '#d32f2f',
                cursor: 'pointer',
              }}
            >
              Sair
            </a>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="navbar-bottom">
        <Link
          href="/iniciar"
          className={`navbar-item ${
            pathname === '/iniciar' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-home"></i>
          </div>
          <div className="label">Início</div>
        </Link>

        <Link
          href="/buscar"
          className={`navbar-item ${
            pathname === '/buscar' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="label">Vagas</div>
        </Link>

        <Link
          href="/evoluir"
          className={`navbar-item ${
            pathname === '/evoluir' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-file-pdf"></i>
          </div>
          <div className="label">CV</div>
        </Link>

        <Link
          href="/conectar"
          className={`navbar-item ${
            pathname === '/conectar' ? 'is-active' : ''
          }`}
        >
          <div className="icon">
            <i className="fas fa-network-wired"></i>
          </div>
          <div className="label">Network</div>
        </Link>
      </div>
    </>
  );
}
