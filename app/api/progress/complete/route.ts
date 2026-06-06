import { NextRequest, NextResponse } from 'next/server';

import { verifyToken } from '@/lib/auth';

import connectDB from '@/lib/mongodb';

import User from '@/models/User';

import {

  buildAggregatedProgress,

  completeLessonForUser,

} from '@/lib/curriculum-progress';

import {

  ensureUserCurriculumProgress,

  saveCurriculumProgress,

  syncLegacyTopicProgress,

} from '@/lib/user-collections';



// POST /api/progress/complete — complete a lesson and persist XP + unlocks

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



    const { lessonId, algorithmId, quizScore } = await request.json();

    const targetId = lessonId ?? algorithmId;

    const score = typeof quizScore === 'number' ? Math.max(70, Math.min(100, Math.round(quizScore))) : 100;



    if (!targetId || typeof targetId !== 'string') {

      return NextResponse.json({ error: 'lessonId or algorithmId is required' }, { status: 400 });

    }



    await connectDB();



    const user = await User.findById(decoded.userId);

    if (!user) {

      return NextResponse.json({ error: 'User not found' }, { status: 404 });

    }



    const doc = await ensureUserCurriculumProgress(decoded.userId);



    const outcome = completeLessonForUser(user, doc, targetId, score);

    if (!outcome) {

      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });

    }



    const hasUserUpdates = Object.keys(outcome.userUpdates).length > 0;

    const hasDocUpdates = Object.keys(outcome.docUpdates).length > 0;



    if (hasUserUpdates) {

      await User.findByIdAndUpdate(

        decoded.userId,

        { $set: outcome.userUpdates },

        { runValidators: true }

      );

    }



    if (hasDocUpdates) {

      await saveCurriculumProgress(decoded.userId, doc, outcome.docUpdates);

      await syncLegacyTopicProgress(decoded.userId, outcome.result.lesson);

    }



    const refreshedUser = await User.findById(decoded.userId);

    const refreshedDoc = await ensureUserCurriculumProgress(decoded.userId);



    if (!refreshedUser || !refreshedDoc) {

      return NextResponse.json({ error: 'Failed to load saved progress' }, { status: 500 });

    }



    return NextResponse.json({

      progress: buildAggregatedProgress(refreshedUser, refreshedDoc),

      result: outcome.result,

    });

  } catch (error) {

    console.error('POST /api/progress/complete error:', error);

    return NextResponse.json({ error: 'Failed to complete lesson' }, { status: 500 });

  }

}

