'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useProgressStore } from '@/src/features/progress';

export default function ProgressSync() {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const loadProgress = useProgressStore((s) => s.loadProgress);
  const reset = useProgressStore((s) => s.reset);

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      loadProgress();
    } else {
      reset();
    }
  }, [isAuthenticated, loading, loadProgress, reset]);

  return null;
}
