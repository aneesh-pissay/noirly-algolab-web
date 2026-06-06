"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { label: 'Learning Path', icon: 'map', href: '/learn-path' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="fixed left-0 top-0 z-[60] flex h-full w-[240px] flex-col gap-2 border-r border-outline-variant/40 bg-surface-container p-4">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            science
          </span>
        </div>
        <div>
          <h1 className="font-display text-headline-md font-bold text-primary leading-none">Noirly AlgoLab</h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60">Visual DSA Learning</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer active:scale-95 duration-200 font-display text-body-md ${
              isActive(item.href)
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
