'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setStatus('success');
        setMessage(data.message);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
      <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-5xl animate-spin">
                progress_activity
              </span>
            </div>
            <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">
              Verifying Email...
            </h1>
            <p className="text-on-surface-variant">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-green-400 text-5xl">
                check_circle
              </span>
            </div>
            <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">
              Email Verified!
            </h1>
            <p className="text-on-surface-variant mb-4">{message}</p>
            <p className="text-sm text-on-surface-variant/60 mb-6">
              Redirecting to login page...
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-400 text-5xl">error</span>
            </div>
            <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">
              Verification Failed
            </h1>
            <p className="text-on-surface-variant mb-6">{message}</p>
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                Register Again
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-primary hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
          <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-5xl animate-spin">
                progress_activity
              </span>
            </div>
            <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">Loading...</h1>
          </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
