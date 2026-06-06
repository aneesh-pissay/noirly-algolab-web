import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumberArray } from '../../../_shared/helpers';
import { buildBST, getInsertValues, inorder } from '../helpers';

export const recoverBst = createDSAlgorithm(
  'Recover BST',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const seq = getNumberArray(input, 'array', [3, 2, 1, 4, 5, 6]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: 'Two nodes were swapped; scan inorder for the misordered pair(s)',
      visualizationData: { sorted: [...seq] },
      memory: { sorted: [...seq] },
      codeLine: 1,
    });

    let first = -1;
    let second = -1;
    for (let i = 1; i < seq.length; i += 1) {
      if (seq[i] < seq[i - 1]) {
        if (first === -1) first = i - 1;
        second = i;
        recorder.push({
          action: 'compare',
          description: `Dip at index ${i}: ${seq[i]} < ${seq[i - 1]}`,
          visualizationData: { sorted: [...seq], i },
          highlights: [i - 1, i],
          variables: { first, second },
          memory: { sorted: [...seq] },
          codeLine: 2,
        });
      }
    }

    if (first !== -1 && second !== -1) {
      const fixed = [...seq];
      [fixed[first], fixed[second]] = [fixed[second], fixed[first]];
      recorder.push({
        action: 'swap',
        description: `Swap ${seq[first]} ↔ ${seq[second]} → sorted again`,
        visualizationData: { sorted: [...fixed], swapped: [first, second] },
        variables: { fixed },
        memory: { sorted: [...fixed] },
        codeLine: 3,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Restores a BST after exactly two nodes were swapped.'
);

export const balanceBst = createDSAlgorithm(
  'Balance BST',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, [1, 2, 3, 4, 5, 6, 7]);
    const sorted = inorder(buildBST(values));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const order: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Flatten to sorted order, then rebuild by repeatedly picking the middle',
      visualizationData: { sorted: [...sorted], order: [] },
      memory: { sorted: [...sorted] },
      codeLine: 1,
    });

    const build = (lo: number, hi: number): void => {
      if (lo > hi) return;
      const mid = Math.floor((lo + hi) / 2);
      order.push(sorted[mid]);
      recorder.push({
        action: 'find-position',
        description: `Range [${lo}, ${hi}] → balanced root ${sorted[mid]}`,
        visualizationData: { sorted: [...sorted], order: [...order], mid },
        highlights: [mid],
        variables: { root: sorted[mid] },
        memory: { order: [...order] },
        codeLine: 2,
      });
      build(lo, mid - 1);
      build(mid + 1, hi);
    };
    build(0, sorted.length - 1);

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Rebuilds an unbalanced BST into a height-balanced one.'
);

export const mergeBsts = createDSAlgorithm(
  'Merge BSTs',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = inorder(buildBST(getNumberArray(input, 'array', [2, 1, 4])));
    const b = inorder(buildBST(getNumberArray(input, 'arrayB', [5, 3, 6])));
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(n + m)' });
    const merged: number[] = [];
    let i = 0;
    let j = 0;

    recorder.push({
      action: 'initialize',
      description: 'Inorder each BST to sorted arrays, then merge them',
      visualizationData: { a: [...a], b: [...b], merged: [] },
      memory: { a: [...a], b: [...b] },
      codeLine: 1,
    });

    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) {
        merged.push(a[i++]);
      } else {
        merged.push(b[j++]);
      }
      recorder.push({
        action: 'merge',
        description: `Merged so far: [${merged.join(', ')}]`,
        visualizationData: { a: [...a], b: [...b], merged: [...merged], i, j },
        memory: { merged: [...merged] },
        codeLine: 2,
      });
    }
    while (i < a.length) merged.push(a[i++]);
    while (j < b.length) merged.push(b[j++]);

    recorder.push({
      action: 'found',
      description: `Build a balanced BST from merged sorted array [${merged.join(', ')}]`,
      visualizationData: { merged: [...merged] },
      memory: { merged: [...merged] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(n + m)' },
  'Merges two BSTs by combining their sorted inorder sequences.'
);

export const bstAdvancedAlgorithms = [recoverBst, balanceBst, mergeBsts] as const;
