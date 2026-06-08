import { noirlyTheme } from './noirly-theme';

const { dark: darkTokens, light: lightTokens } = noirlyTheme;

export const lightColors = {
  background: lightTokens.background,
  surface: lightTokens.surface,
  primary: lightTokens.primary,
} as const;

export const darkColors = {
  background: darkTokens.background,
  surface: darkTokens.surface,
  primary: darkTokens.primary,
} as const;

/** Full semantic palette derived from noirlyTheme */
export interface ThemePalette {
  background: string;
  surface: string;
  surfaceHigh: string;
  surfaceDim: string;
  primary: string;
  primaryHover: string;
  primarySoft: string;
  onSurface: string;
  onSurfaceVariant: string;
  textMuted: string;
  outline: string;
  outlineVariant: string;
  tertiary: string;
  onPrimary: string;
  success: string;
  warning: string;
  error: string;
  icon: string;
  iconActive: string;
}

export const lightPalette: ThemePalette = {
  background: lightTokens.background,
  surface: lightTokens.surface,
  surfaceHigh: lightTokens.surfaceVariant,
  surfaceDim: lightTokens.surface,
  primary: lightTokens.primary,
  primaryHover: lightTokens.primaryHover,
  primarySoft: lightTokens.primarySoft,
  onSurface: lightTokens.textPrimary,
  onSurfaceVariant: lightTokens.textSecondary,
  textMuted: lightTokens.textMuted,
  outline: lightTokens.border,
  outlineVariant: lightTokens.divider,
  tertiary: lightTokens.warning,
  onPrimary: lightTokens.textPrimary,
  success: lightTokens.success,
  warning: lightTokens.warning,
  error: lightTokens.error,
  icon: lightTokens.icon,
  iconActive: lightTokens.iconActive,
};

export const darkPalette: ThemePalette = {
  background: darkTokens.background,
  surface: darkTokens.surface,
  surfaceHigh: darkTokens.surfaceVariant,
  surfaceDim: darkTokens.background,
  primary: darkTokens.primary,
  primaryHover: darkTokens.primaryHover,
  primarySoft: darkTokens.primarySoft,
  onSurface: darkTokens.textPrimary,
  onSurfaceVariant: darkTokens.textSecondary,
  textMuted: darkTokens.textMuted,
  outline: darkTokens.border,
  outlineVariant: darkTokens.divider,
  tertiary: darkTokens.warning,
  onPrimary: darkTokens.background,
  success: darkTokens.success,
  warning: darkTokens.warning,
  error: darkTokens.error,
  icon: darkTokens.icon,
  iconActive: darkTokens.iconActive,
};
