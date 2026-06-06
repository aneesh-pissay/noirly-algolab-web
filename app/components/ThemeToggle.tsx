'use client';

import { useSettings } from '../contexts/SettingsContext';

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme, isReady } = useSettings();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!isReady}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-high text-on-surface transition hover:border-primary/40 hover:bg-primary/10 disabled:opacity-50"
    >
      <span className="material-symbols-outlined text-[20px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
