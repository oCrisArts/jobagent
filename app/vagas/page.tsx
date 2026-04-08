'use client';
import { useTranslations } from 'next-intl';

export default function VagasPage() {
  const t = useTranslations();
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('vagas.title')}</h1>
        <p className="subtitle">{t('vagas.subtitle')}</p>

        <div className="box">
          <div className="field">
            <label className="label">{t('vagas.jobLabel')}</label>
            <div className="control">
              <input className="input" placeholder={t('vagas.jobPlaceholder')} />
            </div>
          </div>
          <div className="field">
            <label className="label">{t('vagas.locationLabel')}</label>
            <div className="control">
              <input className="input" placeholder={t('vagas.locationPlaceholder')} />
            </div>
          </div>
          <button className="button is-primary">{t('vagas.searchButton')}</button>
        </div>
      </div>
    </main>
  );
}
