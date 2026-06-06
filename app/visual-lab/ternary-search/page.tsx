'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { ternarySearch } from '@/src/core/algorithms/searching/ternarySearch';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function TernarySearchPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Register and execute algorithm
    visualizerEngine.registerAlgorithm('ternary-search', ternarySearch);
    visualizerEngine.execute('ternary-search', {
      array: [5, 12, 18, 24, 31, 39, 45, 52, 61],
      target: 31
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

      <main className="app-main h-screen overflow-hidden flex flex-col">
        <div className="p-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Learning Path', href: '/learn-path' },
              { label: 'Ternary Search' },
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
                  const showLeft = variables.left === index;
                  const showRight = variables.right === index;
                  const showMid1 = variables.mid1 === index;
                  const showMid2 = variables.mid2 === index;

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
                        {/* Pointer left */}
                        {showLeft && (
                          <div className="absolute -bottom-12 flex flex-col items-center left-1/2 -translate-x-1/2">
                            <span
                              className="material-symbols-outlined text-secondary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_up
                            </span>
                            <span className="font-code-md text-secondary text-sm font-bold">left</span>
                          </div>
                        )}
                        {/* Pointer right */}
                        {showRight && (
                          <div className="absolute -bottom-12 flex flex-col items-center left-1/2 -translate-x-1/2">
                            <span
                              className="material-symbols-outlined text-error text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_up
                            </span>
                            <span className="font-code-md text-error text-sm font-bold">right</span>
                          </div>
                        )}
                        {/* Pointer mid1 */}
                        {showMid1 && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              showMid1 && showMid2 
                                ? 'left-1/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-primary text-sm font-bold mb-1">mid1</span>
                            <span
                              className="material-symbols-outlined text-primary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {/* Pointer mid2 */}
                        {showMid2 && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              showMid1 && showMid2 
                                ? 'left-3/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-tertiary text-sm font-bold mb-1">mid2</span>
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
                      Left Index
                    </span>
                    <span className="font-code-md text-secondary">{variables.left ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Right Index
                    </span>
                    <span className="font-code-md text-error">{variables.right ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      First Third (mid1)
                    </span>
                    <span className="font-code-md text-primary">{variables.mid1 ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Second Third (mid2)
                    </span>
                    <span className="font-code-md text-tertiary">{variables.mid2 ?? '-'}</span>
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
                  <span className="font-code-md text-primary">O(log₃ n)</span>
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
                <code>{`function ternarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Divide into three parts
    const mid1 = left + 
      Math.floor((right - left) / 3);
    const mid2 = right - 
      Math.floor((right - left) / 3);
    
    // Check both mid points
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    
    // Determine which third to search
    if (target < arr[mid1]) {
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
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
