'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const patternCards = [
  {
    title: 'Two Pointers',
    description: 'Reverse Array, Palindrome, Two Sum Sorted',
    href: '/visual-lab/two-sum-sorted',
    icon: 'swap_horiz',
  },
  {
    title: 'Sliding Window',
    description: 'Fixed, Variable, and Longest Substring windows',
    href: '/visual-lab/sliding-window',
    icon: 'view_timeline',
  },
  {
    title: 'Fast Slow Pointer',
    description: 'Cycle detection and middle node patterns',
    href: '/visual-lab/cycle-detection',
    icon: 'sync_alt',
  },
  {
    title: 'Binary Search Patterns',
    description: 'Search boundaries and decision-based monotonic search',
    href: '/visual-lab/binary-search',
    icon: 'manage_search',
  },
  {
    title: 'Graph Patterns',
    description: 'Island counting, components, and traversals',
    href: '/visual-lab/graph-bfs',
    icon: 'hub',
  },
  {
    title: 'DP Patterns',
    description: 'State transition templates and optimization techniques',
    href: '/learn-path',
    icon: 'model_training',
  },
];

export default function PatternsPage() {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-[240px] pt-16 h-screen overflow-y-auto bg-background">
        <div className="max-w-[1200px] mx-auto p-8 space-y-8">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/learn-path' }, { label: 'Patterns' }]} />

          <section className="space-y-3">
            <h1 className="font-display text-[44px] leading-[52px] font-extrabold text-white">
              Problem Solving <span className="text-primary">Patterns</span>
            </h1>
            <p className="text-on-surface-variant max-w-3xl">
              Build reusable templates to solve unknown interview problems with less trial and error.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
            {patternCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="glass-card rounded-xl p-5 space-y-4 hover:scale-[1.01] transition-transform"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/15 text-primary grid place-items-center">
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <h2 className="font-display text-headline-sm font-bold text-white">{card.title}</h2>
                <p className="text-sm text-on-surface-variant">{card.description}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm">
                  Explore
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
