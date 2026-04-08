'use client';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #0f172a, #1e293b)'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
          Sync.IA
        </h1>
        <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '30px' }}>
          Otimize seu CV com IA para cada vaga, globalmente
        </p>
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 32px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Começar Grátis
        </button>
      </div>
    </div>
  );
}
