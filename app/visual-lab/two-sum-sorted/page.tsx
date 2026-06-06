'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { twoSumSorted } from '@/src/core/algorithms/two-pointers/twoSumSorted';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function TwoSumSortedPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    visualizerEngine.registerAlgorithm('two-sum-sorted', twoSumSorted);
    visualizerEngine.execute('two-sum-sorted', {
      array: [2, 3, 5, 8, 11, 15, 18],
      target: 13
    });

    const unsubscribe = visualizerEngine.subscribe((newState) => {
      setState(newState);
      setCurrentStep(visualizerEngine.getCurrentStep());
    });

    setState(visualizerEngine.getState());
    setCurrentStep(visualizerEngine.getCurrentStep());
    setIsInitialized(true);

    return () => unsubscribe();
  }, []);

  const handlePlay = () => visualizerEngine.play();
  const handlePause = () => visualizerEngine.pause();
  const handleNext = () => visualizerEngine.nextStep();
  const handlePrevious = () => visualizerEngine.previousStep();

  if (!isInitialized || !state || !currentStep) {
    return (
      <>
        <Sidebar />
        <Header />
        <main className="app-main h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-6xl animate-spin">progress_activity</span>
            <p className="text-on-surface-variant mt-4">Loading visualization...</p>
          </div>
        </main>
      </>
    );
  }

  const arrayData = currentStep.visualizationData?.array || [];
  const leftPointer = currentStep.visualizationData?.left ?? -1;
  const rightPointer = currentStep.visualizationData?.right ?? -1;
  const highlights = currentStep.highlights || [];
  const variables = currentStep.variables || {};
  const isPlaying = state.isPlaying;
  const progress = ((state.currentStep + 1) / state.totalSteps) * 100;

  return (
    <>
      <Sidebar />
      <Header />

      <main className="app-main h-screen overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Learning Path', href: '/learn-path' },
              { label: 'Two Sum Sorted' },
            ]}
          />
        </div>

        <div className="flex-1 flex overflow-hidden p-4 gap-4 pt-0">
          <section className="flex-[1.5] flex flex-col gap-4 min-w-0">
            <div className="glass-panel rounded-xl p-6 flex flex-col flex-1 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline-sm text-headline-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">numbers</span>
                  Array Visualization
                </h2>
                <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <span className="text-xs text-on-surface-variant">Target:</span>
                  <span className="text-2xl font-display text-green-400">{variables.target || '?'}</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center gap-6 relative">
                {arrayData.map((value: number, index: number) => {
                  const isHighlighted = highlights.includes(index);
                  const showLeft = leftPointer === index;
                  const showRight = rightPointer === index;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
                        isHighlighted ? 'transform scale-110' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-20 h-24 rounded-xl flex items-center justify-center relative ${
                          isHighlighted
                            ? 'bg-green-500/20 border-2 border-green-500 node-glow'
                            : 'bg-surface-container-high border border-outline-variant/20'
                        }`}
                      >
                        <span
                          className={`font-display text-display ${
                            isHighlighted ? 'text-green-400' : 'text-on-surface'
                          }`}
                        >
                          {value}
                        </span>
                        {showLeft && (
                          <div className={`absolute -top-10 flex flex-col items-center ${
                              showLeft && showRight ? 'left-1/4 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                            }`}>
                            <span className="font-code-md text-green-400 text-sm font-bold mb-1">left</span>
                            <span className="material-symbols-outlined text-green-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {showRight && (
                          <div className={`absolute -top-10 flex flex-col items-center ${
                              showLeft && showRight ? 'left-3/4 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                            }`}>
                            <span className="font-code-md text-tertiary text-sm font-bold mb-1">right</span>
                            <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-code-md text-label-sm text-on-surface-variant">
                        index [{index}]
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={handlePrevious} disabled={state.currentStep === 0} className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <span className="material-symbols-outlined">skip_previous</span>
                  </button>
                  <button onClick={isPlaying ? handlePause : handlePlay} className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button onClick={handleNext} disabled={state.currentStep >= state.totalSteps - 1} className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <span className="material-symbols-outlined">skip_next</span>
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-1">
                    Step {state.currentStep + 1} / {state.totalSteps}
                  </span>
                  <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex-1 flex flex-col gap-4 min-w-[320px]">
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-green-500">
              <h3 className="font-headline-sm text-headline-sm mb-2 capitalize">{currentStep.action}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{currentStep.description}</p>
            </div>

            <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant">Memory Inspector</h3>
                <span className="material-symbols-outlined text-sm opacity-40">memory</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Left Value</span>
                    <span className="font-code-md text-primary">{variables.leftValue ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Right Value</span>
                    <span className="font-code-md text-primary">{variables.rightValue ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Current Sum</span>
                    <span className="font-code-md text-tertiary">{variables.currentSum ?? '-'}</span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Target</span>
                    <span className="text-on-surface font-code-md">{variables.target}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Array</span>
                    <span className="text-on-surface font-code-md text-xs">[{arrayData.join(', ')}]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-highest/40 rounded-xl p-5 border border-outline-variant/20">
              <h4 className="font-label-sm text-xs text-primary uppercase mb-3 tracking-widest">Complexity</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Time</span>
                  <span className="font-code-md text-lg">O(n)</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Space</span>
                  <span className="font-code-md text-lg">O(1)</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex-1 flex flex-col min-w-[380px]">
            <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
              <div className="flex bg-surface-dim/80 border-b border-outline-variant/20">
                <button className="px-4 py-2.5 border-b-2 border-green-500 bg-surface-container-high text-on-surface text-xs font-label-sm flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                  twoSumSorted.js
                </button>
              </div>

              <div className="flex-1 font-code-md text-[13px] leading-6 p-4 overflow-auto bg-surface-dim/30">
                <div className="flex gap-4">
                  <div className="text-outline-variant/40 text-right select-none pr-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((lineNum) => (
                      <div key={lineNum}>{lineNum}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div><span className="text-primary-container">function</span> <span className="text-tertiary">twoSum</span>(arr, target) &#123;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">let</span> left = <span className="text-tertiary">0</span>, right = arr.length - <span className="text-tertiary">1</span>;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">while</span> (left &lt; right) &#123;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">let</span> sum = arr[left] + arr[right];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">if</span> (sum === target)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">return</span> [left, right];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">if</span> (sum &lt; target)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left++;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">else</span> right--;</div>
                    <div>&nbsp;&nbsp;&#125;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">return</span> <span className="text-tertiary">null</span>;</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low px-4 py-1.5 border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-label-sm text-outline-variant">
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Ln {currentStep.codeLine || 1}, Col 1</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Prettier
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
