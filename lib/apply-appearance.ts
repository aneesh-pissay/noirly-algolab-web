import type { ClientSettings, ThemeMode } from '@/lib/settings.types';

export function resolveTheme(theme: ThemeMode): 'dark' | 'light' {
  if (theme === 'auto' && typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme === 'light' ? 'light' : 'dark';
}

export function applyAppearance(settings: ClientSettings) {
  if (typeof document === 'undefined') return;

  const resolved = resolveTheme(settings.theme);
  const root = document.documentElement;

  root.classList.remove('dark', 'light');
  root.classList.add(resolved);
  root.dataset.fontSize = settings.fontSize;
  root.dataset.reducedMotion = String(settings.reducedMotion);
  root.dataset.highContrast = String(settings.highContrast);
}
