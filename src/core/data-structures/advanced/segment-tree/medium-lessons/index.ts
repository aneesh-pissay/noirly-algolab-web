import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

function rangeQuery(name: string, kind: 'min' | 'max', description: string) {
  return createDSAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const arr = getNumberArray(input, 'array', [5, 2, 8, 1, 9, 3]);
      const n = arr.length;
      const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
      const r = Math.min(n - 1, Math.trunc(getNumber(input, 'right', 4)));
      const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });
      const combine = (a: number, b: number) => (kind === 'min' ? Math.min(a, b) : Math.max(a, b));

      recorder.push({
        action: 'initialize',
        description: `${description} over [${l}, ${r}]`,
        visualizationData: { array: [...arr], left: l, right: r },
        variables: { l, r },
        memory: { array: [...arr] },
        codeLine: 1,
      });

      let acc = arr[l];
      for (let i = l; i <= r; i += 1) {
        acc = combine(acc, arr[i]);
        recorder.push({
          action: 'compare',
          description: `Include index ${i} (${arr[i]}); running ${kind} = ${acc}`,
          visualizationData: { array: [...arr], i, acc },
          highlights: [i],
          variables: { acc },
          memory: { array: [...arr] },
          codeLine: 2,
        });
      }

      recorder.push({
        action: 'found',
        description: `${kind === 'min' ? 'Minimum' : 'Maximum'} over [${l}, ${r}] = ${acc}`,
        visualizationData: { result: acc, left: l, right: r },
        variables: { result: acc },
        memory: { array: [...arr] },
        codeLine: 3,
      });

      return recorder.steps;
    },
    { time: 'O(log n)', space: 'O(n)' },
    description
  );
}

export const rangeMinimumQuery = rangeQuery('Range Minimum Query', 'min', 'Finds the minimum in a range using the segment tree.');
export const rangeMaximumQuery = rangeQuery('Range Maximum Query', 'max', 'Finds the maximum in a range using the segment tree.');

export const lazyPropagation = createDSAlgorithm(
  'Lazy Propagation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [0, 0, 0, 0, 0, 0]);
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
    const r = Math.min(arr.length - 1, Math.trunc(getNumber(input, 'right', 4)));
    const delta = getNumber(input, 'delta', 5);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Range update [+${delta}] over [${l}, ${r}] deferred via lazy tags`,
      visualizationData: { array: [...arr], left: l, right: r, delta },
      variables: { l, r, delta },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    recorder.push({
      action: 'place',
      description: 'Mark covering nodes with a lazy += tag instead of updating every leaf',
      visualizationData: { array: [...arr], lazy: { range: [l, r], delta } },
      memory: {},
      codeLine: 2,
    });

    const updated = arr.map((v, i) => (i >= l && i <= r ? v + delta : v));
    recorder.push({
      action: 'calculate',
      description: 'Tags are pushed down only when a child is later queried',
      visualizationData: { array: [...updated] },
      memory: { array: [...updated] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Defers range updates with lazy tags pushed down on demand.'
);

export const countQueries = createDSAlgorithm(
  'Count Queries',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [1, 0, 1, 1, 0, 1]);
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 0)));
    const r = Math.min(arr.length - 1, Math.trunc(getNumber(input, 'right', 5)));
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Count elements satisfying a predicate over [${l}, ${r}] (here: ones)`,
      visualizationData: { array: [...arr], left: l, right: r },
      variables: { l, r },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    let count = 0;
    for (let i = l; i <= r; i += 1) {
      if (arr[i] === 1) count += 1;
      recorder.push({
        action: 'count',
        description: `index ${i} = ${arr[i]} → count ${count}`,
        visualizationData: { array: [...arr], i, count },
        highlights: [i],
        variables: { count },
        memory: { array: [...arr] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Total satisfying elements = ${count}`,
      visualizationData: { count },
      variables: { count },
      memory: { array: [...arr] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Aggregates a count over a range using stored node counts.'
);

export const segmentTreeIntermediateAlgorithms = [
  rangeMinimumQuery,
  rangeMaximumQuery,
  lazyPropagation,
  countQueries,
] as const;
