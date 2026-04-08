'use client';

import { useTranslations } from 'next-intl';

export default function EvoluirPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>{t('resume.upload')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          AI-powered resume optimization with Google Gemini (Extraction) & Claude (Adaptation)
        </p>
        
        <div style={{
          background: '#1a1d27',
          border: '2px dashed #334155',
          borderRadius: '8px',
          padding: '60px 20px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '48px', marginBottom: '15px' }}>📄</p>
          <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
            Drag and drop your PDF resume here
          </p>
          <input 
            type="file"
            accept=".pdf"
            style={{
              display: 'block',
              margin: '0 auto',
              padding: '8px 16px'
            }}
          />
        </div>

        <button 
          style={{
            width: '100%',
            padding: '12px',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {t('resume.optimize')}
        </button>
      </div>
    </main>
  );
}
