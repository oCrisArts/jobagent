'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h1>{t('landing.hero.title')}</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: '20px 0' }}>
          {t('landing.hero.subtitle')}
        </p>
        <button 
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '12px'
          }}
        >
          {t('landing.cta.start')}
        </button>
        <button 
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            background: 'transparent',
            color: '#7c3aed',
            border: '2px solid #7c3aed',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {t('landing.cta.signin')}
        </button>

        <div style={{ marginTop: '60px', color: '#64748b', fontSize: '14px' }}>
          <p>🌍 Global AI-Powered Career Assistant</p>
          <p>📱 Responsive Web App | 🚀 Next.js 16 | 🎨 SASS Styling</p>
        </div>
      </div>
    </main>
  );
}
