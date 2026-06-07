import { NextResponse } from 'next/server';

const IOS_BUNDLE_ID =
  process.env.IOS_APP_BUNDLE_ID ?? 'org.reactjs.native.example.NoirlyAlgoLab';
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID ?? '';

export async function GET() {
  const appIds = APPLE_TEAM_ID ? [`${APPLE_TEAM_ID}.${IOS_BUNDLE_ID}`] : [];

  const body = {
    applinks: {
      apps: [],
      details: appIds.map(appID => ({
        appID,
        paths: ['/auth/verify-email*', '/auth/reset-password*'],
      })),
    },
  };

  return new NextResponse(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
