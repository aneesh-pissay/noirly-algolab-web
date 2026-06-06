import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createLinkedListAlgorithm, createStepRecorder, getList, getLists, getNumber } from '../helpers';

export const reverseNodesInKGroup = createLinkedListAlgorithm(
  'Reverse Nodes In K Group',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [1, 2, 3, 4, 5]);
    const k = Math.max(1, Math.trunc(getNumber(input, 'k', 2)));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const result: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `Reverse the list in groups of k = ${k}`,
      visualizationData: { list: [...list], k },
      variables: { k },
      memory: { list: [...list] },
      codeLine: 1,
    });

    for (let start = 0; start < list.length; start += k) {
      const group = list.slice(start, start + k);
      if (group.length === k) {
        const reversed = [...group].reverse();
        result.push(...reversed);
        recorder.push({
          action: 'swap',
          description: `Group [${group.join(', ')}] has k nodes → reverse to [${reversed.join(', ')}]`,
          visualizationData: { list: [...list], group, reversed, result: [...result] },
          highlights: group.map((_, idx) => start + idx),
          variables: { groupStart: start },
          memory: { result: [...result] },
          codeLine: 2,
        });
      } else {
        result.push(...group);
        recorder.push({
          action: 'visit',
          description: `Group [${group.join(', ')}] has < k nodes → leave as-is`,
          visualizationData: { list: [...list], group, result: [...result] },
          highlights: group.map((_, idx) => start + idx),
          variables: { groupStart: start },
          memory: { result: [...result] },
          codeLine: 3,
        });
      }
    }

    recorder.push({
      description: 'All groups processed',
      visualizationData: { result: [...result] },
      variables: { length: result.length },
      memory: { result: [...result] },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Reverses every consecutive group of k nodes, leaving the remainder intact.'
);

export const mergeKSortedLists = createLinkedListAlgorithm(
  'Merge K Sorted Lists',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const lists = getLists(input, [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ]);
    const recorder = createStepRecorder({ time: 'O(N log k)', space: 'O(k)' });
    const pointers = lists.map(() => 0);
    const merged: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `Min-heap holds the head of each of the ${lists.length} lists`,
      visualizationData: { lists: lists.map((l) => [...l]), merged: [] },
      variables: { k: lists.length },
      memory: { merged: [] },
      codeLine: 1,
    });

    let guard = 0;
    const total = lists.reduce((sum, l) => sum + l.length, 0);
    while (merged.length < total && guard < total + 1) {
      guard += 1;
      let best = -1;
      let bestValue = Infinity;
      for (let i = 0; i < lists.length; i += 1) {
        if (pointers[i] < lists[i].length && lists[i][pointers[i]] < bestValue) {
          bestValue = lists[i][pointers[i]];
          best = i;
        }
      }
      if (best === -1) break;
      merged.push(bestValue);
      pointers[best] += 1;
      recorder.push({
        action: 'compare',
        description: `Smallest head is ${bestValue} from list ${best} → pop and push next`,
        visualizationData: { lists: lists.map((l) => [...l]), merged: [...merged], pointers: [...pointers] },
        highlights: [best],
        variables: { picked: bestValue, fromList: best },
        memory: { merged: [...merged] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'merge',
      description: 'All lists exhausted — merge complete',
      visualizationData: { merged: [...merged] },
      variables: { length: merged.length },
      memory: { merged: [...merged] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(N log k)', space: 'O(k)' },
  'Repeatedly takes the smallest head among k lists using a min-heap.'
);

export const copyListWithRandomPointer = createLinkedListAlgorithm(
  'Copy List With Random Pointer',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [7, 13, 11, 10, 1]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const cloned: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Pass 1: create a clone of each node interleaved after the original',
      visualizationData: { list: [...list], cloned: [] },
      variables: { phase: 'clone' },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      cloned.push(value);
      recorder.push({
        action: 'insert',
        description: `Clone node ${value} and insert after the original`,
        visualizationData: { list: [...list], cloned: [...cloned], current: index },
        highlights: [index],
        variables: { value },
        memory: { cloned: [...cloned] },
        codeLine: 2,
      });
    });

    recorder.push({
      action: 'move-pointer',
      description: 'Pass 2: assign random pointers on clones using original.random.next',
      visualizationData: { list: [...list], cloned: [...cloned] },
      variables: { phase: 'random' },
      memory: { cloned: [...cloned] },
      codeLine: 3,
    });

    recorder.push({
      description: 'Pass 3: detach clones from originals — deep copy complete',
      visualizationData: { cloned: [...cloned] },
      variables: { length: cloned.length },
      memory: { cloned: [...cloned] },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Deep-copies a list with random pointers via node interleaving.'
);

export const lruCacheImplementation = createLinkedListAlgorithm(
  'LRU Cache Implementation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = Math.max(1, Math.trunc(getNumber(input, 'capacity', 2)));
    const ops = (Array.isArray(input.operations) ? input.operations : ['put:1', 'put:2', 'get:1', 'put:3', 'get:2']) as string[];
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(capacity)' });
    const order: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `LRU cache with capacity ${capacity}: doubly linked list + hashmap`,
      visualizationData: { order: [], capacity },
      variables: { capacity },
      memory: { order: [] },
      codeLine: 1,
    });

    ops.forEach((op) => {
      const [kind, raw] = op.split(':');
      const key = Number(raw);
      const idx = order.indexOf(key);
      if (kind === 'get') {
        if (idx !== -1) {
          order.splice(idx, 1);
          order.push(key);
          recorder.push({
            action: 'found',
            description: `get(${key}) → hit, move key to most-recently-used`,
            visualizationData: { order: [...order], capacity, key },
            highlights: [order.length - 1],
            variables: { hit: true },
            memory: { order: [...order] },
            codeLine: 2,
          });
        } else {
          recorder.push({
            action: 'not-found',
            description: `get(${key}) → miss (-1)`,
            visualizationData: { order: [...order], capacity, key },
            variables: { hit: false },
            memory: { order: [...order] },
            codeLine: 2,
          });
        }
      } else {
        if (idx !== -1) order.splice(idx, 1);
        order.push(key);
        if (order.length > capacity) {
          const evicted = order.shift();
          recorder.push({
            action: 'delete',
            description: `put(${key}) exceeds capacity → evict LRU key ${evicted}`,
            visualizationData: { order: [...order], capacity, evicted },
            variables: { evicted },
            memory: { order: [...order] },
            codeLine: 3,
          });
        } else {
          recorder.push({
            action: 'insert',
            description: `put(${key}) → add as most-recently-used`,
            visualizationData: { order: [...order], capacity, key },
            highlights: [order.length - 1],
            variables: { key },
            memory: { order: [...order] },
            codeLine: 3,
          });
        }
      }
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(capacity)' },
  'Implements an LRU cache with a doubly linked list and hashmap.'
);

export const linkedListAdvancedAlgorithms = [
  reverseNodesInKGroup,
  mergeKSortedLists,
  copyListWithRandomPointer,
  lruCacheImplementation,
] as const;
