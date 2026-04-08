'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-spinner fa-pulse fa-2x"></i>
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    router.replace('/');
    return null;
  }

  const { user } = session;
  const isPro = user.is_pro ?? false;
  const provider = user.provider ?? 'credentials';
  const isOAuth = provider === 'google' || provider === 'linkedin';
  const providerLabel = provider === 'google' ? 'Google' : provider === 'linkedin' ? 'LinkedIn' : null;

  async function handleManageSubscription() {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setPortalError(data.error ?? 'Erro ao abrir portal de cobrança.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setPortalError('Erro de conexão. Tente novamente.');
    } finally {
      setPortalLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '720px' }}>

        {/* ── [1] Cabeçalho: Avatar + Nome + E-mail ── */}
        <div className="box">
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                {user.image ? (
                  <img
                    className="is-rounded"
                    src={user.image}
                    alt={user.name ?? 'Avatar'}
                    referrerPolicy="no-referrer"
                    style={{ objectFit: 'cover', width: '96px', height: '96px' }}
                  />
                ) : (
                  <span
                    className="icon is-large has-text-grey-light"
                    style={{
                      width: '96px',
                      height: '96px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: '#2A2D3A',
                    }}
                  >
                    <i className="fas fa-user-circle fa-3x"></i>
                  </span>
                )}
              </figure>
            </div>
            <div className="media-content" style={{ overflow: 'hidden' }}>
              <p className="title is-4" style={{ marginBottom: '0.25rem' }}>
                {user.name ?? 'Usuário'}
              </p>
              <p className="subtitle is-6 has-text-grey">
                <span className="icon-text">
                  <span className="icon"><i className="fas fa-envelope"></i></span>
                  <span>{user.email}</span>
                </span>
              </p>
              {providerLabel && (
                <span className="tag is-light is-small">
                  <span className="icon"><i className={`fab fa-${provider}`}></i></span>
                  <span>Conectado via {providerLabel}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── [2] Status da Assinatura + Stripe Portal ── */}
        <div className="box">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="has-text-weight-semibold" style={{ marginBottom: '0.5rem' }}>
                Plano atual
              </p>
              {isPro ? (
                <span className="tag is-success is-medium">
                  <span className="icon"><i className="fas fa-crown"></i></span>
                  <span>Assinatura PRO Ativa</span>
                </span>
              ) : (
                <span className="tag is-light is-medium">
                  <span className="icon"><i className="fas fa-lock"></i></span>
                  <span>Plano Grátis</span>
                </span>
              )}
            </div>
            <div className="column is-narrow">
              <button
                className={`button is-link${portalLoading ? ' is-loading' : ''}`}
                onClick={handleManageSubscription}
                disabled={portalLoading}
              >
                <span className="icon"><i className="fas fa-credit-card"></i></span>
                <span>Gerenciar Assinatura</span>
              </button>
            </div>
          </div>

          {portalError && (
            <div className="notification is-danger is-light" style={{ marginTop: '0.75rem' }}>
              {portalError}
            </div>
          )}
        </div>

        {/* ── [3] Gerenciamento de Senha ── */}
        <div className="box">
          <p className="has-text-weight-semibold" style={{ marginBottom: '0.75rem' }}>
            Segurança
          </p>

          {isOAuth ? (
            <div className="notification is-info is-light">
              <span className="icon-text">
                <span className="icon"><i className={`fab fa-${provider}`}></i></span>
                <span>
                  Você está logado via <strong>{providerLabel}</strong>.
                  O gerenciamento de senha é feito pelo provedor da sua conta.
                </span>
              </span>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label className="label">Senha atual</label>
                <div className="control has-icons-left">
                  <input className="input" type="password" placeholder="••••••••" />
                  <span className="icon is-left"><i className="fas fa-lock"></i></span>
                </div>
              </div>
              <div className="field">
                <label className="label">Nova senha</label>
                <div className="control has-icons-left">
                  <input className="input" type="password" placeholder="••••••••" />
                  <span className="icon is-left"><i className="fas fa-key"></i></span>
                </div>
              </div>
              <div className="field">
                <label className="label">Confirmar nova senha</label>
                <div className="control has-icons-left">
                  <input className="input" type="password" placeholder="••••••••" />
                  <span className="icon is-left"><i className="fas fa-key"></i></span>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    <span className="icon"><i className="fas fa-save"></i></span>
                    <span>Alterar Senha</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
