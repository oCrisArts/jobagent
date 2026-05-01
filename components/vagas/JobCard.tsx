'use client';

import { useTranslations } from 'next-intl';
import { Job } from '@/types/resume';

interface JobCardProps {
  job: Job;
  hasResume: boolean;
  onViewAnalysis: (job: Job) => void;
  onLoadResume: () => void;
}

export default function JobCard({ job, hasResume, onViewAnalysis, onLoadResume }: JobCardProps) {
  const t = useTranslations('vagas');

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'is-success';
    if (score >= 50) return 'is-warning';
    return 'is-danger';
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{job.title}</p>
            <p className="subtitle is-6 has-text-grey">{job.company} • {job.location}</p>
          </div>
          {hasResume && job.matchScore !== undefined && (
            <div className="media-right">
              <span className={`tag ${getScoreColor(job.matchScore)} is-medium`}>
                {job.matchScore}% match
              </span>
            </div>
          )}
        </div>

        <div className="content">
          <p>{job.description}</p>
          
          <div className="tags mt-3">
            {job.skills_required.map((skill, index) => (
              <span key={index} className="tag is-light is-info">{skill}</span>
            ))}
          </div>

          {job.salary && (
            <p className="has-text-weight-semibold has-text-success mt-2">
              {job.salary}
            </p>
          )}

          <div className="mt-4">
            {hasResume ? (
              <button
                className="button is-primary is-small"
                onClick={() => onViewAnalysis(job)}
              >
                <span className="icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span>{t('viewAnalysis')}</span>
              </button>
            ) : (
              <button
                className="button is-light is-small"
                onClick={onLoadResume}
              >
                <span className="icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span>{t('loadCurriculoForMatch')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
