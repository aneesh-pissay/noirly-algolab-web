import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';
import { BTNode, buildTree, getTreeValues } from '../helpers';

const DEFAULT_TREE: Array<number | null> = [1, 2, 3, 4, 5, 6, 7];

export const heightOfTree = createDSAlgorithm(
  'Height Of Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: 'Height = 1 + max(height(left), height(right))',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const height = (node: BTNode | null): number => {
      if (!node) return 0;
      const l = height(node.left);
      const r = height(node.right);
      const h = 1 + Math.max(l, r);
      recorder.push({
        action: 'calculate',
        description: `node ${node.value}: 1 + max(${l}, ${r}) = ${h}`,
        visualizationData: { tree: [...values], current: node.value, height: h },
        variables: { value: node.value, height: h },
        memory: { tree: [...values] },
        codeLine: 2,
      });
      return h;
    };

    const total = height(root);
    recorder.push({
      action: 'found',
      description: `Tree height is ${total}`,
      visualizationData: { tree: [...values], height: total },
      variables: { height: total },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Computes tree height via post-order recursion.'
);

export const diameterOfTree = createDSAlgorithm(
  'Diameter Of Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
    let diameter = 0;

    recorder.push({
      action: 'initialize',
      description: 'Diameter = max over nodes of (leftHeight + rightHeight)',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const depth = (node: BTNode | null): number => {
      if (!node) return 0;
      const l = depth(node.left);
      const r = depth(node.right);
      if (l + r > diameter) diameter = l + r;
      recorder.push({
        action: 'calculate',
        description: `node ${node.value}: path through = ${l + r}, best so far ${diameter}`,
        visualizationData: { tree: [...values], current: node.value, diameter },
        variables: { value: node.value, throughPath: l + r, diameter },
        memory: { tree: [...values] },
        codeLine: 2,
      });
      return 1 + Math.max(l, r);
    };

    depth(root);
    recorder.push({
      action: 'found',
      description: `Longest path (diameter) = ${diameter} edges`,
      visualizationData: { tree: [...values], diameter },
      variables: { diameter },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Finds the longest path between any two nodes.'
);

export const checkBalancedTree = createDSAlgorithm(
  'Check Balanced Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });
    let balanced = true;

    recorder.push({
      action: 'initialize',
      description: 'Balanced if every node has |leftHeight − rightHeight| ≤ 1',
      visualizationData: { tree: [...values] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    const check = (node: BTNode | null): number => {
      if (!node) return 0;
      const l = check(node.left);
      const r = check(node.right);
      const diff = Math.abs(l - r);
      if (diff > 1) balanced = false;
      recorder.push({
        action: 'compare',
        description: `node ${node.value}: |${l} − ${r}| = ${diff} ${diff > 1 ? '→ unbalanced' : 'ok'}`,
        visualizationData: { tree: [...values], current: node.value, diff, balanced },
        variables: { value: node.value, diff, balanced },
        memory: { tree: [...values] },
        codeLine: 2,
      });
      return 1 + Math.max(l, r);
    };

    check(root);
    recorder.push({
      action: balanced ? 'found' : 'not-found',
      description: balanced ? 'Tree is height-balanced' : 'Tree is NOT height-balanced',
      visualizationData: { tree: [...values], balanced },
      variables: { balanced },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Verifies the height-balanced property at every node.'
);

export const rightSideView = createDSAlgorithm(
  'Right Side View',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const view: number[] = [];
    let level: BTNode[] = root ? [root] : [];

    recorder.push({
      action: 'initialize',
      description: 'BFS per level; the last node of each level is visible from the right',
      visualizationData: { tree: [...values], view: [] },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    let depth = 0;
    while (level.length > 0) {
      const rightmost = level[level.length - 1];
      view.push(rightmost.value);
      recorder.push({
        action: 'visit',
        description: `Level ${depth}: rightmost node is ${rightmost.value}`,
        visualizationData: { tree: [...values], view: [...view], level: level.map((n) => n.value) },
        variables: { depth, rightmost: rightmost.value },
        memory: { view: [...view] },
        codeLine: 2,
      });
      const next: BTNode[] = [];
      level.forEach((n) => {
        if (n.left) next.push(n.left);
        if (n.right) next.push(n.right);
      });
      level = next;
      depth += 1;
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Collects the rightmost node at each level via BFS.'
);

export const lowestCommonAncestor = createDSAlgorithm(
  'Lowest Common Ancestor',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getTreeValues(input, DEFAULT_TREE);
    const root = buildTree(values);
    const p = getNumber(input, 'p', 4);
    const q = getNumber(input, 'q', 5);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(h)' });

    recorder.push({
      action: 'initialize',
      description: `Find LCA of ${p} and ${q}`,
      visualizationData: { tree: [...values], p, q },
      variables: { p, q },
      memory: { tree: [...values] },
      codeLine: 1,
    });

    let answer: number | null = null;
    const search = (node: BTNode | null): boolean => {
      if (!node) return false;
      const inLeft = search(node.left);
      const inRight = search(node.right);
      const isSelf = node.value === p || node.value === q;
      if ((inLeft && inRight) || (isSelf && (inLeft || inRight))) {
        if (answer === null) answer = node.value;
        recorder.push({
          action: 'found',
          description: `node ${node.value} sees both targets → LCA candidate`,
          visualizationData: { tree: [...values], current: node.value, lca: answer },
          variables: { lca: node.value },
          memory: { tree: [...values] },
          codeLine: 2,
        });
      }
      return inLeft || inRight || isSelf;
    };

    search(root);
    recorder.push({
      description: `Lowest common ancestor = ${answer}`,
      visualizationData: { tree: [...values], lca: answer },
      variables: { lca: answer },
      memory: { tree: [...values] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(h)' },
  'Finds the deepest node that is an ancestor of both targets.'
);

export const binaryTreeIntermediateAlgorithms = [
  heightOfTree,
  diameterOfTree,
  checkBalancedTree,
  rightSideView,
  lowestCommonAncestor,
] as const;
