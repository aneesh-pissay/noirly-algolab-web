import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

function buildBit(arr: number[]): number[] {
  const n = arr.length;
  const bit = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i += 1) {
    let idx = i + 1;
    while (idx <= n) {
      bit[idx] += arr[i];
      idx += idx & -idx;
    }
  }
  return bit;
}

export const createBit = createDSAlgorithm(
  'Create BIT',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [3, 2, -1, 6, 5, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Create a 1-indexed Fenwick tree (BIT) for ${arr.length} elements`,
      visualizationData: { array: [...arr], bit: new Array(arr.length + 1).fill(0) },
      variables: { n: arr.length },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    recorder.push({
      action: 'place',
      description: 'Each index i is responsible for a range of size lowbit(i) = i & −i',
      visualizationData: { array: [...arr] },
      memory: { array: [...arr] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Allocates a binary indexed tree backing array.'
);

export const updateIndex = createDSAlgorithm(
  'Update Index',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [3, 2, -1, 6, 5, 4]);
    const n = arr.length;
    const bit = buildBit(arr);
    const index = Math.max(0, Math.min(n - 1, Math.trunc(getNumber(input, 'index', 2))));
    const delta = getNumber(input, 'delta', 4);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Add ${delta} at index ${index}; walk up via idx += idx & −idx`,
      visualizationData: { bit: [...bit], index, delta },
      variables: { index, delta },
      memory: { bit: [...bit] },
      codeLine: 1,
    });

    let idx = index + 1;
    while (idx <= n) {
      bit[idx] += delta;
      recorder.push({
        action: 'calculate',
        description: `bit[${idx}] += ${delta} → ${bit[idx]}; next idx = ${idx + (idx & -idx)}`,
        visualizationData: { bit: [...bit], current: idx },
        highlights: [idx],
        variables: { idx },
        memory: { bit: [...bit] },
        codeLine: 2,
      });
      idx += idx & -idx;
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Adds a delta and updates all responsible BIT nodes.'
);

export const prefixSumQuery = createDSAlgorithm(
  'Prefix Sum Query',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [3, 2, -1, 6, 5, 4]);
    const bit = buildBit(arr);
    const index = Math.max(0, Math.min(arr.length - 1, Math.trunc(getNumber(input, 'index', 4))));
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Prefix sum [0..${index}] by walking down via idx −= idx & −idx`,
      visualizationData: { bit: [...bit], index },
      variables: { index },
      memory: { bit: [...bit] },
      codeLine: 1,
    });

    let sum = 0;
    let idx = index + 1;
    while (idx > 0) {
      sum += bit[idx];
      recorder.push({
        action: 'calculate',
        description: `sum += bit[${idx}] (${bit[idx]}) → ${sum}; next idx = ${idx - (idx & -idx)}`,
        visualizationData: { bit: [...bit], current: idx, sum },
        highlights: [idx],
        variables: { sum, idx },
        memory: { bit: [...bit] },
        codeLine: 2,
      });
      idx -= idx & -idx;
    }

    recorder.push({
      action: 'found',
      description: `Prefix sum [0..${index}] = ${sum}`,
      visualizationData: { sum },
      variables: { sum },
      memory: { bit: [...bit] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Computes a prefix sum by accumulating BIT nodes.'
);

export const buildTreeBit = createDSAlgorithm(
  'Build Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 2, 3, 4]);
    const n = arr.length;
    const bit = new Array(n + 1).fill(0);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'Build the BIT in O(n) by adding each value to its parent',
      visualizationData: { array: [...arr], bit: [...bit] },
      memory: { bit: [...bit] },
      codeLine: 1,
    });

    for (let i = 1; i <= n; i += 1) {
      bit[i] += arr[i - 1];
      const parent = i + (i & -i);
      if (parent <= n) bit[parent] += bit[i];
      recorder.push({
        action: 'calculate',
        description: `bit[${i}] = ${bit[i]}; push to parent ${parent <= n ? parent : '—'}`,
        visualizationData: { bit: [...bit], current: i },
        highlights: [i],
        memory: { bit: [...bit] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Builds a Fenwick tree in linear time.'
);

export const fenwickTreeBeginnerAlgorithms = [createBit, prefixSumQuery, updateIndex, buildTreeBit] as const;
