'use client';

import Link from 'next/link';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function Home() {
  return (
    <>
      <Sidebar />
      <Header />
      
      <main className="app-main h-screen overflow-y-auto bg-background">
        <div className="max-w-[1200px] mx-auto p-8 space-y-10">
          {/* HERO CARD */}
          <section className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-xl -m-0.5 blur-xl group-hover:bg-primary/10 transition-all"></div>
            <div className="relative glass-card rounded-xl p-10 overflow-hidden flex flex-col md:flex-row items-center gap-8">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.3) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                ></div>
                <div className="absolute top-10 right-10 w-40 h-40 border-2 border-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-40 w-20 h-20 border border-primary/10 rotate-45"></div>
              </div>

              <div className="flex-1 space-y-6 relative z-10">
                <h2 className="font-display text-[40px] leading-[48px] font-extrabold text-white">
                  Don&apos;t memorize algorithms.<br />
                  <span className="text-primary">Understand them visually.</span>
                </h2>
                <p className="text-on-surface-variant font-body-lg max-w-lg">
                  Visual DSA learning platform from beginner to advanced. See how algorithms work internally, step by step.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    className="px-6 py-2.5 bg-primary-container text-on-primary-container font-display font-semibold rounded-lg hover:scale-105 transition-transform active:scale-95"
                    href="/visual-lab/bubble-sort"
                  >
                    Start Learning
                  </Link>
                  <Link
                    className="px-6 py-2.5 bg-transparent border border-white/10 text-white font-display font-semibold rounded-lg hover:bg-white/5 transition-colors"
                    href="/learn-path"
                  >
                    View Roadmap
                  </Link>
                </div>
              </div>

              <div className="hidden md:block w-72 h-48 relative">
                <div className="absolute inset-0 flex items-end justify-center gap-2">
                  <div className="w-8 bg-primary/20 border border-primary/40 rounded-t h-[30%]"></div>
                  <div className="w-8 bg-primary/40 border border-primary/60 rounded-t h-[60%]"></div>
                  <div className="w-8 bg-primary border border-primary rounded-t h-[90%] shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
                  <div className="w-8 bg-primary/60 border border-primary/80 rounded-t h-[50%]"></div>
                  <div className="w-8 bg-primary/30 border border-primary/50 rounded-t h-[75%]"></div>
                </div>
              </div>
            </div>
          </section>

          {/* PROGRESS CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant text-sm font-medium">DSA Progress</span>
                <span className="material-symbols-outlined text-primary text-xl">analytics</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold font-display">8%</h3>
                <div className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">Started</div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant text-sm font-medium">Concepts Learned</span>
                <span className="material-symbols-outlined text-tertiary text-xl">school</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold font-display">10 / 120</h3>
                <div className="text-[10px] text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">8% Done</div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant text-sm font-medium">Visualization Time</span>
                <span className="material-symbols-outlined text-orange-400 text-xl">schedule</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold font-display">2 hrs</h3>
                <div className="text-[10px] text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">+20m today</div>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 h-1 bg-orange-400 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/5 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/5 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/5 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/5 rounded-full"></div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant text-sm font-medium">Current Level</span>
                <span className="material-symbols-outlined text-green-400 text-xl">military_tech</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold font-display">Beginner</h3>
                <div className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Level 1</div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </section>

          {/* LEARNING PATH */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-headline-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">route</span>
                Your Learning Path
              </h2>
              <Link className="text-primary text-sm hover:underline" href="/learn-path">
                View Roadmap
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Beginner */}
              <div className="glass-card rounded-xl p-1 relative overflow-hidden bg-primary/5 border-primary/20">
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase rounded">
                      Beginner
                    </span>
                    <span className="text-primary text-xs font-medium">In Progress</span>
                  </div>
                  <h4 className="font-display font-bold text-white">Fundamentals</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-on-surface">
                      <span className="material-symbols-outlined text-xs text-primary">circle</span> Arrays &
                      Strings
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">radio_button_unchecked</span> HashMaps
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">radio_button_unchecked</span> Basic
                      Sorting
                    </li>
                  </ul>
                  <div className="pt-2">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intermediate */}
              <div className="glass-card rounded-xl p-1 relative overflow-hidden opacity-60">
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-white/5 text-on-surface-variant text-[10px] font-bold uppercase rounded">
                      Intermediate
                    </span>
                    <span className="text-on-surface-variant text-xs font-medium">Locked</span>
                  </div>
                  <h4 className="font-display font-bold text-white">Linear & Hierarchical</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Linked Lists
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Stacks & Queues
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Binary Trees
                    </li>
                  </ul>
                  <div className="pt-2">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/10" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced */}
              <div className="glass-card rounded-xl p-1 relative overflow-hidden opacity-60">
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold uppercase rounded">
                      Advanced
                    </span>
                    <span className="text-on-surface-variant text-xs font-medium">Locked</span>
                  </div>
                  <h4 className="font-display font-bold text-white">Complex Architectures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Graphs & Dijkstra
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Dynamic Programming
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">lock</span> Backtracking
                    </li>
                  </ul>
                  <div className="pt-2">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-error/20" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CURRENT TOPICS */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-headline-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Jump Back In
              </h2>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bubble Sort */}
              <div className="glass-card rounded-xl flex flex-col group cursor-pointer">
                <div className="h-32 bg-surface-container-lowest/50 flex items-center justify-center overflow-hidden p-4 rounded-t-xl border-b border-white/5">
                  <div className="flex items-end gap-1.5 h-full">
                    <div className="w-4 bg-primary/20 rounded h-8"></div>
                    <div className="w-4 bg-primary/40 rounded h-12"></div>
                    <div className="w-4 bg-primary rounded h-20 shadow-[0_0_10px_rgba(56,189,248,0.3)]"></div>
                    <div className="w-4 bg-primary/60 rounded h-16"></div>
                    <div className="w-4 bg-primary/30 rounded h-10"></div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                      Bubble Sort
                    </h5>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded">Easy</span>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Time</span>
                      <span className="text-primary">O(n^2)</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Space</span>
                      <span className="text-primary">O(1)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Binary Search */}
              <div className="glass-card rounded-xl flex flex-col group cursor-pointer">
                <div className="h-32 bg-surface-container-lowest/50 flex items-center justify-center overflow-hidden p-4 rounded-t-xl border-b border-white/5">
                  <div className="relative w-full flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-6 h-6 border border-white/10 rounded flex items-center justify-center text-[10px]">
                        10
                      </div>
                      <div className="w-6 h-6 border border-primary bg-primary/20 rounded flex items-center justify-center text-[10px] text-primary">
                        24
                      </div>
                      <div className="w-6 h-6 border border-white/10 rounded flex items-center justify-center text-[10px]">
                        35
                      </div>
                      <div className="w-6 h-6 border border-white/10 rounded flex items-center justify-center text-[10px]">
                        48
                      </div>
                    </div>
                    <div className="absolute -bottom-4 flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-xs">arrow_drop_up</span>
                      <span className="text-[8px] text-primary">MID</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                      Binary Search
                    </h5>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded">Easy</span>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Time</span>
                      <span className="text-primary">O(log n)</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Space</span>
                      <span className="text-primary">O(1)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Sort */}
              <div className="glass-card rounded-xl flex flex-col group cursor-pointer">
                <div className="h-32 bg-surface-container-lowest/50 flex items-center justify-center overflow-hidden p-4 rounded-t-xl border-b border-white/5">
                  <div className="flex items-end gap-1.5 h-full">
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] text-primary">MIN</span>
                      <div className="w-4 bg-primary rounded h-8 shadow-[0_0_10px_rgba(56,189,248,0.3)]"></div>
                    </div>
                    <div className="w-4 bg-primary/40 rounded h-20"></div>
                    <div className="w-4 bg-primary/20 rounded h-12"></div>
                    <div className="w-4 bg-primary/60 rounded h-16"></div>
                    <div className="w-4 bg-primary/30 rounded h-10"></div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                      Selection Sort
                    </h5>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded">Easy</span>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Time</span>
                      <span className="text-primary">O(n^2)</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Space</span>
                      <span className="text-primary">O(1)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insertion Sort */}
              <div className="glass-card rounded-xl flex flex-col group cursor-pointer">
                <div className="h-32 bg-surface-container-lowest/50 flex items-center justify-center overflow-hidden p-4 rounded-t-xl border-b border-white/5">
                  <div className="flex items-end gap-1.5 h-full">
                    <div className="w-4 bg-green-500/30 border border-green-500/40 rounded h-8"></div>
                    <div className="w-4 bg-green-500/40 border border-green-500/50 rounded h-12"></div>
                    <div className="w-4 bg-primary rounded h-20 shadow-[0_0_10px_rgba(56,189,248,0.3)]"></div>
                    <div className="w-4 bg-primary/30 rounded h-10"></div>
                    <div className="w-4 bg-primary/20 rounded h-16"></div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                      Insertion Sort
                    </h5>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded">Easy</span>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Time</span>
                      <span className="text-primary">O(n^2)</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-code-md">
                      <span className="text-on-surface-variant">Space</span>
                      <span className="text-primary">O(1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
