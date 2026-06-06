import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';
import { buildBST, getInsertValues, inorder } from '../helpers';

const DEFAULT = [50, 30, 70, 20, 40, 60, 80];

export const insertNodeBst = createDSAlgorithm(
  'Insert Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const value = getNumber(input, 'value', 45);
    const root = buildBST(values);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });
    const sorted = inorder(root);

    recorder.push({
      action: 'initialize',
      description: `Insert ${value}: compare against nodes, go left if smaller, right if larger`,
      visualizationData: { sorted: [...sorted], value },
      variables: { value },
      memory: { sorted: [...sorted] },
      codeLine: 1,
    });

    let cursor = root;
    while (cursor) {
      const goLeft = value < cursor.value;
      recorder.push({
        action: 'compare',
        description: `${value} ${goLeft ? '<' : '≥'} ${cursor.value} → go ${goLeft ? 'left' : 'right'}`,
        visualizationData: { current: cursor.value, value },
        variables: { current: cursor.value },
        memory: { sorted: [...sorted] },
        codeLine: 2,
      });
      cursor = goLeft ? cursor.left : cursor.right;
    }

    const updated = inorder(buildBST([...values, value]));
    recorder.push({
      action: 'insert',
      description: `Reached an empty spot — attach ${value}`,
      visualizationData: { sorted: [...updated], inserted: value },
      variables: { inserted: value },
      memory: { sorted: [...updated] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Inserts a value into a BST following the ordering invariant.'
);

export const searchNodeBst = createDSAlgorithm(
  'Search Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const target = getNumber(input, 'target', 60);
    const root = buildBST(values);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Search for ${target} from the root`,
      visualizationData: { sorted: inorder(root), target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    let cursor = root;
    let found = false;
    while (cursor) {
      if (cursor.value === target) {
        found = true;
        recorder.push({
          action: 'found',
          description: `Found ${target}`,
          visualizationData: { current: cursor.value, target },
          variables: { found: true },
          memory: {},
          codeLine: 2,
        });
        break;
      }
      const goLeft = target < cursor.value;
      recorder.push({
        action: 'compare',
        description: `${target} ${goLeft ? '<' : '>'} ${cursor.value} → go ${goLeft ? 'left' : 'right'}`,
        visualizationData: { current: cursor.value, target },
        variables: { current: cursor.value },
        memory: {},
        codeLine: 3,
      });
      cursor = goLeft ? cursor.left : cursor.right;
    }

    if (!found) {
      recorder.push({
        action: 'not-found',
        description: `${target} is not in the BST`,
        visualizationData: { target },
        variables: { found: false },
        memory: {},
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Searches a BST by halving the search space at each node.'
);

export const deleteNodeBst = createDSAlgorithm(
  'Delete Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const target = getNumber(input, 'target', 30);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Delete ${target}: locate it, then handle 0/1/2-child cases`,
      visualizationData: { sorted: inorder(buildBST(values)), target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'compare',
      description: `Two-child case replaces the node with its inorder successor`,
      visualizationData: { target },
      variables: { strategy: 'inorder-successor' },
      memory: {},
      codeLine: 2,
    });

    const updated = inorder(buildBST(values.filter((v) => v !== target)));
    recorder.push({
      action: 'delete',
      description: `Removed ${target}; inorder remains sorted: [${updated.join(', ')}]`,
      visualizationData: { sorted: [...updated], removed: target },
      variables: { removed: target },
      memory: { sorted: [...updated] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Deletes a node, handling leaf, single-child, and two-child cases.'
);

export const minimumNode = createDSAlgorithm(
  'Minimum Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const root = buildBST(values);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Minimum is the leftmost node — keep following left links',
      visualizationData: { sorted: inorder(root) },
      memory: {},
      codeLine: 1,
    });

    let cursor = root;
    while (cursor && cursor.left) {
      recorder.push({
        action: 'move-pointer',
        description: `${cursor.value} has a left child → go left`,
        visualizationData: { current: cursor.value },
        variables: { current: cursor.value },
        memory: {},
        codeLine: 2,
      });
      cursor = cursor.left;
    }

    recorder.push({
      action: 'found',
      description: `Minimum value = ${cursor?.value}`,
      visualizationData: { min: cursor?.value },
      variables: { min: cursor?.value },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Finds the minimum by walking left until a leaf.'
);

export const maximumNode = createDSAlgorithm(
  'Maximum Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getInsertValues(input, DEFAULT);
    const root = buildBST(values);
    const recorder = createStepRecorder({ time: 'O(h)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Maximum is the rightmost node — keep following right links',
      visualizationData: { sorted: inorder(root) },
      memory: {},
      codeLine: 1,
    });

    let cursor = root;
    while (cursor && cursor.right) {
      recorder.push({
        action: 'move-pointer',
        description: `${cursor.value} has a right child → go right`,
        visualizationData: { current: cursor.value },
        variables: { current: cursor.value },
        memory: {},
        codeLine: 2,
      });
      cursor = cursor.right;
    }

    recorder.push({
      action: 'found',
      description: `Maximum value = ${cursor?.value}`,
      visualizationData: { max: cursor?.value },
      variables: { max: cursor?.value },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(h)', space: 'O(1)' },
  'Finds the maximum by walking right until a leaf.'
);

export const bstBeginnerAlgorithms = [insertNodeBst, searchNodeBst, deleteNodeBst, minimumNode, maximumNode] as const;
