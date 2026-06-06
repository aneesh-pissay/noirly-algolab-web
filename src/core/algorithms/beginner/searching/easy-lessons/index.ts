import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';

export const linearSearch = createAlgorithm(
  'Linear Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [4, 2, 7, 1, 9, 3]);
    const target = getNumber(input, 'target', 7);
    const recorder = createStepRecorder('searching', { time: 'O(n)', space: 'O(1)' });

    recorder.push({ action: 'initialize', description: `Search for ${target} sequentially`, visualizationData: { array: [...arr], target }, variables: { target }, memory: { array: [...arr] }, codeLine: 1 });

    for (let i = 0; i < arr.length; i += 1) {
      const found = arr[i] === target;
      recorder.push({
        action: found ? 'found' : 'compare',
        description: found ? `Found ${target} at index ${i}` : `arr[${i}]=${arr[i]} ≠ ${target}`,
        visualizationData: { array: [...arr], index: i },
        highlights: [i],
        variables: { index: i },
        memory: { array: [...arr] },
        codeLine: 2,
      });
      if (found) break;
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Scans the array element by element.'
);

export const binarySearch = createAlgorithm(
  'Binary Search',
  'searching',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 3, 5, 7, 9, 11, 13]).sort((a, b) => a - b);
    const target = getNumber(input, 'target', 7);
    const recorder = createStepRecorder('searching', { time: 'O(log n)', space: 'O(1)' });
    let lo = 0;
    let hi = arr.length - 1;

    recorder.push({ action: 'initialize', description: `Binary search for ${target} in sorted array`, visualizationData: { array: [...arr], lo, hi, target }, memory: { array: [...arr] }, codeLine: 1 });

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({
        action: 'compare',
        description: `mid=${mid}, arr[mid]=${arr[mid]}`,
        visualizationData: { array: [...arr], lo, hi, mid },
        highlights: [mid],
        variables: { mid },
        memory: { array: [...arr] },
        codeLine: 2,
      });
      if (arr[mid] === target) {
        recorder.push({ action: 'found', description: `Found at index ${mid}`, visualizationData: { index: mid }, variables: { index: mid }, memory: {}, codeLine: 3 });
        break;
      }
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Halves the search space on a sorted array.'
);

export const searchingBeginnerEasyAlgorithms = [linearSearch, binarySearch] as const;
