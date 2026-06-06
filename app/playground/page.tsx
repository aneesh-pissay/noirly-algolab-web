'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const playgroundItems = [
  { title: 'Sorting Lab', href: '/visual-lab/bubble-sort', icon: 'swap_vert', note: 'Step-by-step bar animations' },
  { title: 'Searching Lab', href: '/visual-lab/binary-search', icon: 'search', note: 'Trace each partition choice' },
  { title: 'Graph Lab', href: '/visual-lab/dijkstra', icon: 'hub', note: 'Interactive shortest path simulation' },
  { title: 'Sliding Window Lab', href: '/visual-lab/sliding-window', icon: 'view_timeline', note: 'Window movement breakdown' },
  { title: 'Two Pointer Lab', href: '/visual-lab/two-sum-sorted', icon: 'sync_alt', note: 'Pointer shifts and decisions' },
  { title: 'Tree Search Lab', href: '/visual-lab/bst-search', icon: 'account_tree', note: 'Node traversal animation' },
];

export default function PlaygroundPage() {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-y-auto bg-background">
        <div className="max-w-[1200px] mx-auto p-8 space-y-8">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/learn-path' }, { label: 'Playground' }]} />

          <section className="space-y-3">
            <h1 className="font-display text-[44px] leading-[52px] font-extrabold text-white">
              Algorithm <span className="text-primary">Playground</span>
            </h1>
            <p className="text-on-surface-variant max-w-3xl">
              Launch visual labs to experiment with inputs, trace execution, and understand algorithm behavior.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
            {playgroundItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="glass-card rounded-xl p-5 space-y-4 hover:scale-[1.01] transition-transform"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/15 text-primary grid place-items-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h2 className="font-display text-headline-sm font-bold text-white">{item.title}</h2>
                <p className="text-sm text-on-surface-variant">{item.note}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm">
                  Open Lab
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
