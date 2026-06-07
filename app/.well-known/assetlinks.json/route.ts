import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function normalizeFingerprint(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (trimmed.includes(':')) {
    return trimmed.toUpperCase();
  }

  const hexOnly = trimmed.replace(/[^a-fA-F0-9]/g, '');
  if (hexOnly.length === 64) {
    return hexOnly.match(/.{2}/g)!.join(':').toUpperCase();
  }

  return trimmed.toUpperCase();
}

function getFingerprints(): string[] {
  const raw =
    process.env.ANDROID_APP_SHA256_FINGERPRINTS ??
    process.env.ANDROID_SHA256_FINGERPRINTS ??
    process.env.ANDROID_SHA256_FINGERPRINT ??
    '';

  return raw
    .split(/[\n,;]+/)
    .map(normalizeFingerprint)
    .filter(Boolean);
}

export async function GET() {
  const packageName = process.env.ANDROID_APP_PACKAGE ?? 'com.noirlyalgolab';
  const fingerprints = getFingerprints();

  return NextResponse.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: packageName,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ]);
}
