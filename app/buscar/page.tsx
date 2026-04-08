'use client';

import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function BuscarPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{t('jobs.search')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Integration with Adzuna API & JSearch API
        </p>
        
        <div style={{
          background: '#1a1d27',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <input 
            type="text"
            placeholder="Search jobs..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              background: '#0a0a0f',
              border: '1px solid #334155',
              color: '#fff',
              borderRadius: '8px',
              marginBottom: '15px'
            }}
          />
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
            Search
          </button>
        </div>

        <div style={{ color: '#94a3b8' }}>
          <p>{t('jobs.noResults')}</p>
        </div>
      </div>
    </main>
  );
}
