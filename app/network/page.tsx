'use client';
import { useTranslations } from 'next-intl';

export default function NetworkPage() {
  const t = useTranslations();
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('network.title')}</h1>
        <p className="subtitle">{t('network.subtitle')}</p>

        <div className="box">
          <p className="mb-3">{t('network.pipeline')}</p>
          <button className="button is-primary">{t('network.newConnection')}</button>
        </div>
      </div>
    </main>
  );
}
