'use client';

import { useTranslations } from 'next-intl';
import { MatchAnalysis } from '@/types/resume';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: MatchAnalysis | null;
  isLoading: boolean;
}

export default function AnalysisModal({ isOpen, onClose, analysis, isLoading }: AnalysisModalProps) {
  const t = useTranslations('vagas');

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'is-success';
    if (score >= 50) return 'is-warning';
    return 'is-danger';
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{t('analysis.title')}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        
        <section className="modal-card-body">
          {isLoading ? (
            <div className="has-text-centered py-5">
              <span className="icon is-large">
                <i className="fas fa-spinner fa-pulse fa-2x"></i>
              </span>
              <p className="mt-3">{t('loading')}</p>
            </div>
          ) : analysis ? (
            <>
              {/* Score Badge */}
              <div className="has-text-centered mb-5">
                <span className={`tag ${getScoreColor(analysis.matchScore)} is-large`}>
                  {analysis.matchScore}% Match
                </span>
              </div>

              {/* Summary */}
              {analysis.summary && (
                <div className="notification is-info is-light mb-4">
                  {analysis.summary}
                </div>
              )}

              {/* Matched Skills */}
              {analysis.matched.length > 0 && (
                <div className="mb-4">
                  <h4 className="title is-6 has-text-success mb-2">
                    <span className="icon"><i className="fas fa-check-circle"></i></span>
                    {t('analysis.matched')}
                  </h4>
                  <div className="tags">
                    {analysis.matched.map((skill, index) => (
                      <span key={index} className="tag is-success is-light">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {analysis.missing.length > 0 && (
                <div className="mb-4">
                  <h4 className="title is-6 has-text-danger mb-2">
                    <span className="icon"><i className="fas fa-times-circle"></i></span>
                    {t('analysis.missing')}
                  </h4>
                  <div className="tags">
                    {analysis.missing.map((skill, index) => (
                      <span key={index} className="tag is-danger is-light">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div className="mb-4">
                  <h4 className="title is-6 has-text-warning-dark mb-2">
                    <span className="icon"><i className="fas fa-lightbulb"></i></span>
                    {t('analysis.suggestions')}
                  </h4>
                  <div className="tags">
                    {analysis.suggestions.map((suggestion, index) => (
                      <span key={index} className="tag is-warning is-light">{suggestion}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="notification is-warning">
              Não foi possível carregar a análise.
            </div>
          )}
        </section>
        
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>{t('analysis.close')}</button>
        </footer>
      </div>
    </div>
  );
}
