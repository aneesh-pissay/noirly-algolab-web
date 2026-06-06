'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { removeDuplicates } from '@/src/core/algorithms/two-pointers/removeDuplicates';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function RemoveDuplicatesPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    visualizerEngine.registerAlgorithm('remove-duplicates', removeDuplicates);
    visualizerEngine.execute('remove-duplicates', {
      array: [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5]
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
  const uniquePointer = currentStep.visualizationData?.uniquePointer ?? -1;
  const scanPointer = currentStep.visualizationData?.scanPointer ?? -1;
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
              { label: 'Remove Duplicates' },
            ]}
          />
        </div>

        <div className="flex-1 flex overflow-hidden p-4 gap-4 pt-0">
          <section className="flex-[1.5] flex flex-col gap-4 min-w-0">
            <div className="glass-panel rounded-xl p-6 flex flex-col flex-1 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline-sm text-headline-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                  Array Visualization
                </h2>
                <div className="flex items-center gap-3 bg-orange-500/10 p-2 px-4 rounded-lg border border-orange-500/20">
                  <span className="text-xs text-on-surface-variant">Unique:</span>
                  <span className="text-xl font-display text-orange-400">{variables.uniqueCount || 0}</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center gap-4 relative flex-wrap">
                {arrayData.map((value: number, index: number) => {
                  const isHighlighted = highlights.includes(index);
                  const showUnique = uniquePointer === index;
                  const showScan = scanPointer === index;
                  const isUnique = index <= uniquePointer;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
                        isHighlighted ? 'transform scale-110' : isUnique ? '' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-20 h-24 rounded-xl flex items-center justify-center relative ${
                          isHighlighted
                            ? 'bg-orange-500/20 border-2 border-orange-500 node-glow'
                            : isUnique
                            ? 'bg-blue-500/10 border-2 border-blue-500/50'
                            : 'bg-surface-container-high border border-outline-variant/20'
                        }`}
                      >
                        <span
                          className={`font-display text-display ${
                            isHighlighted ? 'text-orange-400' : isUnique ? 'text-blue-400' : 'text-on-surface-variant'
                          }`}
                        >
                          {value}
                        </span>
                        {showUnique && (
                          <div className={`absolute -top-10 flex flex-col items-center ${
                              showUnique && showScan ? 'left-1/4 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                            }`}>
                            <span className="font-code-md text-blue-400 text-sm font-bold mb-1">unique</span>
                            <span className="material-symbols-outlined text-blue-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {showScan && (
                          <div className={`absolute -top-10 flex flex-col items-center ${
                              showUnique && showScan ? 'left-3/4 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                            }`}>
                            <span className="font-code-md text-orange-400 text-sm font-bold mb-1">scan</span>
                            <span className="material-symbols-outlined text-orange-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
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
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-orange-500">
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
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Unique Ptr</span>
                    <span className="font-code-md text-primary">{variables.uniquePointer ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Scan Ptr</span>
                    <span className="font-code-md text-primary">{variables.scanPointer ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">Unique Count</span>
                    <span className="font-code-md text-tertiary">{variables.uniqueCount ?? 0}</span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Array Length</span>
                    <span className="text-on-surface font-code-md">{arrayData.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Current State</span>
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
                <button className="px-4 py-2.5 border-b-2 border-orange-500 bg-surface-container-high text-on-surface text-xs font-label-sm flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                  removeDuplicates.js
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
                    <div><span className="text-primary-container">function</span> <span className="text-tertiary">removeDuplicates</span>(arr) &#123;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">if</span> (arr.length === <span className="text-tertiary">0</span>) <span className="text-primary-container">return</span> <span className="text-tertiary">0</span>;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">let</span> unique = <span className="text-tertiary">0</span>;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">for</span> (<span className="text-primary-container">let</span> scan = <span className="text-tertiary">1</span>; scan &lt; arr.length; scan++) &#123;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">if</span> (arr[scan] !== arr[unique]) &#123;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unique++;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[unique] = arr[scan];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                    <div>&nbsp;&nbsp;&#125;</div>
                    <div>&nbsp;&nbsp;<span className="text-primary-container">return</span> unique + <span className="text-tertiary">1</span>;</div>
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
