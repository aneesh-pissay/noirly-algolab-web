import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';
import { buildBST, getInsertValues, inorder } from '../helpers';

const DEFAULT = [50, 30, 70, 20, 40, 60, 80];

export const validateBst = createDSAlgorithm(
  'Validate BST',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const seq = inorder(buildBST(values));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: 'A BST is valid iff its inorder traversal is strictly increasing',
      visualizationData: { sorted: [...seq] },
      memory: { sorted: [...seq] },
      codeLine: 1,
    });

    let valid = true;
    for (let i = 1; i < seq.length; i += 1) {
      const ok = seq[i] > seq[i - 1];
      if (!ok) valid = false;
      recorder.push({
        action: 'compare',
        description: `${seq[i]} ${ok ? '>' : '≤'} ${seq[i - 1]} ${ok ? 'ok' : '→ invalid'}`,
        visualizationData: { sorted: [...seq], i, valid },
        highlights: [i - 1, i],
        variables: { valid },
        memory: { sorted: [...seq] },
        codeLine: 2,
      });
      if (!ok) break;
    }

    recorder.push({
      action: valid ? 'found' : 'not-found',
      description: valid ? 'Inorder is strictly increasing → valid BST' : 'Order violated → not a BST',
      visualizationData: { valid },
      variables: { valid },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Validates the BST property via inorder monotonicity.'
);

export const kthSmallestElement = createDSAlgorithm(
  'Kth Smallest Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const k = Math.max(1, Math.trunc(getNumber(input, 'k', 3)));
    const seq = inorder(buildBST(values));
    const recorder = createStepRecorder({ time: 'O(h + k)', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: `Inorder traversal yields sorted order; stop at the ${k}th element`,
      visualizationData: { sorted: [...seq], k },
      variables: { k },
      memory: { sorted: [...seq] },
      codeLine: 1,
    });

    for (let i = 0; i < Math.min(k, seq.length); i += 1) {
      recorder.push({
        action: 'count',
        description: `Visit ${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} smallest = ${seq[i]}`,
        visualizationData: { sorted: [...seq], i },
        highlights: [i],
        variables: { rank: i + 1, value: seq[i] },
        memory: { sorted: [...seq] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `${k}th smallest = ${seq[k - 1]}`,
      visualizationData: { sorted: [...seq], answer: seq[k - 1] },
      variables: { answer: seq[k - 1] },
      memory: { sorted: [...seq] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(h + k)', space: 'O(h)' },
  'Finds the kth smallest value via inorder traversal.'
);

export const bstIterator = createDSAlgorithm(
  'BST Iterator',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const seq = inorder(buildBST(values));
    const recorder = createStepRecorder({ time: 'O(1) amortized', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: 'Iterator keeps a stack of the leftmost spine; next() pops in sorted order',
      visualizationData: { sorted: [...seq], emitted: [] },
      memory: { sorted: [...seq] },
      codeLine: 1,
    });

    const emitted: number[] = [];
    seq.forEach((value, index) => {
      emitted.push(value);
      recorder.push({
        action: 'pop',
        description: `next() → ${value}; push right child's left spine`,
        visualizationData: { sorted: [...seq], emitted: [...emitted], index },
        highlights: [index],
        variables: { next: value },
        memory: { emitted: [...emitted] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(1) amortized', space: 'O(h)' },
  'Streams BST values in sorted order using a controlled stack.'
);

export const convertSortedArrayToBst = createDSAlgorithm(
  'Convert Sorted Array To BST',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [-10, -3, 0, 5, 9, 12, 20]).slice().sort((a, b) => a - b);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(log n)' });
    const order: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Pick the middle element as root to keep the tree height-balanced',
      visualizationData: { array: [...arr], order: [] },
      memory: { array: [...arr] },
      codeLine: 1,
    });

    const build = (lo: number, hi: number): void => {
      if (lo > hi) return;
      const mid = Math.floor((lo + hi) / 2);
      order.push(arr[mid]);
      recorder.push({
        action: 'find-position',
        description: `Range [${lo}, ${hi}] → root = ${arr[mid]} (index ${mid})`,
        visualizationData: { array: [...arr], order: [...order], mid },
        highlights: [mid],
        variables: { root: arr[mid] },
        memory: { order: [...order] },
        codeLine: 2,
      });
      build(lo, mid - 1);
      build(mid + 1, hi);
    };
    build(0, arr.length - 1);

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(log n)' },
  'Builds a height-balanced BST from a sorted array.'
);

export const lowestCommonAncestorBst = createDSAlgorithm(
  'Lowest Common Ancestor',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const root = buildBST(values);
    const p = getNumber(input, 'p', 20);
    const q = getNumber(input, 'q', 40);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `LCA in a BST: descend while both ${p} and ${q} are on the same side`,
      visualizationData: { sorted: inorder(root), p, q },
      variables: { p, q },
      memory: {},
      codeLine: 1,
    });

    let cursor = root;
    while (cursor) {
      if (p < cursor.value && q < cursor.value) {
        recorder.push({
          action: 'move-pointer',
          description: `Both < ${cursor.value} → go left`,
          visualizationData: { current: cursor.value },
          variables: { current: cursor.value },
          memory: {},
          codeLine: 2,
        });
        cursor = cursor.left;
      } else if (p > cursor.value && q > cursor.value) {
        recorder.push({
          action: 'move-pointer',
          description: `Both > ${cursor.value} → go right`,
          visualizationData: { current: cursor.value },
          variables: { current: cursor.value },
          memory: {},
          codeLine: 2,
        });
        cursor = cursor.right;
      } else {
        recorder.push({
          action: 'found',
          description: `Split point at ${cursor.value} → LCA`,
          visualizationData: { lca: cursor.value },
          variables: { lca: cursor.value },
          memory: {},
          codeLine: 3,
        });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Finds the LCA using BST ordering to choose a direction.'
);

export const bstIntermediateAlgorithms = [
  validateBst,
  kthSmallestElement,
  bstIterator,
  convertSortedArrayToBst,
  lowestCommonAncestorBst,
] as const;
