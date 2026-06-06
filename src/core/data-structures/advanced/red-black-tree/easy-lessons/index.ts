import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

export const createTreeRb = createDSAlgorithm(
  'Create Tree',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 15, 25]);
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: 'A red-black tree keeps balance using node colors and rotations',
      visualizationData: { values: [...values], rules: ['root is black', 'no red-red', 'equal black-height'] },
      memory: {},
      codeLine: 1,
    });

    const inserted: number[] = [];
    values.forEach((value) => {
      inserted.push(value);
      recorder.push({
        action: 'insert',
        description: `Insert ${value} as red, then fix any violations`,
        visualizationData: { inserted: [...inserted], color: 'red' },
        variables: { inserted: value },
        memory: { inserted: [...inserted] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Builds a red-black tree, inserting and recoloring as needed.'
);

export const insertNodeRb = createDSAlgorithm(
  'Insert Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const value = getNumber(input, 'value', 25);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Insert ${value} like a BST, colored red`,
      visualizationData: { value, color: 'red' },
      variables: { value },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: 'New red node may create a red-red violation with its parent',
      visualizationData: { value, violation: 'possible red-red' },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'rotate',
      description: 'Recolor and/or rotate up the tree until properties hold; root forced black',
      visualizationData: { value, fixed: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Inserts a red node and repairs red-black violations.'
);

export const searchNodeRb = createDSAlgorithm(
  'Search Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'array', [10, 20, 30, 15, 25]).slice().sort((a, b) => a - b);
    const target = getNumber(input, 'target', 25);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Search ${target} like a BST; height ≤ 2·log(n+1) guarantees O(log n)`,
      visualizationData: { sorted: [...values], target },
      variables: { target },
      memory: {},
      codeLine: 1,
    });

    let lo = 0;
    let hi = values.length - 1;
    let found = false;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (values[mid] === target) {
        found = true;
        recorder.push({
          action: 'found',
          description: `Found ${target}`,
          visualizationData: { sorted: [...values], mid },
          highlights: [mid],
          variables: { found: true },
          memory: {},
          codeLine: 2,
        });
        break;
      }
      const goLeft = target < values[mid];
      recorder.push({
        action: 'compare',
        description: `${target} ${goLeft ? '<' : '>'} ${values[mid]} → ${goLeft ? 'left' : 'right'}`,
        visualizationData: { sorted: [...values], mid },
        highlights: [mid],
        memory: {},
        codeLine: 3,
      });
      if (goLeft) hi = mid - 1;
      else lo = mid + 1;
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
  'Searches a red-black tree in guaranteed log time.'
);

export const nodeColoring = createDSAlgorithm(
  'Node Coloring',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Every node is red or black; these colors enforce balance',
      visualizationData: { colors: ['red', 'black'] },
      memory: {},
      codeLine: 1,
    });

    [
      'Root is always black',
      'Red nodes cannot have red children (no red-red)',
      'Every root-to-leaf path has the same number of black nodes',
      'New nodes start red to minimize fix-up work',
    ].forEach((rule, i) => {
      recorder.push({
        action: 'visit',
        description: rule,
        visualizationData: { rule: i + 1 },
        variables: { rule: i + 1 },
        memory: {},
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Explains the coloring rules that keep the tree balanced.'
);

export const redBlackTreeBeginnerAlgorithms = [createTreeRb, insertNodeRb, searchNodeRb, nodeColoring] as const;
