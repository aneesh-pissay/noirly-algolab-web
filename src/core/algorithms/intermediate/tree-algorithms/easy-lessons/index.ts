import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder } from '../../../_shared/helpers';



type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };



function buildTree(values: (number | null)[]): TreeNode | null {

  if (!values.length || values[0] == null) return null;

  const root: TreeNode = { val: values[0], left: null, right: null };

  const queue: TreeNode[] = [root];

  let i = 1;

  while (queue.length && i < values.length) {

    const node = queue.shift()!;

    if (i < values.length && values[i] != null) {

      node.left = { val: values[i]!, left: null, right: null };

      queue.push(node.left);

    }

    i += 1;

    if (i < values.length && values[i] != null) {

      node.right = { val: values[i]!, left: null, right: null };

      queue.push(node.right);

    }

    i += 1;

  }

  return root;

}



export const dfsTraversal = createAlgorithm(

  'DFS Traversal',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [3, 9, 20, null, null, 15, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    const order: number[] = [];



    recorder.push({ action: 'initialize', description: 'In-order DFS: left → node → right', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const inorder = (node: TreeNode | null): void => {

      if (!node) return;

      inorder(node.left);

      order.push(node.val);

      recorder.push({ action: 'visit', description: `Visit ${node.val}`, visualizationData: { order: [...order], current: node.val }, memory: { order: [...order] }, codeLine: 2 });

      inorder(node.right);

    };

    inorder(root);

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Depth-first in-order traversal of a binary tree.'

);



export const bfs = createAlgorithm(

  'BFS Traversal',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [3, 9, 20, null, null, 15, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(n)' });

    const order: number[] = [];



    recorder.push({ action: 'initialize', description: 'Level-order BFS with a queue', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    if (root) {

      const queue: TreeNode[] = [root];

      while (queue.length) {

        const node = queue.shift()!;

        order.push(node.val);

        recorder.push({ action: 'visit', description: `Level visit ${node.val}`, visualizationData: { order: [...order], current: node.val }, memory: { order: [...order] }, codeLine: 2 });

        if (node.left) queue.push(node.left);

        if (node.right) queue.push(node.right);

      }

    }

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Breadth-first level-order tree traversal.'

);



export const treeHeight = createAlgorithm(

  'Tree Height',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [3, 9, 20, null, null, 15, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });



    recorder.push({ action: 'initialize', description: 'Recursively compute max depth', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const height = (node: TreeNode | null, depth: number): number => {

      if (!node) {

        recorder.push({ action: 'visit', description: `Null node at depth ${depth}`, visualizationData: { depth }, memory: {}, codeLine: 2 });

        return 0;

      }

      recorder.push({ action: 'visit', description: `Node ${node.val} at depth ${depth}`, visualizationData: { val: node.val, depth }, memory: {}, codeLine: 3 });

      const h = 1 + Math.max(height(node.left, depth + 1), height(node.right, depth + 1));

      recorder.push({ action: 'found', description: `Height from ${node.val} = ${h}`, visualizationData: { val: node.val, height: h }, memory: {}, codeLine: 4 });

      return h;

    };

    const result = height(root, 0);

    recorder.push({ action: 'found', description: `Tree height = ${result}`, visualizationData: { height: result }, memory: {}, codeLine: 5 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Computes the maximum depth (height) of a binary tree.'

);



export const countNodes = createAlgorithm(

  'Count Nodes',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [1, 2, 3, 4, 5, 6, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    let count = 0;



    recorder.push({ action: 'initialize', description: 'Count all nodes via DFS', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const dfs = (node: TreeNode | null): void => {

      if (!node) return;

      count += 1;

      recorder.push({ action: 'visit', description: `Count node ${node.val} → total ${count}`, visualizationData: { val: node.val, count }, variables: { count }, memory: {}, codeLine: 2 });

      dfs(node.left);

      dfs(node.right);

    };

    dfs(root);

    recorder.push({ action: 'found', description: `Total nodes = ${count}`, visualizationData: { count }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Counts nodes in a binary tree recursively.'

);



export const treeAlgorithmsIntermediateEasyAlgorithms = [dfsTraversal, bfs, treeHeight, countNodes] as const;


