import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import {
  createHashMapAlgorithm,
  createStepRecorder,
  getNumber,
  getNumberArray,
  getString,
  getStringArray,
} from '../easy-lessons/helpers';

export const hashMapFrequencyCounter = createHashMapAlgorithm(
  'Frequency Counter',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getStringArray(input, 'words', ['a', 'b', 'a', 'c', 'b', 'a']);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(k)' });
    const counts = new Map<string, number>();

    values.forEach((value, index) => {
      counts.set(value, (counts.get(value) ?? 0) + 1);
      recorder.push({
        action: 'count',
        description: `Count ${value} -> ${counts.get(value)}`,
        visualizationData: { values, index, counts: Object.fromEntries(counts.entries()) },
        highlights: [index],
        variables: { value, count: counts.get(value) },
        memory: { counts: Object.fromEntries(counts.entries()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Uses hashmap to count frequencies.'
);

export const countOccurrences = createHashMapAlgorithm(
  'Count Occurrences',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 2, 1, 3, 1, 2]);
    const target = getNumber(input, 'target', 1);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(k)' });
    const map = new Map<number, number>();

    nums.forEach((num, index) => {
      map.set(num, (map.get(num) ?? 0) + 1);
      recorder.push({
        action: 'count',
        description: `nums[${index}] = ${num}`,
        visualizationData: { nums, index, map: Object.fromEntries(map.entries()) },
        highlights: [index],
        variables: { num, target },
        memory: { count: map.get(target) ?? 0 },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Counts total occurrences of a target using hashmap.'
);

export const containsDuplicate = createHashMapAlgorithm(
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
      description: 'No duplicate found',
      visualizationData: { nums },
      memory: { containsDuplicate: false },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Detects duplicates by tracking seen values in hashmap/set.'
);

export const firstUniqueCharacter = createHashMapAlgorithm(
  'First Unique Character',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const str = getString(input, 'str', 'swiss');
    const chars = str.split('');
    const freq = new Map<string, number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    chars.forEach((char) => freq.set(char, (freq.get(char) ?? 0) + 1));

    for (let i = 0; i < chars.length; i += 1) {
      recorder.push({
        action: 'compare',
        description: `Check if "${chars[i]}" is unique`,
        visualizationData: { string: chars, index: i, freq: Object.fromEntries(freq.entries()) },
        highlights: [i],
        variables: { value: chars[i], count: freq.get(chars[i]) },
        memory: { result: null },
        codeLine: 1,
      });

      if (freq.get(chars[i]) === 1) {
        recorder.push({
          action: 'found',
          description: `First unique character: ${chars[i]}`,
          visualizationData: { string: chars, index: i },
          highlights: [i],
          variables: { index: i, value: chars[i] },
          memory: { result: chars[i] },
          codeLine: 2,
        });
        return recorder.steps;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds the first character with frequency one using a hashmap.'
);

export const firstUniqueElement = firstUniqueCharacter;

export const firstRepeatingElement = createHashMapAlgorithm(
  'First Repeating Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [10, 5, 3, 4, 3, 5, 6]);
    const seen = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < nums.length; i += 1) {
      if (seen.has(nums[i])) {
        recorder.push({
          action: 'found',
          description: `First repeating element encountered: ${nums[i]}`,
          visualizationData: { nums, index: i },
          highlights: [i],
          variables: { value: nums[i], index: i },
          memory: { result: nums[i] },
          codeLine: 1,
        });
        return recorder.steps;
      }
      seen.add(nums[i]);
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Returns first element seen twice while traversing.'
);

export const twoSumHashMap = createHashMapAlgorithm(
  'Two Sum',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [2, 7, 11, 15]);
    const target = getNumber(input, 'target', 9);
    const indexMap = new Map<number, number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < nums.length; i += 1) {
      const need = target - nums[i];
      recorder.push({
        action: 'compare',
        description: `Need ${need} for nums[${i}] = ${nums[i]}`,
        visualizationData: { nums, i, need, indexMap: Object.fromEntries(indexMap.entries()) },
        highlights: [i],
        variables: { i, value: nums[i], need },
        memory: { indexMap: Object.fromEntries(indexMap.entries()) },
        codeLine: 1,
      });

      if (indexMap.has(need)) {
        recorder.push({
          action: 'found',
          description: `Two sum pair found at indices ${indexMap.get(need)} and ${i}`,
          visualizationData: { nums, result: [indexMap.get(need), i] },
          highlights: [indexMap.get(need) ?? 0, i],
          variables: { target },
          memory: { result: [indexMap.get(need), i] },
          codeLine: 2,
        });
        return recorder.steps;
      }

      indexMap.set(nums[i], i);
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Uses hashmap for single-pass two sum lookup.'
);

export const groupAnagramsHashMap = createHashMapAlgorithm(
  'Group Anagrams',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
    const groups = new Map<string, string[]>();
    const recorder = createStepRecorder({ time: 'O(n * k log k)', space: 'O(n * k)' });

    words.forEach((word, index) => {
      const key = word.split('').sort().join('');
      const bucket = groups.get(key) ?? [];
      bucket.push(word);
      groups.set(key, bucket);
      recorder.push({
        action: 'insert',
        description: `Place ${word} in bucket ${key}`,
        visualizationData: { words, index, groups: Object.fromEntries(groups.entries()) },
        highlights: [index],
        variables: { key, word },
        memory: { groups: Object.fromEntries(groups.entries()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n * k log k)', space: 'O(n * k)' },
  'Groups words by sorted-key signature in hashmap.'
);

export const findMissingNumber = createHashMapAlgorithm(
  'Find Missing Number',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [3, 0, 1]);
    const n = nums.length;
    const set = new Set(nums);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i <= n; i += 1) {
      recorder.push({
        action: 'search',
        description: `Check if ${i} exists`,
        visualizationData: { nums, check: i },
        variables: { i },
        memory: { exists: set.has(i) },
        codeLine: 1,
      });
      if (!set.has(i)) {
        recorder.push({
          action: 'found',
          description: `Missing number is ${i}`,
          visualizationData: { nums, result: i },
          variables: { result: i },
          memory: { result: i },
          codeLine: 2,
        });
        return recorder.steps;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds missing value in 0..n using hashmap/set membership.'
);

export const intersectionOfArrays = createHashMapAlgorithm(
  'Intersection Of Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getNumberArray(input, 'arrayA', [1, 2, 2, 1]);
    const b = getNumberArray(input, 'arrayB', [2, 2]);
    const seen = new Set(a);
    const out = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(n)' });

    b.forEach((value, index) => {
      if (seen.has(value)) out.add(value);
      recorder.push({
        action: 'compare',
        description: `${value} ${seen.has(value) ? 'is' : 'is not'} in first set`,
        visualizationData: { a, b, index, out: Array.from(out.values()) },
        highlights: [index],
        variables: { value },
        memory: { out: Array.from(out.values()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(n)' },
  'Computes array intersection using hashmap/set.'
);

export const hashMapIntermediateAlgorithms = [
  hashMapFrequencyCounter,
  countOccurrences,
  containsDuplicate,
  firstUniqueElement,
  firstRepeatingElement,
  twoSumHashMap,
  groupAnagramsHashMap,
  findMissingNumber,
  intersectionOfArrays,
] as const;
