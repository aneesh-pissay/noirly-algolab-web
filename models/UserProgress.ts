import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  
  // Level/Topic tracking
  levelId: number;
  topicSlug: string;
  topicTitle: string;
  
  // Progress status
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  
  // Completion details
  completedAt?: Date;
  timeSpent: number; // in seconds
  attempts: number;
  score?: number; // 0-100
  
  // Last interaction
  lastAccessedAt: Date;
  
  // Notes/bookmarks
  notes?: string;
  isBookmarked: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    levelId: {
      type: Number,
      required: true,
      min: 1,
      max: 17,
    },
    topicSlug: {
      type: String,
      required: true,
      trim: true,
    },
    topicTitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date,
    },
    timeSpent: {
      type: Number,
      default: 0,
      min: 0,
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
UserProgressSchema.index({ userId: 1, topicSlug: 1 }, { unique: true });
UserProgressSchema.index({ userId: 1, levelId: 1 });
UserProgressSchema.index({ userId: 1, status: 1 });

// Prevent model recompilation in development
const UserProgress: Model<IUserProgress> =
  mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);

export default UserProgress;
