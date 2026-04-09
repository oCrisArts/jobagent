'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

/**
 * 🔑 AuthErrorToast - Tratamento de Erros OAuth
 * 
 * ✅ BDD Implementado:
 * - Lê parâmetros ?error= da URL
 * - Exibe toast com ID estrito #toast-auth-error
 * - Usa Bulma CSS para estilo
 * - Suporta erros: OAuthCallback, AccessDenied, etc.
 */
export default function AuthErrorToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('AuthError');
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');

    if (error) {
      // Mapear códigos de erro para mensagens amigáveis
      let message = '';
      
      switch (error) {
        case 'OAuthCallback':
          message = t('oauthCallbackError') || 'Erro ao processar o login OAuth. Tente novamente.';
          break;
        case 'AccessDenied':
          message = t('accessDenied') || 'Login cancelado pelo utilizador.';
          break;
        case 'Configuration':
          message = t('configurationError') || 'Erro de configuração do OAuth. Contacte o suporte.';
          break;
        default:
          message = t('defaultError') || 'Erro ao fazer login. Tente novamente.';
      }

      setErrorMessage(message);
      setIsVisible(true);

      // Remover o parâmetro error da URL após exibir o toast
      router.replace('/');
    }
  }, [searchParams, router, t]);

  if (!isVisible) return null;

  return (
    <div
      id="toast-auth-error"
      className="notification is-danger is-light"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        maxWidth: '400px',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-in',
      }}
    >
      <button
        className="delete"
        onClick={() => setIsVisible(false)}
        aria-label="Fechar alerta"
      />
      <p style={{ margin: 0, fontWeight: 500 }}>
        {errorMessage}
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
