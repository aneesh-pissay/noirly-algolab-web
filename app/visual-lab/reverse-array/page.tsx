'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { visualizerEngine } from '@/src/core/engine/VisualizerEngine';
import { reverseArray } from '@/src/core/algorithms/two-pointers/reverseArray';
import { AlgorithmStep, VisualizerState } from '@/src/core/engine/types';
import { algorithmTheory } from '@/app/data/algorithmTheory';
import AlgorithmChallenge from '@/app/components/AlgorithmChallenge';
import { getChallengeForAlgorithm } from '@/app/data/algorithmChallenges';

export default function ReverseArrayPage() {
  const pathname = usePathname();
  const [state, setState] = useState<VisualizerState | null>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<'visualization' | 'theory' | 'challenge'>('visualization');

  const isTraversalAlias = pathname === '/visual-lab/traversal';
  const topicLabel = isTraversalAlias ? 'Traversal' : 'Reverse Array';
  const codeFileLabel = isTraversalAlias ? 'traversal.js' : 'reverseArray.js';

  const theory = algorithmTheory['reverse-array'];
  const challengeQuestions = getChallengeForAlgorithm('reverse-array');

  useEffect(() => {
    // Register and execute algorithm
    visualizerEngine.registerAlgorithm('reverse-array', reverseArray);
    visualizerEngine.execute('reverse-array', {
      array: [5, 3, 8, 1, 9, 2, 7]
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

      <main className="ml-[240px] pt-16 h-screen overflow-hidden flex flex-col">
        <div className="p-4 pb-2">
          <Breadcrumbs
            items={[
              { label: 'Learning Path', href: '/learn-path' },
              { label: topicLabel },
            ]}
          />
        </div>

        {/* Tab Navigation */}
        <div className="px-4">
          <div className="flex gap-2 border-b border-outline-variant/20">
            <button
              onClick={() => setActiveTab('visualization')}
              className={`px-4 py-2.5 font-display text-sm transition-all border-b-2 ${
                activeTab === 'visualization'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">visibility</span>
                Visualization
              </span>
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-2.5 font-display text-sm transition-all border-b-2 ${
                activeTab === 'theory'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">school</span>
                Theory
              </span>
            </button>
            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-4 py-2.5 font-display text-sm transition-all border-b-2 ${
                activeTab === 'challenge'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">emoji_events</span>
                Challenge
              </span>
            </button>
          </div>
        </div>

        {/* Challenge View */}
        {activeTab === 'challenge' && (
          <div className="flex-1 overflow-y-auto p-4">
            <AlgorithmChallenge
              algorithmId="reverse-array"
              levelId={1}
              title={topicLabel}
              topicTitle={topicLabel}
              questions={challengeQuestions}
            />
          </div>
        )}

        {/* Theory View */}
        {activeTab === 'theory' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-[900px] mx-auto space-y-6">
              {/* Overview */}
              <div className="glass-panel rounded-xl p-6">
                <h2 className="font-display text-title-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  Overview
                </h2>
                <p className="text-on-surface-variant leading-relaxed">{theory?.overview}</p>
              </div>

              {/* How It Works */}
              <div className="glass-panel rounded-xl p-6">
                <h2 className="font-display text-title-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">settings</span>
                  How It Works
                </h2>
                <ol className="space-y-3">
                  {theory?.howItWorks.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-on-surface-variant">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key Points */}
              <div className="glass-panel rounded-xl p-6">
                <h2 className="font-display text-title-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  Key Points
                </h2>
                <ul className="space-y-2">
                  {theory?.keyPoints.map((point, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">check_circle</span>
                      <span className="text-on-surface-variant">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-green-500">
                  <h2 className="font-display text-title-md font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400">thumb_up</span>
                    Advantages
                  </h2>
                  <ul className="space-y-2">
                    {theory?.pros.map((pro, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="text-green-400 text-xl">+</span>
                        <span className="text-on-surface-variant text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-red-500">
                  <h2 className="font-display text-title-md font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400">thumb_down</span>
                    Disadvantages
                  </h2>
                  <ul className="space-y-2">
                    {theory?.cons.map((con, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="text-red-400 text-xl">-</span>
                        <span className="text-on-surface-variant text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Use Cases */}
              <div className="glass-panel rounded-xl p-6">
                <h2 className="font-display text-title-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">label</span>
                  Common Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {theory?.useCases.map((useCase, index) => (
                    <div key={index} className="flex gap-3 items-center p-3 bg-surface-dim rounded-lg border border-outline-variant/10">
                      <span className="material-symbols-outlined text-tertiary">arrow_right</span>
                      <span className="text-on-surface text-sm">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualization View */}
        {activeTab === 'visualization' && (
          <div className="flex-1 flex overflow-hidden p-4 gap-4 pt-2">
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
              <div className="flex-1 flex items-center justify-center gap-3 relative px-4 overflow-x-auto">
                <div className="flex gap-3 min-w-min mx-auto">
                  {arrayData.map((value: number, index: number) => {
                    const isHighlighted = highlights.includes(index);
                    const showLeft = leftPointer === index;
                    const showRight = rightPointer === index;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center gap-3 transition-all duration-500 ${
                          isHighlighted ? 'transform scale-110' : 'opacity-40'
                        }`}
                      >
                        <div
                          className={`w-16 h-20 rounded-xl flex items-center justify-center relative ${
                            isHighlighted
                              ? 'bg-primary-container/20 border-2 border-primary node-glow'
                              : 'bg-surface-container-high border border-outline-variant/20'
                          }`}
                        >
                          <span
                            className={`font-display text-2xl font-bold ${
                              isHighlighted ? 'text-primary' : 'text-on-surface'
                            }`}
                          >
                            {value}
                          </span>
                          {/* Pointer left */}
                          {showLeft && (
                            <div 
                              className={`absolute -top-10 flex flex-col items-center ${
                                showLeft && showRight 
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
                          {showRight && (
                            <div 
                              className={`absolute -top-10 flex flex-col items-center ${
                                showLeft && showRight 
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
                        <span className="font-code-md text-xs text-on-surface-variant">
                          [{index}]
                        </span>
                      </div>
                    );
                  })}
                </div>
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
                  <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/10 col-span-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase block mb-1">
                      Swaps
                    </span>
                    <span className="font-code-md text-tertiary">
                      {variables.swaps ?? 0}
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
                  {codeFileLabel}
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 font-code-md text-[13px] leading-6 p-4 overflow-auto bg-surface-dim/30">
                <div className="flex gap-4">
                  <div className="text-outline-variant/40 text-right select-none pr-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lineNum) => (
                      <div key={lineNum}>{lineNum}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    {/* Line 1 */}
                    <div className={currentStep.codeLine === 1 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      <span className="text-primary-container">function</span>{' '}
                      <span className="text-tertiary">reverseArray</span>(arr) &#123;
                    </div>
                    {/* Line 2 */}
                    <div className={currentStep.codeLine === 2 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">let</span> left = <span className="text-tertiary">0</span>;
                    </div>
                    {/* Line 3 */}
                    <div className={currentStep.codeLine === 3 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;<span className="text-primary-container">let</span> right = arr.length - <span className="text-tertiary">1</span>;
                    </div>
                    {/* Line 4 */}
                    <div>
                      &nbsp;&nbsp;<span className="text-primary-container">while</span> (left &lt; right) &#123;
                    </div>
                    {/* Line 5 */}
                    <div className={currentStep.codeLine === 5 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-container">let</span> temp = arr[left];
                    </div>
                    {/* Line 6 */}
                    <div className={currentStep.codeLine === 6 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;arr[left] = arr[right];
                    </div>
                    {/* Line 7 */}
                    <div className={currentStep.codeLine === 7 ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                      &nbsp;&nbsp;&nbsp;&nbsp;arr[right] = temp;
                    </div>
                    {/* Line 8 */}
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;left++; right--;
                    </div>
                    {/* Line 9 */}
                    <div>
                      &nbsp;&nbsp;&#125; <span className="text-primary-container">return</span> arr;
                    </div>
                    {/* Line 10 */}
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
        )}
      </main>
    </>
  );
}
