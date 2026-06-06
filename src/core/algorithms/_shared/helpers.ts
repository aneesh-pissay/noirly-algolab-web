import { Algorithm, AlgorithmAction, AlgorithmCategory, AlgorithmInput, AlgorithmStep, ComplexityInfo } from '../../engine/types';

type StepPayload = {
  action?: AlgorithmAction;
  description: string;
  visualizationData?: Record<string, unknown>;
  highlights?: number[];
  variables?: Record<string, unknown>;
  memory?: Record<string, unknown>;
  codeLine?: number;
};

export function createStepRecorder(category: AlgorithmCategory, complexity: ComplexityInfo) {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;

  return {
    steps,
    push(payload: StepPayload): void {
      steps.push({
        id: stepId++,
        category,
        action: payload.action ?? 'visit',
        description: payload.description,
        visualizationData: payload.visualizationData ?? {},
        highlights: payload.highlights ?? [],
        variables: payload.variables ?? {},
        memory: payload.memory ?? {},
        complexity,
        codeLine: payload.codeLine ?? stepId,
      });
    },
  };
}

export function createAlgorithm(
  name: string,
  category: AlgorithmCategory,
  generateSteps: (input: AlgorithmInput) => AlgorithmStep[],
  complexity: ComplexityInfo,
  description: string
): Algorithm {
  return { name, category, generateSteps, complexity, description };
}

export function getNumber(input: AlgorithmInput, key: string, fallback: number): number {
  const value = input[key] as unknown;
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function getString(input: AlgorithmInput, key: string, fallback: string): string {
  const value = input[key] as unknown;
  return typeof value === 'string' ? value : fallback;
}

export function getArray(input: AlgorithmInput, fallback: number[]): number[] {
  const value = input.array as unknown;
  return Array.isArray(value) && value.every((n) => typeof n === 'number') ? [...value] : [...fallback];
}

export function getStringArray(input: AlgorithmInput, key: string, fallback: string[]): string[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((s) => typeof s === 'string') ? [...value] : [...fallback];
}

export function getMatrix(input: AlgorithmInput, key: string, fallback: number[][]): number[][] {
  const value = input[key] as unknown;
  if (Array.isArray(value) && value.every((r) => Array.isArray(r) && r.every((n) => typeof n === 'number'))) {
    return value.map((r) => [...r]);
  }
  return fallback.map((r) => [...r]);
}
