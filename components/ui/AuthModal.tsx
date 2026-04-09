'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen?: boolean;
  mode?: 'login' | 'signup';
  onClose?: () => void;
}

export default function AuthModal({
  isOpen: externalIsOpen = false,
  mode: _mode = 'login',
  onClose,
}: AuthModalProps) {
  const t = useTranslations('AuthModal');
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const [isLoading, setIsLoading] = useState(false);
  
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

      <div className="modal-content">
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

          <div className="mb-5">
            <button
              id="btn-google-login"
              className="button is-fullwidth mb-3 has-text-weight-semibold"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <span className="icon"><i className="fab fa-google"></i></span>
              <span>{t('signInGoogle')}</span>
            </button>

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

          <div className="auth-divider">
            <div className="auth-divider__line" />
            <span className="auth-divider__text">{t('orDivider')}</span>
            <div className="auth-divider__line" />
          </div>

          <form onSubmit={handleEmailSignIn} className="mt-5">
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
                <a 
                  href="/forgot-password" 
                  id="link-forgot-password" 
                  className="is-size-7"
                >
                  {t('forgotPassword')}
                </a>
              </div>
            </div>

            <button
              id="btn-email-login"
              type="submit"
              className={`button is-primary is-fullwidth mt-5 has-text-weight-semibold ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              <span>{t('signInButton')}</span>
            </button>
          </form>

          <p className="has-text-centered mt-5 is-size-7 has-text-grey">
            {t('termsText')}{' '}
            <a href="/terms">{t('termsLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}