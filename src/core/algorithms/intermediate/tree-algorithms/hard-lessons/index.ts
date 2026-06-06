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



export const serializeDeserializeTree = createAlgorithm(

  'Serialize Deserialize Tree',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [1, 2, 3, null, null, 4, 5];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(n)' });



    recorder.push({ action: 'initialize', description: 'Pre-order serialize with null markers', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const serialize = (node: TreeNode | null, tokens: string[]): void => {

      if (!node) {

        tokens.push('#');

        return;

      }

      tokens.push(String(node.val));

      recorder.push({ action: 'visit', description: `Serialize ${node.val}`, visualizationData: { tokens: [...tokens] }, memory: {}, codeLine: 2 });

      serialize(node.left, tokens);

      serialize(node.right, tokens);

    };



    const tokens: string[] = [];

    serialize(root, tokens);

    const encoded = tokens.join(',');

    recorder.push({ action: 'found', description: `Encoded: ${encoded}`, visualizationData: { encoded }, memory: {}, codeLine: 3 });



    let idx = 0;

    const deserialize = (): TreeNode | null => {

      const token = tokens[idx++];

      if (token === '#') return null;

      const node: TreeNode = { val: Number(token), left: null, right: null };

      recorder.push({ action: 'visit', description: `Deserialize node ${node.val}`, visualizationData: { val: node.val }, memory: {}, codeLine: 4 });

      node.left = deserialize();

      node.right = deserialize();

      return node;

    };

    idx = 0;

    deserialize();

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Encodes and decodes a binary tree to a string.'

);



export const maximumPathSum = createAlgorithm(

  'Maximum Path Sum',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [-10, 9, 20, null, null, 15, 7];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    let maxSum = Number.NEGATIVE_INFINITY;



    recorder.push({ action: 'initialize', description: 'Max gain through each node as path apex', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const gain = (node: TreeNode | null): number => {

      if (!node) return 0;

      const left = Math.max(0, gain(node.left));

      const right = Math.max(0, gain(node.right));

      maxSum = Math.max(maxSum, node.val + left + right);

      recorder.push({ action: 'visit', description: `Node ${node.val}: path sum candidate ${node.val + left + right}`, visualizationData: { val: node.val, maxSum }, variables: { maxSum }, memory: {}, codeLine: 2 });

      return node.val + Math.max(left, right);

    };

    gain(root);

    recorder.push({ action: 'found', description: `Maximum path sum = ${maxSum}`, visualizationData: { maxSum }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Finds max path sum where path may start/end at any node.'

);



export const recoverTree = createAlgorithm(

  'Recover Tree',

  'tree',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const levelOrder: (number | null)[] = [1, 3, null, null, 2];

    const root = buildTree(levelOrder);

    const recorder = createStepRecorder('tree', { time: 'O(n)', space: 'O(h)' });

    const swapped = { first: null as TreeNode | null, second: null as TreeNode | null };

    let prev: TreeNode | null = null;



    recorder.push({ action: 'initialize', description: 'In-order scan finds two swapped BST nodes', visualizationData: { tree: levelOrder }, memory: {}, codeLine: 1 });



    const inorder = (node: TreeNode | null): void => {

      if (!node) return;

      inorder(node.left);

      if (prev && prev.val > node.val) {

        if (!swapped.first) swapped.first = prev;

        swapped.second = node;

        recorder.push({ action: 'compare', description: `Violation: ${prev.val} > ${node.val}`, visualizationData: { first: swapped.first?.val, second: swapped.second.val }, memory: {}, codeLine: 2 });

      }

      prev = node;

      inorder(node.right);

    };

    inorder(root);

    if (swapped.first && swapped.second) {

      const tmp = swapped.first.val;

      swapped.first.val = swapped.second.val;

      swapped.second.val = tmp;

      recorder.push({ action: 'swap', description: `Swap ${swapped.second.val} ↔ ${swapped.first.val}`, visualizationData: { first: swapped.first.val, second: swapped.second.val }, memory: {}, codeLine: 3 });

    }

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(h)' },

  'Recovers BST after two nodes were swapped.'

);



export const treeAlgorithmsIntermediateHardAlgorithms = [serializeDeserializeTree, maximumPathSum, recoverTree] as const;


