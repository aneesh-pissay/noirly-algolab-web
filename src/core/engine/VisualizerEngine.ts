/**
 * Main Visualizer Engine - orchestrates algorithm execution and visualization
 */

import { Algorithm, AlgorithmInput, AlgorithmStep, VisualizerState } from './types';
import { visualizerStore } from './store';

export class VisualizerEngine {
  private algorithms: Map<string, Algorithm> = new Map();
  private playbackTimer: NodeJS.Timeout | null = null;

  registerAlgorithm(id: string, algorithm: Algorithm): void {
    this.algorithms.set(id, algorithm);
  }

  getAlgorithm(id: string): Algorithm | undefined {
    return this.algorithms.get(id);
  }

  getAllAlgorithms(): Map<string, Algorithm> {
    return new Map(this.algorithms);
  }

  execute(algorithmId: string, input: AlgorithmInput): AlgorithmStep[] {
    const algorithm = this.algorithms.get(algorithmId);
    if (!algorithm) {
      throw new Error(`Algorithm "${algorithmId}" not found`);
    }

    const steps = algorithm.generateSteps(input);
    visualizerStore.loadSteps(steps, algorithmId);
    return steps;
  }

  play(): void {
    const state = visualizerStore.getState();
    if (state.isPlaying) return;

    visualizerStore.play();
    this.startPlayback();
  }

  pause(): void {
    visualizerStore.pause();
    this.stopPlayback();
  }

  nextStep(): void {
    visualizerStore.nextStep();
  }

  previousStep(): void {
    visualizerStore.previousStep();
  }

  goToStep(step: number): void {
    visualizerStore.goToStep(step);
  }

  reset(): void {
    visualizerStore.reset();
    this.stopPlayback();
  }

  setSpeed(speed: number): void {
    visualizerStore.setSpeed(speed);
    if (visualizerStore.getState().isPlaying) {
      this.stopPlayback();
      this.startPlayback();
    }
  }

  subscribe(listener: (state: VisualizerState) => void): () => void {
    return visualizerStore.subscribe(listener);
  }

  getCurrentStep(): AlgorithmStep | null {
    return visualizerStore.getCurrentStep();
  }

  getState(): VisualizerState {
    return visualizerStore.getState();
  }

  private startPlayback(): void {
    const state = visualizerStore.getState();
    const interval = 1000 / state.speed;

    this.playbackTimer = setInterval(() => {
      const currentState = visualizerStore.getState();
      if (currentState.currentStep >= currentState.totalSteps - 1) {
        this.pause();
        return;
      }
      visualizerStore.nextStep();
    }, interval);
  }

  private stopPlayback(): void {
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    }
  }
}

export const visualizerEngine = new VisualizerEngine();
