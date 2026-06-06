'use client';

import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { useSettings } from '../contexts/SettingsContext';

export default function SettingsSync() {
  const { isAuthenticated, loading, user } = useAppSelector((state) => state.auth);
  const { loadSettings, resetSettings } = useSettings();
  const loadedForUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated && user?.id) {
      const userId = String(user.id);
      if (loadedForUserRef.current !== userId) {
        loadedForUserRef.current = userId;
        void loadSettings();
      }
    } else {
      loadedForUserRef.current = null;
      resetSettings();
    }
  }, [isAuthenticated, loading, user?.id, loadSettings, resetSettings]);

  return null;
}
