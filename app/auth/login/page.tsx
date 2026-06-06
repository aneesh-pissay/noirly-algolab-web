'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/app/store/hooks';
import { setCredentials } from '@/app/store/authSlice';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const verifyEmailNotice = searchParams.get('error') === 'verify-email';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      console.log('✅ Login successful!');
      console.log('📝 Token:', data.token);
      console.log('👤 User:', data.user);
      
      // Store credentials in Redux (which will also store token in localStorage)
      dispatch(setCredentials({
        token: data.token,
        user: {
          ...data.user,
          id: String(data.user.id),
        },
      }));

      console.log('💾 Credentials stored in Redux and localStorage');

      // Redirect to the specified redirect URL or default to learning path
      const redirectUrl = searchParams.get('redirect') || '/learn-path';
      console.log('🚀 Redirecting to:', redirectUrl);
      
      // Use replace instead of push to avoid back button issues
      router.replace(redirectUrl);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-display text-[32px] font-extrabold text-on-surface">
            Welcome Back
          </h1>
          <p className="text-on-surface-variant text-sm">
            Sign in to continue your learning journey
          </p>
        </div>

        {verifyEmailNotice && !error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <span className="material-symbols-outlined mt-0.5 text-sm text-amber-400">mail</span>
            <p className="text-sm text-amber-200">
              Please verify your email before logging in. Check your inbox for the verification link.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">error</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email or Username */}
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-on-surface mb-2">
              Email or Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                person
              </span>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-surface-container-high text-on-surface rounded-lg border border-outline-variant/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="john@example.com or johndoe"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-on-surface">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
                className="w-full pl-10 pr-4 py-3 bg-surface-container-high text-on-surface rounded-lg border border-outline-variant/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Signing In...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">login</span>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-on-surface-variant">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
