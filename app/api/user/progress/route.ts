import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';
import User from '@/models/User';
import { calculateLevelFromXp, clampXpGain } from '@/lib/gamification';
import { calculateNextStreak } from '@/lib/streak';

// GET /api/user/progress - Get user learning progress
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get('levelId');
    const topicSlug = searchParams.get('topicSlug');

    let query: any = { userId: decoded.userId };
    if (levelId) query.levelId = parseInt(levelId);
    if (topicSlug) query.topicSlug = topicSlug;

    const progress = await UserProgress.find(query).sort({ lastAccessedAt: -1 });

    return NextResponse.json({ progress });
  } catch (error: any) {
    console.error('Get progress error:', error);
    return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 });
  }
}

// POST /api/user/progress - Create or update progress
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { levelId, topicSlug, topicTitle, status, progress, timeSpent, score, notes, isBookmarked, xpGained } =
      await request.json();

    if (!levelId || !topicSlug || !topicTitle) {
      return NextResponse.json(
        { error: 'levelId, topicSlug, and topicTitle are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingProgress = await UserProgress.findOne({ userId: decoded.userId, topicSlug });

    const updateData: any = {
      userId: decoded.userId,
      levelId,
      topicSlug,
      topicTitle,
      lastAccessedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (progress !== undefined) updateData.progress = progress;
    if (timeSpent !== undefined) updateData.$inc = { timeSpent };
    if (score !== undefined) updateData.score = score;
    if (notes !== undefined) updateData.notes = notes;
    if (isBookmarked !== undefined) updateData.isBookmarked = isBookmarked;

    // If completing, set completedAt and increment attempts
    if (status === 'completed' && progress === 100) {
      updateData.completedAt = new Date();
      updateData.$inc = { ...updateData.$inc, attempts: 1 };
    }

    const userProgress = await UserProgress.findOneAndUpdate(
      { userId: decoded.userId, topicSlug },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    let awardedXp = 0;
    let leveledUp = false;
    let currentLevel: number | null = null;

    const isCompletingNow = status === 'completed' && progress === 100;
    const wasAlreadyCompleted = existingProgress?.status === 'completed';

    // Award XP only on first completion of a topic.
    if (isCompletingNow && !wasAlreadyCompleted) {
      const requestedXp = typeof xpGained === 'number' ? xpGained : 30;
      awardedXp = clampXpGain(requestedXp);

      if (awardedXp > 0) {
        const user = await User.findById(decoded.userId).select('xp currentLevel');

        if (user) {
          const nextXp = (user.xp || 0) + awardedXp;
          const nextLevel = calculateLevelFromXp(nextXp);
          const streakResult = calculateNextStreak(user.lastActiveDate, user.streak || 0);
          leveledUp = nextLevel > (user.currentLevel || 1);
          currentLevel = nextLevel;

          await User.findByIdAndUpdate(decoded.userId, {
            xp: nextXp,
            currentLevel: nextLevel,
            streak: streakResult.streak,
            ...(streakResult.shouldUpdateLastActiveDate ? { lastActiveDate: new Date() } : {}),
          });
        }
      }
    }

    return NextResponse.json({
      message: 'Progress updated successfully',
      progress: userProgress,
      xpGained: awardedXp,
      leveledUp,
      currentLevel,
    });
  } catch (error: any) {
    console.error('Update progress error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
