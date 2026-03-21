"use client";

interface Job {
  id: string; title: string; company: string; location: string;
  description: string; url: string; logo?: string; remote: boolean; postedAt: string;
}

interface JobCardProps { job: Job; onAdaptResume: (job: Job) => void; }

const JobCard = ({ job, onAdaptResume }: JobCardProps) => {
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    : "";

  return (
    <div className="bg-surface-card border border-white/8 rounded-2xl p-4 hover:border-brand-600/60 transition-all group">
      <div className="flex gap-3 items-start">
        {job.logo ? (
          <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center text-sm font-bold text-brand-400 shrink-0">
            {job.company.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm leading-tight truncate">{job.title}</p>
          <p className="text-white/50 text-xs mt-0.5">{job.company}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-white/30">📍 {job.location || "Não informado"}</span>
            {job.remote && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Remoto</span>
            )}
            {postedDate && <span className="text-xs text-white/20 ml-auto">{postedDate}</span>}
          </div>
        </div>
      </div>

      {job.description && (
        <p className="text-white/40 text-xs mt-3 line-clamp-2 leading-relaxed">{job.description}</p>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onAdaptResume(job)}
          className="flex-1 text-xs border border-brand-600/40 hover:border-brand-600 text-brand-400 hover:text-brand-300 py-2 rounded-lg transition-colors font-medium"
        >
          Adaptar CV
        </button>
        <a
          href={job.url} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center text-xs bg-brand-600 hover:bg-brand-500 text-white py-2 rounded-lg transition-colors font-medium"
        >
          Ver vaga
        </a>
      </div>
    </div>
  );
};

export default JobCard;
