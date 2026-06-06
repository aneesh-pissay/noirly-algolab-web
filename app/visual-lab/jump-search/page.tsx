'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { jumpSearch } from '@/src/core/algorithms/searching/jumpSearch';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function JumpSearchPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Register and execute algorithm
    visualizerEngine.registerAlgorithm('jump-search', jumpSearch);
    visualizerEngine.execute('jump-search', {
      array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78],
      target: 23
    });

    // Subscribe to state changes
    const unsubscribe = visualizerEngine.subscribe((newState) => {
      setState(newState);
      setCurrentStep(visualizerEngine.getCurrentStep());
    });

    // Get initial state
    setState(visualizerEngine.getState());
    setCurrentStep(visualizerEngine.getCurrentStep());
    setIsInitialized(true);

    return () => unsubscribe();
  }, []);

  const handlePlay = () => visualizerEngine.play();
  const handlePause = () => visualizerEngine.pause();
  const handleNext = () => visualizerEngine.nextStep();
  const handlePrevious = () => visualizerEngine.previousStep();
  const handleReset = () => visualizerEngine.reset();

  if (!isInitialized || !state || !currentStep) {
    return (
      <>
        <Sidebar />
        <Header />
        <main className="ml-[240px] pt-16 h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-6xl animate-spin">progress_activity</span>
            <p className="text-on-surface-variant mt-4">Loading visualization...</p>
          </div>
        </main>
      </>
    );
  }

  const arrayData = currentStep.visualizationData?.array || [];
  const target = currentStep.visualizationData?.target ?? 0;
  const foundIndex = currentStep.visualizationData?.foundIndex;
  const highlights = currentStep.highlights || [];
  const variables = currentStep.variables || {};
  const isPlaying = state.isPlaying;
  const progress = ((state.currentStep + 1) / state.totalSteps) * 100;

  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-[240px] pt-16 h-screen overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Learning Path', href: '/learn-path' },
              { label: 'Jump Search' },
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
                <div className="flex items-center gap-2 bg-surface-dim/50 px-4 py-2 rounded-lg border border-outline-variant/10">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">search</span>
                  <span className="font-label-sm text-on-surface">Target: <span className="font-code-md text-primary">{target}</span></span>
                </div>
              </div>

              {/* Array Blocks Canvas - Dynamic */}
              <div className="flex-1 flex items-center justify-center gap-3 relative overflow-x-auto px-4">
                {arrayData.map((value: number, index: number) => {
                  const isHighlighted = highlights.includes(index);
                  const isFound = foundIndex === index;
                  const showPrev = variables.prev === index;
                  const showCurr = variables.curr === index;
                  const showI = variables.i === index;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
                        isFound ? 'transform scale-110' : isHighlighted ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-16 h-20 rounded-xl flex items-center justify-center relative ${
                          isFound
                            ? 'bg-tertiary-container/20 border-2 border-tertiary node-glow'
                            : isHighlighted
                            ? 'bg-primary-container/20 border-2 border-primary'
                            : 'bg-surface-container-high border border-outline-variant/20'
                        }`}
                      >
                        <span
                          className={`font-display text-2xl ${
                            isFound ? 'text-tertiary' : isHighlighted ? 'text-primary' : 'text-on-surface'
                          }`}
                        >
                          {value}
                        </span>
                        {/* Pointer prev */}
                        {showPrev && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              (showPrev && showCurr) || (showPrev && showI)
                                ? 'left-1/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-secondary text-sm font-bold mb-1">prev</span>
                            <span
                              className="material-symbols-outlined text-secondary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {/* Pointer curr */}
                        {showCurr && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              showPrev && showCurr
                                ? 'left-3/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-primary text-sm font-bold mb-1">curr</span>
                            <span
                              className="material-symbols-outlined text-primary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {/* Pointer i */}
                        {showI && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              showPrev && showI
                                ? 'left-3/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-tertiary text-sm font-bold mb-1">i</span>
                            <span
                              className="material-symbols-outlined text-tertiary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-code-md text-label-sm text-on-surface-variant">
                        [{index}]
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Controls Footer */}
              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={state.currentStep === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">skip_previous</span>
                  </button>
                  <button
                    onClick={isPlaying ? handlePause : handlePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={state.currentStep >= state.totalSteps - 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">skip_next</span>
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-1">
                    Step {state.currentStep + 1} / {state.totalSteps}
                  </span>
                  <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Center Panel (Logic/Memory) */}
          <section className="flex-1 flex flex-col gap-4 min-w-[320px]">
            {/* Operation Status */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-primary">
              <h3 className="font-headline-sm text-headline-sm mb-2 capitalize">{currentStep.action}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{currentStep.description}</p>
            </div>

            {/* Memory Inspector */}
            <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant">Memory Inspector</h3>
                <span className="material-symbols-outlined text-sm opacity-40">memory</span>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Step Size
                    </span>
                    <span className="font-code-md text-primary">{variables.step ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Array Size (n)
                    </span>
                    <span className="font-code-md text-primary">{variables.n ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Previous Index
                    </span>
                    <span className="font-code-md text-secondary">{variables.prev ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Current Index
                    </span>
                    <span className="font-code-md text-primary">{variables.curr ?? '-'}</span>
                  </div>
                </div>
                {foundIndex !== undefined && (
                  <div className={`p-3 rounded-lg border-2 ${
                    foundIndex >= 0 ? 'bg-tertiary-container/10 border-tertiary' : 'bg-error-container/10 border-error'
                  }`}>
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Result
                    </span>
                    <span className={`font-code-md ${foundIndex >= 0 ? 'text-tertiary' : 'text-error'}`}>
                      {foundIndex >= 0 ? `Found at index ${foundIndex}` : 'Not Found'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Complexity Info */}
            <div className="glass-panel rounded-xl p-5">
              <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant mb-3">Complexity</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Time</span>
                  <span className="font-code-md text-primary">O(√n)</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Space</span>
                  <span className="font-code-md text-primary">O(1)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Panel (Code) */}
          <section className="flex-1 flex flex-col gap-4 min-w-[320px]">
            <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-sm uppercase tracking-tighter text-on-surface-variant">Code</h3>
                <span className="material-symbols-outlined text-sm opacity-40">code</span>
              </div>
              <pre className="flex-1 overflow-auto text-xs font-code-md text-on-surface-variant leading-relaxed">
                <code>{`function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Jump through array
  while (arr[Math.min(step, n)-1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  // Linear search in block
  for (let i = prev; i < Math.min(step, n); i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  
  return -1;
}`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
