'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthModal() {
  const t = useTranslations('AuthModal');
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'login' | 'forgot-password'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('openAuthModal', handleOpenModal);
    return () => window.removeEventListener('openAuthModal', handleOpenModal);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email) {
        alert(t('errorEmptyFields'));
        setIsLoading(false);
        return;
      }
      // TODO: Implementar envio de e-mail de recuperação via Resend/NextAuth
      console.log('Enviar e-mail de recuperação para:', email);
      setIsLoading(false);
      setView('login');
    } catch (error) {
      console.error('Forgot password error:', error);
      setIsLoading(false);
    }
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div
      id="auth-modal"
      className="modal is-active"
      role="dialog"
      aria-labelledby="authModalTitle"
      aria-modal="true"
    >
      <div className="modal-background" onClick={handleClose} />

      <div className="modal-content" style={{ width: '500px' }}>
        <div className="box">
          
          <button
            id="auth-modal-close"
            className="delete is-large"
            aria-label="Close modal"
            onClick={handleClose}
          />

          <div className="has-text-centered mb-5">
            <h1 id="authModalTitle" className="title is-4 mb-2">
              {t('title')}
            </h1>
            <p className="subtitle is-6 has-text-grey-light m-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Email field - always visible */}
          <form onSubmit={view === 'forgot-password' ? handleForgotPassword : handleEmailSignIn}>
            <div className="field">
              <label htmlFor="input-email" className="label has-text-white has-text-weight-semibold">
                {t('emailLabel')}
              </label>
              <div className="control">
                <input
                  id="input-email"
                  className="input"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password field - only in login view */}
            {view === 'login' && (
              <div className="field mt-4">
                <label htmlFor="input-password" className="label has-text-white has-text-weight-semibold">
                  {t('passwordLabel')}
                </label>
                
                <div className="control has-icons-right">
                  <input
                    id="input-password"
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    aria-required="true"
                  />
                  
                  <span 
                    id="toggle-password-visibility"
                    className="icon is-right" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setShowPassword(!showPassword) }}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                
                <div className="is-flex is-justify-content-flex-end mt-2">
                  <button
                    type="button"
                    id="link-forgot-password"
                    className="is-size-7 button is-text has-text-primary p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setView('forgot-password');
                    }}
                  >
                    {t('forgotPassword')}
                  </button>
                </div>
              </div>
            )}

            {/* Submit button - changes based on view */}
            <button
              id={view === 'forgot-password' ? 'btn-send-recovery' : 'btn-email-login'}
              type="submit"
              className={`button is-primary is-fullwidth mt-4 has-text-weight-semibold ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              <span>{view === 'forgot-password' ? t('sendRecoveryButton') : t('signInButton')}</span>
            </button>

            {/* Back to login link - only in forgot-password view */}
            {view === 'forgot-password' && (
              <div className="has-text-centered mt-3">
                <button
                  type="button"
                  id="btn-back-to-login"
                  className="button is-text has-text-grey-light is-size-7 p-0"
                  onClick={() => setView('login')}
                >
                  {t('backToLogin')}
                </button>
              </div>
            )}
          </form>

          <div className="auth-divider mt-5">
            <div className="auth-divider__line" />
            <span className="auth-divider__text">{t('orDivider')}</span>
            <div className="auth-divider__line" />
          </div>

          {/* Social buttons - side by side */}
          <div className="columns is-mobile is-gap-2 mt-4">
            <div className="column is-half">
              <button
                id="btn-google-login"
                className="button is-fullwidth has-text-weight-semibold"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <span className="icon"><i className="fab fa-google"></i></span>
                <span>{t('signInGoogle')}</span>
              </button>
            </div>
            <div className="column is-half">
              <button
                id="btn-linkedin-login"
                className="button is-fullwidth has-text-weight-semibold"
                onClick={handleLinkedInSignIn}
                disabled={isLoading}
              >
                <span className="icon"><i className="fab fa-linkedin"></i></span>
                <span>{t('signInLinkedIn')}</span>
              </button>
            </div>
          </div>

          <p className="has-text-centered mt-5 is-size-7 has-text-grey">
            {t('termsText')}{' '}
            <Link href="/terms" onClick={handleClose}>{t('termsLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}