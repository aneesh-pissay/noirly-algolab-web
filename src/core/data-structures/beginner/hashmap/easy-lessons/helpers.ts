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

export function createHashMapAlgorithm(
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

export function getString(input: AlgorithmInput, key: string, fallback: string): string {
  const value = input[key] as unknown;
  return typeof value === 'string' ? value : fallback;
}

export function getNumber(input: AlgorithmInput, key: string, fallback: number): number {
  const value = input[key] as unknown;
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function getNumberArray(input: AlgorithmInput, key: string, fallback: number[]): number[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((item) => typeof item === 'number') ? [...value] : [...fallback];
}

export function getStringArray(input: AlgorithmInput, key: string, fallback: string[]): string[] {
  const value = input[key] as unknown;
  return Array.isArray(value) && value.every((item) => typeof item === 'string') ? [...value] : [...fallback];
}

export function mapToRecord(map: Map<string, number>): Record<string, number> {
  return Object.fromEntries(map.entries());
}
