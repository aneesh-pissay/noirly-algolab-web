export const lightColors = {
  background: '#FFFFFF',
  surface: '#F8FAFC',
  primary: '#0284C7',
} as const;

export const darkColors = {
  background: '#0B0F19',
  surface: '#111827',
  primary: '#38BDF8',
} as const;

/** Full semantic palette derived from the core 3 colors */
export interface ThemePalette {
  background: string;
  surface: string;
  surfaceHigh: string;
  surfaceDim: string;
  primary: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  tertiary: string;
  onPrimary: string;
}

export const lightPalette: ThemePalette = {
  background: lightColors.background,
  surface: lightColors.surface,
  surfaceHigh: '#F1F5F9',
  surfaceDim: '#FFFFFF',
  primary: lightColors.primary,
  onSurface: '#0F172A',
  onSurfaceVariant: '#64748B',
  outline: '#CBD5E1',
  outlineVariant: '#E2E8F0',
  tertiary: '#EA580C',
  onPrimary: '#FFFFFF',
};

export const darkPalette: ThemePalette = {
  background: darkColors.background,
  surface: darkColors.surface,
  surfaceHigh: '#1F2937',
  surfaceDim: darkColors.background,
  primary: darkColors.primary,
  onSurface: '#F1F5F9',
  onSurfaceVariant: '#94A3B8',
  outline: '#475569',
  outlineVariant: '#334155',
  tertiary: '#FBBF24',
  onPrimary: '#0B0F19',
};
