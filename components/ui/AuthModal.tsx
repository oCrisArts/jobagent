'use client';

import { useTranslations } from 'next-intl';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  mode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen = true, onClose, mode = 'login' }: AuthModalProps) {
  const t = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="box">
          <h2 className="title is-4 mb-4">
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </h2>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                className="input" 
                type="email" 
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <div className="control">
              <input 
                className="input" 
                type="password" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">
                {mode === 'login' ? 'Entrar' : 'Registrar'}
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={onClose}>
                Cancelar
              </button>
            </div>
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
