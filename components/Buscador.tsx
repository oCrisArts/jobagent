'use client';

export function Buscador() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Buscar Vagas</h1>
        
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <input
            type="text"
            placeholder="Buscar vagas..."
            className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">Vaga Exemplo 1</h3>
            <p className="text-slate-300">Descrição da vaga...</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">Vaga Exemplo 2</h3>
            <p className="text-slate-300">Descrição da vaga...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buscador;
