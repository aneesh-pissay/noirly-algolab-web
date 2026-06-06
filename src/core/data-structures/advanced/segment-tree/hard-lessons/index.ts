import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

export const rangeUpdates = createDSAlgorithm(
  'Range Updates',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 2, 3, 4, 5]);
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
    const r = Math.min(arr.length - 1, Math.trunc(getNumber(input, 'right', 3)));
    const delta = getNumber(input, 'delta', 10);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Apply range add +${delta} over [${l}, ${r}] with lazy propagation`,
      visualizationData: { array: [...arr], left: l, right: r, delta },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    const updated = arr.map((v, i) => (i >= l && i <= r ? v + delta : v));
    recorder.push({
      action: 'calculate',
      description: `Updated array: [${updated.join(', ')}]`,
      visualizationData: { array: [...updated] },
      memory: { array: [...updated] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Performs efficient range add/assign updates with lazy tags.'
);

export const persistentSegmentTree = createDSAlgorithm(
  'Persistent Segment Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 2, 3, 4]);
    const recorder = createStepRecorder({ time: 'O(log n) per version', space: 'O(n log n)' });

    recorder.push({
      action: 'initialize',
      description: 'Each update creates a new root, copying only the O(log n) nodes on the path',
      visualizationData: { array: [...arr], versions: ['v0'] },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: 'Update index 1 → version v1 shares untouched subtrees with v0',
      visualizationData: { versions: ['v0', 'v1'] },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: 'Old versions remain queryable — full history preserved',
      visualizationData: { versions: ['v0', 'v1'] },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n) per version', space: 'O(n log n)' },
  'Keeps every historical version by path-copying on update.'
);

export const dynamicSegmentTree = createDSAlgorithm(
  'Dynamic Segment Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(log range)', space: 'O(updates · log range)' });
    const updates = getNumberArray(input, 'indices', [10, 1000000, 500000]);

    recorder.push({
      action: 'initialize',
      description: 'Handle a huge coordinate range by creating nodes lazily on first touch',
      visualizationData: { range: [0, 1000000], created: [] },
      memory: {},
      codeLine: 1,
    });

    const created: number[] = [];
    updates.forEach((idx) => {
      created.push(idx);
      recorder.push({
        action: 'insert',
        description: `Update at ${idx}: allocate only the nodes along its path`,
        visualizationData: { created: [...created], current: idx },
        variables: { index: idx },
        memory: { created: [...created] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(log range)', space: 'O(updates · log range)' },
  'Allocates nodes on demand to support sparse, huge ranges.'
);

export const mergeSortTree = createDSAlgorithm(
  'Merge Sort Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [3, 1, 4, 1, 5, 9, 2, 6]);
    const recorder = createStepRecorder({ time: 'O(n log n) build', space: 'O(n log n)' });

    recorder.push({
      action: 'initialize',
      description: 'Each segment-tree node stores its range as a sorted array',
      visualizationData: { array: [...arr] },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    const left = arr.slice(0, arr.length / 2).sort((a, b) => a - b);
    const right = arr.slice(arr.length / 2).sort((a, b) => a - b);
    recorder.push({
      action: 'merge',
      description: `Children sorted: left [${left.join(', ')}], right [${right.join(', ')}]`,
      visualizationData: { left: [...left], right: [...right] },
      memory: {},
      codeLine: 2,
    });

    const root = [...arr].sort((a, b) => a - b);
    recorder.push({
      action: 'found',
      description: 'Range "count ≤ x" queries use binary search inside each node',
      visualizationData: { root: [...root] },
      memory: { root: [...root] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n log n) build', space: 'O(n log n)' },
  'Stores sorted ranges at each node for order-statistic queries.'
);

export const segmentTreeAdvancedAlgorithms = [
  rangeUpdates,
  persistentSegmentTree,
  dynamicSegmentTree,
  mergeSortTree,
] as const;
