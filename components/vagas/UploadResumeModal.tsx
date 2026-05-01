'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface UploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export default function UploadResumeModal({ isOpen, onClose, onUploadSuccess }: UploadResumeModalProps) {
  const t = useTranslations('vagas');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Apenas arquivos PDF são aceitos');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao fazer upload');
      }

      onUploadSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{t('uploadCurriculoModal.title')}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        
        <section className="modal-card-body">
          <p className="mb-4">{t('uploadCurriculoModal.description')}</p>
          
          {error && (
            <div className="notification is-danger is-light mb-4">
              {error}
            </div>
          )}

          <div className="file has-name is-boxed is-fullwidth">
            <label className="file-label">
              <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  {t('uploadCurriculoModal.uploadButton')}
                </span>
              </span>
            </label>
          </div>

          {isUploading && (
            <div className="has-text-centered mt-4">
              <span className="icon">
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
              <span className="ml-2">{t('loading')}</span>
            </div>
          )}
        </section>
        
        <footer className="modal-card-foot">
          <button 
            className="button" 
            onClick={onClose}
            disabled={isUploading}
          >
            {t('uploadCurriculoModal.cancel')}
          </button>
        </footer>
      </div>
    </div>
  );
}
