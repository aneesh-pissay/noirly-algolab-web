import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';

export const generateSubsets = createAlgorithm(
  'Generate Subsets',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 2, 3]);
    const recorder = createStepRecorder('recursion', { time: 'O(2^n)', space: 'O(n)' });
    const subsets: number[][] = [];

    recorder.push({ action: 'initialize', description: 'Include/exclude each element — power set', visualizationData: { array: [...arr] }, memory: {}, codeLine: 1 });

    const build = (i: number, cur: number[]): void => {
      if (i === arr.length) {
        subsets.push([...cur]);
        recorder.push({ action: 'found', description: `Subset [${cur.join(', ')}]`, visualizationData: { subset: [...cur] }, memory: { subsets: subsets.map((s) => [...s]) }, codeLine: 2 });
        return;
      }
      build(i + 1, cur);
      build(i + 1, [...cur, arr[i]]);
    };
    build(0, []);
    return recorder.steps;
  },
  { time: 'O(2^n)', space: 'O(n)' },
  'Generates all subsets via recursive include/exclude.'
);

export const generatePermutations = createAlgorithm(
  'Generate Permutations',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 2, 3]);
    const recorder = createStepRecorder('recursion', { time: 'O(n!)', space: 'O(n)' });
    const perms: number[][] = [];

    recorder.push({ action: 'initialize', description: 'Swap-and-recurse permutation generation', visualizationData: { array: [...arr] }, memory: {}, codeLine: 1 });

    const permute = (start: number): void => {
      if (start === arr.length) {
        perms.push([...arr]);
        recorder.push({ action: 'found', description: `Permutation [${arr.join(', ')}]`, visualizationData: { perm: [...arr] }, memory: {}, codeLine: 2 });
        return;
      }
      for (let i = start; i < arr.length; i += 1) {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        recorder.push({ action: 'swap', description: `Swap ${start}↔${i}`, visualizationData: { array: [...arr] }, highlights: [start, i], memory: {}, codeLine: 3 });
        permute(start + 1);
        [arr[start], arr[i]] = [arr[i], arr[start]];
      }
    };
    permute(0);
    return recorder.steps;
  },
  { time: 'O(n!)', space: 'O(n)' },
  'Generates all permutations by swapping and recursing.'
);

export const towerOfHanoi = createAlgorithm(
  'Tower Of Hanoi',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = Math.max(1, Math.min(5, Math.trunc(getNumber(input, 'n', 3))));
    const recorder = createStepRecorder('recursion', { time: 'O(2^n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: `Move ${n} disks from A to C via B`, visualizationData: { n }, variables: { n }, memory: {}, codeLine: 1 });

    const move = (k: number, from: string, to: string, aux: string): void => {
      if (k === 1) {
        recorder.push({ action: 'move-pointer', description: `Move disk 1: ${from} → ${to}`, visualizationData: { from, to }, memory: {}, codeLine: 2 });
        return;
      }
      move(k - 1, from, aux, to);
      recorder.push({ action: 'move-pointer', description: `Move disk ${k}: ${from} → ${to}`, visualizationData: { disk: k, from, to }, memory: {}, codeLine: 3 });
      move(k - 1, aux, to, from);
    };
    move(n, 'A', 'C', 'B');
    return recorder.steps;
  },
  { time: 'O(2^n)', space: 'O(n)' },
  'Classic recursive Tower of Hanoi moves.'
);

export const recursiveBinarySearch = createAlgorithm(
  'Recursive Binary Search',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 3, 5, 7, 9]).sort((a, b) => a - b);
    const target = getNumber(input, 'target', 5);
    const recorder = createStepRecorder('recursion', { time: 'O(log n)', space: 'O(log n)' });

    recorder.push({ action: 'initialize', description: `Recursive binary search for ${target}`, visualizationData: { array: [...arr], target }, memory: { array: [...arr] }, codeLine: 1 });

    const search = (lo: number, hi: number): number => {
      if (lo > hi) return -1;
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({ action: 'compare', description: `search(${lo}, ${hi}) mid=${mid}`, visualizationData: { lo, hi, mid }, highlights: [mid], memory: { array: [...arr] }, codeLine: 2 });
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) return search(mid + 1, hi);
      return search(lo, mid - 1);
    };
    search(0, arr.length - 1);
    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(log n)' },
  'Binary search implemented recursively.'
);

export const recursionBeginnerMediumAlgorithms = [generateSubsets, generatePermutations, towerOfHanoi, recursiveBinarySearch] as const;
