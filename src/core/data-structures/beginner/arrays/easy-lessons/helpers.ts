import { Algorithm, AlgorithmAction, AlgorithmInput, AlgorithmStep, ComplexityInfo } from '../../../../engine/types';

type StepPayload = {
  action?: AlgorithmAction;
  description: string;
  visualizationData?: Record<string, unknown>;
  highlights?: number[];
  variables?: Record<string, unknown>;
  memory?: Record<string, unknown>;
  codeLine?: number;
};

export function createStepRecorder(complexity: ComplexityInfo) {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;

  return {
    steps,
    push(payload: StepPayload): void {
      steps.push({
        id: stepId++,
        category: 'data-structure',
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

export function createArrayAlgorithm(
  name: string,
  generateSteps: (input: AlgorithmInput) => AlgorithmStep[],
  complexity: ComplexityInfo,
  description: string
): Algorithm {
  return {
    name,
    category: 'data-structure',
    generateSteps,
    complexity,
    description,
  };
}

export function getArray(input: AlgorithmInput, fallback: number[]): number[] {
  return input.array ? [...input.array] : [...fallback];
}

export function getNumber(input: AlgorithmInput, key: string, fallback: number): number {
  const value = input[key] as unknown;
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function getNumberArray(input: AlgorithmInput, key: string, fallback: number[]): number[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((item) => typeof item === 'number') ? [...value] : [...fallback];
}

export function getMatrix(input: AlgorithmInput, fallback: number[][]): number[][] {
  const value = input.matrix as unknown;
  if (Array.isArray(value) && value.every((row) => Array.isArray(row) && row.every((item) => typeof item === 'number'))) {
    return value.map((row) => [...row]);
  }
  return fallback.map((row) => [...row]);
}

export function getIntervals(input: AlgorithmInput, fallback: number[][]): number[][] {
  const value = input.intervals as unknown;
  if (
    Array.isArray(value) &&
    value.every(
      (interval) =>
        Array.isArray(interval) &&
        interval.length >= 2 &&
        typeof interval[0] === 'number' &&
        typeof interval[1] === 'number'
    )
  ) {
    return value.map((interval) => [interval[0], interval[1]]);
  }
  return fallback.map((interval) => [...interval]);
}

export function cloneCounts(counts: Map<number, number>): Record<string, number> {
  return Object.fromEntries([...counts.entries()].map(([key, value]) => [String(key), value]));
}

export function cloneIndexMap(indexMap: Map<number, number>): Record<string, number> {
  return Object.fromEntries([...indexMap.entries()].map(([key, value]) => [String(key), value]));
}
