import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserAchievement extends Document {
  userId: mongoose.Types.ObjectId;
  
  // Achievement details
  achievementId: string;
  title: string;
  description: string;
  category: 'completion' | 'streak' | 'speed' | 'mastery' | 'special';
  icon: string;
  
  // Progress
  progress: number; // 0-100
  isUnlocked: boolean;
  unlockedAt?: Date;
  
  // Rewards
  xpReward: number;
  
  // Metadata
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserAchievementSchema = new Schema<IUserAchievement>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    achievementId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['completion', 'streak', 'speed', 'mastery', 'special'],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },
    unlockedAt: {
      type: Date,
    },
    xpReward: {
      type: Number,
      default: 0,
      min: 0,
    },
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });
UserAchievementSchema.index({ userId: 1, isUnlocked: 1 });

// Prevent model recompilation in development
const UserAchievement: Model<IUserAchievement> =
  mongoose.models.UserAchievement ||
  mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema);

export default UserAchievement;
