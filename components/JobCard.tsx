"use client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  logo?: string;
  remote: boolean;
  postedAt: string;
}

interface JobCardProps {
  job: Job;
  onAdaptResume: (job: Job) => void;
}

export default function JobCard({ job, onAdaptResume }: JobCardProps) {
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    : "";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all group">
      <div className="flex items-start gap-3">
        {job.logo ? (
          <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain bg-white p-1 flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-lg flex-shrink-0">
            🏢
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight truncate">{job.title}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{job.company}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-gray-500">📍 {job.location || "Não informado"}</span>
            {job.remote && (
              <span className="text-xs bg-green-900 text-green-300 px-1.5 py-0.5 rounded-full">Remoto</span>
            )}
            {postedDate && <span className="text-xs text-gray-600">{postedDate}</span>}
          </div>
        </div>
      </div>

      {job.description && (
        <p className="text-gray-400 text-xs mt-3 line-clamp-2 leading-relaxed">{job.description}</p>
      )}

      <div className="flex items-center gap-2 mt-3">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors font-medium"
        >
          Ver vaga
        </a>
        <button
          onClick={() => onAdaptResume(job)}
          className="flex-1 text-center text-xs border border-gray-600 hover:border-blue-500 hover:text-blue-400 text-gray-300 py-2 rounded-lg transition-colors font-medium"
        >
          Adaptar currículo
        </button>
      </div>
    </div>
  );
}
