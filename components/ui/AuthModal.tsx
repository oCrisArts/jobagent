'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  mode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen = true, onClose, mode = 'login' }: AuthModalProps) {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentials = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/inicio'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    await signIn(provider, { callbackUrl: '/inicio' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="box">
          <h2 className="title is-4 mb-4">
            {mode === 'login' ? t('auth.titleLogin') : t('auth.titleSignup')}
          </h2>
          <form onSubmit={handleCredentials}>
            <div className="field">
              <label className="label">{t('auth.email')}</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">{t('auth.password')}</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder={t('auth.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className={`button is-primary ${loading ? 'is-loading' : ''}`} type="submit" disabled={loading}>
                  {mode === 'login' ? t('auth.loginButton') : t('auth.signupButton')}
                </button>
              </div>
              <div className="control">
                <button className="button is-light" onClick={onClose} type="button">
                  {t('auth.cancel')}
                </button>
              </div>
            </div>
          </form>

          <hr />
          <p className="has-text-centered mb-3">{t('auth.orContinue')}</p>
          <div className="buttons is-fullwidth">
            <button className="button is-fullwidth" type="button" onClick={() => handleSocialLogin('google')}>
              {t('auth.continueGoogle')}
            </button>
            <button className="button is-fullwidth" type="button" onClick={() => handleSocialLogin('linkedin')}>
              {t('auth.continueLinkedin')}
            </button>
          </div>
        </div>
      </div>

      <button 
        className="modal-close is-large" 
        onClick={onClose}
        aria-label="close"
      ></button>
    </div>
  );
}
