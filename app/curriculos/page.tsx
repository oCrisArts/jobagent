'use client';
import { useTranslations } from 'next-intl';

export default function CurriculosPage() {
  const t = useTranslations();
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('curriculos.title')}</h1>
        <p className="subtitle">{t('curriculos.subtitle')}</p>

        <div className="box">
          <p className="mb-3">{t('curriculos.lastResume')}</p>
          <button className="button is-primary mr-2">{t('curriculos.download')}</button>
          <button className="button is-link is-light">{t('curriculos.atsAnalysis')}</button>
        </div>
      </div>
    </main>
  );
}
