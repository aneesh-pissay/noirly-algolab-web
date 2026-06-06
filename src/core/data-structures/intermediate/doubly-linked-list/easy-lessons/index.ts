import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';

const getDll = (input: AlgorithmInput, fallback: number[]) => getNumberArray(input, 'list', fallback);

export const createDll = createDSAlgorithm(
  'Create DLL',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getDll(input, [10, 20, 30]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const list: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Empty DLL: head = tail = null',
      visualizationData: { list: [], head: null, tail: null },
      variables: { length: 0 },
      memory: { list: [] },
      codeLine: 1,
    });

    values.forEach((value, index) => {
      list.push(value);
      recorder.push({
        action: 'insert',
        description: `Append node ${value}: set prev → old tail, tail.next → new node`,
        visualizationData: { list: [...list], head: list[0], tail: value },
        highlights: [index],
        variables: { value, length: list.length },
        memory: { list: [...list] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Builds a doubly linked list maintaining prev and next links.'
);

export const forwardTraversal = createDSAlgorithm(
  'Forward Traversal',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 3, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Start at head, move using next pointers',
      visualizationData: { list: [...list], current: 0, direction: 'forward' },
      variables: { current: 0 },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      recorder.push({
        action: 'visit',
        description: `Visit node[${index}] = ${value} → next`,
        visualizationData: { list: [...list], current: index, direction: 'forward' },
        highlights: [index],
        variables: { current: index, value },
        memory: { list: [...list] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Traverses the DLL head-to-tail using next pointers.'
);

export const backwardTraversal = createDSAlgorithm(
  'Backward Traversal',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [1, 2, 3, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Start at tail, move using prev pointers',
      visualizationData: { list: [...list], current: list.length - 1, direction: 'backward' },
      variables: { current: list.length - 1 },
      memory: { list: [...list] },
      codeLine: 1,
    });

    for (let i = list.length - 1; i >= 0; i -= 1) {
      recorder.push({
        action: 'visit',
        description: `Visit node[${i}] = ${list[i]} → prev`,
        visualizationData: { list: [...list], current: i, direction: 'backward' },
        highlights: [i],
        variables: { current: i, value: list[i] },
        memory: { list: [...list] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Traverses the DLL tail-to-head using prev pointers.'
);

export const insertNodeDll = createDSAlgorithm(
  'Insert Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [10, 20, 30]);
    const value = getNumber(input, 'value', 25);
    const index = Math.max(0, Math.min(list.length, Math.trunc(getNumber(input, 'index', 1))));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Insert ${value} at position ${index}`,
      visualizationData: { list: [...list], insertIndex: index, value },
      variables: { index, value },
      memory: { list: [...list] },
      codeLine: 1,
    });

    for (let i = 0; i < index; i += 1) {
      recorder.push({
        action: 'move-pointer',
        description: `Advance to node[${i}]`,
        visualizationData: { list: [...list], current: i, insertIndex: index },
        highlights: [i],
        variables: { current: i },
        memory: { list: [...list] },
        codeLine: 2,
      });
    }

    list.splice(index, 0, value);
    recorder.push({
      action: 'insert',
      description: `Relink four pointers: prev.next, new.prev, new.next, next.prev`,
      visualizationData: { list: [...list], insertedIndex: index },
      highlights: [index],
      variables: { length: list.length },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Inserts a node by updating four prev/next pointers.'
);

export const deleteNodeDll = createDSAlgorithm(
  'Delete Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getDll(input, [10, 20, 30, 40]);
    const index = Math.max(0, Math.min(list.length - 1, Math.trunc(getNumber(input, 'index', 1))));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Delete node at position ${index}`,
      visualizationData: { list: [...list], target: index },
      variables: { index },
      memory: { list: [...list] },
      codeLine: 1,
    });

    const removed = list.splice(index, 1)[0];
    recorder.push({
      action: 'delete',
      description: `Unlink node ${removed}: prev.next = next, next.prev = prev`,
      visualizationData: { list: [...list], removed },
      highlights: [Math.max(0, index - 1)],
      variables: { removed, length: list.length },
      memory: { list: [...list] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Removes a node by relinking neighboring prev/next pointers.'
);

export const doublyLinkedListBeginnerAlgorithms = [
  createDll,
  forwardTraversal,
  backwardTraversal,
  insertNodeDll,
  deleteNodeDll,
] as const;
