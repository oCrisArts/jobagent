'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function AuthErrorToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('AuthErrors');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    if (!error) return;

    if (error === 'OAuthCallback') {
      setMessage(t('oauthCallback'));
    } else if (error === 'AccessDenied') {
      setMessage(t('accessDenied'));
    } else {
      setMessage(t('generic'));
    }

    setVisible(true);

    // Limpar o param da URL sem reload
    const url = new URL(window.location.href);
    url.searchParams.delete('error');
    router.replace(url.pathname + url.search, { scroll: false });
  }, [searchParams, router, t]);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div id="toast-auth-error" className="notification is-danger auth-toast">
      <button className="delete" onClick={handleClose} aria-label="Fechar" />
      {message}
    </div>
  );
}
