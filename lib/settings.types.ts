export type ThemeMode = 'dark' | 'light' | 'auto';
export type CodeLanguage = 'javascript' | 'python' | 'java' | 'cpp';
export type ProfileVisibility = 'public' | 'private';
export type FontSize = 'small' | 'medium' | 'large';

export interface EmailNotifications {
  courseUpdates: boolean;
  achievements: boolean;
  weeklyProgress: boolean;
  marketing: boolean;
}

export interface ClientSettings {
  theme: ThemeMode;
  language: string;
  animationSpeed: number;
  codeLanguage: CodeLanguage;
  emailNotifications: EmailNotifications;
  profileVisibility: ProfileVisibility;
  showProgress: boolean;
  showAchievements: boolean;
  dailyGoal: number;
  reminderTime: string;
  autoPlayVideos: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: FontSize;
}

export type ClientSettingsPatch = Partial<Omit<ClientSettings, 'emailNotifications'>> & {
  emailNotifications?: Partial<EmailNotifications>;
};

export const DEFAULT_CLIENT_SETTINGS: ClientSettings = {
  theme: 'dark',
  language: 'en',
  animationSpeed: 1,
  codeLanguage: 'javascript',
  emailNotifications: {
    courseUpdates: true,
    achievements: true,
    weeklyProgress: true,
    marketing: false,
  },
  profileVisibility: 'public',
  showProgress: true,
  showAchievements: true,
  dailyGoal: 30,
  reminderTime: '',
  autoPlayVideos: true,
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
};
