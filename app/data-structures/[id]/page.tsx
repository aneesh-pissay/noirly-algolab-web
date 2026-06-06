import { notFound } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { dataStructures } from '../../data/dataStructures';

export default async function DataStructureDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const structure = dataStructures.find((item) => item.id === id);

  if (!structure) {
    notFound();
  }

  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-8 p-4 sm:p-8">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/learn-path' },
              { label: 'Data Structures', href: '/data-structures' },
              { label: structure.name },
            ]}
          />

          <section className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">widgets</span>
              {structure.category}
            </span>
            <h1 className="font-display text-[44px] leading-[52px] font-extrabold text-white">{structure.name}</h1>
            <p className="text-on-surface-variant max-w-3xl">{structure.description}</p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="font-display text-headline-sm font-bold mb-4">Core Operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(structure.operations).map(([operation, complexity]) => (
                <div key={operation} className="bg-surface-dim rounded-lg border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">{operation}</div>
                  <div className="text-lg font-code-md text-primary">{complexity}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="font-display text-headline-sm font-bold mb-4">Visualization Topics</h2>
            <div className="flex flex-wrap gap-2">
              {structure.visualizations.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-xs border border-primary/20 bg-primary/10 text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-on-surface-variant text-sm mt-4">
              Dedicated interactive lab for this structure is being expanded. Use the existing visual labs from the
              Playground section in the meantime.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
