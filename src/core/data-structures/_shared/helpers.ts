import { Algorithm, AlgorithmAction, AlgorithmInput, AlgorithmStep, ComplexityInfo } from '../../engine/types';

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

export function createDSAlgorithm(
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

export function getNumber(input: AlgorithmInput, key: string, fallback: number): number {
  const value = input[key] as unknown;
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function getString(input: AlgorithmInput, key: string, fallback: string): string {
  const value = input[key] as unknown;
  return typeof value === 'string' ? value : fallback;
}

export function getNumberArray(input: AlgorithmInput, key: string, fallback: number[]): number[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((item) => typeof item === 'number') ? [...value] : [...fallback];
}

export function getStringArray(input: AlgorithmInput, key: string, fallback: string[]): string[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((item) => typeof item === 'string') ? [...value] : [...fallback];
}

export function getMatrix(input: AlgorithmInput, key: string, fallback: number[][]): number[][] {
  const value = input[key] as unknown;
  if (Array.isArray(value) && value.every((row) => Array.isArray(row) && row.every((n) => typeof n === 'number'))) {
    return value.map((row) => [...row]);
  }
  return fallback.map((row) => [...row]);
}

export function getEdges(input: AlgorithmInput, fallback: Array<[number, number, number?]>): Array<[number, number, number?]> {
  const value = input.edges as unknown;
  if (Array.isArray(value) && value.every((e) => Array.isArray(e) && e.length >= 2)) {
    return value.map((e) => [Number(e[0]), Number(e[1]), e[2] !== undefined ? Number(e[2]) : undefined] as [number, number, number?]);
  }
  return fallback.map((e) => [...e] as [number, number, number?]);
}
