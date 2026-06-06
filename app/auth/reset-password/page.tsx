'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
        <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-400 text-5xl">check_circle</span>
          </div>
          <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">
            Password Reset Successful!
          </h1>
          <p className="text-on-surface-variant mb-4">
            You can now log in with your new password.
          </p>
          <p className="text-sm text-on-surface-variant/60">
            Redirecting to login page...
          </p>
        </div>
    );
  }

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-display text-[32px] font-extrabold text-on-surface">
            Reset Password
          </h1>
          <p className="text-on-surface-variant text-sm">
            Enter your new password below
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">error</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-on-surface mb-2">
              New Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                lock
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-high text-on-surface rounded-lg border border-outline-variant/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-on-surface mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                lock_reset
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-high text-on-surface rounded-lg border border-outline-variant/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Resetting Password...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">lock_reset</span>
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Login
          </Link>
        </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}
