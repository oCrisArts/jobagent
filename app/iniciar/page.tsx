'use client';

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{t('dashboard.welcome')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
          Private Dashboard - Authenticated Users Only
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1a1d27', border: '1px solid #334155', borderRadius: '8px', padding: '20px' }}>
            <h3>{t('dashboard.searchJobs')}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
              Find perfect job opportunities
            </p>
          </div>
          
          <div style={{ background: '#1a1d27', border: '1px solid #334155', borderRadius: '8px', padding: '20px' }}>
            <h3>{t('dashboard.uploadResume')}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
              Optimize your CV with AI
            </p>
          </div>
          
          <div style={{ background: '#1a1d27', border: '1px solid #334155', borderRadius: '8px', padding: '20px' }}>
            <h3>{t('dashboard.myConnections')}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
              Gamified CRM System
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
