import type { IUserCurriculumProgress } from '@/models/UserCurriculumProgress';

import type { IUser } from '@/models/User';

import {

  calculateLevel,

  getInitialProgress,

  getLessonById,

  getLessonMeta,

  getTopicProgress,

  normalizeProgressState,

  resolveUnlocksOnComplete,

} from '@/src/features/progress/progress.utils';

import type { CompleteLessonResult, UserProgress } from '@/src/features/progress/progress.types';

import { getStreakUserUpdates } from '@/lib/streak';
import { calculateLessonXp, getLevelInfo } from '@/lib/gamification';



export interface AggregatedUserProgress extends UserProgress {

  userId: string;

}



function docToLessonState(doc: IUserCurriculumProgress): Omit<UserProgress, 'xp' | 'level' | 'streak' | 'lastActiveDate'> {

  return {

    completedLessons: doc.completedLessons ?? [],

    unlockedLessons: doc.unlockedLessons ?? [],

    unlockedTiers: doc.unlockedTiers ?? [],

    unlockedTopics: doc.unlockedTopics ?? [],

    currentLesson: doc.currentLesson ?? null,

    recentlyCompleted: doc.recentlyCompleted ?? [],

  };

}



export function buildAggregatedProgress(user: IUser, doc: IUserCurriculumProgress): AggregatedUserProgress {

  const lessonState = docToLessonState(doc);

  const xp = user.xp ?? 0;

  return {

    userId: String(user._id),

    ...normalizeProgressState({

      ...lessonState,

      xp,

      level: calculateLevel(xp),

      streak: user.streak ?? 0,

      lastActiveDate: user.lastActiveDate ? user.lastActiveDate.toISOString().slice(0, 10) : null,

    }),

  };

}



export function getDefaultCurriculumDoc(userId: import('mongoose').Types.ObjectId | string) {

  const initial = getInitialProgress();

  return {

    userId,

    completedLessons: initial.completedLessons,

    unlockedLessons: initial.unlockedLessons,

    unlockedTiers: initial.unlockedTiers,

    unlockedTopics: initial.unlockedTopics,

    currentLesson: initial.currentLesson,

    recentlyCompleted: initial.recentlyCompleted,

  };

}



export function completeLessonForUser(

  user: IUser,

  doc: IUserCurriculumProgress,

  lessonIdOrAlgorithmId: string,

  quizScore = 100

): {

  progress: AggregatedUserProgress;

  result: CompleteLessonResult;

  userUpdates: Partial<IUser>;

  docUpdates: Partial<IUserCurriculumProgress>;

} | null {

  const lesson = getLessonById(lessonIdOrAlgorithmId);

  if (!lesson) return null;



  const current = buildAggregatedProgress(user, doc);



  if (current.completedLessons.includes(lesson.id)) {

    const topicProgress = getTopicProgress(lesson.track, lesson.level, lesson.category, current.completedLessons);

    const levelInfo = getLevelInfo(current.xp);

    return {

      progress: current,

      result: {

        lesson,

        xpEarned: 0,

        xpBreakdown: null,

        leveledUp: false,

        previousLevel: levelInfo.level,

        currentLevel: levelInfo.level,

        levelTitle: levelInfo.title,

        nextLesson: lesson.next ? getLessonMeta(lesson.next) : null,

        topicProgress: { ...topicProgress, topicName: lesson.category },

        newlyUnlocked: [],

      },

      userUpdates: {},

      docUpdates: {},

    };

  }



  const unlocks = resolveUnlocksOnComplete(lesson.id, current);

  const streakUpdates = getStreakUserUpdates(user.lastActiveDate, user.streak ?? 0);

  const previousLevelInfo = getLevelInfo(current.xp);

  const xpBreakdown = calculateLessonXp(lesson.difficulty, quizScore, streakUpdates.streak);

  const lessonXp = xpBreakdown.totalXp;

  const newXp = current.xp + lessonXp;

  const newLevelInfo = getLevelInfo(newXp);

  const recentlyCompleted = [lesson.id, ...current.recentlyCompleted.filter((id) => id !== lesson.id)].slice(0, 8);



  const nextCurrentLesson =

    lesson.next ??

    unlocks.newlyUnlocked.find((id) => Boolean(getLessonMeta(id))) ??

    unlocks.unlockedLessons.find((id) => !current.completedLessons.includes(id) && id !== lesson.id) ??

    null;



  const lastActiveDateStr = streakUpdates.lastActiveDate

    ? streakUpdates.lastActiveDate.toISOString().slice(0, 10)

    : current.lastActiveDate;



  const updatedLessonState: UserProgress = {

    ...current,

    completedLessons: [...current.completedLessons, lesson.id],

    unlockedLessons: unlocks.unlockedLessons,

    unlockedTiers: unlocks.unlockedTiers,

    unlockedTopics: unlocks.unlockedTopics,

    currentLesson: nextCurrentLesson,

    recentlyCompleted,

    xp: newXp,

    level: calculateLevel(newXp),

    streak: streakUpdates.streak,

    lastActiveDate: lastActiveDateStr,

  };



  const topicProgress = getTopicProgress(

    lesson.track,

    lesson.level,

    lesson.category,

    updatedLessonState.completedLessons

  );



  return {

    progress: { userId: String(user._id), ...updatedLessonState },

    result: {

      lesson,

      xpEarned: lessonXp,

      xpBreakdown,

      leveledUp: newLevelInfo.level > previousLevelInfo.level,

      previousLevel: previousLevelInfo.level,

      currentLevel: newLevelInfo.level,

      levelTitle: newLevelInfo.title,

      nextLesson: lesson.next ? getLessonMeta(lesson.next) : null,

      topicProgress: { ...topicProgress, topicName: lesson.category },

      newlyUnlocked: unlocks.newlyUnlocked,

    },

    userUpdates: {

      xp: newXp,

      currentLevel: calculateLevel(newXp),

      streak: streakUpdates.streak,

      ...(streakUpdates.lastActiveDate ? { lastActiveDate: streakUpdates.lastActiveDate } : {}),

    },

    docUpdates: {

      completedLessons: updatedLessonState.completedLessons,

      unlockedLessons: updatedLessonState.unlockedLessons,

      unlockedTiers: updatedLessonState.unlockedTiers,

      unlockedTopics: updatedLessonState.unlockedTopics,

      currentLesson: updatedLessonState.currentLesson,

      recentlyCompleted: updatedLessonState.recentlyCompleted,

    },

  };

}


