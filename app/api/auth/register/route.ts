import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateRandomToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';
import { initializeUserCollections } from '@/lib/user-collections';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, email, password } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateRandomToken();
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpiry,
    });

    await initializeUserCollections(user._id.toString());

    // Send verification email
    try {
      await sendVerificationEmail(email, username, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - user can request resend later
    }

    return NextResponse.json(
      {
        message: 'Registration successful! Please check your email to verify your account.',
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
