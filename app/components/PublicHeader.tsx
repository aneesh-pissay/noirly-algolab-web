'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function PublicHeader() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-outline-variant/40 bg-background/95 px-4 backdrop-blur-md sm:px-6">
      <Link href="/" className="flex cursor-pointer items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            science
          </span>
        </div>
        <div>
          <p className="font-display text-base font-bold leading-none text-primary">Noirly AlgoLab</p>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
            Visual DSA Learning
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        {!loading && user ? (
          <Link
            href="/learn-path"
            className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:bg-primary/90"
          >
            Continue Learning
          </Link>
        ) : (
          <>
            <Link
              href="/auth/login"
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
                pathname === '/auth/login'
                  ? 'bg-primary/15 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition ${
                pathname === '/auth/register'
                  ? 'bg-primary text-on-primary'
                  : 'border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
