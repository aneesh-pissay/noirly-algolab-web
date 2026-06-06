import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';
import { initializeUserCollections } from '@/lib/user-collections';

function serializeUser(user: InstanceType<typeof User>) {
  return {
    id: String(user._id),
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    bio: user.bio,
    currentLevel: user.currentLevel,
    xp: user.xp,
    streak: user.streak,
    lastActiveDate: user.lastActiveDate?.toISOString?.() ?? user.lastActiveDate,
    role: user.role,
    createdAt: user.createdAt?.toISOString?.() ?? user.createdAt,
    updatedAt: user.updatedAt?.toISOString?.() ?? user.updatedAt,
  };
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const emailOrUsername = typeof body.emailOrUsername === 'string' ? body.emailOrUsername.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: 'Email/username and password are required' },
        { status: 400 }
      );
    }

    const emailCandidate = emailOrUsername.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: emailCandidate }, { username: emailOrUsername }],
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          error:
            'Please verify your email before logging in. Check your inbox for the verification link.',
        },
        { status: 403 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await comparePassword(password, user.password);
    } catch (compareError) {
      console.error('Password compare error:', compareError);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    try {
      await initializeUserCollections(user._id.toString());
    } catch (initError) {
      // Don't block login if progress/settings bootstrap fails
      console.error('initializeUserCollections failed during login:', initError);
    }

    const token = generateToken(user._id.toString());

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: serializeUser(user),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.', message: error },
      { status: 500 }
    );
  }
}
