'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useUserResume } from '@/app/vagas/hooks/useUserResume';
import UploadResumeModal from '@/components/vagas/UploadResumeModal';

export default function CurriculosPage() {
  const t = useTranslations();
  const { hasResume, loading: resumeLoading, refresh: refreshResume } = useUserResume();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notification, setNotification] = useState<{type: 'danger' | 'success', message: string} | null>(null);

  const showNotification = useCallback((type: 'danger' | 'success', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handleUploadSuccess = async () => {
    await refreshResume();
    setShowUploadModal(false);
    showNotification('success', t('curriculos.uploadSuccess') || 'Currículo enviado com sucesso!');
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  if (resumeLoading) {
    return (
      <main className="section">
        <div className="container">
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-spinner fa-pulse fa-2x"></i>
            </span>
            <p className="mt-3">{t('loading') || 'Carregando...'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('curriculos.title')}</h1>
        <p className="subtitle">{t('curriculos.subtitle')}</p>

        {/* Notificação */}
        {notification && (
          <div className={`notification is-${notification.type} mb-4`}>
            <button className="delete" onClick={() => setNotification(null)}></button>
            {notification.message}
          </div>
        )}

        <div className="box">
          {hasResume ? (
            <>
              <p className="mb-3">{t('curriculos.lastResume')}</p>
              <button className="button is-primary mr-2">{t('curriculos.download')}</button>
              <button className="button is-link is-light">{t('curriculos.atsAnalysis')}</button>
            </>
          ) : (
            <div className="has-text-centered">
              <p className="mb-4">{t('curriculos.noResume') || 'Você ainda não tem um currículo cadastrado.'}</p>
              <button 
                className="button is-primary"
                onClick={() => setShowUploadModal(true)}
              >
                <span className="icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span>{t('curriculos.uploadResume') || 'Enviar currículo'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={closeUploadModal}
        onUploadSuccess={handleUploadSuccess}
      />
    </main>
  );
}
