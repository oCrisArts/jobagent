'use client';

import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function ConectarPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{t('crm.title')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Gamified CRM for job application tracking
        </p>
        
        <div style={{
          background: '#1a1d27',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>{t('crm.applications')}</h2>
          <div style={{ color: '#94a3b8' }}>
            <p>{t('crm.noApplications')}</p>
          </div>
        </div>

        <button 
          style={{
            padding: '12px 32px',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {t('crm.addApplication')}
        </button>
      </div>
    </main>
  );
}
