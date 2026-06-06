import type { IUserSettings } from '@/models/UserSettings';
import {
  DEFAULT_CLIENT_SETTINGS,
  type ClientSettings,
  type CodeLanguage,
  type EmailNotifications,
  type FontSize,
  type ProfileVisibility,
  type ThemeMode,
} from '@/lib/settings.types';

export type { ThemeMode, CodeLanguage, ClientSettings, EmailNotifications, FontSize, ProfileVisibility };
export { DEFAULT_CLIENT_SETTINGS };

const CODE_LANGUAGES: CodeLanguage[] = ['javascript', 'python', 'java', 'cpp'];
const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;
const THEMES: ThemeMode[] = ['dark', 'light', 'auto'];
const FONT_SIZES: FontSize[] = ['small', 'medium', 'large'];
const VISIBILITIES: ProfileVisibility[] = ['public', 'private'];

function normalizeTheme(theme: IUserSettings['theme'] | undefined): ThemeMode {
  return THEMES.includes(theme as ThemeMode) ? (theme as ThemeMode) : 'dark';
}

function normalizeSpeed(speed: number | undefined): number {
  if (typeof speed !== 'number' || !Number.isFinite(speed)) return 1;
  return PLAYBACK_SPEEDS.includes(speed as (typeof PLAYBACK_SPEEDS)[number]) ? speed : 1;
}

function normalizeCodeLanguage(value: string | undefined): CodeLanguage {
  return CODE_LANGUAGES.includes(value as CodeLanguage) ? (value as CodeLanguage) : 'javascript';
}

function normalizeEmailNotifications(value: IUserSettings['emailNotifications'] | undefined): EmailNotifications {
  return {
    courseUpdates: value?.courseUpdates ?? DEFAULT_CLIENT_SETTINGS.emailNotifications.courseUpdates,
    achievements: value?.achievements ?? DEFAULT_CLIENT_SETTINGS.emailNotifications.achievements,
    weeklyProgress: value?.weeklyProgress ?? DEFAULT_CLIENT_SETTINGS.emailNotifications.weeklyProgress,
    marketing: value?.marketing ?? DEFAULT_CLIENT_SETTINGS.emailNotifications.marketing,
  };
}

export function toClientSettings(doc: IUserSettings): ClientSettings {
  return {
    theme: normalizeTheme(doc.theme),
    language: doc.language || 'en',
    animationSpeed: normalizeSpeed(doc.playbackSpeed),
    codeLanguage: normalizeCodeLanguage(doc.codeLanguage),
    emailNotifications: normalizeEmailNotifications(doc.emailNotifications),
    profileVisibility: VISIBILITIES.includes(doc.profileVisibility as ProfileVisibility)
      ? (doc.profileVisibility as ProfileVisibility)
      : 'public',
    showProgress: doc.showProgress ?? true,
    showAchievements: doc.showAchievements ?? true,
    dailyGoal: typeof doc.dailyGoal === 'number' ? doc.dailyGoal : 30,
    reminderTime: doc.reminderTime ?? '',
    autoPlayVideos: doc.autoPlayVideos ?? true,
    reducedMotion: doc.reducedMotion ?? false,
    highContrast: doc.highContrast ?? false,
    fontSize: FONT_SIZES.includes(doc.fontSize as FontSize) ? (doc.fontSize as FontSize) : 'medium',
  };
}

export function toDbUpdates(patch: import('@/lib/settings.types').ClientSettingsPatch): Record<string, unknown> {
  const updates: Record<string, unknown> = {};

  if (patch.theme !== undefined) updates.theme = patch.theme;
  if (patch.language !== undefined) updates.language = patch.language;
  if (patch.animationSpeed !== undefined) updates.playbackSpeed = patch.animationSpeed;
  if (patch.codeLanguage !== undefined) updates.codeLanguage = patch.codeLanguage;
  if (patch.profileVisibility !== undefined) updates.profileVisibility = patch.profileVisibility;
  if (patch.showProgress !== undefined) updates.showProgress = patch.showProgress;
  if (patch.showAchievements !== undefined) updates.showAchievements = patch.showAchievements;
  if (patch.dailyGoal !== undefined) updates.dailyGoal = patch.dailyGoal;
  if (patch.reminderTime !== undefined) updates.reminderTime = patch.reminderTime || undefined;
  if (patch.autoPlayVideos !== undefined) updates.autoPlayVideos = patch.autoPlayVideos;
  if (patch.reducedMotion !== undefined) updates.reducedMotion = patch.reducedMotion;
  if (patch.highContrast !== undefined) updates.highContrast = patch.highContrast;
  if (patch.fontSize !== undefined) updates.fontSize = patch.fontSize;

  if (patch.emailNotifications) {
    for (const [key, value] of Object.entries(patch.emailNotifications)) {
      if (value !== undefined) {
        updates[`emailNotifications.${key}`] = value;
      }
    }
  }

  return updates;
}
