import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getMatrix, getNumber } from '../../../_shared/helpers';

export const fenwickTree2D = createDSAlgorithm(
  '2D Fenwick Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const grid = getMatrix(input, 'matrix', [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const recorder = createStepRecorder({ time: 'O(log² n)', space: 'O(n²)' });

    recorder.push({
      action: 'initialize',
      description: 'A 2D BIT supports prefix sums over sub-rectangles',
      visualizationData: { grid: grid.map((r) => [...r]) },
      memory: { grid: grid.map((r) => [...r]) },
      codeLine: 1,
    });

    // 2D prefix sum of whole grid as illustration
    let total = 0;
    grid.forEach((row, r) => {
      row.forEach((value, c) => {
        total += value;
        recorder.push({
          action: 'calculate',
          description: `Include cell (${r}, ${c}) = ${value}; running rectangle sum = ${total}`,
          visualizationData: { grid: grid.map((rr) => [...rr]), cell: [r, c], total },
          variables: { total },
          memory: {},
          codeLine: 2,
        });
      });
    });

    recorder.push({
      action: 'found',
      description: `Sum of full rectangle = ${total}`,
      visualizationData: { total },
      variables: { total },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log² n)', space: 'O(n²)' },
  'Supports rectangle prefix sums via nested Fenwick trees.'
);

export const rangeUpdateQuery = createDSAlgorithm(
  'Range Update Query',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });
    const n = Math.max(4, Math.trunc(getNumber(input, 'n', 6)));
    const l = Math.max(0, Math.trunc(getNumber(input, 'left', 1)));
    const r = Math.min(n - 1, Math.trunc(getNumber(input, 'right', 4)));
    const delta = getNumber(input, 'delta', 3);

    recorder.push({
      action: 'initialize',
      description: 'Two BITs let you do range-update + range-query in O(log n)',
      visualizationData: { n, left: l, right: r, delta },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'calculate',
      description: `Range add +${delta} on [${l}, ${r}]: update bit1/bit2 at l and r+1`,
      visualizationData: { range: [l, r], delta },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: 'Query(i) = prefix1(i)·i − prefix2(i) reconstructs the value',
      visualizationData: { formula: 'sum(i) = b1(i)*i - b2(i)' },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Combines two BITs for range update and range query.'
);

export const offlineQueries = createDSAlgorithm(
  'Offline Queries',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O((n + q) log n)', space: 'O(n + q)' });
    const queries = [
      { l: 0, r: 2, id: 0 },
      { l: 1, r: 4, id: 1 },
      { l: 0, r: 5, id: 2 },
    ];

    recorder.push({
      action: 'initialize',
      description: 'Sort queries (e.g., by right endpoint) and answer them in a single sweep',
      visualizationData: { queries: queries.map((q) => ({ ...q })) },
      memory: {},
      codeLine: 1,
    });

    const sorted = [...queries].sort((a, b) => a.r - b.r);
    sorted.forEach((q) => {
      recorder.push({
        action: 'visit',
        description: `Advance pointer to ${q.r}, then answer query #${q.id} over [${q.l}, ${q.r}]`,
        visualizationData: { current: q },
        variables: { queryId: q.id },
        memory: {},
        codeLine: 2,
      });
    });

    recorder.push({
      action: 'found',
      description: 'All queries answered; results re-sorted to original order',
      visualizationData: { order: sorted.map((q) => q.id) },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O((n + q) log n)', space: 'O(n + q)' },
  'Answers many range queries offline with a sorted sweep + BIT.'
);

export const fenwickTreeAdvancedAlgorithms = [fenwickTree2D, rangeUpdateQuery, offlineQueries] as const;
