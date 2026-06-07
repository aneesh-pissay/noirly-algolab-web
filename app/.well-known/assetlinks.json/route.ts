import { NextResponse } from 'next/server';

const ANDROID_PACKAGE = process.env.ANDROID_APP_PACKAGE ?? 'com.noirlyalgolab';

/** Comma-separated SHA-256 cert fingerprints, e.g. from keytool -list -v -keystore ... */
function getFingerprints(): string[] {
  return (process.env.ANDROID_APP_SHA256_FINGERPRINTS ?? '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
}

export async function GET() {
  const fingerprints = getFingerprints();

  return NextResponse.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: ANDROID_PACKAGE,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ]);
}
