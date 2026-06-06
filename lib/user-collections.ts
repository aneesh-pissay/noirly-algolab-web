import mongoose from 'mongoose';
import UserCurriculumProgress from '@/models/UserCurriculumProgress';
import UserSettings from '@/models/UserSettings';
import UserProgress from '@/models/UserProgress';
import { getDefaultCurriculumDoc } from '@/lib/curriculum-progress';
import type { LessonMeta } from '@/src/features/progress/progress.types';
import type { IUserCurriculumProgress } from '@/models/UserCurriculumProgress';

const LEVEL_TO_ID: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function toUserObjectId(userId: string): mongoose.Types.ObjectId {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user id');
  }
  return new mongoose.Types.ObjectId(userId);
}

/** Handle duplicate-key races when creating per-user curriculum progress. */
export async function ensureUserCurriculumProgress(userId: string) {
  const objectId = toUserObjectId(userId);

  let doc = await UserCurriculumProgress.findOne({ userId: objectId });
  if (doc) return doc;

  try {
    doc = await UserCurriculumProgress.create(getDefaultCurriculumDoc(objectId));
    return doc;
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as { code?: number }).code === 11000) {
      const existing = await UserCurriculumProgress.findOne({ userId: objectId });
      if (existing) return existing;
    }
    throw error;
  }
}

/** Ensure default settings exist (matches /api/user/settings behaviour). */
export async function ensureUserSettings(userId: string) {
  const objectId = toUserObjectId(userId);

  let settings = await UserSettings.findOne({ userId: objectId });
  if (settings) return settings;

  // Legacy docs may have userId stored as a plain string
  settings = await UserSettings.findOne({ userId: userId as unknown as mongoose.Types.ObjectId });
  if (settings) {
    settings.userId = objectId;
    await settings.save();
    return settings;
  }

  try {
    settings = await UserSettings.create({ userId: objectId });
    return settings;
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as { code?: number }).code === 11000) {
      const existing = await UserSettings.findOne({ userId: objectId });
      if (existing) return existing;
    }
    throw error;
  }
}

/** Persist settings fields atomically. */
export async function saveUserSettings(
  userId: string,
  updates: Record<string, unknown>
) {
  const objectId = toUserObjectId(userId);

  const doc = await UserSettings.findOneAndUpdate(
    { userId: objectId },
    { $set: updates, $setOnInsert: { userId: objectId } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  if (!doc) {
    throw new Error('Failed to save settings');
  }

  return doc;
}

/** Create all per-user collections on registration / first login. */
export async function initializeUserCollections(userId: string) {
  await Promise.all([ensureUserCurriculumProgress(userId), ensureUserSettings(userId)]);
}

/** Persist curriculum lesson state to MongoDB. */
export async function saveCurriculumProgress(
  userId: string,
  doc: IUserCurriculumProgress,
  docUpdates: Partial<IUserCurriculumProgress>
) {
  doc.set(docUpdates);
  await doc.save();
  return doc;
}

/** Mirror completion into legacy per-topic UserProgress collection. */
export async function syncLegacyTopicProgress(userId: string, lesson: LessonMeta) {
  const objectId = toUserObjectId(userId);

  await UserProgress.findOneAndUpdate(
    { userId: objectId, topicSlug: lesson.id },
    {
      $set: {
        levelId: LEVEL_TO_ID[lesson.level] ?? 1,
        topicTitle: lesson.title,
        status: 'completed',
        progress: 100,
        completedAt: new Date(),
        lastAccessedAt: new Date(),
      },
      $setOnInsert: {
        timeSpent: 0,
        attempts: 1,
        isBookmarked: false,
      },
    },
    { upsert: true, new: true, runValidators: true }
  );
}
