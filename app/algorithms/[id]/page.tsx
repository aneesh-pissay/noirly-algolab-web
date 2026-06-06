import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { algorithms } from '../../data/algorithms';

const availableVisualLabs = new Set([
  'a-star',
  'average-subarray',
  'avl-search',
  'bellman-ford',
  'binary-search',
  'bst-search',
  'bubble-sort',
  'bucket-sort',
  'character-replacement',
  'cocktail-sort',
  'comb-sort',
  'container-water',
  'count-anagrams',
  'counting-sort',
  'cycle-detection',
  'cycle-sort',
  'dijkstra',
  'exponential-search',
  'first-negative-number',
  'fixed-size-window',
  'fruit-basket',
  'graph-bfs',
  'graph-dfs',
  'heap-sort',
  'insertion-sort',
  'interpolation-search',
  'intro-sort',
  'jump-search',
  'k-distinct-chars',
  'longest-unique-substring',
  'max-sum-size-k',
  'merge-sort',
  'middle-linked-list',
  'min-size-subarray',
  'min-window-substring',
  'move-zeroes',
  'palindrome-check',
  'pancake-sort',
  'partition-algorithm',
  'permutation-string',
  'quick-sort',
  'radix-sort',
  'red-black-search',
  'remove-duplicates',
  'reverse-array',
  'selection-sort',
  'shell-sort',
  'sliding-window',
  'sliding-window-max',
  'ternary-search',
  'three-sum',
  'tim-sort',
  'trapping-rain-water',
  'two-sum-sorted',
  'variable-window',
]);

export default async function AlgorithmDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const algorithm = algorithms.find((item) => item.id === id);

  if (!algorithm) {
    notFound();
  }

  const visualLabHref = availableVisualLabs.has(algorithm.id) ? `/visual-lab/${algorithm.id}` : null;

  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-8 p-4 sm:p-8">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Algorithms', href: '/algorithms' },
              { label: algorithm.name },
            ]}
          />

          <section className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">deployed_code</span>
              {algorithm.pattern}
            </span>
            <h1 className="font-display text-[44px] leading-[52px] font-extrabold text-white">{algorithm.name}</h1>
            <p className="text-on-surface-variant max-w-3xl">{algorithm.description}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-6">
              <h2 className="font-display text-headline-sm font-bold mb-4">Complexity</h2>
              <div className="space-y-3">
                <div className="bg-surface-dim rounded-lg p-3 border border-white/10">
                  <p className="text-xs uppercase tracking-wide text-on-surface-variant">Time</p>
                  <p className="text-lg font-code-md text-primary mt-1">{algorithm.timeComplexity}</p>
                </div>
                <div className="bg-surface-dim rounded-lg p-3 border border-white/10">
                  <p className="text-xs uppercase tracking-wide text-on-surface-variant">Space</p>
                  <p className="text-lg font-code-md text-primary mt-1">{algorithm.spaceComplexity}</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h2 className="font-display text-headline-sm font-bold mb-4">Actions</h2>
              <div className="flex flex-wrap gap-2">
                {visualLabHref ? (
                  <Link href={visualLabHref} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm hover:brightness-110 transition">
                    Open Visual Lab
                  </Link>
                ) : (
                  <span className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-sm border border-white/10">
                    Visual Lab Coming Soon
                  </span>
                )}
                <Link href="/algorithms" className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-sm hover:bg-white/5 transition">
                  Back To Algorithms
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
