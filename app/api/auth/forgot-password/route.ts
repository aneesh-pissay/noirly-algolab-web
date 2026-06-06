import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateRandomToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        {
          message: 'If an account with that email exists, a password reset link has been sent.',
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, user.username, resetToken, user.firstName);
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'If an account with that email exists, a password reset link has been sent.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
