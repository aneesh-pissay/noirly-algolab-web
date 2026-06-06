import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

const getDll = (input: AlgorithmInput, fallback: number[]) => getNumberArray(input, 'list', fallback);

export const reverseDll = createDSAlgorithm(
  'Reverse DLL',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 3, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const reversed: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Swap prev/next for each node, then swap head and tail',
      visualizationData: { list: [...list], reversed: [] },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      reversed.unshift(value);
      recorder.push({
        action: 'swap',
        description: `Swap node ${value}'s prev and next pointers`,
        visualizationData: { list: [...list], reversed: [...reversed], current: index },
        highlights: [index],
        variables: { value },
        memory: { reversed: [...reversed] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: 'Head and tail swapped — DLL reversed',
      visualizationData: { list: [...reversed], head: reversed[0], tail: reversed[reversed.length - 1] },
      memory: { reversed: [...reversed] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Reverses a DLL by swapping prev/next of each node.'
);

export const removeDuplicatesDll = createDSAlgorithm(
  'Remove Duplicates',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 2, 3, 3, 3, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const seen = new Set<number>();
    const result: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Traverse a sorted DLL removing nodes equal to their predecessor',
      visualizationData: { list: [...list], result: [] },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      if (seen.has(value)) {
        recorder.push({
          action: 'delete',
          description: `node[${index}] = ${value} is a duplicate → unlink`,
          visualizationData: { list: [...list], result: [...result], current: index, removed: value },
          highlights: [index],
          variables: { removed: value },
          memory: { result: [...result] },
          codeLine: 2,
        });
      } else {
        seen.add(value);
        result.push(value);
        recorder.push({
          action: 'visit',
          description: `Keep first occurrence of ${value}`,
          visualizationData: { list: [...list], result: [...result], current: index },
          highlights: [index],
          variables: { kept: value },
          memory: { result: [...result] },
          codeLine: 3,
        });
      }
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Removes duplicate values from a sorted DLL in one pass.'
);

export const findPairsWithSum = createDSAlgorithm(
  'Find Pairs With Sum',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 4, 5, 6, 8, 9]);
    const target = getNumber(input, 'target', 10);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let left = 0;
    let right = list.length - 1;
    const pairs: Array<[number, number]> = [];

    recorder.push({
      action: 'initialize',
      description: `Two pointers on a sorted DLL searching for pairs summing to ${target}`,
      visualizationData: { list: [...list], left, right, target },
      variables: { target },
      memory: { list: [...list] },
      codeLine: 1,
    });

    while (left < right) {
      const sum = list[left] + list[right];
      if (sum === target) {
        pairs.push([list[left], list[right]]);
        recorder.push({
          action: 'found',
          description: `${list[left]} + ${list[right]} = ${target} → record pair`,
          visualizationData: { list: [...list], left, right, pairs: [...pairs] },
          highlights: [left, right],
          variables: { pair: [list[left], list[right]] },
          memory: { pairs: [...pairs] },
          codeLine: 2,
        });
        left += 1;
        right -= 1;
      } else if (sum < target) {
        recorder.push({
          action: 'move-pointer',
          description: `sum ${sum} < ${target} → move left forward`,
          visualizationData: { list: [...list], left, right },
          highlights: [left],
          variables: { sum },
          memory: { list: [...list] },
          codeLine: 3,
        });
        left += 1;
      } else {
        recorder.push({
          action: 'move-pointer',
          description: `sum ${sum} > ${target} → move right backward`,
          visualizationData: { list: [...list], left, right },
          highlights: [right],
          variables: { sum },
          memory: { list: [...list] },
          codeLine: 3,
        });
        right -= 1;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Finds pairs summing to a target using head/tail pointers on a sorted DLL.'
);

export const rotateDll = createDSAlgorithm(
  'Rotate DLL',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 3, 4, 5]);
    const k = ((Math.trunc(getNumber(input, 'k', 2)) % list.length) + list.length) % list.length;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Rotate the DLL right by k = ${k}`,
      visualizationData: { list: [...list], k },
      variables: { k },
      memory: { list: [...list] },
      codeLine: 1,
    });

    const pivot = list.length - k;
    recorder.push({
      action: 'find-position',
      description: `New head will be node[${pivot}]; connect tail to old head`,
      visualizationData: { list: [...list], pivot },
      highlights: [pivot],
      variables: { pivot },
      memory: { list: [...list] },
      codeLine: 2,
    });

    const rotated = [...list.slice(pivot), ...list.slice(0, pivot)];
    recorder.push({
      action: 'rotate',
      description: `Rotated list: [${rotated.join(', ')}]`,
      visualizationData: { list: [...rotated] },
      memory: { list: [...rotated] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Rotates a DLL to the right by k positions by relinking ends.'
);

export const doublyLinkedListIntermediateAlgorithms = [
  reverseDll,
  removeDuplicatesDll,
  findPairsWithSum,
  rotateDll,
] as const;
