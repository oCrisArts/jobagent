'use client';
import { useTranslations } from 'next-intl';

export default function PerfilPage() {
  const t = useTranslations();
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('perfil.title')}</h1>
        <p className="subtitle">{t('perfil.subtitle')}</p>

        <div className="box">
          <div className="buttons">
            <button className="button is-primary">{t('perfil.updateProfile')}</button>
            <button className="button is-link is-light">{t('perfil.manageSubscription')}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
