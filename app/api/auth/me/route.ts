import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const noStoreHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    };

    // Get token from Authorization header or cookie (fallback)
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value;
    console.log('[/api/auth/me] Token present:', !!token);

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401, headers: noStoreHeaders }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    console.log('[/api/auth/me] Token valid:', !!decoded);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401, headers: noStoreHeaders }
      );
    }

    // Connect to database
    await connectDB();

    // Get user from database (exclude password)
    const user = await User.findById(decoded.userId).select('-password -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordExpiry');
    console.log('[/api/auth/me] User found:', !!user);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404, headers: noStoreHeaders }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Email not verified. Please verify your email before logging in.' },
        { status: 403, headers: noStoreHeaders }
      );
    }

    console.log('[/api/auth/me] Returning user:', user.username);
    return NextResponse.json({
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
    }, { headers: noStoreHeaders });
  } catch (error: any) {
    console.error('[/api/auth/me] Error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
