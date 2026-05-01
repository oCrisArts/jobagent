'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface UseUserResumeReturn {
  hasResume: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useUserResume(): UseUserResumeReturn {
  const { data: session, status } = useSession();
  const [hasResume, setHasResume] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkResume = useCallback(async () => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/resume/check', { method: 'GET' });
      
      if (!res.ok) {
        console.error('[useUserResume] Erro ao verificar resume:', res.status);
        setHasResume(false);
        return;
      }

      const data = await res.json();
      setHasResume(data.hasResume ?? false);
    } catch (error) {
      console.error('[useUserResume] Erro inesperado:', error);
      setHasResume(false);
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    checkResume();
  }, [checkResume]);

  const refresh = useCallback(async () => {
    await checkResume();
  }, [checkResume]);

  return {
    hasResume,
    loading,
    refresh
  };
}
