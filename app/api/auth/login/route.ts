import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';
import { initializeUserCollections } from '@/lib/user-collections';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { emailOrUsername, password } = await request.json();

    // Validation
    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: 'Email/username and password are required' },
        { status: 400 }
      );
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in. Check your inbox for the verification link.' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await initializeUserCollections(user._id.toString());

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return token in response body for client-side storage
    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          id: user._id,
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
          lastActiveDate: user.lastActiveDate,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
