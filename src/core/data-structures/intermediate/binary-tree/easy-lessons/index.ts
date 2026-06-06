import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder } from '../../../_shared/helpers';
import { BTNode, buildTree, getTreeValues } from '../helpers';

const DEFAULT_TREE: Array<number | null> = [1, 2, 3, 4, 5, null, 6];

export const createTree = createDSAlgorithm(
  'Create Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'Build a binary tree from a level-order description',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    values.forEach((value, index) => {
      if (value === null) return;
      recorder.push({
        action: 'insert',
        description: `Place node ${value} at level-order index ${index}`,
        visualizationData: { tree: [...values], current: index },
        highlights: [index],
        variables: { value, index },
        memory: { tree: [...values] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Constructs a binary tree from a level-order array.'
);

function traversal(name: string, order: 'pre' | 'in' | 'post', description: string) {
  return createDSAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const values = getTreeValues(input, DEFAULT_TREE);
      const root = buildTree(values);
      const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
      const visited: number[] = [];

      recorder.push({
        action: 'initialize',
        description,
        visualizationData: { tree: [...values], visited: [] },
        memory: { tree: [...values] },
        codeLine: 1,
      });

      const walk = (node: BTNode | null): void => {
        if (!node) return;
        if (order === 'pre') {
          visited.push(node.value);
          recorder.push({
            action: 'visit',
            description: `Visit ${node.value} (root before children)`,
            visualizationData: { tree: [...values], visited: [...visited], current: node.value },
            variables: { value: node.value },
            memory: { visited: [...visited] },
            codeLine: 2,
          });
        }
        walk(node.left);
        if (order === 'in') {
          visited.push(node.value);
          recorder.push({
            action: 'visit',
            description: `Visit ${node.value} (between subtrees)`,
            visualizationData: { tree: [...values], visited: [...visited], current: node.value },
            variables: { value: node.value },
            memory: { visited: [...visited] },
            codeLine: 2,
          });
        }
        walk(node.right);
        if (order === 'post') {
          visited.push(node.value);
          recorder.push({
            action: 'visit',
            description: `Visit ${node.value} (root after children)`,
            visualizationData: { tree: [...values], visited: [...visited], current: node.value },
            variables: { value: node.value },
            memory: { visited: [...visited] },
            codeLine: 2,
          });
        }
      };

      walk(root);

      recorder.push({
        action: 'traverse',
        description: `Traversal order: [${visited.join(', ')}]`,
        visualizationData: { tree: [...values], visited: [...visited] },
        memory: { visited: [...visited] },
        codeLine: 3,
      });

      return recorder.steps;
    },
    { time: 'O(n)', space: 'O(h)' },
    description
  );
}

export const preorderTraversal = traversal('Preorder Traversal', 'pre', 'Visit root, then left subtree, then right subtree.');
export const inorderTraversal = traversal('Inorder Traversal', 'in', 'Visit left subtree, then root, then right subtree.');
export const postorderTraversal = traversal('Postorder Traversal', 'post', 'Visit left subtree, then right subtree, then root.');

export const levelOrderTraversalTree = createDSAlgorithm(
  'Level Order Traversal',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const visited: number[] = [];
    const queue: BTNode[] = root ? [root] : [];

    recorder.push({
      action: 'initialize',
      description: 'BFS using a queue, visiting nodes level by level',
      visualizationData: { tree: [...values], visited: [], queue: queue.map((n) => n.value) },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    while (queue.length > 0) {
      const node = queue.shift() as BTNode;
      visited.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      recorder.push({
        action: 'dequeue',
        description: `Dequeue ${node.value}, enqueue its children`,
        visualizationData: { tree: [...values], visited: [...visited], queue: queue.map((n) => n.value), current: node.value },
        variables: { value: node.value },
        memory: { visited: [...visited] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Breadth-first traversal that visits nodes level by level.'
);

export const binaryTreeBeginnerAlgorithms = [
  createTree,
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  levelOrderTraversalTree,
] as const;
