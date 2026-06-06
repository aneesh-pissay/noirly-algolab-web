'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useMobileNav } from '../contexts/MobileNavContext';
import BrandMark from './BrandMark';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { label: 'Learning Path', icon: 'map', href: '/learn-path' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileNav();

  useEffect(() => {
    close();
  }, [pathname, close]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[min(280px,85vw)] flex-col gap-2 border-r border-outline-variant/40 bg-surface-container p-4 transition-transform duration-300 ease-out lg:w-[240px] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-6 w-full shrink-0 px-0.5">
          <BrandMark variant="sidebar" href="/dashboard" />
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 font-display text-body-md transition-colors duration-200 active:scale-95 ${
                isActive(item.href)
                  ? 'border border-primary/20 bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
