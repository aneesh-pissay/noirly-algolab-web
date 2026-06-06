import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder } from '../../../_shared/helpers';
import { BTNode, buildTree, getTreeValues } from '../helpers';

const DEFAULT_TREE: Array<number | null> = [1, 2, 3, null, null, 4, 5];

export const serializeDeserializeTree = createDSAlgorithm(
  'Serialize Deserialize Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const serial: string[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Serialize via preorder, marking null children with "#"',
      visualizationData: { tree: [...values], serial: [] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const encode = (node: BTNode | null): void => {
      if (!node) {
        serial.push('#');
        return;
      }
      serial.push(String(node.value));
      recorder.push({
        action: 'visit',
        description: `Append ${node.value} to serialization`,
        visualizationData: { tree: [...values], serial: [...serial], current: node.value },
        variables: { token: node.value },
        memory: { serial: [...serial] },
        codeLine: 2,
      });
      encode(node.left);
      encode(node.right);
    };

    encode(root);
    recorder.push({
      description: `Serialized: "${serial.join(',')}". Deserialization rebuilds preorder.`,
      visualizationData: { serial: [...serial] },
      variables: { serial: serial.join(',') },
      memory: { serial: [...serial] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Encodes a tree to a string and reconstructs it via preorder.'
);

export const maximumPathSum = createDSAlgorithm(
  'Maximum Path Sum',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, [-10, 9, 20, null, null, 15, 7]);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
    let best = -Infinity;

    recorder.push({
      action: 'initialize',
      description: 'For each node, path sum = node + max(0,left) + max(0,right)',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const gain = (node: BTNode | null): number => {
      if (!node) return 0;
      const l = Math.max(0, gain(node.left));
      const r = Math.max(0, gain(node.right));
      const through = node.value + l + r;
      if (through > best) best = through;
      recorder.push({
        action: 'calculate',
        description: `node ${node.value}: through = ${through}, best = ${best}`,
        visualizationData: { tree: [...values], current: node.value, best },
        variables: { value: node.value, through, best },
        memory: { tree: [...values] },
        codeLine: 2,
      });
      return node.value + Math.max(l, r);
    };

    gain(root);
    recorder.push({
      action: 'found',
      description: `Maximum path sum = ${best}`,
      visualizationData: { tree: [...values], best },
      variables: { best },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Finds the maximum sum of any root-to-anywhere path.'
);

export const binaryTreeCameras = createDSAlgorithm(
  'Binary Tree Cameras',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, [0, 0, null, 0, 0]);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
    let cameras = 0;

    recorder.push({
      action: 'initialize',
      description: 'Greedy post-order: place cameras when a child is uncovered',
      visualizationData: { tree: [...values], cameras: 0 },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    // 0 = uncovered, 1 = covered, 2 = has camera
    const dfs = (node: BTNode | null): number => {
      if (!node) return 1;
      const l = dfs(node.left);
      const r = dfs(node.right);
      if (l === 0 || r === 0) {
        cameras += 1;
        recorder.push({
          action: 'insert',
          description: `node ${node.value} covers an uncovered child → place camera (total ${cameras})`,
          visualizationData: { tree: [...values], current: node.value, cameras },
          variables: { cameras },
          memory: { tree: [...values] },
          codeLine: 2,
        });
        return 2;
      }
      return l === 2 || r === 2 ? 1 : 0;
    };

    const rootState = dfs(root);
    if (rootState === 0) cameras += 1;
    recorder.push({
      action: 'found',
      description: `Minimum cameras to monitor all nodes = ${cameras}`,
      visualizationData: { tree: [...values], cameras },
      variables: { cameras },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Greedily places the fewest cameras to monitor every node.'
);

export const recoverBinaryTree = createDSAlgorithm(
  'Recover Binary Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, [3, 1, 4, null, null, 2]);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
    const inorder: BTNode[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Inorder traversal of a BST should be sorted; find the two swapped nodes',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const walk = (node: BTNode | null): void => {
      if (!node) return;
      walk(node.left);
      inorder.push(node);
      walk(node.right);
    };
    walk(root);

    let first: BTNode | null = null;
    let second: BTNode | null = null;
    for (let i = 0; i < inorder.length - 1; i += 1) {
      if (inorder[i].value > inorder[i + 1].value) {
        if (!first) first = inorder[i];
        second = inorder[i + 1];
        recorder.push({
          action: 'compare',
          description: `Order violation: ${inorder[i].value} > ${inorder[i + 1].value}`,
          visualizationData: { tree: [...values], a: inorder[i].value, b: inorder[i + 1].value },
          variables: { violation: [inorder[i].value, inorder[i + 1].value] },
          memory: { tree: [...values] },
          codeLine: 2,
        });
      }
    }

    if (first && second) {
      recorder.push({
        action: 'swap',
        description: `Swap node values ${first.value} ↔ ${second.value} to restore BST`,
        visualizationData: { tree: [...values], swapped: [first.value, second.value] },
        variables: { swapped: [first.value, second.value] },
        memory: { tree: [...values] },
        codeLine: 3,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Recovers a BST where exactly two nodes were swapped.'
);

export const binaryTreeAdvancedAlgorithms = [
  serializeDeserializeTree,
  maximumPathSum,
  binaryTreeCameras,
  recoverBinaryTree,
] as const;
