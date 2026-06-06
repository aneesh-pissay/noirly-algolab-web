'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName =
    user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username;

  return (
    <header className="fixed top-0 right-0 left-[240px] z-50 flex h-16 w-auto items-center justify-end border-b border-outline-variant/40 bg-background px-6">
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-surface-container-high"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={displayName}
                className="h-9 w-9 rounded-full border-2 border-primary/30 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary text-sm font-bold text-on-primary">
                {getInitials(displayName)}
              </div>
            )}

            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-on-surface">{displayName}</span>
              <span className="text-xs text-on-surface-variant">{user.email}</span>
            </div>

            <span className="material-symbols-outlined text-sm text-on-surface-variant transition-transform group-hover:text-primary">
              {showDropdown ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container shadow-2xl">
              <div className="border-b border-outline-variant/20 bg-gradient-to-br from-primary/10 to-tertiary/10 p-4">
                <div className="mb-3 flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="h-12 w-12 rounded-full border-2 border-primary/50 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary text-lg font-bold text-on-primary">
                      {getInitials(displayName)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface">{displayName}</p>
                    <p className="text-xs text-on-surface-variant">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-red-500 transition-colors hover:bg-red-500/10"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>

              <div className="border-t border-outline-variant/20 bg-surface-dim/50 px-4 py-2">
                <p className="text-xs text-on-surface-variant">
                  Member since{' '}
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
