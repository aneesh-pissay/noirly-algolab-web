import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { longestUniqueSubstring, minWindowSubstring } from '../../../_internal/window-algorithms';
import { createHashMapAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../easy-lessons/helpers';

export const subarraySumEqualsK = createHashMapAlgorithm(
  'Subarray Sum Equals K',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 1, 1]);
    const target = getNumber(input, 'target', 2);
    const prefix = new Map<number, number>();
    prefix.set(0, 1);
    let sum = 0;
    let count = 0;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    nums.forEach((num, index) => {
      sum += num;
      count += prefix.get(sum - target) ?? 0;
      prefix.set(sum, (prefix.get(sum) ?? 0) + 1);

      recorder.push({
        action: 'count',
        description: `Index ${index}: sum=${sum}, count=${count}`,
        visualizationData: { nums, index, sum, count, prefix: Object.fromEntries(prefix.entries()) },
        highlights: [index],
        variables: { num, sum, count },
        memory: { prefix: Object.fromEntries(prefix.entries()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Counts subarrays with sum k using prefix-sum hashmap.'
);

export const longestConsecutiveSequence = createHashMapAlgorithm(
  'Longest Consecutive Sequence',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [100, 4, 200, 1, 3, 2]);
    const set = new Set(nums);
    let best = 0;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    nums.forEach((num, index) => {
      if (set.has(num - 1)) {
        return;
      }
      let length = 1;
      while (set.has(num + length)) {
        length += 1;
      }
      if (length > best) best = length;

      recorder.push({
        action: 'visit',
        description: `Sequence starting at ${num} has length ${length}`,
        visualizationData: { nums, index, start: num, length, best },
        highlights: [index],
        variables: { start: num, length, best },
        memory: { best },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds max consecutive streak using hash set.'
);

export const topKFrequentElements = createHashMapAlgorithm(
  'Top K Frequent Elements',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 1, 1, 2, 2, 3]);
    const k = getNumber(input, 'k', 2);
    const freq = new Map<number, number>();
    nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + 1));

    const top = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map(([value]) => value);

    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });
    recorder.push({
      action: 'count',
      description: `Top ${k} frequent: [${top.join(', ')}]`,
      visualizationData: { nums, k, freq: Object.fromEntries(freq.entries()), top },
      variables: { k },
      memory: { top },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Builds frequency hashmap and returns top-k by count.'
);

export const lruCache = createHashMapAlgorithm(
  'LRU Cache',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = getNumber(input, 'capacity', 2);
    const ops = (input.operations as string[]) ?? ['put(1,1)', 'put(2,2)', 'get(1)', 'put(3,3)'];
    const order: number[] = [];
    const map = new Map<number, number>();
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(capacity)' });

    ops.forEach((op, index) => {
      if (op.startsWith('put')) {
        const [k, v] = op
          .slice(4, -1)
          .split(',')
          .map((n) => Number(n.trim()));
        if (map.has(k)) {
          order.splice(order.indexOf(k), 1);
        }
        map.set(k, v);
        order.push(k);
        if (map.size > capacity) {
          const evict = order.shift() as number;
          map.delete(evict);
        }
      }
      if (op.startsWith('get')) {
        const k = Number(op.slice(4, -1));
        if (map.has(k)) {
          order.splice(order.indexOf(k), 1);
          order.push(k);
        }
      }

      recorder.push({
        action: 'visit',
        description: `Operation ${op}`,
        visualizationData: { op, index, cache: Object.fromEntries(map.entries()), order: [...order] },
        highlights: [index],
        variables: { op },
        memory: { cache: Object.fromEntries(map.entries()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(capacity)' },
  'Simulates LRU cache using hashmap + recency list.'
);

export const lfuCache = createHashMapAlgorithm(
  'LFU Cache',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = getNumber(input, 'capacity', 2);
    const ops = (input.operations as string[]) ?? ['put(1,1)', 'put(2,2)', 'get(1)', 'put(3,3)'];
    const values = new Map<number, number>();
    const hits = new Map<number, number>();
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(capacity)' });

    ops.forEach((op, index) => {
      if (op.startsWith('put')) {
        const [k, v] = op
          .slice(4, -1)
          .split(',')
          .map((n) => Number(n.trim()));
        if (!values.has(k) && values.size >= capacity) {
          const least = [...hits.entries()].sort((a, b) => a[1] - b[1])[0]?.[0];
          if (least !== undefined) {
            values.delete(least);
            hits.delete(least);
          }
        }
        values.set(k, v);
        hits.set(k, hits.get(k) ?? 0);
      }
      if (op.startsWith('get')) {
        const k = Number(op.slice(4, -1));
        if (values.has(k)) {
          hits.set(k, (hits.get(k) ?? 0) + 1);
        }
      }

      recorder.push({
        action: 'visit',
        description: `Operation ${op}`,
        visualizationData: {
          op,
          index,
          values: Object.fromEntries(values.entries()),
          frequencies: Object.fromEntries(hits.entries()),
        },
        highlights: [index],
        variables: { op },
        memory: { values: Object.fromEntries(values.entries()) },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(capacity)' },
  'Demonstrates LFU bookkeeping using hashmap frequency counters.'
);

export const designHashMap = createHashMapAlgorithm(
  'Design HashMap',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const bucketCount = getNumber(input, 'bucketCount', 8);
    const key = getNumber(input, 'key', 21);
    const index = key % bucketCount;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });

    recorder.push({
      action: 'calculate',
      description: `Bucket index = key % buckets => ${key} % ${bucketCount} = ${index}`,
      visualizationData: { key, bucketCount, index },
      variables: { key, bucketCount, index },
      memory: { strategy: 'array of buckets + chaining' },
      codeLine: 1,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Explains custom hashmap bucket indexing design.'
);

export const longestSubstringWithoutRepeat = longestUniqueSubstring;
export const minimumWindowSubstring = minWindowSubstring;

export const hashMapAdvancedAlgorithms = [
  subarraySumEqualsK,
  longestConsecutiveSequence,
  longestSubstringWithoutRepeat,
  minimumWindowSubstring,
  topKFrequentElements,
  lruCache,
  lfuCache,
  designHashMap,
] as const;
