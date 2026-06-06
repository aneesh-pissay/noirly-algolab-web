import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { slidingWindowMax } from '../../../_internal/window-algorithms';
import { createQueueAlgorithm, createStepRecorder, getNumber, getNumberArray, getString } from '../easy-lessons/helpers';

export const circularQueue = createQueueAlgorithm(
  'Circular Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = getNumber(input, 'capacity', 5);
    const values = getNumberArray(input, 'array', [10, 20, 30]);
    const buffer = new Array<number | null>(capacity).fill(null);
    let front = 0;
    let rear = 0;
    let size = 0;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(capacity)' });

    values.forEach((value) => {
      if (size < capacity) {
        buffer[rear] = value;
        rear = (rear + 1) % capacity;
        size += 1;
      }
      recorder.push({ description: `Insert ${value}`, visualizationData: { buffer, front, rear, size, capacity }, memory: { buffer }, codeLine: 1 });
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(capacity)' },
  'Implements fixed-size circular queue using modular indices.'
);

export const priorityQueue = createQueueAlgorithm(
  'Priority Queue',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const items = [
      { value: 1, priority: 3 },
      { value: 2, priority: 1 },
      { value: 3, priority: 2 },
    ];
    const sorted = [...items].sort((a, b) => a.priority - b.priority);
    const recorder = createStepRecorder({ time: 'O(log n)', space: 'O(n)' });
    recorder.push({ description: 'Priority dequeue order computed', visualizationData: { items, sorted }, memory: { sorted }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(log n)', space: 'O(n)' },
  'Processes elements by priority rather than insertion order.'
);

export const implementStackUsingQueue = createQueueAlgorithm(
  'Implement Stack Using Queue',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const queue: number[] = [1, 2, 3];
    queue.push(4);
    for (let i = 0; i < queue.length - 1; i += 1) {
      queue.push(queue.shift() as number);
    }
    const top = queue[0] ?? null;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: 'Rotate queue after push to keep stack top at front', visualizationData: { queue, top }, memory: { top }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Emulates stack behavior using queue rotations.'
);

export const reverseQueue = createQueueAlgorithm(
  'Reverse Queue',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const queue = getNumberArray(input, 'array', [1, 2, 3, 4]);
    const reversed = [...queue].reverse();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: 'Queue reversed', visualizationData: { queue, reversed }, memory: { reversed }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Reverses queue order using auxiliary stack/array.'
);

export const generateBinaryNumbers = createQueueAlgorithm(
  'Generate Binary Numbers',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = getNumber(input, 'n', 5);
    const q: string[] = ['1'];
    const out: string[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < n; i += 1) {
      const cur = q.shift() as string;
      out.push(cur);
      q.push(`${cur}0`);
      q.push(`${cur}1`);
      recorder.push({ description: `Generated ${cur}`, visualizationData: { out: [...out], queue: [...q] }, memory: { out: [...out] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Uses queue to generate binary numbers level-wise.'
);

export const firstNonRepeatingCharacter = createQueueAlgorithm(
  'First Non-Repeating Character',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const str = getString(input, 'str', 'aabc');
    const freq = new Map<string, number>();
    const queue: string[] = [];
    const answers: string[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(k)' });

    for (const ch of str) {
      freq.set(ch, (freq.get(ch) ?? 0) + 1);
      queue.push(ch);
      while (queue.length && (freq.get(queue[0]) ?? 0) > 1) {
        queue.shift();
      }
      answers.push(queue[0] ?? '#');
      recorder.push({ description: `Read ${ch}, first non-repeating ${queue[0] ?? '#'}`, visualizationData: { ch, queue: [...queue], freq: Object.fromEntries(freq.entries()) }, memory: { answers: [...answers] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Tracks first non-repeating stream character with queue + frequency map.'
);

export const slidingWindowMaximumQueue = slidingWindowMax;

export const queueIntermediateAlgorithms = [
  circularQueue,
  priorityQueue,
  implementStackUsingQueue,
  reverseQueue,
  generateBinaryNumbers,
  firstNonRepeatingCharacter,
  slidingWindowMaximumQueue,
] as const;
