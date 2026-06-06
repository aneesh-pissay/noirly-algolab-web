import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';



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



export const diameterOfTree = createAlgorithm(

  'Diameter Of Tree',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [1, 2, 3, 4, 5];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    let diameter = 0;



    recorder.push({ action: 'initialize', description: 'Longest path = left depth + right depth at each node', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const depth = (node: TreeNode | null): number => {

      if (!node) return 0;

      const left = depth(node.left);

      const right = depth(node.right);

      diameter = Math.max(diameter, left + right);

      recorder.push({ action: 'visit', description: `Node ${node.val}: L=${left} R=${right}, diameter=${diameter}`, visualizationData: { val: node.val, left, right, diameter }, variables: { diameter }, memory: {}, codeLine: 2 });

      return 1 + Math.max(left, right);

    };

    depth(root);

    recorder.push({ action: 'found', description: `Tree diameter = ${diameter}`, visualizationData: { diameter }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Finds the longest path between any two nodes.'

);



export const lowestCommonAncestor = createAlgorithm(

  'Lowest Common Ancestor',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];

    const p = Math.trunc(getNumber(input, 'p', 5));

    const q = Math.trunc(getNumber(input, 'q', 1));

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });



    recorder.push({ action: 'initialize', description: `Find LCA of ${p} and ${q}`, visualizationData: { p, q, tree: levelOrder }, memory: {}, codeLine: 1 });



    const lca = (node: TreeNode | null): TreeNode | null => {

      if (!node || node.val === p || node.val === q) {

        recorder.push({ action: 'visit', description: node ? `Hit target ${node.val}` : 'Null', visualizationData: { val: node?.val }, memory: {}, codeLine: 2 });

        return node;

      }

      const left = lca(node.left);

      const right = lca(node.right);

      if (left && right) {

        recorder.push({ action: 'found', description: `LCA = ${node.val}`, visualizationData: { lca: node.val }, memory: {}, codeLine: 3 });

        return node;

      }

      return left ?? right;

    };

    const result = lca(root);

    recorder.push({ action: 'found', description: `LCA result: ${result?.val}`, visualizationData: { lca: result?.val }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Finds lowest common ancestor of two nodes in a BST.'

);



export const zigzagTraversal = createAlgorithm(

  'Zigzag Traversal',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [3, 9, 20, null, null, 15, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(n)' });

    const result: number[][] = [];



    recorder.push({ action: 'initialize', description: 'BFS with alternating row direction', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    if (root) {

      let level = 0;

      let queue: TreeNode[] = [root];

      while (queue.length) {

        const row: number[] = [];

        const next: TreeNode[] = [];

        for (const node of queue) {

          row.push(node.val);

          if (node.left) next.push(node.left);

          if (node.right) next.push(node.right);

        }

        const ordered = level % 2 === 0 ? row : [...row].reverse();

        result.push(ordered);

        recorder.push({ action: 'visit', description: `Level ${level}: [${ordered.join(', ')}]`, visualizationData: { level, row: ordered }, memory: { result: result.map((r) => [...r]) }, codeLine: 2 });

        queue = next;

        level += 1;

      }

    }

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Level-order traversal alternating left-to-right and right-to-left.'

);



export const boundaryTraversal = createAlgorithm(

  'Boundary Traversal',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [1, 2, 3, 4, 5, 6, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    const boundary: number[] = [];



    recorder.push({ action: 'initialize', description: 'Left boundary + leaves + right boundary (reverse)', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const addLeft = (node: TreeNode | null): void => {

      if (!node || (!node.left && !node.right)) return;

      boundary.push(node.val);

      recorder.push({ action: 'visit', description: `Left boundary ${node.val}`, visualizationData: { boundary: [...boundary] }, memory: {}, codeLine: 2 });

      if (node.left) addLeft(node.left);

      else addLeft(node.right);

    };



    const addLeaves = (node: TreeNode | null): void => {

      if (!node) return;

      if (!node.left && !node.right) {

        boundary.push(node.val);

        recorder.push({ action: 'visit', description: `Leaf ${node.val}`, visualizationData: { boundary: [...boundary] }, memory: {}, codeLine: 3 });

      }

      addLeaves(node.left);

      addLeaves(node.right);

    };



    if (root) {

      boundary.push(root.val);

      addLeft(root.left);

      addLeaves(root.left);

      addLeaves(root.right);

    }

    recorder.push({ action: 'found', description: `Boundary: [${boundary.join(', ')}]`, visualizationData: { boundary: [...boundary] }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Traverses the anti-clockwise boundary of a binary tree.'

);



export const treeAlgorithmsIntermediateMediumAlgorithms = [diameterOfTree, lowestCommonAncestor, zigzagTraversal, boundaryTraversal] as const;


