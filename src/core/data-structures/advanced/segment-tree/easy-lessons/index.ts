import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

function buildSumTree(arr: number[]): number[] {
  const n = arr.length;
  const tree = new Array(2 * n).fill(0);
  for (let i = 0; i < n; i += 1) tree[n + i] = arr[i];
  for (let i = n - 1; i > 0; i -= 1) tree[i] = tree[2 * i] + tree[2 * i + 1];
  return tree;
}

export const createSegmentTree = createDSAlgorithm(
  'Create Segment Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 3, 5, 7, 9, 11]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Allocate a segment tree of size 2n for an array of ${arr.length} elements`,
      visualizationData: { array: [...arr], size: 2 * arr.length },
      variables: { n: arr.length },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    recorder.push({
      action: 'place',
      description: 'Leaves hold original values; internal nodes will store segment sums',
      visualizationData: { array: [...arr] },
      memory: { array: [...arr] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Allocates the array-backed segment tree structure.'
);

export const buildTree = createDSAlgorithm(
  'Build Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 3, 5, 7]);
    const n = arr.length;
    const tree = new Array(2 * n).fill(0);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'Copy values into leaves, then fill parents bottom-up',
      visualizationData: { array: [...arr], tree: [...tree] },
      memory: { tree: [...tree] },
      codeLine: 1,
    });

    for (let i = 0; i < n; i += 1) tree[n + i] = arr[i];
    for (let i = n - 1; i > 0; i -= 1) {
      tree[i] = tree[2 * i] + tree[2 * i + 1];
      recorder.push({
        action: 'calculate',
        description: `node ${i} = node ${2 * i} + node ${2 * i + 1} = ${tree[i]}`,
        visualizationData: { tree: [...tree], current: i },
        highlights: [i],
        variables: { node: i, value: tree[i] },
        memory: { tree: [...tree] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Builds segment sums from leaves up to the root.'
);

export const rangeSumQuery = createDSAlgorithm(
  'Range Sum Query',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 3, 5, 7, 9, 11]);
    const n = arr.length;
    const tree = buildSumTree(arr);
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
    const r = Math.min(n - 1, Math.trunc(getNumber(input, 'right', 4)));
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Query sum over [${l}, ${r}] climbing from the leaves`,
      visualizationData: { array: [...arr], tree: [...tree], left: l, right: r },
      variables: { l, r },
      memory: { tree: [...tree] },
      codeLine: 1,
    });

    let sum = 0;
    let lo = l + n;
    let hi = r + n + 1;
    while (lo < hi) {
      if (lo & 1) {
        sum += tree[lo];
        recorder.push({
          action: 'calculate',
          description: `Add right-boundary node ${lo} (${tree[lo]}); running sum ${sum}`,
          visualizationData: { tree: [...tree], node: lo, sum },
          highlights: [lo],
          variables: { sum },
          memory: { tree: [...tree] },
          codeLine: 2,
        });
        lo += 1;
      }
      if (hi & 1) {
        hi -= 1;
        sum += tree[hi];
        recorder.push({
          action: 'calculate',
          description: `Add left-boundary node ${hi} (${tree[hi]}); running sum ${sum}`,
          visualizationData: { tree: [...tree], node: hi, sum },
          highlights: [hi],
          variables: { sum },
          memory: { tree: [...tree] },
          codeLine: 2,
        });
      }
      lo = Math.floor(lo / 2);
      hi = Math.floor(hi / 2);
    }

    recorder.push({
      action: 'found',
      description: `Sum over [${l}, ${r}] = ${sum}`,
      visualizationData: { sum, left: l, right: r },
      variables: { sum },
      memory: { tree: [...tree] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Answers a range-sum query in logarithmic time.'
);

export const pointUpdate = createDSAlgorithm(
  'Point Update',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 3, 5, 7]);
    const n = arr.length;
    const tree = buildSumTree(arr);
    const index = Math.max(0, Math.min(n - 1, Math.trunc(getNumber(input, 'index', 2))));
    const value = getNumber(input, 'value', 10);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Set index ${index} = ${value}, then update ancestors`,
      visualizationData: { tree: [...tree], index, value },
      variables: { index, value },
      memory: { tree: [...tree] },
      codeLine: 1,
    });

    let pos = index + n;
    tree[pos] = value;
    recorder.push({
      action: 'place',
      description: `Leaf node ${pos} = ${value}`,
      visualizationData: { tree: [...tree], node: pos },
      highlights: [pos],
      memory: { tree: [...tree] },
      codeLine: 2,
    });

    pos = Math.floor(pos / 2);
    while (pos >= 1) {
      tree[pos] = tree[2 * pos] + tree[2 * pos + 1];
      recorder.push({
        action: 'calculate',
        description: `Recompute ancestor ${pos} = ${tree[pos]}`,
        visualizationData: { tree: [...tree], node: pos },
        highlights: [pos],
        memory: { tree: [...tree] },
        codeLine: 3,
      });
      pos = Math.floor(pos / 2);
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Updates one element and propagates the change to the root.'
);

export const segmentTreeBeginnerAlgorithms = [createSegmentTree, buildTree, rangeSumQuery, pointUpdate] as const;
