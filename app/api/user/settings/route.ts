import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { ensureUserSettings, saveUserSettings } from '@/lib/user-collections';
import { toClientSettings, toDbUpdates } from '@/lib/settings-mapper';

async function getAuthUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.userId ?? null;
}

// GET /api/user/settings — load user settings (creates defaults if missing)
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await connectDB();

    const doc = await ensureUserSettings(userId);
    return NextResponse.json({ settings: toClientSettings(doc) });
  } catch (error) {
    console.error('GET /api/user/settings error:', error);
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
  }
}

// PATCH /api/user/settings — update appearance + learning preferences
export async function PATCH(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const updates = toDbUpdates(body);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid settings provided' }, { status: 400 });
    }

    await connectDB();

    const doc = await saveUserSettings(userId, updates);

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: toClientSettings(doc),
    });
  } catch (error) {
    console.error('PATCH /api/user/settings error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
