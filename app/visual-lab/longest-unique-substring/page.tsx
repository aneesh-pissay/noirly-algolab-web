'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { longestUniqueSubstring } from '@/src/core/algorithms/sliding-window/longestUniqueSubstring';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';

export default function LongestUniqueSubstringPage() {
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Register and execute algorithm
    visualizerEngine.registerAlgorithm('longest-unique-substring', longestUniqueSubstring);
    visualizerEngine.execute('longest-unique-substring', {
      str: 'abcabcbb'
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

  const stringData = currentStep.visualizationData?.str || '';
  const charArray = stringData.split('');
  const windowStart = currentStep.visualizationData?.windowStart ?? -1;
  const windowEnd = currentStep.visualizationData?.windowEnd ?? -1;
  const maxLength = currentStep.visualizationData?.maxLength ?? 0;
  const charSet = currentStep.visualizationData?.charSet || new Set();
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
              { label: 'Longest Unique Substring' },
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
                  String Visualization
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

              {/* Character Set Display */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="bg-surface-dim p-4 rounded-lg border border-outline-variant/20">
                  <span className="text-xs text-on-surface-variant block mb-1">Max Length</span>
                  <span className="font-display text-2xl text-green-400">{maxLength}</span>
                </div>
                <div className="bg-surface-dim p-4 rounded-lg border border-outline-variant/20 min-w-[200px]">
                  <span className="text-xs text-on-surface-variant block mb-1">Character Set</span>
                  <span className="font-code-md text-primary">
                    &#123;{Array.from(charSet).join(', ')}&#125;
                  </span>
                </div>
              </div>

              {/* String Blocks Canvas */}
              <div className="flex-1 flex items-center justify-center gap-3 relative flex-wrap">
                {charArray.map((char: string, index: number) => {
                  const inWindow = index >= windowStart && index <= windowEnd && windowStart !== -1;
                  const isHighlighted = highlights.includes(index);
                  const showWindowStart = windowStart === index;
                  const showWindowEnd = windowEnd === index;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
                        inWindow ? 'transform scale-110' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-16 h-20 rounded-xl flex items-center justify-center relative ${
                          inWindow
                            ? 'bg-primary-container/20 border-2 border-primary node-glow'
                            : 'bg-surface-container-high border border-outline-variant/20'
                        }`}
                      >
                        <span
                          className={`font-code-md text-2xl ${
                            inWindow ? 'text-primary' : 'text-on-surface'
                          }`}
                        >
                          '{char}'
                        </span>
                        {/* Window Start Pointer */}
                        {showWindowStart && (
                          <div className="absolute -top-10 flex flex-col items-center left-1/2 -translate-x-1/2">
                            <span className="font-code-md text-blue-400 text-sm font-bold mb-1">start</span>
                            <span
                              className="material-symbols-outlined text-blue-400 text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_down
                            </span>
                          </div>
                        )}
                        {/* Window End Pointer */}
                        {showWindowEnd && (
                          <div className="absolute -bottom-10 flex flex-col items-center left-1/2 -translate-x-1/2">
                            <span
                              className="material-symbols-outlined text-tertiary text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              arrow_drop_up
                            </span>
                            <span className="font-code-md text-tertiary text-sm font-bold mt-1">end</span>
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Window Start
                    </span>
                    <span className="font-code-md text-blue-400">{variables.windowStart ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Window End
                    </span>
                    <span className="font-code-md text-tertiary">{variables.windowEnd ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Max Length
                    </span>
                    <span className="font-code-md text-green-400">{variables.maxLength ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Current Length
                    </span>
                    <span className="font-code-md text-primary">{variables.currentLength ?? '-'}</span>
                  </div>
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Set Size
                    </span>
                    <span className="font-code-md text-primary">{variables.setSize ?? '-'}</span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">String Length</span>
                    <span className="text-on-surface font-code-md">{charArray.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-body-md">Current Substring</span>
                    <span className="text-on-surface font-code-md text-xs">
                      "{windowStart !== -1 && windowEnd !== -1 ? stringData.slice(windowStart, windowEnd + 1) : ''}"
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
                  <span className="font-code-md text-lg">{currentStep.complexity?.space || 'O(min(n,m))'}</span>
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
                  longestUnique.js
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 font-code-md text-[13px] leading-6 p-4 overflow-auto bg-surface-dim/30">
                <div className="flex gap-4">
                  <div className="text-outline-variant/40 text-right select-none pr-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((lineNum) => (
                      <div key={lineNum}>{lineNum}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className={currentStep.codeLine === 1 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      <span className="text-primary-container">function</span>{' '}
                      <span className="text-tertiary">longestUniqueSubstring</span>(str) &#123;
                    </div>
                    <div className={currentStep.codeLine === 2 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">let</span> windowStart = <span className="text-tertiary">0</span>, maxLength = <span className="text-tertiary">0</span>;
                    </div>
                    <div className={currentStep.codeLine === 3 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">const</span> charSet = <span className="text-primary-container">new</span> Set();
                    </div>
                    <div className={currentStep.codeLine === 4 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">for</span> (<span className="text-primary-container">let</span> windowEnd = <span className="text-tertiary">0</span>; windowEnd &lt; str.length; windowEnd++) &#123;
                    </div>
                    <div className={currentStep.codeLine === 5 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">while</span> (charSet.has(str[windowEnd])) &#123;
                    </div>
                    <div className={currentStep.codeLine === 6 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;charSet.delete(str[windowStart]);
                    </div>
                    <div className={currentStep.codeLine === 7 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;windowStart++;
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                    </div>
                    <div className={currentStep.codeLine === 9 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;charSet.add(str[windowEnd]);
                    </div>
                    <div className={currentStep.codeLine === 10 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;maxLength = Math.max(maxLength, windowEnd - windowStart + <span className="text-tertiary">1</span>);
                    </div>
                    <div>
                      &nbsp;&nbsp;&#125; <span className="text-primary-container">return</span> maxLength;
                    </div>
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
