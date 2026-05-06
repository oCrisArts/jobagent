'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Job, MatchAnalysis } from '@/types/resume';
import { useUserResume } from '@/app/vagas/hooks/useUserResume';
import JobCard from '@/components/vagas/JobCard';
import AnalysisModal from '@/components/vagas/AnalysisModal';
import UploadResumeModal from '@/components/vagas/UploadResumeModal';

export default function VagasPage() {
  const t = useTranslations('vagas');
  const { data: session, status } = useSession();
  const router = useRouter();
  const { hasResume, loading: resumeLoading, refresh: refreshResume } = useUserResume();

  // Debug: log user ID
  console.log('[VagasPage] User ID:', session?.user?.id);

  // Estados do formulário de busca
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  
  // Estados dos resultados
  const [results, setResults] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Estados dos modais
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Estados de geolocalização
  const [isLocating, setIsLocating] = useState(false);
  
  // Estados de notificação
  const [notification, setNotification] = useState<{type: 'danger' | 'warning' | 'info', message: string} | null>(null);
  
  const showNotification = useCallback((type: 'danger' | 'warning' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Redirecionar se não estiver autenticado
  if (status === 'unauthenticated') {
    router.replace('/');
    return null;
  }

  // Handler de busca com tratamento de erros melhorado
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) return;

    setIsLoading(true);
    setResults([]);
    setHasSearched(true);
    setNotification(null);

    try {
      const res = await fetch('/api/vagas/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm, location })
      });

      if (res.status === 401) {
        showNotification('warning', t('sessionExpired'));
        return;
      }
      
      if (res.status === 500) {
        showNotification('danger', t('serverError'));
        return;
      }

      if (!res.ok) {
        throw new Error('Erro na busca');
      }

      const data = await res.json();
      setResults(data.jobs || []);
    } catch (error) {
      console.error('[VagasPage] Erro na busca:', error);
      showNotification('danger', t('searchError'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handler de geolocalização
  const handleDetectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      showNotification('warning', t('geolocationNotAvailable'));
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding com OpenStreetMap/Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'pt-BR' } }
          );
          
          if (!res.ok) throw new Error('Erro no geocoding');
          
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || '';
          const state = data.address?.state || '';
          
          if (city && state) {
            setLocation(`${city}, ${state}`);
          } else if (city) {
            setLocation(city);
          } else {
            showNotification('warning', t('geolocationCityNotFound'));
          }
        } catch (err) {
          console.error('[VagasPage] Erro no reverse geocoding:', err);
          showNotification('warning', t('geolocationError'));
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error('[VagasPage] Erro ao obter geolocalização:', err);
        if (err.code === 1) {
          showNotification('warning', t('geolocationDenied'));
        } else {
          showNotification('warning', t('geolocationError'));
        }
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, [t, showNotification]);

  // Handler para ver análise
  const handleViewAnalysis = async (job: Job) => {
    if (!hasResume) {
      setShowUploadModal(true);
      return;
    }

    setSelectedJob(job);
    setShowAnalysisModal(true);
    setIsAnalysisLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/vagas/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          jobSkills: job.skills_required
        })
      });

      if (!res.ok) {
        throw new Error('Erro na análise');
      }

      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('[VagasPage] Erro na análise:', error);
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  // Handler para abrir modal de upload
  const handleLoadResume = () => {
    setShowUploadModal(true);
  };

  // Handler após upload bem-sucedido
  const handleUploadSuccess = async () => {
    await refreshResume();
    // Re-buscar vagas se já houver uma busca ativa
    if (results.length > 0) {
      setIsLoading(true);
      try {
        const res = await fetch('/api/vagas/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchTerm, location })
        });

        if (res.ok) {
          const data = await res.json();
          setResults(data.jobs || []);
        }
      } catch (error) {
        console.error('[VagasPage] Erro ao re-buscar:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fechar modais
  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
    setSelectedJob(null);
    setAnalysis(null);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  if (status === 'loading' || resumeLoading) {
    return (
      <main className="section">
        <div className="container">
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-spinner fa-pulse fa-2x"></i>
            </span>
            <p className="mt-3">{t('loading')}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>

        {/* Notificação */}
        {notification && (
          <div className={`notification is-${notification.type} mb-4`}>
            <button className="delete" onClick={() => setNotification(null)}></button>
            {notification.message}
          </div>
        )}

        {/* Formulário de Busca */}
        <div className="box">
          <form onSubmit={handleSearch}>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="search-term">
                    {t('jobLabel')}
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="search-term"
                      className="input"
                      type="text"
                      placeholder={t('jobPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="icon is-left">
                      <i className="fas fa-briefcase"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="search-location">
                    {t('locationLabel')}
                  </label>
                  <div className="field has-addons">
                    <div className="control is-expanded has-icons-left">
                      <input
                        id="search-location"
                        className="input"
                        type="text"
                        placeholder={t('locationPlaceholder')}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className={`button is-light ${isLocating ? 'is-loading' : ''}`}
                        onClick={handleDetectLocation}
                        disabled={isLocating}
                        title={t('detectLocation')}
                      >
                        <span className="icon">
                          <i className="fas fa-crosshairs"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                  <span>{t('searchButton')}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Indicador de ordenação */}
        {results.length > 0 && (
          <div className="notification is-info is-light">
            <span className="icon">
              <i className="fas fa-info-circle"></i>
            </span>
            <span className="ml-2">
              {hasResume ? t('sortedByMatch') : t('sortedByRelevance')}
            </span>
          </div>
        )}

        {/* Barra de progresso durante busca */}
        {isLoading && (
          <progress className="progress is-primary" max="100"></progress>
        )}

        {/* Lista de Vagas */}
        <section aria-label="Resultados da busca">
          {results.length > 0 ? (
            <div className="columns is-multiline">
              {results.map((job) => (
                <div key={job.id} className="column is-full">
                  <JobCard
                    job={job}
                    hasResume={hasResume}
                    onViewAnalysis={handleViewAnalysis}
                    onLoadResume={handleLoadResume}
                  />
                </div>
              ))}
            </div>
          ) : (
            !isLoading && hasSearched && (
              <div className="notification is-warning is-light has-text-centered">
                <span className="icon is-large">
                  <i className="fas fa-exclamation-circle fa-2x"></i>
                </span>
                <p className="mt-3">{t('noResultsForTerm', { term: searchTerm })}</p>
              </div>
            )
          )}
        </section>
      </div>

      {/* Modais */}
      <AnalysisModal
        isOpen={showAnalysisModal}
        onClose={closeAnalysisModal}
        analysis={analysis}
        isLoading={isAnalysisLoading}
      />

      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={closeUploadModal}
        onUploadSuccess={handleUploadSuccess}
      />
    </main>
  );
}
