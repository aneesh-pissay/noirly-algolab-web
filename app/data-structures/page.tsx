'use client';

import { dataStructures } from '@/app/data/dataStructures';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';

const categories = ['All', 'Linear', 'Hierarchical', 'Non-Linear'];

export default function DataStructuresPage() {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-y-auto bg-background">
        <div className="max-w-[1400px] mx-auto p-8 space-y-8">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/' }, { label: 'Data Structures' }]} />

          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="font-display text-[48px] leading-[56px] font-extrabold text-white">
              Data <span className="text-primary">Structures</span>
            </h1>
            <p className="text-on-surface-variant font-body-lg max-w-2xl">
              Master fundamental data structures through interactive visualizations. Understand how data is organized,
              stored, and accessed with visual demonstrations of each operation.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">database</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">Total Structures</p>
                  <h3 className="text-2xl font-bold font-display text-white">{dataStructures.length}</h3>
                </div>
              </div>
            </div>
            <div className="glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">Mastered</p>
                  <h3 className="text-2xl font-bold font-display text-white">4</h3>
                </div>
              </div>
            </div>
            <div className="glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-2xl">pending</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">In Progress</p>
                  <h3 className="text-2xl font-bold font-display text-white">3</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-display text-sm transition-all whitespace-nowrap ${
                  category === 'All'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Data Structures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {dataStructures.map((ds) => (
              <Link
                key={ds.id}
                href={`/data-structures/${ds.id}`}
                className="glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer group"
              >
                {/* Icon Header */}
                <div className="bg-surface-container-low p-6 flex items-center justify-center border-b border-white/5">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-5xl">{ds.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-display text-headline-sm font-bold text-white group-hover:text-primary transition-colors mb-1">
                        {ds.name}
                      </h3>
                      <span className="text-on-surface-variant text-sm">{ds.category}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        ds.difficulty === 'Easy'
                          ? 'bg-green-500/10 text-green-500'
                          : ds.difficulty === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {ds.difficulty}
                    </span>
                  </div>

                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2 leading-relaxed">
                    {ds.description}
                  </p>

                  {/* Operations */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
                      Time Complexity
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(ds.operations).map(([op, complexity]) => (
                        <div key={op} className="flex justify-between text-xs font-code-md">
                          <span className="text-on-surface-variant capitalize">{op}</span>
                          <span className="text-primary">{complexity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-primary text-sm group-hover:gap-2 transition-all">
                    <span className="font-medium">Explore Structure</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
