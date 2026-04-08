'use client';

import { useTranslations } from 'next-intl';

export default function ConectarPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{t('dashboard.myConnections')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
          Gamified CRM Hub - Track your job search journey
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{
            background: '#1a1d27',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h3 style={{ marginBottom: '10px' }}>🎯 Active Applications</h3>
            <p style={{ color: '#94a3b8', fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>0</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Track your job applications</p>
          </div>
          
          <div style={{
            background: '#1a1d27',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h3 style={{ marginBottom: '10px' }}>⭐ Success Rate</h3>
            <p style={{ color: '#94a3b8', fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>0%</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Interview conversion rate</p>
          </div>
          
          <div style={{
            background: '#1a1d27',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h3 style={{ marginBottom: '10px' }}>🏆 Total Connections</h3>
            <p style={{ color: '#94a3b8', fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>0</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Recruiters & companies</p>
          </div>
        </div>
      </div>
    </main>
  );
}
