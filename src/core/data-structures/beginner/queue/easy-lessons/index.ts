import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { asQueue, createQueueAlgorithm, createStepRecorder, getNumber } from './helpers';

export const queueBasics = createQueueAlgorithm(
  'Queue Basics',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    recorder.push({
      description: 'Queue follows FIFO (First In First Out)',
      visualizationData: { queue, front: queue[0] ?? null, rear: queue[queue.length - 1] ?? null },
      variables: { size: queue.length },
      memory: { queue },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Introduces queue and front/rear operations.'
);

export const createQueue = createQueueAlgorithm(
  'Create Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      description: 'Create queue from input array',
      visualizationData: { queue },
      variables: { size: queue.length },
      memory: { queue },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Creates queue state from values.'
);

export const enqueueElement = createQueueAlgorithm(
  'Enqueue Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const value = getNumber(input, 'value', 99);
    queue.push(value);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'enqueue',
      description: `Enqueue ${value}`,
      visualizationData: { queue, enqueued: value },
      variables: { value, size: queue.length },
      memory: { queue },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Adds element at queue rear.'
);

export const dequeueElement = createQueueAlgorithm(
  'Dequeue Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const dequeued = queue.shift() ?? null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'dequeue',
      description: dequeued === null ? 'Dequeue on empty queue' : `Dequeued ${dequeued}`,
      visualizationData: { queue, dequeued },
      variables: { dequeued, size: queue.length },
      memory: { queue },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Removes element from queue front.'
);

export const frontElement = createQueueAlgorithm(
  'Front Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const front = queue[0] ?? null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: front === null ? 'Queue is empty' : `Front is ${front}`,
      visualizationData: { queue, front },
      variables: { front },
      memory: { front },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Reads queue front element.'
);

export const rearElement = createQueueAlgorithm(
  'Rear Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const rear = queue.length ? queue[queue.length - 1] : null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: rear === null ? 'Queue is empty' : `Rear is ${rear}`,
      visualizationData: { queue, rear },
      variables: { rear },
      memory: { rear },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Reads queue rear element.'
);

export const frontRearElement = createQueueAlgorithm(
  'Front / Rear',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const front = queue[0] ?? null;
    const rear = queue.length ? queue[queue.length - 1] : null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: front === null ? 'Queue is empty' : `Front is ${front} and rear is ${rear}`,
      visualizationData: { queue, front, rear },
      variables: { front, rear },
      memory: { front, rear },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Reads both the front and rear elements of the queue.'
);

export const checkEmptyQueue = createQueueAlgorithm(
  'Check Empty Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const isEmpty = queue.length === 0;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: isEmpty ? 'Queue is empty' : 'Queue is not empty',
      visualizationData: { queue, isEmpty },
      variables: { isEmpty },
      memory: { isEmpty },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Checks if queue has no elements.'
);

export const queueSize = createQueueAlgorithm(
  'Queue Size',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: `Queue size is ${queue.length}`,
      visualizationData: { queue, size: queue.length },
      variables: { size: queue.length },
      memory: { size: queue.length },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Returns number of queue elements.'
);

export const traverseQueue = createQueueAlgorithm(
  'Traverse Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = asQueue(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    for (let i = 0; i < queue.length; i += 1) {
      recorder.push({
        action: 'traverse',
        description: `Visit queue[${i}] = ${queue[i]}`,
        visualizationData: { queue, index: i, value: queue[i] },
        highlights: [i],
        variables: { index: i, value: queue[i] },
        memory: { queue },
        codeLine: 1,
      });
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Traverses queue from front to rear.'
);

export const queueBeginnerAlgorithms = [
  queueBasics,
  createQueue,
  enqueueElement,
  dequeueElement,
  frontElement,
  rearElement,
  checkEmptyQueue,
  queueSize,
  traverseQueue,
] as const;

export const queueDS = createQueueAlgorithm(
  'Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const ops = (input.operations as string[]) ?? ['enqueue', 'enqueue', 'dequeue', 'peek'];
    const values = asQueue(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    const queue: number[] = [];
    let valueIndex = 0;

    recorder.push({
      description: 'Starting queue operations',
      visualizationData: { queue: [], operations: ops },
      variables: { size: 0 },
      memory: { queue: [] },
      codeLine: 1,
    });

    for (const op of ops) {
      if (op === 'enqueue' && valueIndex < values.length) {
        const value = values[valueIndex++];
        queue.push(value);
        recorder.push({
          action: 'enqueue',
          description: `Enqueue ${value}`,
          visualizationData: { queue: [...queue], operation: op },
          variables: { value, size: queue.length },
          memory: { queue: [...queue] },
          codeLine: 2,
        });
      } else if (op === 'dequeue') {
        const out = queue.shift() ?? null;
        recorder.push({
          action: 'dequeue',
          description: out === null ? 'Cannot dequeue empty queue' : `Dequeue ${out}`,
          visualizationData: { queue: [...queue], dequeued: out, operation: op },
          variables: { out, size: queue.length },
          memory: { queue: [...queue] },
          codeLine: 3,
        });
      } else if (op === 'peek') {
        const front = queue.length ? queue[0] : null;
        recorder.push({
          description: front === null ? 'Cannot peek empty queue' : `Front ${front}`,
          visualizationData: { queue: [...queue], front, operation: op },
          variables: { front, size: queue.length },
          memory: { queue: [...queue] },
          codeLine: 4,
        });
      }
    }

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'FIFO data structure with enqueue, dequeue, and front operations.'
);
