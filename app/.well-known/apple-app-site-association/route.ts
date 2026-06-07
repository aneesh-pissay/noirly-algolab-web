import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const bundleId =
    process.env.IOS_APP_BUNDLE_ID ?? 'org.reactjs.native.example.NoirlyAlgoLab';
  const teamId = process.env.APPLE_TEAM_ID ?? '';

  const appIds = teamId ? [`${teamId}.${bundleId}`] : [];

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
