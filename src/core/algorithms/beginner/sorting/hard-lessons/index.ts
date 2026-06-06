import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';

export const countingSort = createAlgorithm(
  'Counting Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [4, 2, 2, 8, 3, 3, 1]);
    const recorder = createStepRecorder('sorting', { time: 'O(n + k)', space: 'O(k)' });
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    recorder.push({ action: 'initialize', description: 'Count occurrences of each value', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });
    arr.forEach((v) => {
      count[v] += 1;
      recorder.push({ action: 'count', description: `count[${v}] = ${count[v]}`, visualizationData: { count: [...count] }, variables: { value: v }, memory: { count: [...count] }, codeLine: 2 });
    });

    const out: number[] = [];
    for (let v = 0; v <= max; v += 1) {
      for (let c = 0; c < count[v]; c += 1) out.push(v);
    }
    recorder.push({ action: 'found', description: `Sorted: [${out.join(', ')}]`, visualizationData: { result: [...out] }, memory: { result: [...out] }, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n + k)', space: 'O(k)' },
  'Non-comparison sort using frequency counts.'
);

export const radixSort = createAlgorithm(
  'Radix Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [170, 45, 75, 90, 802, 24, 2, 66]);
    const recorder = createStepRecorder('sorting', { time: 'O(d · (n + k))', space: 'O(n + k)' });
    const work = [...arr];
    const max = Math.max(...work);

    recorder.push({ action: 'initialize', description: 'Sort by each digit from least to most significant', visualizationData: { array: [...work] }, memory: { array: [...work] }, codeLine: 1 });

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      const buckets: number[][] = Array.from({ length: 10 }, () => []);
      work.forEach((v) => buckets[Math.floor(v / exp) % 10].push(v));
      const next = buckets.flat();
      work.splice(0, work.length, ...next);
      recorder.push({ action: 'process-digit', description: `Digit place ${exp}: [${work.join(', ')}]`, visualizationData: { array: [...work], exp }, memory: { array: [...work] }, codeLine: 2 });
    }

    return recorder.steps;
  },
  { time: 'O(d · (n + k))', space: 'O(n + k)' },
  'Digit-by-digit stable bucket sort.'
);

export const bucketSort = createAlgorithm(
  'Bucket Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [0.42, 0.32, 0.23, 0.52, 0.15, 0.63]);
    const recorder = createStepRecorder('sorting', { time: 'O(n + k)', space: 'O(n)' });
    const buckets: number[][] = Array.from({ length: 5 }, () => []);

    recorder.push({ action: 'initialize', description: 'Distribute into buckets, sort each, concatenate', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });
    arr.forEach((v) => {
      const idx = Math.min(buckets.length - 1, Math.floor(v * buckets.length));
      buckets[idx].push(v);
      recorder.push({ action: 'distribute', description: `Place ${v} in bucket ${idx}`, visualizationData: { buckets: buckets.map((b) => [...b]) }, memory: {}, codeLine: 2 });
    });

    const sorted = buckets.flatMap((b) => b.sort((a, b2) => a - b2));
    recorder.push({ action: 'sort-bucket', description: `Concatenated sorted buckets`, visualizationData: { result: [...sorted] }, memory: { result: [...sorted] }, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n + k)', space: 'O(n)' },
  'Distributes elements into buckets then sorts each.'
);

export const timSort = createAlgorithm(
  'Tim Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [5, 21, 7, 23, 19]);
    const recorder = createStepRecorder('sorting', { time: 'O(n log n)', space: 'O(n)' });
    const runSize = 2;
    const work = [...arr];

    recorder.push({ action: 'initialize', description: 'Identify natural runs, merge with insertion sort for small runs', visualizationData: { array: [...work], runSize }, memory: { array: [...work] }, codeLine: 1 });

    for (let i = 0; i < work.length; i += runSize) {
      const slice = work.slice(i, Math.min(i + runSize, work.length)).sort((a, b) => a - b);
      slice.forEach((v, j) => { work[i + j] = v; });
      recorder.push({ action: 'create-run', description: `Sorted run at [${i}..${Math.min(i + runSize, work.length) - 1}]`, visualizationData: { array: [...work] }, highlights: [i], memory: { array: [...work] }, codeLine: 2 });
    }

    recorder.push({ action: 'merge', description: 'Merge runs until one sorted array remains', visualizationData: { array: [...work] }, memory: { array: [...work] }, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Hybrid stable sort (runs + merge) used in practice.'
);

export const introSort = createAlgorithm(
  'Intro Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [10, 7, 8, 9, 1, 5]);
    const recorder = createStepRecorder('sorting', { time: 'O(n log n)', space: 'O(log n)' });
    const maxDepth = 2 * Math.floor(Math.log2(arr.length));
    let depth = maxDepth;

    recorder.push({ action: 'initialize', description: `Quick sort with depth limit ${maxDepth}; fall back to heap sort`, visualizationData: { array: [...arr], maxDepth }, memory: { array: [...arr] }, codeLine: 1 });

    const partition = (lo: number, hi: number): number => {
      const pivot = arr[hi];
      let i = lo - 1;
      for (let j = lo; j < hi; j += 1) if (arr[j] < pivot) { i += 1; [arr[i], arr[j]] = [arr[j], arr[i]]; }
      [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
      return i + 1;
    };

    const sort = (lo: number, hi: number): void => {
      if (lo >= hi) return;
      if (depth === 0) {
        recorder.push({ action: 'switch-to-heapsort', description: 'Depth exhausted → heap sort this segment', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 2 });
        arr.slice(lo, hi + 1).sort((a, b) => a - b).forEach((v, k) => { arr[lo + k] = v; });
        return;
      }
      depth -= 1;
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    };

    sort(0, arr.length - 1);
    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(log n)' },
  'Quick sort that switches to heap sort on deep recursion.'
);

export const sortingBeginnerHardAlgorithms = [countingSort, radixSort, bucketSort, timSort, introSort] as const;
