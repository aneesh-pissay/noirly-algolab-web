'use client';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function StackPage() {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-[240px] pt-16 h-screen overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Data Structures', href: '/data-structures' },
              { label: 'Stack' },
            ]}
          />
        </div>

        {/* Three Column Layout */}
        <div className="flex-1 flex overflow-hidden p-4 gap-4 pt-0">
          {/* Left Panel (Visualization) */}
          <section className="flex-[1.5] flex flex-col gap-4 min-w-0">
            <div className="glass-panel rounded-xl p-6 flex flex-col flex-1 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline-sm text-headline-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">stacks</span>
                  Stack Visualization
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-on-surface-variant text-sm font-code-md">LIFO (Last In First Out)</span>
                </div>
              </div>

              {/* Stack Visualization */}
              <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Stack Container */}
                <div className="relative flex flex-col-reverse items-center gap-3 min-h-[400px] justify-end">
                  {/* Base */}
                  <div className="w-64 h-2 bg-outline-variant/40 rounded-full"></div>

                  {/* Stack Elements */}
                  <div className="w-64 h-16 glass-panel rounded-lg flex items-center justify-between px-6 transform hover:scale-105 transition-transform">
                    <span className="font-display text-2xl text-primary">42</span>
                    <span className="font-code-md text-sm text-on-surface-variant">index [2]</span>
                    <div className="absolute -right-16 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary animate-pulse">arrow_back</span>
                      <span className="font-label-sm text-xs text-primary uppercase">Top</span>
                    </div>
                  </div>

                  <div className="w-64 h-16 glass-panel rounded-lg flex items-center justify-between px-6 opacity-80">
                    <span className="font-display text-2xl text-on-surface">17</span>
                    <span className="font-code-md text-sm text-on-surface-variant">index [1]</span>
                  </div>

                  <div className="w-64 h-16 glass-panel rounded-lg flex items-center justify-between px-6 opacity-60">
                    <span className="font-display text-2xl text-on-surface">8</span>
                    <span className="font-code-md text-sm text-on-surface-variant">index [0]</span>
                  </div>

                  {/* Top Pointer Arrow */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-4xl animate-bounce">
                      arrow_drop_down
                    </span>
                  </div>
                </div>

                {/* Size Indicator */}
                <div className="absolute bottom-8 right-8 glass-panel px-4 py-2 rounded-lg">
                  <div className="text-on-surface-variant text-xs font-label-sm uppercase mb-1">Stack Size</div>
                  <div className="font-display text-2xl text-primary">3</div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-auto pt-6 border-t border-outline-variant/10">
                <div className="flex items-center justify-center gap-4">
                  <button className="px-6 py-3 bg-primary text-on-primary rounded-lg font-display font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Push
                  </button>
                  <button className="px-6 py-3 bg-error text-white rounded-lg font-display font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">remove</span>
                    Pop
                  </button>
                  <button className="px-6 py-3 bg-surface-container-high text-on-surface rounded-lg font-display font-semibold hover:bg-white/5 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">visibility</span>
                    Peek
                  </button>
                  <button className="px-6 py-3 bg-surface-container-high text-on-surface rounded-lg font-display font-semibold hover:bg-white/5 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">restart_alt</span>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Center Panel (Properties & Operations) */}
          <section className="flex-1 flex flex-col gap-4 min-w-[320px]">
            {/* Current Operation */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-primary">
              <h3 className="font-headline-sm text-headline-sm mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">info</span>
                Current State
              </h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                The stack currently has <span className="text-primary font-bold">3 elements</span>. The top element is{' '}
                <code className="text-primary font-bold">42</code>. Next operation will access or modify the top
                element only.
              </p>
            </div>

            {/* Stack Properties */}
            <div className="glass-panel rounded-xl p-5 flex-1">
              <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">rule</span>
                Stack Properties
              </h3>
              <div className="space-y-4">
                <div className="bg-surface-dim p-4 rounded-lg border border-outline-variant/10">
                  <h4 className="text-sm font-bold text-on-surface mb-2">LIFO Principle</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Last element added is the first to be removed. Only the top element is accessible.
                  </p>
                </div>
                <div className="bg-surface-dim p-4 rounded-lg border border-outline-variant/10">
                  <h4 className="text-sm font-bold text-on-surface mb-2">Main Operations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">arrow_upward</span>
                      <div>
                        <span className="text-on-surface font-semibold">Push:</span>
                        <span className="text-on-surface-variant"> Add element to top</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <span className="material-symbols-outlined text-error text-sm">arrow_downward</span>
                      <div>
                        <span className="text-on-surface font-semibold">Pop:</span>
                        <span className="text-on-surface-variant"> Remove top element</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <span className="material-symbols-outlined text-tertiary text-sm">visibility</span>
                      <div>
                        <span className="text-on-surface font-semibold">Peek:</span>
                        <span className="text-on-surface-variant"> View top without removing</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-surface-container-highest/40 rounded-xl p-5 border border-outline-variant/20">
              <h4 className="font-label-sm text-xs text-primary uppercase mb-3 tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">speed</span>
                Time Complexity
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Push</span>
                  <span className="font-code-md text-primary">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Pop</span>
                  <span className="font-code-md text-primary">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Peek</span>
                  <span className="font-code-md text-primary">O(1)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-sm text-on-surface-variant">Space</span>
                  <span className="font-code-md text-primary">O(n)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Panel (Code Implementation) */}
          <section className="flex-1 flex flex-col min-w-[380px]">
            <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
              {/* Editor Tabs */}
              <div className="flex bg-surface-dim/80 border-b border-outline-variant/20">
                <button className="px-4 py-2.5 border-b-2 border-primary bg-surface-container-high text-on-surface text-xs font-label-sm flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
                  Stack.js
                </button>
                <button className="px-4 py-2.5 text-on-surface-variant text-xs font-label-sm hover:bg-white/5 flex items-center gap-2 transition-colors">
                  Python
                </button>
                <button className="px-4 py-2.5 text-on-surface-variant text-xs font-label-sm hover:bg-white/5 flex items-center gap-2 transition-colors">
                  Java
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 font-code-md text-[13px] leading-6 p-4 overflow-auto bg-surface-dim/30">
                <div className="flex gap-4">
                  <div className="text-outline-variant/40 text-right select-none pr-2">
                    1<br />
                    2<br />
                    3<br />
                    4<br />
                    5<br />
                    6<br />
                    7<br />
                    8<br />
                    9<br />
                    10
                    <br />
                    11
                    <br />
                    12
                    <br />
                    13
                    <br />
                    14
                    <br />
                    15
                    <br />
                    16
                    <br />
                    17
                    <br />
                    18
                    <br />
                    19
                    <br />
                    20
                  </div>
                  <div className="flex-1">
                    <span className="text-primary-container">class</span>{' '}
                    <span className="text-tertiary">Stack</span> &#123;
                    <br />
                    &nbsp;&nbsp;<span className="text-primary-container">constructor</span>() &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">this</span>.items = [];
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    <br />
                    &nbsp;&nbsp;<span className="text-tertiary">push</span>(element) &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">this</span>.items.
                    <span className="text-tertiary">push</span>(element);
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    <br />
                    &nbsp;&nbsp;<span className="text-tertiary">pop</span>() &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">if</span> (
                    <span className="text-primary-container">this</span>.
                    <span className="text-tertiary">isEmpty</span>())
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">return</span>{' '}
                    <span className="text-primary-container">null</span>;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">return</span>{' '}
                    <span className="text-primary-container">this</span>.items.
                    <span className="text-tertiary">pop</span>();
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    <br />
                    &nbsp;&nbsp;<span className="text-tertiary">peek</span>() &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">return</span>{' '}
                    <span className="text-primary-container">this</span>.items[
                    <span className="text-primary-container">this</span>.items.length -{' '}
                    <span className="text-tertiary">1</span>];
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    &#125;
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-surface-container-low px-4 py-1.5 border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-label-sm text-outline-variant">
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>20 lines</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Ready
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Section (Use Cases) */}
        <footer className="h-28 px-4 pb-4">
          <div className="glass-panel h-full rounded-xl p-4">
            <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">
              Real-World Use Cases
            </h3>
            <div className="flex gap-4 overflow-x-auto">
              <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-lg min-w-fit">
                <span className="material-symbols-outlined text-primary text-sm">undo</span>
                <div>
                  <div className="text-sm font-semibold text-on-surface">Undo/Redo</div>
                  <div className="text-xs text-on-surface-variant">Text editors, browsers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-lg min-w-fit">
                <span className="material-symbols-outlined text-primary text-sm">history</span>
                <div>
                  <div className="text-sm font-semibold text-on-surface">Browser History</div>
                  <div className="text-xs text-on-surface-variant">Back/Forward navigation</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-lg min-w-fit">
                <span className="material-symbols-outlined text-primary text-sm">functions</span>
                <div>
                  <div className="text-sm font-semibold text-on-surface">Function Calls</div>
                  <div className="text-xs text-on-surface-variant">Call stack in programming</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-lg min-w-fit">
                <span className="material-symbols-outlined text-primary text-sm">calculate</span>
                <div>
                  <div className="text-sm font-semibold text-on-surface">Expression Evaluation</div>
                  <div className="text-xs text-on-surface-variant">Parsing & calculating expressions</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
