'use client';

import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations();

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>{t('pricing.pro')}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Checkout page - Stripe integration
        </p>
        <div style={{
          background: '#1a1d27',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h2>$14.90{t('pricing.monthly')}</h2>
          <p style={{ color: '#94a3b8', margin: '20px 0' }}>
            Full access to AI-powered resume optimization
          </p>
          <button 
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              background: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Subscribe with Stripe
          </button>
        </div>
      </div>
    </main>
  );
}
