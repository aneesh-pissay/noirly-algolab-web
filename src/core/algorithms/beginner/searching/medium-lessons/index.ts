import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';

export const jumpSearch = createAlgorithm(
  'Jump Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).sort((a, b) => a - b);
    const target = getNumber(input, 'target', 6);
    const recorder = createStepRecorder('searching', { time: 'O(√n)', space: 'O(1)' });
    const step = Math.floor(Math.sqrt(arr.length));
    let prev = 0;

    recorder.push({ action: 'initialize', description: `Jump by √n=${step}, then linear scan block`, visualizationData: { array: [...arr], step, target }, memory: { array: [...arr] }, codeLine: 1 });

    let i = Math.min(step, arr.length) - 1;
    while (arr[i] < target) {
      prev = i;
      i = Math.min(i + step, arr.length - 1);
      recorder.push({ action: 'move-pointer', description: `Jump to index ${i} (value ${arr[i]})`, visualizationData: { array: [...arr], i, prev }, highlights: [i], memory: { array: [...arr] }, codeLine: 2 });
      if (i === arr.length - 1) break;
    }

    for (let j = prev; j <= i; j += 1) {
      recorder.push({ action: 'compare', description: `Linear scan index ${j}`, visualizationData: { array: [...arr], j }, highlights: [j], memory: { array: [...arr] }, codeLine: 3 });
      if (arr[j] === target) {
        recorder.push({ action: 'found', description: `Found at ${j}`, visualizationData: { index: j }, memory: {}, codeLine: 4 });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(√n)', space: 'O(1)' },
  'Jumps √n steps then linearly scans the block.'
);

export const exponentialSearch = createAlgorithm(
  'Exponential Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [2, 3, 4, 10, 40, 50, 70, 80]).sort((a, b) => a - b);
    const target = getNumber(input, 'target', 40);
    const recorder = createStepRecorder('searching', { time: 'O(log n)', space: 'O(1)' });
    let bound = 1;

    recorder.push({ action: 'initialize', description: 'Double index until arr[bound] ≥ target, then binary search range', visualizationData: { array: [...arr], target }, memory: { array: [...arr] }, codeLine: 1 });

    while (bound < arr.length && arr[bound] < target) {
      recorder.push({ action: 'move-pointer', description: `bound=${bound}, arr[bound]=${arr[bound]}`, visualizationData: { bound }, highlights: [bound], memory: { array: [...arr] }, codeLine: 2 });
      bound *= 2;
    }

    let lo = Math.floor(bound / 2);
    let hi = Math.min(bound, arr.length - 1);
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({ action: 'compare', description: `Binary search mid=${mid}`, visualizationData: { lo, hi, mid }, highlights: [mid], memory: { array: [...arr] }, codeLine: 3 });
      if (arr[mid] === target) break;
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Finds a range by doubling, then binary searches.'
);

export const interpolationSearch = createAlgorithm(
  'Interpolation Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [10, 20, 30, 40, 50, 60, 70]).sort((a, b) => a - b);
    const target = getNumber(input, 'target', 50);
    const recorder = createStepRecorder('searching', { time: 'O(log log n) avg', space: 'O(1)' });
    let lo = 0;
    let hi = arr.length - 1;

    recorder.push({ action: 'initialize', description: 'Probe position estimated by value distribution', visualizationData: { array: [...arr], target }, memory: { array: [...arr] }, codeLine: 1 });

    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
      const pos = lo + Math.floor(((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo] || 1));
      recorder.push({ action: 'compare', description: `Interpolated probe pos=${pos}, value=${arr[pos]}`, visualizationData: { lo, hi, pos }, highlights: [pos], memory: { array: [...arr] }, codeLine: 2 });
      if (arr[pos] === target) break;
      if (arr[pos] < target) lo = pos + 1;
      else hi = pos - 1;
    }

    return recorder.steps;
  },
  { time: 'O(log log n) avg', space: 'O(1)' },
  'Probes based on value distribution in sorted data.'
);

export const ternarySearch = createAlgorithm(
  'Ternary Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 3, 5, 7, 9, 11, 13, 15]);
    const target = getNumber(input, 'target', 9);
    const recorder = createStepRecorder('searching', { time: 'O(log₃ n)', space: 'O(1)' });
    let lo = 0;
    let hi = arr.length - 1;

    recorder.push({ action: 'initialize', description: 'Split range into thirds, discard two-thirds each step', visualizationData: { array: [...arr], target }, memory: { array: [...arr] }, codeLine: 1 });

    while (lo <= hi) {
      const mid1 = lo + Math.floor((hi - lo) / 3);
      const mid2 = hi - Math.floor((hi - lo) / 3);
      recorder.push({ action: 'compare', description: `Thirds at ${mid1} (${arr[mid1]}) and ${mid2} (${arr[mid2]})`, visualizationData: { lo, hi, mid1, mid2 }, highlights: [mid1, mid2], memory: { array: [...arr] }, codeLine: 2 });
      if (arr[mid1] === target || arr[mid2] === target) break;
      if (target < arr[mid1]) hi = mid1 - 1;
      else if (target > arr[mid2]) lo = mid2 + 1;
      else { lo = mid1 + 1; hi = mid2 - 1; }
    }

    return recorder.steps;
  },
  { time: 'O(log₃ n)', space: 'O(1)' },
  'Divides the search interval into three parts.'
);

export const searchingBeginnerMediumAlgorithms = [jumpSearch, exponentialSearch, interpolationSearch, ternarySearch] as const;
