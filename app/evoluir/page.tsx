'use client';

import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function EvoluirPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{t('resume.upload')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Upload your PDF resume and get AI-powered optimization
        </p>
        
        <div style={{
          background: '#1a1d27',
          border: '2px dashed #7c3aed',
          borderRadius: '8px',
          padding: '60px 20px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '32px', marginBottom: '10px' }}>📄</p>
          <p style={{ marginBottom: '20px' }}>{t('resume.dragDrop')}</p>
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
            {t('resume.selectFile')}
          </button>
        </div>

        <div style={{ color: '#94a3b8' }}>
          <p>{t('resume.noFile')}</p>
        </div>
      </div>
    </main>
  );
}
