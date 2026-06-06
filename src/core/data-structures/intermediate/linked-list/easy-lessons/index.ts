import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createLinkedListAlgorithm, createStepRecorder, getList, getNumber } from '../helpers';

export const createLinkedList = createLinkedListAlgorithm(
  'Create Linked List',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getList(input, [10, 20, 30, 40]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const list: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Start with an empty list (head = null)',
      visualizationData: { list: [], head: null },
      variables: { length: 0 },
      memory: { list: [] },
      codeLine: 1,
    });

    values.forEach((value, index) => {
      list.push(value);
      recorder.push({
        action: 'insert',
        description: `Append node ${value} at position ${index}`,
        visualizationData: { list: [...list], head: list[0], tail: value },
        highlights: [index],
        variables: { value, length: list.length },
        memory: { list: [...list] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: 'Linked list construction complete',
      visualizationData: { list: [...list], head: list[0] },
      variables: { length: list.length },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Builds a singly linked list by appending nodes one by one.'
);

export const traverseLinkedList = createLinkedListAlgorithm(
  'Traverse Linked List',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [5, 9, 12, 7, 3]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Set current pointer to head',
      visualizationData: { list: [...list], current: 0 },
      variables: { current: 0 },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      recorder.push({
        action: 'visit',
        description: `Visit node[${index}] = ${value}, then follow next pointer`,
        visualizationData: { list: [...list], current: index },
        highlights: [index],
        variables: { current: index, value },
        memory: { list: [...list] },
        codeLine: 2,
      });
    });

    recorder.push({
      action: 'traverse',
      description: 'Reached null pointer — traversal complete',
      visualizationData: { list: [...list], current: null },
      variables: { visited: list.length },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Walks node-by-node from head to tail following next pointers.'
);

export const insertNode = createLinkedListAlgorithm(
  'Insert Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [10, 20, 30, 40]);
    const value = getNumber(input, 'value', 25);
    const requested = getNumber(input, 'index', 2);
    const index = Math.max(0, Math.min(list.length, Math.trunc(requested)));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Insert node ${value} at position ${index}`,
      visualizationData: { list: [...list], insertIndex: index, value },
      variables: { index, value },
      memory: { list: [...list] },
      codeLine: 1,
    });

    for (let i = 0; i < index; i += 1) {
      recorder.push({
        action: 'move-pointer',
        description: `Advance to node[${i}] to reach insertion point`,
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
      description: `Link new node ${value}: point it to next, update previous node's next`,
      visualizationData: { list: [...list], insertedIndex: index },
      highlights: [index],
      variables: { length: list.length },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Inserts a node at a given position by relinking pointers.'
);

export const deleteNode = createLinkedListAlgorithm(
  'Delete Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [10, 20, 30, 40, 50]);
    const requested = getNumber(input, 'index', 2);
    const index = Math.max(0, Math.min(list.length - 1, Math.trunc(requested)));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Delete node at position ${index}`,
      visualizationData: { list: [...list], target: index },
      variables: { index },
      memory: { list: [...list] },
      codeLine: 1,
    });

    for (let i = 0; i < index; i += 1) {
      recorder.push({
        action: 'move-pointer',
        description: `Advance to node[${i}] to find the previous node`,
        visualizationData: { list: [...list], current: i, target: index },
        highlights: [i],
        variables: { current: i },
        memory: { list: [...list] },
        codeLine: 2,
      });
    }

    const removed = list.splice(index, 1)[0];
    recorder.push({
      action: 'delete',
      description: `Bypass node ${removed}: previous.next = target.next`,
      visualizationData: { list: [...list], removed },
      highlights: [Math.max(0, index - 1)],
      variables: { removed, length: list.length },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Removes a node by relinking the previous node around it.'
);

export const searchNode = createLinkedListAlgorithm(
  'Search Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [4, 8, 15, 16, 23, 42]);
    const target = getNumber(input, 'target', 16);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Search for value ${target} starting at head`,
      visualizationData: { list: [...list], target },
      variables: { target },
      memory: { list: [...list] },
      codeLine: 1,
    });

    let found = -1;
    for (let i = 0; i < list.length; i += 1) {
      const match = list[i] === target;
      recorder.push({
        action: match ? 'found' : 'compare',
        description: match ? `Found ${target} at node[${i}]` : `node[${i}] = ${list[i]} ≠ ${target}, follow next`,
        visualizationData: { list: [...list], current: i, target, match },
        highlights: [i],
        variables: { current: i, value: list[i] },
        memory: { list: [...list] },
        codeLine: 2,
      });
      if (match) {
        found = i;
        break;
      }
    }

    if (found === -1) {
      recorder.push({
        action: 'not-found',
        description: `${target} not present in the list`,
        visualizationData: { list: [...list], target },
        variables: { found: false },
        memory: { list: [...list] },
        codeLine: 3,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Linearly scans nodes until the target value is found.'
);

export const findLength = createLinkedListAlgorithm(
  'Find Length',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [3, 1, 4, 1, 5, 9]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let count = 0;

    recorder.push({
      action: 'initialize',
      description: 'Initialize counter = 0, current = head',
      visualizationData: { list: [...list], count },
      variables: { count },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      count += 1;
      recorder.push({
        action: 'count',
        description: `Count node[${index}] = ${value}, length = ${count}`,
        visualizationData: { list: [...list], current: index, count },
        highlights: [index],
        variables: { count, value },
        memory: { list: [...list] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: `Reached null — list length is ${count}`,
      visualizationData: { list: [...list], count },
      variables: { length: count },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Counts nodes by traversing from head to the null terminator.'
);

export const linkedListBeginnerAlgorithms = [
  createLinkedList,
  traverseLinkedList,
  insertNode,
  deleteNode,
  searchNode,
  findLength,
] as const;
