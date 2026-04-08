'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * 🔑 AuthModal Unificada (MVP)
 * 
 * ✅ BDD Implementado:
 * - Interface única (sem abas)
 * - Título: "Acesse ou crie sua conta"
 * - Opções sociais em destaque (Google, LinkedIn)
 * - Email/Senha juntos (evita cliques desnecessários)
 * - Minimalista e focado em conversão
 */
export default function AuthModal({
  isOpen: externalIsOpen = false,
  onClose,
}: AuthModalProps) {
  const t = useTranslations('AuthModal');
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Hydration safe
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Escutar evento global para abrir modal
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('openAuthModal', handleOpenModal);
    return () => window.removeEventListener('openAuthModal', handleOpenModal);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/iniciar' });
    } catch (error) {
      console.error('Google sign-in error:', error);
      setIsLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('linkedin', { callbackUrl: '/iniciar' });
    } catch (error) {
      console.error('LinkedIn sign-in error:', error);
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implementar autenticação com email/senha
      // Por enquanto, apenas valida campos
      if (!email || !password) {
        alert(t('errorEmptyFields'));
        setIsLoading(false);
        return;
      }
      // await signIn('credentials', { email, password, callbackUrl: '/iniciar' });
    } catch (error) {
      console.error('Email sign-in error:', error);
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  if (!isOpen) return null;

  return (
    <div
      className="modal is-active"
      role="dialog"
      aria-labelledby="authModalTitle"
      aria-modal="true"
    >
      {/* Background overlay */}
      <div
        className="modal-background"
        onClick={handleClose}
        style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      />

      {/* Modal content */}
      <div className="modal-content" style={{ maxWidth: '420px', width: '90vw' }}>
        <div className="box" style={{ background: '#1A1D27', border: '1px solid #2A2D3A' }}>
          {/* Close button */}
          <button
            className="delete is-large"
            aria-label="Close modal"
            onClick={handleClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          />

          {/* Header */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1
              id="authModalTitle"
              className="title is-4"
              style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}
            >
              {t('title')}
            </h1>
            <p
              className="subtitle is-6"
              style={{ color: '#94A3B8', margin: 0 }}
            >
              {t('subtitle')}
            </p>
          </div>

          {/* ✅ Social Sign-In (Destaque) */}
          <div style={{ marginBottom: '2rem' }}>
            {/* Google Button */}
            <button
              className="button is-fullwidth"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              style={{
                background: '#FFFFFF',
                color: '#000000',
                marginBottom: '1rem',
                fontWeight: 600,
              }}
            >
              <span className="icon">
                <i className="fab fa-google"></i>
              </span>
              <span>{t('signInGoogle')}</span>
            </button>

            {/* LinkedIn Button */}
            <button
              className="button is-fullwidth"
              onClick={handleLinkedInSignIn}
              disabled={isLoading}
              style={{
                background: '#0A66C2',
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            >
              <span className="icon">
                <i className="fab fa-linkedin"></i>
              </span>
              <span>{t('signInLinkedIn')}</span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: '#2A2D3A',
              }}
            />
            <span
              style={{
                padding: '0 1rem',
                color: '#94A3B8',
                fontSize: '0.875rem',
              }}
            >
              {t('orDivider')}
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: '#2A2D3A',
              }}
            />
          </div>

          {/* ✅ Email/Senha (Juntos - evita fragmentação) */}
          <form onSubmit={handleEmailSignIn} style={{ marginTop: '2rem' }}>
            <div className="field">
              <label className="label" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                {t('emailLabel')}
              </label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    background: '#0A0A0F',
                    border: '1px solid #2A2D3A',
                    color: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                {t('passwordLabel')}
              </label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    background: '#0A0A0F',
                    border: '1px solid #2A2D3A',
                    color: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="button is-primary is-fullwidth"
              disabled={isLoading}
              style={{ fontWeight: 600, marginTop: '1.5rem' }}
            >
              {isLoading ? (
                <>
                  <span className="icon">
                    <i className="fas fa-spinner fa-spin"></i>
                  </span>
                  <span>{t('loading')}</span>
                </>
              ) : (
                <>
                  <span>{t('signInButton')}</span>
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p
            style={{
              fontSize: '0.75rem',
              color: '#64748B',
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {t('termsText')}{' '}
            <a href="/terms" style={{ color: '#7c3aed' }}>
              {t('termsLink')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
