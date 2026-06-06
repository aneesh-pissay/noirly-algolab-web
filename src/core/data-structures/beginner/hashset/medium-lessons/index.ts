import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createHashSetAlgorithm, createStepRecorder, getNumberArray } from '../easy-lessons/helpers';

export const containsDuplicateSet = createHashSetAlgorithm(
  'Contains Duplicate',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 2, 3, 1]);
    const seen = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < nums.length; i += 1) {
      if (seen.has(nums[i])) {
        recorder.push({
          action: 'found',
          description: `Duplicate found: ${nums[i]}`,
          visualizationData: { nums, index: i },
          highlights: [i],
          variables: { duplicate: nums[i] },
          memory: { containsDuplicate: true },
          codeLine: 1,
        });
        return recorder.steps;
      }
      seen.add(nums[i]);
    }

    recorder.push({
      action: 'not-found',
      description: 'No duplicates found',
      visualizationData: { nums },
      memory: { containsDuplicate: false },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Detects duplicates using a hash set.'
);

export const removeDuplicatesSet = createHashSetAlgorithm(
  'Remove Duplicates',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 1, 2, 2, 3, 4]);
    const out = [...new Set(nums)];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      description: 'Remove duplicates by converting to set',
      visualizationData: { nums, out },
      variables: { inputSize: nums.length, outputSize: out.length },
      memory: { out },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Removes duplicate values via set conversion.'
);

export const intersectionOfArraysSet = createHashSetAlgorithm(
  'Intersection Of Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getNumberArray(input, 'arrayA', [1, 2, 2, 1]);
    const b = getNumberArray(input, 'arrayB', [2, 2]);
    const setA = new Set(a);
    const out = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(n)' });

    b.forEach((value, index) => {
      if (setA.has(value)) out.add(value);
      recorder.push({
        action: 'compare',
        description: `${value} ${setA.has(value) ? 'is' : 'is not'} in first set`,
        visualizationData: { a, b, index, out: [...out.values()] },
        highlights: [index],
        variables: { value },
        memory: { out: [...out.values()] },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(n)' },
  'Computes intersection using set membership.'
);

export const unionOfArrays = createHashSetAlgorithm(
  'Union Of Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getNumberArray(input, 'arrayA', [1, 2, 3]);
    const b = getNumberArray(input, 'arrayB', [3, 4, 5]);
    const union = new Set([...a, ...b]);
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(n + m)' });
    recorder.push({
      description: 'Union combines all unique values from both arrays',
      visualizationData: { a, b, union: [...union.values()] },
      variables: { size: union.size },
      memory: { union: [...union.values()] },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(n + m)' },
  'Finds union via set merge.'
);

export const differenceOfArrays = createHashSetAlgorithm(
  'Difference Of Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getNumberArray(input, 'arrayA', [1, 2, 3, 4]);
    const b = getNumberArray(input, 'arrayB', [2, 4]);
    const setB = new Set(b);
    const diff = a.filter((value) => !setB.has(value));
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(m)' });
    recorder.push({
      description: 'Difference A - B keeps values not present in B',
      visualizationData: { a, b, diff },
      variables: { size: diff.length },
      memory: { diff },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(m)' },
  'Computes array difference with set lookup.'
);

export const findMissingNumberSet = createHashSetAlgorithm(
  'Find Missing Number',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [3, 0, 1]);
    const set = new Set(nums);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i <= nums.length; i += 1) {
      recorder.push({
        action: 'search',
        description: `Check ${i} in set`,
        visualizationData: { nums, i },
        variables: { i, exists: set.has(i) },
        memory: { exists: set.has(i) },
        codeLine: 1,
      });
      if (!set.has(i)) {
        recorder.push({
          action: 'found',
          description: `Missing number: ${i}`,
          visualizationData: { nums, result: i },
          variables: { result: i },
          memory: { result: i },
          codeLine: 2,
        });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds missing value in 0..n via set lookup.'
);

export const happyNumber = createHashSetAlgorithm(
  'Happy Number',
  (input: AlgorithmInput): AlgorithmStep[] => {
    let n = (input.n as number) ?? 19;
    const seen = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(log n)' });

    const next = (x: number): number =>
      String(x)
        .split('')
        .reduce((sum, digit) => sum + Number(digit) * Number(digit), 0);

    while (n !== 1 && !seen.has(n)) {
      seen.add(n);
      recorder.push({
        action: 'visit',
        description: `n = ${n}, next = sum(square(digits))`,
        visualizationData: { n, seen: [...seen.values()] },
        variables: { n },
        memory: { seen: [...seen.values()] },
        codeLine: 1,
      });
      n = next(n);
    }

    recorder.push({
      action: n === 1 ? 'found' : 'not-found',
      description: n === 1 ? 'Happy number' : 'Cycle detected, not happy',
      visualizationData: { result: n === 1 },
      variables: { isHappy: n === 1 },
      memory: { isHappy: n === 1 },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(log n)' },
  'Uses set to detect cycles in happy-number transformation.'
);

export const hashSetIntermediateAlgorithms = [
  containsDuplicateSet,
  removeDuplicatesSet,
  intersectionOfArraysSet,
  unionOfArrays,
  differenceOfArrays,
  findMissingNumberSet,
  happyNumber,
] as const;
