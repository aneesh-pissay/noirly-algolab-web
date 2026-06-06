import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserCurriculumProgress extends Document {
  userId: mongoose.Types.ObjectId;
  completedLessons: string[];
  unlockedLessons: string[];
  unlockedTiers: string[];
  unlockedTopics: string[];
  currentLesson: string | null;
  recentlyCompleted: string[];
  updatedAt: Date;
  createdAt: Date;
}

const UserCurriculumProgressSchema = new Schema<IUserCurriculumProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    completedLessons: {
      type: [String],
      default: [],
    },
    unlockedLessons: {
      type: [String],
      default: [],
    },
    unlockedTiers: {
      type: [String],
      default: [],
    },
    unlockedTopics: {
      type: [String],
      default: [],
    },
    currentLesson: {
      type: String,
      default: null,
    },
    recentlyCompleted: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'user_curriculum_progress',
  }
);

const UserCurriculumProgress: Model<IUserCurriculumProgress> =
  mongoose.models.UserCurriculumProgress ||
  mongoose.model<IUserCurriculumProgress>('UserCurriculumProgress', UserCurriculumProgressSchema);

export default UserCurriculumProgress;
