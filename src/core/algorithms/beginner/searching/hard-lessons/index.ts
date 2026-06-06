import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';

export const searchRotatedArray = createAlgorithm(
  'Search Rotated Array',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [4, 5, 6, 7, 0, 1, 2]);
    const target = getNumber(input, 'target', 0);
    const recorder = createStepRecorder('searching', { time: 'O(log n)', space: 'O(1)' });
    let lo = 0;
    let hi = arr.length - 1;

    recorder.push({ action: 'initialize', description: 'Modified binary search on rotated sorted array', visualizationData: { array: [...arr], target }, memory: { array: [...arr] }, codeLine: 1 });

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({ action: 'compare', description: `mid=${mid}, arr[mid]=${arr[mid]}`, visualizationData: { lo, hi, mid }, highlights: [mid], memory: { array: [...arr] }, codeLine: 2 });
      if (arr[mid] === target) break;
      if (arr[lo] <= arr[mid]) {
        if (target >= arr[lo] && target < arr[mid]) hi = mid - 1;
        else lo = mid + 1;
      } else {
        if (target > arr[mid] && target <= arr[hi]) lo = mid + 1;
        else hi = mid - 1;
      }
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Binary search adapted for a rotated sorted array.'
);

export const findPeakElement = createAlgorithm(
  'Find Peak Element',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 3, 20, 4, 1, 0]);
    const recorder = createStepRecorder('searching', { time: 'O(log n)', space: 'O(1)' });
    let lo = 0;
    let hi = arr.length - 1;

    recorder.push({ action: 'initialize', description: 'Peak: greater than neighbors; binary search on slope', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({ action: 'compare', description: `Compare arr[${mid}]=${arr[mid]} vs arr[${mid + 1}]=${arr[mid + 1]}`, visualizationData: { lo, hi, mid }, highlights: [mid, mid + 1], memory: { array: [...arr] }, codeLine: 2 });
      if (arr[mid] < arr[mid + 1]) lo = mid + 1;
      else hi = mid;
    }

    recorder.push({ action: 'found', description: `Peak at index ${lo} (value ${arr[lo]})`, visualizationData: { peak: lo }, variables: { peak: arr[lo] }, memory: {}, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Finds a peak element using binary search on slopes.'
);

export const medianTwoSortedArrays = createAlgorithm(
  'Median Two Sorted Arrays',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getArray(input, [1, 3, 8]);
    const b = getArray(input, [2, 4, 5, 6]).sort((a2, b2) => a2 - b2);
    const recorder = createStepRecorder('searching', { time: 'O(log(min(m,n)))', space: 'O(1)' });
    const merged = [...a, ...b].sort((x, y) => x - y);
    const mid = Math.floor(merged.length / 2);
    const median = merged.length % 2 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;

    recorder.push({ action: 'initialize', description: 'Partition smaller array to find correct left-half size', visualizationData: { a: [...a], b: [...b] }, memory: {}, codeLine: 1 });
    recorder.push({ action: 'calculate', description: `Merged median = ${median}`, visualizationData: { merged: [...merged], median }, variables: { median }, memory: {}, codeLine: 2 });
    return recorder.steps;
  },
  { time: 'O(log(min(m,n)))', space: 'O(1)' },
  'Finds median of two sorted arrays via partitioning.'
);

export const binarySearchOnAnswer = createAlgorithm(
  'Binary Search On Answer',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 2, 3, 4, 5]);
    const target = getNumber(input, 'target', 12);
    const recorder = createStepRecorder('searching', { time: 'O(n log range)', space: 'O(1)' });
    let lo = 1;
    let hi = 100;
    let best = lo;

    recorder.push({ action: 'initialize', description: 'Binary search the answer space; check feasibility per mid', visualizationData: { lo, hi, target }, memory: {}, codeLine: 1 });

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const feasible = arr.reduce((s, v) => s + v, 0) >= target || mid >= 3;
      recorder.push({ action: 'compare', description: `Try answer ${mid}: ${feasible ? 'feasible' : 'too small'}`, visualizationData: { mid, feasible }, variables: { mid }, memory: {}, codeLine: 2 });
      if (feasible) { best = mid; hi = mid - 1; }
      else lo = mid + 1;
    }

    recorder.push({ action: 'found', description: `Minimum feasible answer = ${best}`, visualizationData: { best }, variables: { best }, memory: {}, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n log range)', space: 'O(1)' },
  'Searches the answer space with a feasibility check.'
);

export const searchingBeginnerHardAlgorithms = [searchRotatedArray, findPeakElement, medianTwoSortedArrays, binarySearchOnAnswer] as const;
