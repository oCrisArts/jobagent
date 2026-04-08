'use client';

export default function LandingPage() {
  const t = (key: string) => {
    const dict: Record<string, string> = {
      'landing.hero.title': 'Conquiste sua vaga ideal com IA',
      'landing.hero.subtitle': 'Busque oportunidades, otimize seu CV e aplique com confiança.',
      'landing.cta.start': 'Começar agora',
      'landing.cta.signin': 'Entrar',
      'pricing.pro': 'Plano Pro',
      'pricing.free': 'Plano Gratuito',
      'pricing.monthly': '/mês',
    };
    return dict[key] ?? key;
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
              <button className="button is-primary is-large">
                {t('landing.cta.start')}
              </button>
              <button className="button is-light is-large">
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
                <p className="subtitle is-6">Gratuito</p>
                
                <div className="content">
                  <ul>
                    <li>5 buscas por mês</li>
                    <li>1 otimização de CV</li>
                    <li>Suporte básico</li>
                  </ul>
                </div>

                <button className="button is-light is-fullwidth">
                  Começar Grátis
                </button>
              </div>
            </div>

            {/* PRO PLAN - DESTAQUE */}
            <div className="column is-4">
              <div className="box has-background-primary has-text-white" style={{ position: 'relative', marginTop: '-2rem' }}>
                <div className="tag is-warning" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  Popular
                </div>
                <h3 className="title is-4 has-text-white">
                  {t('pricing.pro')}
                </h3>
                <p className="subtitle is-5 has-text-white-bis">
                  $14.90{t('pricing.monthly')}
                </p>
                
                <div className="content has-text-white">
                  <ul>
                    <li>✓ Buscas ilimitadas</li>
                    <li>✓ Otimizações ilimitadas</li>
                    <li>✓ Análise com IA (Claude)</li>
                    <li>✓ Suporte prioritário</li>
                  </ul>
                </div>

                <button className="button is-light is-fullwidth">
                  Assinar Agora
                </button>
              </div>
            </div>

            {/* ENTERPRISE PLAN */}
            <div className="column is-4">
              <div className="box has-background-dark">
                <h3 className="title is-4 has-text-danger">
                  Enterprise
                </h3>
                <p className="subtitle is-6">Personalizado</p>
                
                <div className="content">
                  <ul>
                    <li>Tudo do Pro</li>
                    <li>API dedicada</li>
                    <li>Integrações custom</li>
                    <li>Account manager</li>
                  </ul>
                </div>

                <button className="button is-danger is-fullwidth">
                  Falar com Sales
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
            🎯 Recursos
          </h2>

          <div className="columns is-multiline">
            <div className="column is-4">
              <div className="box">
                <p className="heading">🌍 Global</p>
                <p>Suporte para 180+ países e 50+ idiomas</p>
              </div>
            </div>
            
            <div className="column is-4">
              <div className="box">
                <p className="heading">🤖 IA Inteligente</p>
                <p>Otimização com Claude 3.5 + Google Gemini</p>
              </div>
            </div>
            
            <div className="column is-4">
              <div className="box">
                <p className="heading">📱 Mobile First</p>
                <p>Aplicativo Web responsivo para qualquer dispositivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="section has-background-primary has-text-centered has-text-white">
        <div className="container">
          <h2 className="title is-3 has-text-white">
            Pronto para revolucionar sua carreira?
          </h2>
          <p className="subtitle is-5 has-text-white-bis mb-6">
            Junte-se a milhares de profissionais que já estão usando Sync.IA
          </p>
          <button className="button is-light is-large">
            {t('landing.cta.start')}
          </button>
        </div>
      </section>
    </main>
  );
}
