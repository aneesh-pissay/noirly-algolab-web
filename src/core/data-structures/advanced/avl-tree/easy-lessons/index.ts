import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

interface AvlNode {
  value: number;
  left: AvlNode | null;
  right: AvlNode | null;
  height: number;
}

function height(node: AvlNode | null): number {
  return node ? node.height : 0;
}

function makeNode(value: number): AvlNode {
  return { value, left: null, right: null, height: 1 };
}

function rotateRight(y: AvlNode): AvlNode {
  const x = y.left as AvlNode;
  y.left = x.right;
  x.right = y;
  y.height = 1 + Math.max(height(y.left), height(y.right));
  x.height = 1 + Math.max(height(x.left), height(x.right));
  return x;
}

function rotateLeft(x: AvlNode): AvlNode {
  const y = x.right as AvlNode;
  x.right = y.left;
  y.left = x;
  x.height = 1 + Math.max(height(x.left), height(x.right));
  y.height = 1 + Math.max(height(y.left), height(y.right));
  return y;
}

export function avlInsert(node: AvlNode | null, value: number): AvlNode {
  if (!node) return makeNode(value);
  if (value < node.value) node.left = avlInsert(node.left, value);
  else if (value > node.value) node.right = avlInsert(node.right, value);
  else return node;

  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = height(node.left) - height(node.right);

  if (balance > 1 && value < (node.left as AvlNode).value) return rotateRight(node);
  if (balance < -1 && value > (node.right as AvlNode).value) return rotateLeft(node);
  if (balance > 1 && value > (node.left as AvlNode).value) {
    node.left = rotateLeft(node.left as AvlNode);
    return rotateRight(node);
  }
  if (balance < -1 && value < (node.right as AvlNode).value) {
    node.right = rotateRight(node.right as AvlNode);
    return rotateLeft(node);
  }
  return node;
}

export function avlInorder(root: AvlNode | null): number[] {
  const out: number[] = [];
  const walk = (n: AvlNode | null): void => {
    if (!n) return;
    walk(n.left);
    out.push(n.value);
    walk(n.right);
  };
  walk(root);
  return out;
}

function buildAvl(values: number[]): AvlNode | null {
  let root: AvlNode | null = null;
  values.forEach((v) => {
    root = avlInsert(root, v);
  });
  return root;
}

export const createAvlTree = createDSAlgorithm(
  'Create AVL Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 40, 50]);
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });
    let root: AvlNode | null = null;

    recorder.push({
      action: 'initialize',
      description: 'Insert values one by one, rebalancing after each insertion',
      visualizationData: { values: [...values], inorder: [] },
      memory: {},
      codeLine: 1,
    });

    values.forEach((value) => {
      root = avlInsert(root, value);
      recorder.push({
        action: 'insert',
        description: `Insert ${value}; tree stays balanced (inorder: [${avlInorder(root).join(', ')}])`,
        visualizationData: { inorder: avlInorder(root), inserted: value, rootHeight: height(root) },
        variables: { inserted: value, height: height(root) },
        memory: { inorder: avlInorder(root) },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Builds a self-balancing AVL tree by repeated insertion.'
);

export const insertNodeAvl = createDSAlgorithm(
  'Insert Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [30, 20, 40, 10]);
    const value = getNumber(input, 'value', 25);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });
    const before = buildAvl(values);

    recorder.push({
      action: 'initialize',
      description: `Insert ${value} then check balance factors up the path`,
      visualizationData: { inorder: avlInorder(before), value },
      variables: { value },
      memory: {},
      codeLine: 1,
    });

    const after = avlInsert(before, value);
    recorder.push({
      action: 'insert',
      description: `Inserted; rotations applied if any node became unbalanced`,
      visualizationData: { inorder: avlInorder(after), rootHeight: height(after) },
      variables: { height: height(after) },
      memory: { inorder: avlInorder(after) },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Inserts a node and restores AVL balance via rotations.'
);

export const searchNodeAvl = createDSAlgorithm(
  'Search Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 40, 50]);
    const target = getNumber(input, 'target', 30);
    const root = buildAvl(values);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Search ${target}; guaranteed O(log n) due to balanced height`,
      visualizationData: { inorder: avlInorder(root), target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    let cur = root;
    let found = false;
    while (cur) {
      if (cur.value === target) {
        found = true;
        recorder.push({
          action: 'found',
          description: `Found ${target}`,
          visualizationData: { current: cur.value },
          variables: { found: true },
          memory: {},
          codeLine: 2,
        });
        break;
      }
      const goLeft = target < cur.value;
      recorder.push({
        action: 'compare',
        description: `${target} ${goLeft ? '<' : '>'} ${cur.value} → ${goLeft ? 'left' : 'right'}`,
        visualizationData: { current: cur.value },
        memory: {},
        codeLine: 3,
      });
      cur = goLeft ? cur.left : cur.right;
    }

    if (!found) {
      recorder.push({
        action: 'not-found',
        description: `${target} not present`,
        visualizationData: { target },
        variables: { found: false },
        memory: {},
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Searches an AVL tree in guaranteed logarithmic time.'
);

export const heightCalculation = createDSAlgorithm(
  'Height Calculation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 40, 50, 25]);
    const root = buildAvl(values);
    const recorder = createStepRecorder({ time: 'O(1) cached', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Each node caches its height = 1 + max(child heights)',
      visualizationData: { inorder: avlInorder(root) },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'found',
      description: `Root height = ${height(root)} (kept ~log₂n by rotations)`,
      visualizationData: { height: height(root) },
      variables: { height: height(root) },
      memory: {},
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(1) cached', space: 'O(1)' },
  'Reads the cached subtree heights used to balance the tree.'
);

export const avlTreeBeginnerAlgorithms = [createAvlTree, insertNodeAvl, searchNodeAvl, heightCalculation] as const;
