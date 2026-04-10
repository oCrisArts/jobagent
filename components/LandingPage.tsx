'use client';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  const t = useTranslations();

  const openAuthModal = () => {
    window.dispatchEvent(new Event('openAuthModal'));
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero is-large is-dark">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">
              {t('landing.hero.title')}
            </h1>
            <p className="subtitle is-4">
              {t('landing.hero.subtitle')}
            </p>
            <div className="buttons is-centered mt-6">
              <button className="button is-primary is-large" onClick={openAuthModal}>
                {t('landing.cta.start')}
              </button>
              <button className="button is-light is-large" onClick={openAuthModal}>
                {t('landing.cta.signin')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="section has-background-dark-ter">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">
            {t('pricing.pro')}
          </h2>

          <div className="columns is-multiline">
            {/* FREE PLAN */}
            <div className="column is-4">
              <div className="box has-background-dark">
                <h3 className="title is-4 has-text-primary">
                  {t('pricing.free')}
                </h3>
                <p className="subtitle is-6">{t('pricing.free')}</p>
                
                <div className="content">
                  <ul>
                    <li>{t('landing.pricing.freeFeature1')}</li>
                    <li>{t('landing.pricing.freeFeature2')}</li>
                    <li>{t('landing.pricing.freeFeature3')}</li>
                  </ul>
                </div>

                <button className="button is-light is-fullwidth" onClick={openAuthModal}>
                  {t('landing.cta.start')}
                </button>
              </div>
            </div>

            {/* PRO PLAN - DESTAQUE */}
            <div className="column is-4">
              <div className="box has-background-primary has-text-white" style={{ position: 'relative', marginTop: '-2rem' }}>
                <div className="tag is-warning" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  {t('landing.pricing.popular')}
                </div>
                <h3 className="title is-4 has-text-white">
                  {t('pricing.pro')}
                </h3>
                <p className="subtitle is-5 has-text-white-bis">
                  $14.90{t('pricing.monthly')}
                </p>
                
                <div className="content has-text-white">
                  <ul>
                    <li>✓ {t('landing.pricing.proFeature1')}</li>
                    <li>✓ {t('landing.pricing.proFeature2')}</li>
                    <li>✓ {t('landing.pricing.proFeature3')}</li>
                    <li>✓ {t('landing.pricing.proFeature4')}</li>
                  </ul>
                </div>

                <button className="button is-light is-fullwidth" onClick={openAuthModal}>
                  {t('landing.pricing.subscribe')}
                </button>
              </div>
            </div>

            {/* ENTERPRISE PLAN */}
            <div className="column is-4">
              <div className="box has-background-dark">
                <h3 className="title is-4 has-text-danger">
                  {t('landing.pricing.enterprise')}
                </h3>
                <p className="subtitle is-6">{t('landing.pricing.custom')}</p>
                
                <div className="content">
                  <ul>
                    <li>{t('landing.pricing.enterpriseFeature1')}</li>
                    <li>{t('landing.pricing.enterpriseFeature2')}</li>
                    <li>{t('landing.pricing.enterpriseFeature3')}</li>
                    <li>{t('landing.pricing.enterpriseFeature4')}</li>
                  </ul>
                </div>

                <button className="button is-danger is-fullwidth">
                  {t('landing.pricing.talkSales')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">
            {t('landing.features.title')}
          </h2>

          <div className="columns is-multiline">
            <div className="column is-4">
              <div className="box">
                <p className="heading">{t('landing.features.globalTitle')}</p>
                <p>{t('landing.features.globalDesc')}</p>
              </div>
            </div>
            
            <div className="column is-4">
              <div className="box">
                <p className="heading">{t('landing.features.aiTitle')}</p>
                <p>{t('landing.features.aiDesc')}</p>
              </div>
            </div>
            
            <div className="column is-4">
              <div className="box">
                <p className="heading">{t('landing.features.mobileTitle')}</p>
                <p>{t('landing.features.mobileDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="section has-background-primary has-text-centered has-text-white">
        <div className="container">
          <h2 className="title is-3 has-text-white">
            {t('landing.footer.title')}
          </h2>
          <p className="subtitle is-5 has-text-white-bis mb-6">
            {t('landing.footer.subtitle')}
          </p>
          <button className="button is-light is-large" onClick={openAuthModal}>
            {t('landing.cta.start')}
          </button>
        </div>
      </section>
    </main>
  );
}
