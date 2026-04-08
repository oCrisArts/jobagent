'use client';
import { useTranslations } from 'next-intl';

export default function InicioPage() {
  const t = useTranslations();
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('inicio.title')}</h1>
        <p className="subtitle">{t('inicio.subtitle')}</p>

        <div className="columns">
          <div className="column">
            <div className="box">
              <p className="heading">{t('inicio.cards.ssi')}</p>
              <p className="title is-4">--</p>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <p className="heading">{t('inicio.cards.appliedJobs')}</p>
              <p className="title is-4">--</p>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <p className="heading">{t('inicio.cards.lastViewedJob')}</p>
              <p className="title is-6">--</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
