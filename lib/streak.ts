type DateLike = Date | string | null | undefined;

/** Local calendar day (midnight) for streak boundaries. */
function toLocalDayStart(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function calculateNextStreak(
  lastActiveDate: DateLike,
  currentStreak: number,
  now = new Date()
): {
  streak: number;
  shouldUpdateLastActiveDate: boolean;
} {
  const safeStreak = Math.max(0, currentStreak || 0);

  if (!lastActiveDate) {
    return { streak: 1, shouldUpdateLastActiveDate: true };
  }

  const last = new Date(lastActiveDate);
  if (Number.isNaN(last.getTime())) {
    return { streak: 1, shouldUpdateLastActiveDate: true };
  }

  const dayDiff = Math.round(
    (toLocalDayStart(now) - toLocalDayStart(last)) / (24 * 60 * 60 * 1000)
  );

  // Same calendar day — keep streak, but at least 1 if the user was active today.
  if (dayDiff === 0) {
    return { streak: Math.max(1, safeStreak), shouldUpdateLastActiveDate: false };
  }

  // Consecutive day — increment (or start at 1 if streak was somehow 0).
  if (dayDiff === 1) {
    return {
      streak: safeStreak > 0 ? safeStreak + 1 : 1,
      shouldUpdateLastActiveDate: true,
    };
  }

  // Missed one or more days — restart.
  return { streak: 1, shouldUpdateLastActiveDate: true };
}

export function getStreakUserUpdates(
  lastActiveDate: DateLike,
  currentStreak: number,
  now = new Date()
): { streak: number; lastActiveDate?: Date } {
  const result = calculateNextStreak(lastActiveDate, currentStreak, now);
  return {
    streak: result.streak,
    ...(result.shouldUpdateLastActiveDate ? { lastActiveDate: now } : {}),
  };
}

export function shouldPersistStreakUpdate(
  user: { streak?: number; lastActiveDate?: Date | null },
  result: ReturnType<typeof calculateNextStreak>
): boolean {
  return (
    result.streak !== (user.streak ?? 0) ||
    result.shouldUpdateLastActiveDate
  );
}

/** Sync streak when user has learning activity (XP or completed lessons). */
export async function syncUserStreakIfNeeded(
  user: { streak?: number; lastActiveDate?: Date | null; xp?: number },
  hasLearningActivity: boolean
): Promise<{ streak: number; lastActiveDate?: Date } | null> {
  if (!hasLearningActivity) return null;

  const result = calculateNextStreak(user.lastActiveDate, user.streak ?? 0);
  if (!shouldPersistStreakUpdate(user, result)) {
    return null;
  }

  return getStreakUserUpdates(user.lastActiveDate, user.streak ?? 0);
}
