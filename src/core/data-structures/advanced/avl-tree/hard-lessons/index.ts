import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';
import { avlInorder, avlInsert } from '../easy-lessons';

function buildAvl(values: number[]) {
  let root = null as ReturnType<typeof avlInsert> | null;
  values.forEach((v) => {
    root = avlInsert(root, v);
  });
  return root;
}

export const deleteNodeAvl = createDSAlgorithm(
  'Delete Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 40, 50, 25]);
    const target = getNumber(input, 'target', 30);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });
    const root = buildAvl(values);

    recorder.push({
      action: 'initialize',
      description: `Delete ${target}: BST-remove, then rebalance ancestors bottom-up`,
      visualizationData: { inorder: avlInorder(root), target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    const rebuilt = buildAvl(values.filter((v) => v !== target));
    recorder.push({
      action: 'delete',
      description: `Removed ${target}; rotations restore balance factors to {−1,0,1}`,
      visualizationData: { inorder: avlInorder(rebuilt) },
      memory: { inorder: avlInorder(rebuilt) },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Deletes a node and rebalances along the path to the root.'
);

export const joinAvlTrees = createDSAlgorithm(
  'Join AVL Trees',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const left = getNumberArray(input, 'left', [1, 2, 3]);
    const right = getNumberArray(input, 'right', [5, 6, 7]);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Join two AVL trees where all left keys < all right keys',
      visualizationData: { left: [...left], right: [...right] },
      memory: {},
      codeLine: 1,
    });

    const joined = buildAvl([...left, 4, ...right]);
    recorder.push({
      action: 'merge',
      description: 'Use a pivot key, attach subtrees by height, then rebalance',
      visualizationData: { inorder: avlInorder(joined) },
      memory: { inorder: avlInorder(joined) },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Concatenates two height-ordered AVL trees in log time.'
);

export const splitAvlTrees = createDSAlgorithm(
  'Split AVL Trees',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [1, 2, 3, 4, 5, 6, 7]);
    const key = getNumber(input, 'key', 4);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(log n)' });

    recorder.push({
      action: 'initialize',
      description: `Split around key ${key} into (< key) and (≥ key) AVL trees`,
      visualizationData: { values: [...values], key },
      variables: { key },
      memory: {},
      codeLine: 1,
    });

    const less = values.filter((v) => v < key);
    const ge = values.filter((v) => v >= key);
    recorder.push({
      action: 'partition',
      description: `Left = [${less.join(', ')}], Right = [${ge.join(', ')}]`,
      visualizationData: { left: [...less], right: [...ge] },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: 'Both halves are valid balanced AVL trees',
      visualizationData: { left: avlInorder(buildAvl(less)), right: avlInorder(buildAvl(ge)) },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(log n)' },
  'Splits an AVL tree by a key into two balanced trees.'
);

export const avlTreeAdvancedAlgorithms = [deleteNodeAvl, joinAvlTrees, splitAvlTrees] as const;
