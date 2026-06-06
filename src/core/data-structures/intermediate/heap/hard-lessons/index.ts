import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

export const medianFromStream = createDSAlgorithm(
  'Median From Stream',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stream = getNumberArray(input, 'array', [5, 15, 1, 3, 8, 7, 9, 10, 20, 6]);
    const recorder = createStepRecorder({ time: 'O(log n) per add', space: 'O(n)' });
    const lower: number[] = []; // max-heap (store sorted asc, max at end)
    const upper: number[] = []; // min-heap (store sorted asc, min at front)

    recorder.push({
      action: 'initialize',
      description: 'Two heaps: max-heap for the lower half, min-heap for the upper half',
      visualizationData: { lower: [], upper: [], median: null },
      memory: {},
      codeLine: 1,
    });

    const median = (): number =>
      lower.length === upper.length
        ? (lower[lower.length - 1] + upper[0]) / 2
        : lower.length > upper.length
        ? lower[lower.length - 1]
        : upper[0];

    stream.forEach((value) => {
      if (lower.length === 0 || value <= lower[lower.length - 1]) {
        lower.push(value);
        lower.sort((a, b) => a - b);
      } else {
        upper.push(value);
        upper.sort((a, b) => a - b);
      }
      // rebalance
      if (lower.length > upper.length + 1) upper.unshift(lower.pop() as number);
      else if (upper.length > lower.length) lower.push(upper.shift() as number);

      recorder.push({
        action: 'calculate',
        description: `Add ${value} → median = ${median()}`,
        visualizationData: { lower: [...lower], upper: [...upper], median: median() },
        variables: { added: value, median: median() },
        memory: { lower: [...lower], upper: [...upper] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(log n) per add', space: 'O(n)' },
  'Maintains a running median using balanced min/max heaps.'
);

export const slidingWindowMedian = createDSAlgorithm(
  'Sliding Window Median',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 3, -1, -3, 5, 3, 6, 7]);
    const k = Math.max(1, Math.min(arr.length, Math.trunc(getNumber(input, 'k', 3))));
    const recorder = createStepRecorder({ time: 'O(n log k)', space: 'O(k)' });
    const medians: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `Track the median of each window of size ${k} using two heaps`,
      visualizationData: { array: [...arr], k },
      variables: { k },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    for (let i = 0; i + k <= arr.length; i += 1) {
      const window = arr.slice(i, i + k).sort((a, b) => a - b);
      const mid = Math.floor(k / 2);
      const med = k % 2 ? window[mid] : (window[mid - 1] + window[mid]) / 2;
      medians.push(med);
      recorder.push({
        action: 'calculate',
        description: `Window [${arr.slice(i, i + k).join(', ')}] → median ${med}`,
        visualizationData: { array: [...arr], windowStart: i, medians: [...medians] },
        highlights: Array.from({ length: k }, (_, j) => i + j),
        variables: { median: med },
        memory: { medians: [...medians] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n log k)', space: 'O(k)' },
  'Computes the median of every sliding window using dual heaps.'
);

export const minimumCostProblems = createDSAlgorithm(
  'Minimum Cost Problems',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const sticks = getNumberArray(input, 'array', [2, 4, 3]);
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });
    const heap = [...sticks].sort((a, b) => a - b);
    let cost = 0;

    recorder.push({
      action: 'initialize',
      description: 'Connect sticks (Huffman-style): always combine the two smallest',
      visualizationData: { heap: [...heap], cost },
      memory: { heap: [...heap] },
      codeLine: 1,
    });

    while (heap.length > 1) {
      const a = heap.shift() as number;
      const b = heap.shift() as number;
      const sum = a + b;
      cost += sum;
      heap.push(sum);
      heap.sort((x, y) => x - y);
      recorder.push({
        action: 'merge',
        description: `Combine ${a} + ${b} = ${sum}, running cost = ${cost}`,
        visualizationData: { heap: [...heap], cost, combined: sum },
        variables: { combined: sum, cost },
        memory: { heap: [...heap] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Minimum total cost = ${cost}`,
      visualizationData: { cost },
      variables: { cost },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Solves minimum-cost combination problems with a greedy min-heap.'
);

export const heapAdvancedAlgorithms = [medianFromStream, slidingWindowMedian, minimumCostProblems] as const;
