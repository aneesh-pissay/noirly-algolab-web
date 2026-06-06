/**
 * State management for the visualization engine
 */

import { AlgorithmStep, VisualizerState } from './types';

class VisualizerStore {
  private state: VisualizerState = {
    currentStep: 0,
    totalSteps: 0,
    isPlaying: false,
    speed: 1,
    steps: [],
    algorithm: null,
  };

  private listeners: Set<(state: VisualizerState) => void> = new Set();

  getState(): VisualizerState {
    return { ...this.state };
  }

  setState(updates: Partial<VisualizerState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  loadSteps(steps: AlgorithmStep[], algorithm: string): void {
    this.state = {
      ...this.state,
      steps,
      algorithm,
      totalSteps: steps.length,
      currentStep: 0,
      isPlaying: false,
    };
    this.notifyListeners();
  }

  nextStep(): void {
    if (this.state.currentStep < this.state.totalSteps - 1) {
      this.state.currentStep += 1;
      this.notifyListeners();
    }
  }

  previousStep(): void {
    if (this.state.currentStep > 0) {
      this.state.currentStep -= 1;
      this.notifyListeners();
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step < this.state.totalSteps) {
      this.state.currentStep = step;
      this.notifyListeners();
    }
  }

  play(): void {
    this.state.isPlaying = true;
    this.notifyListeners();
  }

  pause(): void {
    this.state.isPlaying = false;
    this.notifyListeners();
  }

  reset(): void {
    this.state.currentStep = 0;
    this.state.isPlaying = false;
    this.notifyListeners();
  }

  setSpeed(speed: number): void {
    this.state.speed = speed;
    this.notifyListeners();
  }

  getCurrentStep(): AlgorithmStep | null {
    if (this.state.steps.length === 0) return null;
    return this.state.steps[this.state.currentStep];
  }

  subscribe(listener: (state: VisualizerState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getState()));
  }
}

export const visualizerStore = new VisualizerStore();
