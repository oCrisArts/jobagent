import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('Terms');

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="title is-1">{t('title')}</h1>
          <p className="subtitle is-4">{t('subtitle')}</p>

          <h2 className="title is-3 mt-6">{t('section1.title')}</h2>
          <p>{t('section1.content')}</p>

          <h2 className="title is-3 mt-6">{t('section2.title')}</h2>
          <p>{t('section2.content')}</p>

          <h2 className="title is-3 mt-6">{t('section3.title')}</h2>
          <p>{t('section3.content')}</p>

          <h2 className="title is-3 mt-6">{t('section4.title')}</h2>
          <p>{t('section4.content')}</p>

          <h2 className="title is-3 mt-6">{t('section5.title')}</h2>
          <p>{t('section5.content')}</p>

          <div className="notification is-info mt-6">
            <p className="has-text-weight-semibold">{t('contact.title')}</p>
            <p>{t('contact.email')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
