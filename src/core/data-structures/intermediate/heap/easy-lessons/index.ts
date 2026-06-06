import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray } from '../../../_shared/helpers';
import { buildHeap, siftDown, siftUp } from '../helpers';

export const heapBasics = createDSAlgorithm(
  'Heap Basics',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [10, 20, 15, 30, 40]);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'A heap is a complete binary tree stored in an array',
      visualizationData: { heap: [...arr] },
      memory: { heap: [...arr] },
      codeLine: 1,
    });

    arr.forEach((value, i) => {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      recorder.push({
        action: 'visit',
        description: `index ${i} (${value}): left child @${left}, right child @${right}, parent @${Math.floor((i - 1) / 2)}`,
        visualizationData: { heap: [...arr], current: i, left, right },
        highlights: [i],
        variables: { index: i, value },
        memory: { heap: [...arr] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Explains array-based parent/child index arithmetic.'
);

function createHeapAlgorithm(name: string, kind: 'min' | 'max') {
  return createDSAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const arr = getNumberArray(input, 'array', [30, 10, 40, 20, 50]);
      const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
      const heap: number[] = [];

      recorder.push({
        action: 'initialize',
        description: `Build a ${kind}-heap by inserting and sifting up each value`,
        visualizationData: { heap: [], kind },
        memory: { heap: [] },
        codeLine: 1,
      });

      arr.forEach((value) => {
        heap.push(value);
        siftUp(heap, heap.length - 1, kind);
        recorder.push({
          action: 'heapify',
          description: `Insert ${value}, sift up → root is ${heap[0]}`,
          visualizationData: { heap: [...heap], kind, root: heap[0] },
          highlights: [0],
          variables: { inserted: value, root: heap[0] },
          memory: { heap: [...heap] },
          codeLine: 2,
        });
      });

      return recorder.steps;
    },
    { time: 'O(n)', space: 'O(1)' },
    `Constructs a ${kind}-heap via repeated insertion.`
  );
}

export const createMinHeap = createHeapAlgorithm('Create Min Heap', 'min');
export const createMaxHeap = createHeapAlgorithm('Create Max Heap', 'max');

export const insertElementHeap = createDSAlgorithm(
  'Insert Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [10, 20, 15, 30, 40]);
    const value = getNumber(input, 'value', 5);
    const heap = buildHeap(arr, 'min');
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Insert ${value} at the end, then sift up`,
      visualizationData: { heap: [...heap], value },
      variables: { value },
      memory: { heap: [...heap] },
      codeLine: 1,
    });

    heap.push(value);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[i] < heap[parent]) {
        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        recorder.push({
          action: 'swap',
          description: `${heap[parent]} < parent → swap up to index ${parent}`,
          visualizationData: { heap: [...heap], current: parent },
          highlights: [parent, i],
          variables: { index: parent },
          memory: { heap: [...heap] },
          codeLine: 2,
        });
        i = parent;
      } else break;
    }

    recorder.push({
      action: 'found',
      description: `Heap property restored; root = ${heap[0]}`,
      visualizationData: { heap: [...heap], root: heap[0] },
      variables: { root: heap[0] },
      memory: { heap: [...heap] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Inserts into a heap and restores order by sifting up.'
);

export const removeElementHeap = createDSAlgorithm(
  'Remove Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getNumberArray(input, 'array', [5, 10, 15, 30, 40, 20]);
    const heap = buildHeap(arr, 'min');
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'Remove root: swap with last element, pop, then sift down',
      visualizationData: { heap: [...heap], root: heap[0] },
      variables: { root: heap[0] },
      memory: { heap: [...heap] },
      codeLine: 1,
    });

    const removed = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    recorder.push({
      action: 'pop',
      description: `Extracted ${removed}; moved last element ${heap[0]} to root`,
      visualizationData: { heap: [...heap], removed },
      variables: { removed },
      memory: { heap: [...heap] },
      codeLine: 2,
    });

    siftDown(heap, 0, 'min');
    recorder.push({
      action: 'heapify',
      description: `Sifted down; new root = ${heap[0]}`,
      visualizationData: { heap: [...heap], root: heap[0] },
      variables: { root: heap[0] },
      memory: { heap: [...heap] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(1)' },
  'Removes the root and restores order by sifting down.'
);

export const heapBeginnerAlgorithms = [heapBasics, createMinHeap, createMaxHeap, insertElementHeap, removeElementHeap] as const;
