import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumberArray } from '../../../_shared/helpers';

export const treeRebalancing = createDSAlgorithm(
  'Tree Rebalancing',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const ops = getNumberArray(input, 'array', [10, 20, 30, 40, 50, 60]);
    const recorder = createStepRecorder({ time: 'O(log n) per op', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Sequential inserts that would skew a BST stay balanced in an RB tree',
      visualizationData: { values: [...ops] },
      memory: {},
      codeLine: 1,
    });

    ops.forEach((value, i) => {
      recorder.push({
        action: 'rotate',
        description: `Insert ${value}; rebalancing keeps height ≈ ${Math.ceil(Math.log2(i + 2))}`,
        visualizationData: { inserted: value, approxHeight: Math.ceil(Math.log2(i + 2)) },
        variables: { inserted: value },
        memory: {},
        codeLine: 2,
      });
    });

    recorder.push({
      action: 'found',
      description: 'Tree height stays within 2·log₂(n+1) at all times',
      visualizationData: { balanced: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n) per op', space: 'O(1)' },
  'Demonstrates that RB trees avoid degeneracy under skewed inserts.'
);

export const redBlackProperties = createDSAlgorithm(
  'Red Black Properties',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const props = [
      'Every node is red or black',
      'The root is black',
      'All leaves (NIL) are black',
      'A red node has only black children',
      'All paths from a node to its leaves have equal black-height',
    ];

    recorder.push({
      action: 'initialize',
      description: 'Verify the five invariants that bound the tree height',
      visualizationData: { properties: [...props] },
      memory: {},
      codeLine: 1,
    });

    props.forEach((p, i) => {
      recorder.push({
        action: 'compare',
        description: `Check property ${i + 1}: ${p}`,
        visualizationData: { property: i + 1, ok: true },
        variables: { property: i + 1 },
        memory: {},
        codeLine: 2,
      });
    });

    recorder.push({
      action: 'found',
      description: 'All invariants hold → valid red-black tree',
      visualizationData: { valid: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Validates the five defining red-black invariants.'
);

export const internalMapImplementation = createDSAlgorithm(
  'Internal Map Implementation',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'Languages back ordered maps/sets with red-black trees (e.g. C++ std::map, Java TreeMap)',
      visualizationData: { backing: 'red-black tree' },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: 'put(key, value): RB-insert keyed by key → guaranteed O(log n)',
      visualizationData: { op: 'put' },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'traverse',
      description: 'Inorder traversal yields keys in sorted order for range scans',
      visualizationData: { op: 'iterate' },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Shows how ordered maps use a red-black tree internally.'
);

export const redBlackTreeAdvancedAlgorithms = [treeRebalancing, redBlackProperties, internalMapImplementation] as const;
