import type { Difficulty } from '@/app/data/curriculum';

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 45,
  Medium: 70,
  Hard: 95,
};

export interface LevelInfo {
  level: number;
  title: string;
  icon: string;
  xpTotal: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
  isMaxLevel: boolean;
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

export interface StreakInfo {
  days: number;
  label: string;
  bonusXp: number;
  isActiveToday: boolean;
}

/** Level thresholds — tuned for ~318 lessons (~20k+ total XP possible). */
const LEVEL_DEFINITIONS = [
  { level: 1, xpRequired: 0, title: 'Syntax Scout', icon: '🔰' },
  { level: 2, xpRequired: 90, title: 'Array Apprentice', icon: '📊' },
  { level: 3, xpRequired: 200, title: 'Pointer Padawan', icon: '👉' },
  { level: 4, xpRequired: 340, title: 'Loop Learner', icon: '🔁' },
  { level: 5, xpRequired: 520, title: 'Hash Explorer', icon: '🗂️' },
  { level: 6, xpRequired: 750, title: 'Stack Strategist', icon: '📚' },
  { level: 7, xpRequired: 1020, title: 'Queue Quester', icon: '🚶' },
  { level: 8, xpRequired: 1350, title: 'Tree Traverser', icon: '🌳' },
  { level: 9, xpRequired: 1750, title: 'Sort Specialist', icon: '⚡' },
  { level: 10, xpRequired: 2220, title: 'Search Savant', icon: '🔍' },
  { level: 11, xpRequired: 2780, title: 'Pattern Practitioner', icon: '🧩' },
  { level: 12, xpRequired: 3440, title: 'Graph Navigator', icon: '🕸️' },
  { level: 13, xpRequired: 4220, title: 'Recursion Ranger', icon: '🔄' },
  { level: 14, xpRequired: 5140, title: 'DP Designer', icon: '🧠' },
  { level: 15, xpRequired: 6220, title: 'Complexity Analyst', icon: '📐' },
  { level: 16, xpRequired: 7500, title: 'Interview Ready', icon: '💼' },
  { level: 17, xpRequired: 9000, title: 'Algo Architect', icon: '🏗️' },
  { level: 18, xpRequired: 10800, title: 'Master Coder', icon: '⭐' },
  { level: 19, xpRequired: 13000, title: 'Grandmaster', icon: '🏆' },
  { level: 20, xpRequired: 15600, title: 'Algo Legend', icon: '👑' },
] as const;

export const MAX_LEVEL = LEVEL_DEFINITIONS[LEVEL_DEFINITIONS.length - 1].level;

export function clampXpGain(xp: number, maxGain = 200): number {
  if (!Number.isFinite(xp)) return 0;
  const normalized = Math.floor(xp);
  if (normalized < 0) return 0;
  return Math.min(normalized, maxGain);
}

export function getQuizPerformance(score: number): {
  label: string;
  tier: LessonXpBreakdown['performanceTier'];
} {
  if (score >= 100) return { label: 'Flawless', tier: 'flawless' };
  if (score >= 90) return { label: 'Excellent', tier: 'excellent' };
  if (score >= 80) return { label: 'Solid', tier: 'solid' };
  return { label: 'Passed', tier: 'passed' };
}

export function getStreakBonus(streakDays: number): number {
  if (streakDays <= 0) return 0;
  if (streakDays === 1) return 3;
  if (streakDays < 7) return Math.min(5 + streakDays, 12);
  if (streakDays < 14) return 15;
  if (streakDays < 30) return 20;
  return 25;
}

export function getStreakInfo(streakDays: number, activeToday = true): StreakInfo {
  const days = Math.max(0, streakDays);
  let label = 'Start your streak today';
  if (days === 1) label = 'Day 1 — great start!';
  else if (days < 7) label = `Building momentum — ${days} days`;
  else if (days < 14) label = `Weekly warrior — ${days} days`;
  else if (days < 30) label = `Dedicated learner — ${days} days`;
  else label = `Unstoppable — ${days} days`;

  return {
    days,
    label,
    bonusXp: getStreakBonus(days),
    isActiveToday: activeToday,
  };
}

export function calculateLessonXp(
  difficulty: Difficulty,
  quizScore: number,
  streakDays: number
): LessonXpBreakdown {
  const safeScore = Math.max(70, Math.min(100, Math.round(quizScore)));
  const baseXp = XP_BY_DIFFICULTY[difficulty] ?? 45;
  const performance = getQuizPerformance(safeScore);

  // Quiz shapes 70%–100% of base into ~85%–125% multiplier
  const quizMultiplier = 0.85 + ((safeScore - 70) / 30) * 0.4;
  const quizAdjusted = Math.round(baseXp * quizMultiplier);
  const quizBonus = quizAdjusted - baseXp;

  // Perfect score flat bonus
  const perfectBonus = safeScore >= 100 ? 12 : safeScore >= 90 ? 6 : 0;

  const streakBonus = getStreakBonus(streakDays);
  const totalXp = clampXpGain(quizAdjusted + perfectBonus + streakBonus);

  return {
    baseXp,
    quizBonus: quizBonus + perfectBonus,
    streakBonus,
    totalXp,
    quizScore: safeScore,
    performanceLabel: performance.label,
    performanceTier: performance.tier,
  };
}

export function calculateLevelFromXp(xp: number): number {
  return getLevelInfo(xp).level;
}

export function getLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  let current: (typeof LEVEL_DEFINITIONS)[number] = LEVEL_DEFINITIONS[0];

  for (const def of LEVEL_DEFINITIONS) {
    if (safeXp >= def.xpRequired) current = def;
    else break;
  }

  const currentIdx = LEVEL_DEFINITIONS.findIndex((d) => d.level === current.level);
  const next = LEVEL_DEFINITIONS[currentIdx + 1] ?? null;
  const xpIntoLevel = safeXp - current.xpRequired;
  const xpForNextLevel = next ? next.xpRequired - current.xpRequired : 0;
  const progressPercent = next
    ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100))
    : 100;

  return {
    level: current.level,
    title: current.title,
    icon: current.icon,
    xpTotal: safeXp,
    xpIntoLevel,
    xpForNextLevel,
    progressPercent,
    isMaxLevel: !next,
  };
}

export function xpToNextLevel(xp: number): { current: number; required: number; progress: number } {
  const info = getLevelInfo(xp);
  return {
    current: info.xpIntoLevel,
    required: info.xpForNextLevel || 1,
    progress: info.progressPercent,
  };
}
