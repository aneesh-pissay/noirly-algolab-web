# Database Models & API Documentation

Complete user management system with MongoDB models for authentication, profiles, learning progress, achievements, and settings.

---

## 📊 Database Models

### 1. **User Model** (`models/User.ts`)

Core user authentication and profile data.

**Fields:**
```typescript
{
  // Authentication
  username: string (unique, 3-30 chars)
  email: string (unique, validated)
  password: string (hashed, min 6 chars)
  isVerified: boolean
  
  // Profile
  firstName?: string
  lastName?: string
  avatar?: string (URL)
  bio?: string (max 500 chars)
  
  // Learning Progress
  currentLevel: number (1-17)
  xp: number (experience points)
  streak: number (consecutive days)
  lastActiveDate?: Date
  
  // Authorization
  role: 'user' | 'admin' | 'instructor'
  
  // Auth Tokens
  verificationToken?: string
  verificationTokenExpiry?: Date
  resetPasswordToken?: string
  resetPasswordExpiry?: Date
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}
```

---

### 2. **UserProgress Model** (`models/UserProgress.ts`)

Tracks learning progress for each topic/level.

**Fields:**
```typescript
{
  userId: ObjectId (ref: User)
  
  // Topic identification
  levelId: number (1-17)
  topicSlug: string (e.g., "bubble-sort")
  topicTitle: string
  
  // Progress tracking
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number (0-100)
  completedAt?: Date
  timeSpent: number (seconds)
  attempts: number
  score?: number (0-100)
  
  // User interaction
  lastAccessedAt: Date
  notes?: string (max 2000 chars)
  isBookmarked: boolean
}
```

**Indexes:**
- `{ userId, topicSlug }` (unique)
- `{ userId, levelId }`
- `{ userId, status }`

---

### 3. **UserAchievement Model** (`models/UserAchievement.ts`)

Gamification system for user achievements and badges.

**Fields:**
```typescript
{
  userId: ObjectId (ref: User)
  
  // Achievement details
  achievementId: string
  title: string
  description: string
  category: 'completion' | 'streak' | 'speed' | 'mastery' | 'special'
  icon: string
  
  // Progress
  progress: number (0-100)
  isUnlocked: boolean
  unlockedAt?: Date
  
  // Rewards
  xpReward: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}
```

**Indexes:**
- `{ userId, achievementId }` (unique)
- `{ userId, isUnlocked }`

---

### 4. **UserSettings Model** (`models/UserSettings.ts`)

User preferences and application settings.

**Fields:**
```typescript
{
  userId: ObjectId (ref: User, unique)
  
  // Appearance
  theme: 'dark' | 'light' | 'auto'
  language: string
  
  // Notifications
  emailNotifications: {
    courseUpdates: boolean
    achievements: boolean
    weeklyProgress: boolean
    marketing: boolean
  }
  
  // Privacy
  profileVisibility: 'public' | 'private'
  showProgress: boolean
  showAchievements: boolean
  
  // Learning preferences
  dailyGoal: number (minutes, 5-480)
  reminderTime?: string (HH:MM format)
  autoPlayVideos: boolean
  playbackSpeed: number (0.5, 0.75, 1, 1.25, 1.5, 2)
  
  // Accessibility
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
}
```

---

## 🔌 API Endpoints

All endpoints require `Authorization: Bearer <token>` header.

### **Authentication**

#### `POST /api/auth/register`
Register a new user.
```json
Request:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Registration successful",
  "userId": "..."
}
```

#### `POST /api/auth/login`
Login and get JWT token.
```json
Request:
{
  "emailOrUsername": "johndoe",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGci...",
  "user": { ...enhanced user object... }
}
```

#### `GET /api/auth/me`
Get current authenticated user.
```json
Response:
{
  "user": {
    "id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "currentLevel": 1,
    "xp": 0,
    "streak": 0,
    ...
  }
}
```

#### `POST /api/auth/logout`
Logout (clears cookie if used).

---

### **User Profile**

#### `GET /api/user/profile`
Get user profile.
```json
Response:
{
  "profile": {
    "id": "...",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://...",
    "bio": "Learning DSA!",
    "currentLevel": 5,
    "xp": 1250,
    "streak": 7,
    ...
  }
}
```

#### `PATCH /api/user/profile`
Update user profile.
```json
Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "https://...",
  "bio": "Passionate about algorithms"
}

Response:
{
  "message": "Profile updated successfully",
  "profile": { ...updated profile... }
}
```

---

### **User Settings**

#### `GET /api/user/settings`
Get user settings (creates defaults if none exist).
```json
Response:
{
  "settings": {
    "theme": "dark",
    "dailyGoal": 30,
    "emailNotifications": { ... },
    ...
  }
}
```

#### `PATCH /api/user/settings`
Update user settings.
```json
Request:
{
  "theme": "light",
  "dailyGoal": 60,
  "emailNotifications": {
    "courseUpdates": true
  }
}

Response:
{
  "message": "Settings updated successfully",
  "settings": { ...updated settings... }
}
```

---

### **User Progress**

#### `GET /api/user/progress?levelId=1&topicSlug=bubble-sort`
Get learning progress (supports filtering).
```json
Response:
{
  "progress": [
    {
      "levelId": 1,
      "topicSlug": "bubble-sort",
      "topicTitle": "Bubble Sort",
      "status": "completed",
      "progress": 100,
      "score": 95,
      "timeSpent": 1200,
      "attempts": 2,
      "isBookmarked": true,
      ...
    }
  ]
}
```

#### `POST /api/user/progress`
Create or update progress.
```json
Request:
{
  "levelId": 1,
  "topicSlug": "bubble-sort",
  "topicTitle": "Bubble Sort",
  "status": "in-progress",
  "progress": 50,
  "timeSpent": 300,
  "score": 75
}

Response:
{
  "message": "Progress updated successfully",
  "progress": { ...updated progress... }
}
```

---

### **User Achievements**

#### `GET /api/user/achievements?unlocked=true`
Get achievements (filter by unlocked status).
```json
Response:
{
  "achievements": [
    {
      "achievementId": "first-completion",
      "title": "First Steps",
      "description": "Complete your first topic",
      "category": "completion",
      "icon": "emoji_events",
      "isUnlocked": true,
      "unlockedAt": "2026-06-04T...",
      "xpReward": 50,
      "rarity": "common"
    }
  ]
}
```

#### `POST /api/user/achievements`
Unlock an achievement.
```json
Request:
{
  "achievementId": "first-completion",
  "title": "First Steps",
  "description": "Complete your first topic",
  "category": "completion",
  "icon": "emoji_events",
  "xpReward": 50,
  "rarity": "common"
}

Response:
{
  "message": "Achievement unlocked!",
  "achievement": { ...achievement details... },
  "xpGained": 50
}
```

---

## 🎯 Usage Examples

### **Track Topic Progress**
```typescript
// When user starts a topic
await fetch('/api/user/progress', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    levelId: 1,
    topicSlug: 'bubble-sort',
    topicTitle: 'Bubble Sort',
    status: 'in-progress',
    progress: 0,
  }),
});

// Update progress as user learns
await fetch('/api/user/progress', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    levelId: 1,
    topicSlug: 'bubble-sort',
    topicTitle: 'Bubble Sort',
    progress: 75,
    timeSpent: 600, // Will increment
  }),
});

// Mark as completed
await fetch('/api/user/progress', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    levelId: 1,
    topicSlug: 'bubble-sort',
    topicTitle: 'Bubble Sort',
    status: 'completed',
    progress: 100,
    score: 95,
  }),
});
```

### **Update User Profile**
```typescript
const response = await fetch('/api/user/profile', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Full-stack developer learning algorithms',
  }),
});
```

### **Unlock Achievement**
```typescript
const response = await fetch('/api/user/achievements', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    achievementId: '7-day-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    category: 'streak',
    icon: 'local_fire_department',
    xpReward: 100,
    rarity: 'rare',
  }),
});
// User's XP automatically increases by xpReward amount
```

---

## 🔐 Redux Integration

Enhanced user interface in Redux store:

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  currentLevel: number;
  xp: number;
  streak: number;
  lastActiveDate?: string;
  role: 'user' | 'admin' | 'instructor';
  createdAt: string;
  updatedAt: string;
}
```

Access in components:
```typescript
import { useAppSelector } from '@/app/store/hooks';

const { user } = useAppSelector((state) => state.auth);
console.log(user.currentLevel, user.xp, user.streak);
```

---

## ✅ Features

- ✅ **Complete authentication** (register, login, email verification, password reset)
- ✅ **JWT tokens** stored in localStorage with Redux
- ✅ **User profiles** with avatar, bio, name
- ✅ **Learning progress tracking** per topic
- ✅ **Achievement system** with XP rewards
- ✅ **User settings** for preferences
- ✅ **Role-based access** (user/admin/instructor)
- ✅ **Gamification** (levels, XP, streaks)
- ✅ **Privacy controls** and notifications
