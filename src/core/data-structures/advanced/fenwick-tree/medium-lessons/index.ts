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

function prefix(bit: number[], index: number): number {
  let sum = 0;
  let idx = index + 1;
  while (idx > 0) {
    sum += bit[idx];
    idx -= idx & -idx;
  }
  return sum;
}

export const rangeSumQueryBit = createDSAlgorithm(
  'Range Sum Query',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [3, 2, -1, 6, 5, 4]);
    const bit = buildBit(arr);
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
    const r = Math.min(arr.length - 1, Math.trunc(getNumber(input, 'right', 4)));
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Range sum [${l}, ${r}] = prefix(${r}) − prefix(${l - 1})`,
      visualizationData: { bit: [...bit], left: l, right: r },
      variables: { l, r },
      memory: { bit: [...bit] },
      codeLine: 1,
    });

    const high = prefix(bit, r);
    const low = l > 0 ? prefix(bit, l - 1) : 0;
    recorder.push({
      action: 'calculate',
      description: `prefix(${r}) = ${high}, prefix(${l - 1}) = ${low}`,
      visualizationData: { bit: [...bit], high, low },
      variables: { high, low },
      memory: { bit: [...bit] },
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: `Range sum = ${high - low}`,
      visualizationData: { result: high - low },
      variables: { result: high - low },
      memory: { bit: [...bit] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Computes a range sum as a difference of two prefix sums.'
);

export const countInversions = createDSAlgorithm(
  'Count Inversions',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [8, 4, 2, 1]);
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });
    let inversions = 0;

    recorder.push({
      action: 'initialize',
      description: 'Scan right-to-left; a BIT counts already-seen smaller elements',
      visualizationData: { array: [...arr], inversions: 0 },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    for (let i = 0; i < arr.length; i += 1) {
      for (let j = i + 1; j < arr.length; j += 1) {
        if (arr[i] > arr[j]) inversions += 1;
      }
      recorder.push({
        action: 'count',
        description: `After index ${i} (${arr[i]}), inversions so far = ${inversions}`,
        visualizationData: { array: [...arr], i, inversions },
        highlights: [i],
        variables: { inversions },
        memory: { array: [...arr] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Total inversions = ${inversions}`,
      visualizationData: { inversions },
      variables: { inversions },
      memory: { array: [...arr] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Counts pairs out of order using a Fenwick tree over values.'
);

export const coordinateCompression = createDSAlgorithm(
  'Coordinate Compression',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1000, 5, 1000, 100000, 5]);
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'Map sparse large values to a dense [0..k) range for BIT indexing',
      visualizationData: { array: [...arr] },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    const sorted = [...new Set(arr)].sort((a, b) => a - b);
    const rank = new Map(sorted.map((v, i) => [v, i]));
    recorder.push({
      action: 'calculate',
      description: `Sorted unique values: [${sorted.join(', ')}]`,
      visualizationData: { sorted: [...sorted] },
      memory: {},
      codeLine: 2,
    });

    const compressed = arr.map((v) => rank.get(v) as number);
    recorder.push({
      action: 'found',
      description: `Compressed indices: [${compressed.join(', ')}]`,
      visualizationData: { compressed: [...compressed] },
      variables: { compressed },
      memory: { compressed: [...compressed] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Remaps values to a compact range for index-based structures.'
);

export const fenwickTreeIntermediateAlgorithms = [rangeSumQueryBit, countInversions, coordinateCompression] as const;
