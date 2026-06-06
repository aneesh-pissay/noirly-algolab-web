import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';

export const rotationsRb = createDSAlgorithm(
  'Rotations',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Left/right rotations restructure subtrees while preserving BST order',
      visualizationData: { kinds: ['left', 'right'] },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'rotate',
      description: 'Left rotate: right child becomes parent; its left subtree reattaches',
      visualizationData: { rotation: 'left' },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'rotate',
      description: 'Right rotate: mirror of left rotate; used with recoloring during fix-up',
      visualizationData: { rotation: 'right' },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Shows the rotations used to restructure a red-black tree.'
);

export const balanceAfterInsert = createDSAlgorithm(
  'Balance After Insert',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const value = getNumber(input, 'value', 5);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Inserted ${value} (red); inspect uncle's color to choose a fix`,
      visualizationData: { value },
      variables: { value },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'compare',
      description: 'Case 1 — red uncle: recolor parent, uncle, grandparent; recurse upward',
      visualizationData: { case: 1 },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'rotate',
      description: 'Case 2/3 — black uncle: rotate and recolor to fix the red-red chain',
      visualizationData: { case: 2 },
      memory: {},
      codeLine: 3,
    });

    recorder.push({
      action: 'found',
      description: 'Color the root black — all properties restored',
      visualizationData: { rootColor: 'black' },
      memory: {},
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Restores balance after insertion using the uncle-color cases.'
);

export const fixViolations = createDSAlgorithm(
  'Fix Violations',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'A red-red violation is the only thing insertion can break',
      visualizationData: { violation: 'red-red' },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'calculate',
      description: 'Walk up: recolor where possible, rotate where recoloring is insufficient',
      visualizationData: {},
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: 'No red-red remains and black-heights stay equal',
      visualizationData: { fixed: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Repairs property violations by recoloring and rotating.'
);

export const deleteNodeRb = createDSAlgorithm(
  'Delete Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const target = getNumber(input, 'target', 20);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Delete ${target} via BST removal, tracking the removed node's color`,
      visualizationData: { target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'delete',
      description: 'Removing a black node can create a "double black" deficit',
      visualizationData: { deficit: 'double-black' },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'rotate',
      description: 'Resolve double-black with sibling recoloring/rotations up the tree',
      visualizationData: { fixed: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Deletes a node and repairs black-height via fix-up cases.'
);

export const redBlackTreeIntermediateAlgorithms = [rotationsRb, balanceAfterInsert, fixViolations, deleteNodeRb] as const;
