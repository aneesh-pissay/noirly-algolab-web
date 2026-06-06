'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
        <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-5xl">mail</span>
          </div>
          <h1 className="mb-3 font-display text-title-lg font-bold text-on-surface">
            Check Your Email
          </h1>
          <p className="text-on-surface-variant mb-6">
            If an account exists with that email, we've sent a password reset link.
            Please check your inbox.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Login
          </Link>
        </div>
    );
  }

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-display text-[32px] font-extrabold text-on-surface">
            Forgot Password?
          </h1>
          <p className="text-on-surface-variant text-sm">
            Enter your email and we'll send you a reset link
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
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                mail
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-surface-container-high text-on-surface rounded-lg border border-outline-variant/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="john@example.com"
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
                Sending...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">send</span>
                Send Reset Link
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
