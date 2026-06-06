'use client';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function BubbleSortPage() {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Algorithms', href: '/algorithms' },
              { label: 'Bubble Sort' },
            ]}
          />
        </div>

        {/* Three Column Split Layout */}
        <div className="flex-1 flex overflow-hidden p-4 gap-4 pt-0">
          {/* Left Panel (Visualization) */}
          <section className="flex-[1.5] flex flex-col gap-4 min-w-0">
            <div className="glass-panel rounded-xl p-6 flex flex-col flex-1 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline-sm text-headline-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                  Array Visualization
                </h2>
                <div className="flex items-center gap-3 bg-surface-dim/50 p-1 rounded-lg border border-outline-variant/10">
                  <button className="px-3 py-1 text-xs font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    0.5x
                  </button>
                  <button className="px-3 py-1 text-xs font-label-sm bg-primary text-on-primary rounded-md">
                    1x
                  </button>
                  <button className="px-3 py-1 text-xs font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    2x
                  </button>
                </div>
              </div>

              {/* Array Blocks Canvas */}
              <div className="flex-1 flex items-center justify-center gap-6 relative">
                {/* Node 0 */}
                <div className="flex flex-col items-center gap-4 transition-all duration-500 transform scale-110">
                  <div className="w-20 h-24 bg-primary-container/20 border-2 border-primary rounded-xl flex items-center justify-center node-glow relative">
                    <span className="font-display text-display text-primary">5</span>
                    <div className="absolute -top-12 animate-bounce">
                      <span
                        className="material-symbols-outlined text-primary text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_drop_down
                      </span>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-code-md text-primary text-xs">
                        i
                      </span>
                    </div>
                  </div>
                  <span className="font-code-md text-label-sm text-on-surface-variant">index [0]</span>
                </div>

                {/* Node 1 */}
                <div className="flex flex-col items-center gap-4 transition-all duration-500 transform scale-110">
                  <div className="w-20 h-24 bg-primary-container/20 border-2 border-primary rounded-xl flex items-center justify-center node-glow relative">
                    <span className="font-display text-display text-primary">3</span>
                    <div className="absolute -top-12 animate-bounce">
                      <span
                        className="material-symbols-outlined text-primary text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_drop_down
                      </span>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-code-md text-primary text-xs">
                        j
                      </span>
                    </div>
                  </div>
                  <span className="font-code-md text-label-sm text-on-surface-variant">index [1]</span>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center gap-4 opacity-40">
                  <div className="w-20 h-24 bg-surface-container-high border border-outline-variant/20 rounded-xl flex items-center justify-center">
                    <span className="font-display text-display text-on-surface">8</span>
                  </div>
                  <span className="font-code-md text-label-sm text-on-surface-variant">index [2]</span>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center gap-4 opacity-40">
                  <div className="w-20 h-24 bg-surface-container-high border border-outline-variant/20 rounded-xl flex items-center justify-center">
                    <span className="font-display text-display text-on-surface">1</span>
                  </div>
                  <span className="font-code-md text-label-sm text-on-surface-variant">index [3]</span>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col items-center gap-4 opacity-40">
                  <div className="w-20 h-24 bg-surface-container-high border border-outline-variant/20 rounded-xl flex items-center justify-center">
                    <span className="font-display text-display text-on-surface">9</span>
                  </div>
                  <span className="font-code-md text-label-sm text-on-surface-variant">index [4]</span>
                </div>
              </div>

              {/* Controls Footer */}
              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined">skip_previous</span>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      pause
                    </span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined">skip_next</span>
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-1">
                    Step 4 / 20
                  </span>
                  <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Center Panel (Logic/Memory) */}
          <section className="flex-1 flex flex-col gap-4 min-w-[320px]">
            {/* Operation Status */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-primary">
              <h3 className="font-headline-sm text-headline-sm mb-2">Comparing Elements</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Checking if <code className="text-primary font-bold">arr[0] &gt; arr[1]</code>. Since{' '}
                <span className="text-primary">5 &gt; 3</span> is <span className="text-tertiary">true</span>, a swap
                will be performed in the next step to push the larger element right.
              </p>
            </div>

            {/* Memory Inspector */}
            <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant">Memory Inspector</h3>
                <span className="material-symbols-outlined text-sm opacity-40">memory</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Variable i
                    </span>
                    <span className="font-code-md text-primary">0</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Variable j
                    </span>
                    <span className="font-code-md text-primary">1</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Temp (Swap)
                    </span>
                    <span className="font-code-md text-tertiary">null</span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Array Length</span>
                    <span className="text-on-surface font-code-md">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Swaps Performed</span>
                    <span className="text-on-surface font-code-md">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Current State</span>
                    <span className="text-on-surface font-code-md">[5, 3, 8, 1, 9]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-surface-container-highest/40 rounded-xl p-5 border border-outline-variant/20">
              <h4 className="font-label-sm text-xs text-primary uppercase mb-3 tracking-widest">Complexity</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Time</span>
                  <span className="font-code-md text-lg">O(n²)</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Space</span>
                  <span className="font-code-md text-lg">O(1)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Panel (Code Editor) */}
          <section className="flex-1 flex flex-col min-w-[380px]">
            <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
              {/* Editor Tabs */}
              <div className="flex bg-surface-dim/80 border-b border-outline-variant/20">
                <button className="px-4 py-2.5 border-b-2 border-primary bg-surface-container-high text-on-surface text-xs font-label-sm flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
                  BubbleSort.js
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
                  </div>
                  <div className="flex-1">
                    <span className="text-primary-container">function</span>{' '}
                    <span className="text-tertiary">bubbleSort</span>(arr) &#123;
                    <br />
                    &nbsp;&nbsp;<span className="text-primary-container">let</span> n = arr.length;
                    <br />
                    &nbsp;&nbsp;<span className="text-primary-container">for</span> (
                    <span className="text-primary-container">let</span> i = <span className="text-tertiary">0</span>; i
                    &lt; n; i++) &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">for</span> (
                    <span className="text-primary-container">let</span> j = <span className="text-tertiary">0</span>; j
                    &lt; n - i - <span className="text-tertiary">1</span>; j++) &#123;
                    <br />
                    <div className="bg-primary/10 -mx-4 px-4 border-l-2 border-primary">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">if</span> (arr[j]
                      &gt; arr[j + <span className="text-tertiary">1</span>]) &#123;
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">let</span>{' '}
                    temp = arr[j];
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j] = arr[j +{' '}
                    <span className="text-tertiary">1</span>];
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + <span className="text-tertiary">1</span>] =
                    temp;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    &nbsp;&nbsp;<span className="text-primary-container">return</span> arr;
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
                  <span>Ln 5, Col 12</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Prettier
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Section (Execution Timeline) */}
        <footer className="h-28 px-4 pb-4">
          <div className="glass-panel h-full rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">
                Execution Timeline
              </h3>
              <div className="flex gap-6 text-[10px] font-label-sm uppercase text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim"></span> Completed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Pending
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between gap-1 relative px-8">
              {/* Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-outline-variant/30 z-0"></div>
              {/* Steps */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary-fixed-dim border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-on-surface-variant">Initialize</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary-fixed-dim border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-on-surface-variant">Outer Loop</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary-fixed-dim border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-on-surface-variant">Inner Loop</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary border-4 border-surface-dim ring-4 ring-primary/20"></div>
                <span className="text-[10px] font-body-md text-primary font-bold">Compare</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-outline-variant">Swap</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-outline-variant">Inc. Pointer</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                <div className="w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-dim"></div>
                <span className="text-[10px] font-body-md text-outline-variant">Complete</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
