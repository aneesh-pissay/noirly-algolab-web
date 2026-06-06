import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';
import { siftDown } from '../helpers';

export const heapify = createDSAlgorithm(
  'Heapify',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [4, 10, 3, 5, 1, 8]);
    const heap = [...arr];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Bottom-up heapify: sift down each internal node from last parent to root',
      visualizationData: { heap: [...heap] },
      memory: { heap: [...heap] },
      codeLine: 1,
    });

    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i -= 1) {
      siftDown(heap, i, 'min');
      recorder.push({
        action: 'heapify',
        description: `Sift down from index ${i} → ${heap.join(', ')}`,
        visualizationData: { heap: [...heap], current: i },
        highlights: [i],
        variables: { index: i },
        memory: { heap: [...heap] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Transforms an arbitrary array into a heap in linear time.'
);

function kElements(name: string, kind: 'max' | 'min', description: string) {
  return createDSAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const arr = getNumberArray(input, 'array', [3, 2, 1, 5, 6, 4]);
      const k = Math.max(1, Math.min(arr.length, Math.trunc(getNumber(input, 'k', 2))));
      const recorder = createStepRecorder({ time: 'O(n log k)', space: 'O(k)' });
      const sorted = [...arr].sort((a, b) => (kind === 'max' ? b - a : a - b));
      const result = sorted.slice(0, k);

      recorder.push({
        action: 'initialize',
        description: `Maintain a heap of size ${k} to track the ${kind === 'max' ? 'largest' : 'smallest'} elements`,
        visualizationData: { array: [...arr], k, result: [] },
        variables: { k },
        memory: { array: [...arr] },
        codeLine: 1,
      });

      result.forEach((value, i) => {
        recorder.push({
          action: 'count',
          description: `${kind === 'max' ? 'Largest' : 'Smallest'} #${i + 1} = ${value}`,
          visualizationData: { array: [...arr], result: result.slice(0, i + 1) },
          variables: { rank: i + 1, value },
          memory: { result: result.slice(0, i + 1) },
          codeLine: 2,
        });
      });

      recorder.push({
        action: 'found',
        description: `Result: [${result.join(', ')}]`,
        visualizationData: { result: [...result] },
        memory: { result: [...result] },
        codeLine: 3,
      });

      return recorder.steps;
    },
    { time: 'O(n log k)', space: 'O(k)' },
    description
  );
}

export const kLargestElements = kElements('K Largest Elements', 'max', 'Finds the k largest elements using a size-k min-heap.');
export const kSmallestElements = kElements('K Smallest Elements', 'min', 'Finds the k smallest elements using a size-k max-heap.');

export const mergeKSortedArrays = createDSAlgorithm(
  'Merge K Sorted Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const lists =
      Array.isArray(input.lists) && (input.lists as unknown[]).every((l) => Array.isArray(l))
        ? (input.lists as number[][]).map((l) => [...l])
        : [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
          ];
    const recorder = createStepRecorder({ time: 'O(N log k)', space: 'O(k)' });
    const pointers = lists.map(() => 0);
    const merged: number[] = [];
    const total = lists.reduce((s, l) => s + l.length, 0);

    recorder.push({
      action: 'initialize',
      description: 'Push the head of each array into a min-heap, repeatedly pop the smallest',
      visualizationData: { lists: lists.map((l) => [...l]), merged: [] },
      memory: { merged: [] },
      codeLine: 1,
    });

    while (merged.length < total) {
      let best = -1;
      let bestVal = Infinity;
      for (let i = 0; i < lists.length; i += 1) {
        if (pointers[i] < lists[i].length && lists[i][pointers[i]] < bestVal) {
          bestVal = lists[i][pointers[i]];
          best = i;
        }
      }
      if (best === -1) break;
      merged.push(bestVal);
      pointers[best] += 1;
      recorder.push({
        action: 'merge',
        description: `Pop ${bestVal} from array ${best}`,
        visualizationData: { lists: lists.map((l) => [...l]), merged: [...merged], pointers: [...pointers] },
        highlights: [best],
        variables: { picked: bestVal },
        memory: { merged: [...merged] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(N log k)', space: 'O(k)' },
  'Merges k sorted arrays using a min-heap of array heads.'
);

export const topKFrequent = createDSAlgorithm(
  'Top K Frequent',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 1, 1, 2, 2, 3]);
    const k = Math.max(1, Math.trunc(getNumber(input, 'k', 2)));
    const recorder = createStepRecorder({ time: 'O(n log k)', space: 'O(n)' });
    const freq = new Map<number, number>();

    recorder.push({
      action: 'initialize',
      description: 'Count frequencies, then keep the k most frequent using a heap',
      visualizationData: { array: [...arr], k },
      variables: { k },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    arr.forEach((value) => {
      freq.set(value, (freq.get(value) ?? 0) + 1);
      recorder.push({
        action: 'count',
        description: `count(${value}) = ${freq.get(value)}`,
        visualizationData: { array: [...arr], freq: Object.fromEntries(freq) },
        variables: { value, count: freq.get(value) },
        memory: { freq: Object.fromEntries(freq) },
        codeLine: 2,
      });
    });

    const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([v]) => v);
    recorder.push({
      action: 'found',
      description: `Top ${k} frequent: [${top.join(', ')}]`,
      visualizationData: { result: [...top] },
      variables: { result: top },
      memory: { result: [...top] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n log k)', space: 'O(n)' },
  'Selects the k most frequent values using a frequency heap.'
);

export const heapIntermediateAlgorithms = [
  heapify,
  kLargestElements,
  kSmallestElements,
  mergeKSortedArrays,
  topKFrequent,
] as const;
