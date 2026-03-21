"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

interface Job {
  id: string; title: string; company: string; location: string;
  description: string; url: string; logo?: string; remote: boolean; postedAt: string;
}

// ---------- Skeleton ----------
const JobCardSkeleton = () => (
  <div className="bg-surface-card border border-white/8 rounded-xl p-4 animate-pulse">
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/10 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="h-3 bg-white/10 rounded w-1/3" />
      </div>
    </div>
    <div className="mt-3 space-y-1.5">
      <div className="h-3 bg-white/10 rounded" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
    </div>
    <div className="flex gap-2 mt-4">
      <div className="flex-1 h-8 bg-white/10 rounded-lg" />
      <div className="flex-1 h-8 bg-white/10 rounded-lg" />
    </div>
  </div>
);

// ---------- Job Card ----------
const JobCard = ({ job }: { job: Job }) => {
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    : "";

  return (
    <div className="bg-surface-card border border-white/8 rounded-xl p-4 hover:border-brand-600/50 transition-all">
      <div className="flex gap-3 items-start">
        {job.logo ? (
          <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain bg-white p-1 flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center text-sm font-bold text-brand-400 flex-shrink-0">
            {job.company.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight truncate">{job.title}</h3>
          <p className="text-white/40 text-xs mt-0.5">{job.company}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-white/30">📍 {job.location || "Não informado"}</span>
            {job.remote && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                Remoto
              </span>
            )}
            {postedDate && <span className="text-xs text-white/20 ml-auto">{postedDate}</span>}
          </div>
        </div>
      </div>
      {job.description && (
        <p className="text-white/30 text-xs mt-3 line-clamp-2 leading-relaxed">{job.description}</p>
      )}
      <button
        onClick={() => console.log("Abrir Modal", job)}
        className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold bg-brand-gradient hover:opacity-90 text-white transition-all shadow-glow-sm"
      >
        Ver Match e Aplicar
      </button>
    </div>
  );
};

// ---------- Search Icon ----------
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);

// ---------- Main Page ----------
export default function Home() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setJobs([]);
    try {
      const res = await fetch(
        `/api/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location || "Brazil")}`
      );
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Erro ao buscar vagas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // -------- Not logged in --------
  if (!session) {
    return (
      <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center text-xl font-bold text-white mb-4 shadow-glow">
          JA
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">JobAgent</h1>
        <p className="text-white/40 text-sm mb-6 max-w-xs">
          Faça login para buscar vagas e gerar currículos adaptados com IA.
        </p>
        <LoginButton large />
      </div>
    );
  }

  // -------- Logged in --------
  return (
    <div className="min-h-screen bg-surface-base flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-white/8 bg-surface-default">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-xs font-bold text-white">JA</div>
          <span className="font-semibold text-white">JobAgent</span>
          <span className="text-[10px] bg-white/5 border border-white/10 text-white/40 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <LoginButton />
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10">

        {/* Hero Search */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Encontre sua próxima <span className="text-brand-400">vaga ideal</span>
          </h1>
          <p className="text-white/40 text-sm">Busque vagas e gere um currículo adaptado com IA em segundos.</p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cargo ou área  (ex: UX Designer)"
              className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-600/60 transition-colors"
            />
          </div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-base">📍</span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Localização  (ex: São Paulo)"
              className="w-full bg-surface-card border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-600/60 transition-colors"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-brand-gradient rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-glow-sm whitespace-nowrap"
          >
            {loading ? "Buscando..." : "Buscar Vagas"}
          </button>
        </div>

        {/* Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        )}

        {/* Results */}
        {!loading && jobs.length > 0 && (
          <>
            <p className="text-white/30 text-xs mb-4">{jobs.length} vagas encontradas para <span className="text-white/50 font-medium">"{query}"</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && searched && jobs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white/40 text-sm">Nenhuma vaga encontrada. Tente outro cargo ou localização.</p>
          </div>
        )}

      </main>
    </div>
  );
}
