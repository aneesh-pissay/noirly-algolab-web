import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserSettings extends Document {
  userId: mongoose.Types.ObjectId;
  
  // Appearance
  theme: 'dark' | 'light' | 'auto';
  language: string;
  
  // Notifications
  emailNotifications: {
    courseUpdates: boolean;
    achievements: boolean;
    weeklyProgress: boolean;
    marketing: boolean;
  };
  
  // Privacy
  profileVisibility: 'public' | 'private';
  showProgress: boolean;
  showAchievements: boolean;
  
  // Learning preferences
  dailyGoal: number; // minutes per day
  reminderTime?: string; // HH:MM format
  autoPlayVideos: boolean;
  playbackSpeed: number; // 0.5, 0.75, 1, 1.25, 1.5, 2
  codeLanguage: 'javascript' | 'python' | 'java' | 'cpp';
  
  // Accessibility
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    theme: {
      type: String,
      enum: ['dark', 'light', 'auto'],
      default: 'dark',
    },
    language: {
      type: String,
      default: 'en',
    },
    emailNotifications: {
      courseUpdates: {
        type: Boolean,
        default: true,
      },
      achievements: {
        type: Boolean,
        default: true,
      },
      weeklyProgress: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
    },
    profileVisibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    showProgress: {
      type: Boolean,
      default: true,
    },
    showAchievements: {
      type: Boolean,
      default: true,
    },
    dailyGoal: {
      type: Number,
      default: 30,
      min: 5,
      max: 480,
    },
    reminderTime: {
      type: String,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    autoPlayVideos: {
      type: Boolean,
      default: true,
    },
    playbackSpeed: {
      type: Number,
      default: 1,
      enum: [0.5, 0.75, 1, 1.25, 1.5, 2],
    },
    codeLanguage: {
      type: String,
      enum: ['javascript', 'python', 'java', 'cpp'],
      default: 'javascript',
    },
    reducedMotion: {
      type: Boolean,
      default: false,
    },
    highContrast: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const UserSettings: Model<IUserSettings> =
  mongoose.models.UserSettings || mongoose.model<IUserSettings>('UserSettings', UserSettingsSchema);

export default UserSettings;
