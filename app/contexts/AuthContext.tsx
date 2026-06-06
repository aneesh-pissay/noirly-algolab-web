'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser, logout as logoutAction, setLoading } from '../store/authSlice';

interface AuthContextType {
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/verify-email',
  '/auth/forgot-password',
  '/auth/reset-password',
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      console.log('[AuthContext] No token found');
      dispatch(setLoading(false));
      
      // Only redirect if trying to access a protected route
      if (!publicRoutes.includes(pathname)) {
        console.log('[AuthContext] Not authenticated, redirecting to login');
        router.replace(`/auth/login?redirect=${pathname}`);
      }
      return;
    }

    try {
      console.log('[AuthContext] Fetching user with token...');
      const response = await fetch('/api/auth/me', {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      
      console.log('[AuthContext] /api/auth/me response:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('[AuthContext] User fetched:', data.user);
        dispatch(setUser(data.user));

        if (pathname === '/auth/login' || pathname === '/auth/register') {
          console.log('[AuthContext] Authenticated user on auth page, redirecting to /learn-path');
          router.replace('/learn-path');
        }
      } else {
        const data = await response.json().catch(() => ({}));
        const isUnverified = response.status === 403;
        console.log('[AuthContext] Auth failed, clearing session...', response.status);
        localStorage.removeItem('token');
        dispatch(logoutAction());

        if (!publicRoutes.includes(pathname)) {
          const redirect = isUnverified
            ? `/auth/login?error=verify-email&redirect=${encodeURIComponent(pathname)}`
            : `/auth/login?redirect=${pathname}`;
          router.replace(redirect);
        }
      }
    } catch (error) {
      console.error('[AuthContext] Failed to fetch user:', error);
      localStorage.removeItem('token');
      dispatch(logoutAction());
    }
  };

  const logout = () => {
    console.log('[AuthContext] Logging out...');
    dispatch(logoutAction());
    router.replace('/');
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);
  
  return {
    user,
    loading,
    isAuthenticated,
    ...context,
  };
}
