'use client';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Sync.IA
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Otimize seu CV com IA para cada vaga, globalmente
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
            Começar Grátis
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
