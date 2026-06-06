import type { Difficulty, Level, TrackId } from '@/app/data/curriculum';

export type LessonStatusType = 'locked' | 'available' | 'current' | 'completed';

export interface LessonMeta {
  id: string;
  title: string;
  algorithmId: string;
  track: TrackId;
  category: string;
  level: Level;
  difficulty: Difficulty;
  time: string;
  space: string;
  xp: number;
  next: string | null;
  prev: string | null;
}

export interface UserProgress {
  userId?: string;
  completedLessons: string[];
  unlockedLessons: string[];
  unlockedTiers: string[];
  unlockedTopics: string[];
  currentLesson: string | null;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;
  recentlyCompleted: string[];
}

export interface LessonXpBreakdown {
  baseXp: number;
  quizBonus: number;
  streakBonus: number;
  totalXp: number;
  quizScore: number;
  performanceLabel: string;
  performanceTier: 'flawless' | 'excellent' | 'solid' | 'passed';
}

export interface CompleteLessonResult {
  lesson: LessonMeta;
  xpEarned: number;
  xpBreakdown: LessonXpBreakdown | null;
  leveledUp: boolean;
  previousLevel: number;
  currentLevel: number;
  levelTitle: string;
  nextLesson: LessonMeta | null;
  topicProgress: { completed: number; total: number; topicName: string };
  newlyUnlocked: string[];
}

/** @deprecated Use lib/gamification XP_BY_DIFFICULTY */
export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 45,
  Medium: 70,
  Hard: 95,
};
