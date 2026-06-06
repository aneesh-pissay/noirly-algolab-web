'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { slidingWindow } from '@/src/core/algorithms/two-pointers/slidingWindow';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function SlidingWindowPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Register and execute algorithm
    visualizerEngine.registerAlgorithm('sliding-window', slidingWindow);
    visualizerEngine.execute('sliding-window', {
      array: [2, 1, 5, 1, 3, 2, 7, 4],
      windowSize: 3
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
  const left = currentStep.visualizationData?.left ?? -1;
  const right = currentStep.visualizationData?.right ?? -1;
  const windowSize = currentStep.visualizationData?.windowSize || 3;
  const maxLeft = currentStep.visualizationData?.maxLeft ?? -1;
  const maxRight = currentStep.visualizationData?.maxRight ?? -1;
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
              { label: 'Sliding Window' },
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

              {/* Status Badges */}
              <div className="absolute top-20 right-6 flex gap-3">
                <div className="px-4 py-2 rounded-lg font-label-sm text-xs uppercase tracking-wider bg-tertiary-container/20 text-tertiary border border-tertiary/30">
                  Window Size: {windowSize}
                </div>
                {variables.maxSum !== undefined && variables.maxSum !== 'none' && (
                  <div className="px-4 py-2 rounded-lg font-label-sm text-xs uppercase tracking-wider bg-primary-container/20 text-primary border border-primary/30">
                    Max Sum: {variables.maxSum}
                  </div>
                )}
              </div>

              {/* Array Blocks Canvas */}
              <div className="flex-1 flex items-center justify-center gap-6 relative">
                {arrayData.map((value: number, index: number) => {
                  const isInWindow = highlights.includes(index);
                  const isInMaxWindow = maxLeft >= 0 && index >= maxLeft && index <= maxRight;
                  const isLeft = left === index;
                  const isRight = right === index;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
                        isInWindow || isInMaxWindow ? 'transform scale-110' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-20 h-24 rounded-xl flex items-center justify-center relative ${
                          isInMaxWindow && maxLeft !== left
                            ? 'bg-tertiary-container/30 border-2 border-tertiary node-glow'
                            : isInWindow
                            ? 'bg-primary-container/20 border-2 border-primary'
                            : 'bg-surface-container-high border border-outline-variant/20'
                        }`}
                      >
                        <span
                          className={`font-display text-display ${
                            isInMaxWindow && maxLeft !== left
                              ? 'text-tertiary'
                              : isInWindow
                              ? 'text-primary'
                              : 'text-on-surface'
                          }`}
                        >
                          {value}
                        </span>
                        {/* Pointer left */}
                        {isLeft && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              isLeft && isRight 
                                ? 'left-1/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-blue-400 text-sm font-bold mb-1">left</span>
                            <span
                              className="material-symbols-outlined text-blue-400 text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {/* Pointer right */}
                        {isRight && (
                          <div 
                            className={`absolute -top-10 flex flex-col items-center ${
                              isLeft && isRight 
                                ? 'left-3/4 -translate-x-1/2' 
                                : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            <span className="font-code-md text-tertiary text-sm font-bold mb-1">right</span>
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
                        index [{index}]
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Left Pointer
                    </span>
                    <span className="font-code-md text-primary">{variables.left ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Right Pointer
                    </span>
                    <span className="font-code-md text-primary">{variables.right ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Current Sum
                    </span>
                    <span className="font-code-md text-tertiary">
                      {variables.currentSum ?? 0}
                    </span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Max Sum
                    </span>
                    <span className="font-code-md text-tertiary">
                      {variables.maxSum ?? 0}
                    </span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Window Size
                    </span>
                    <span className="font-code-md text-primary">
                      {variables.windowSize ?? windowSize}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Array Length</span>
                    <span className="text-on-surface font-code-md">{arrayData.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Current State</span>
                    <span className="text-on-surface font-code-md text-xs">
                      [{arrayData.join(', ')}]
                    </span>
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
                  <span className="font-code-md text-lg">{currentStep.complexity?.time || 'O(n)'}</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Space</span>
                  <span className="font-code-md text-lg">{currentStep.complexity?.space || 'O(1)'}</span>
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
                  <span className="w-3 h-3 bg-blue-400 rounded-sm"></span>
                  maxSumSubarray.js
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 font-code-md text-[13px] leading-6 p-4 overflow-auto bg-surface-dim/30">
                <div className="flex gap-4">
                  <div className="text-outline-variant/40 text-right select-none pr-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((lineNum) => (
                      <div key={lineNum}>{lineNum}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    {/* Line 1 */}
                    <div className={currentStep.codeLine === 1 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      <span className="text-primary-container">function</span>{' '}
                      <span className="text-tertiary">maxSumSubarray</span>(arr, k) &#123;
                    </div>
                    {/* Line 2 */}
                    <div className={currentStep.codeLine === 2 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">let</span> maxSum = <span className="text-tertiary">0</span>;
                    </div>
                    {/* Line 3 */}
                    <div className={currentStep.codeLine === 3 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">let</span> currentSum = <span className="text-tertiary">0</span>;
                    </div>
                    {/* Line 4 */}
                    <div>
                      &nbsp;
                    </div>
                    {/* Line 5 */}
                    <div className={currentStep.codeLine === 5 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">for</span> (<span className="text-primary-container">let</span> i = <span className="text-tertiary">0</span>; i &lt; k; i++) &#123;
                    </div>
                    {/* Line 6 */}
                    <div className={currentStep.codeLine === 6 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;currentSum += arr[i];
                    </div>
                    {/* Line 7 */}
                    <div>
                      &nbsp;&nbsp;&#125;
                    </div>
                    {/* Line 8 */}
                    <div className={currentStep.codeLine === 8 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;maxSum = currentSum;
                    </div>
                    {/* Line 9 */}
                    <div>
                      &nbsp;
                    </div>
                    {/* Line 10 */}
                    <div className={currentStep.codeLine === 10 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">for</span> (<span className="text-primary-container">let</span> right = k; right &lt; arr.length; right++) &#123;
                    </div>
                    {/* Line 11 */}
                    <div className={currentStep.codeLine === 11 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;currentSum += arr[right];
                    </div>
                    {/* Line 12 */}
                    <div className={currentStep.codeLine === 12 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;currentSum -= arr[right - k];
                    </div>
                    {/* Line 13 */}
                    <div className={currentStep.codeLine === 13 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;maxSum = Math.max(maxSum, currentSum);
                    </div>
                    {/* Line 14 */}
                    <div>
                      &nbsp;&nbsp;&#125;
                    </div>
                    {/* Line 15 */}
                    <div className={currentStep.codeLine === 15 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">return</span> maxSum;
                    </div>
                    {/* Line 16 */}
                    <div>
                      &#125;
                    </div>
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
