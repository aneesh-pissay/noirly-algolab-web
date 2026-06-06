import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { graphBFS } from '../../../../algorithms/advanced/graph-algorithms/easy-lessons';
import { bfs } from '../../../../algorithms/intermediate/tree-algorithms/easy-lessons';
import { createQueueAlgorithm, createStepRecorder, getNumber, getString } from '../easy-lessons/helpers';

export const queueUsingLinkedList = createQueueAlgorithm(
  'Queue Using Linked List',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const queue = ['head -> 10 -> 20 -> 30 -> null'];
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    recorder.push({ description: 'Queue with linked-list front/rear pointers', visualizationData: { queue }, memory: { queue }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Represents queue operations with linked list nodes.'
);

export const doubleEndedQueue = createQueueAlgorithm(
  'Double Ended Queue (Deque)',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const deque = [20, 30];
    deque.unshift(10);
    deque.push(40);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    recorder.push({ description: 'Deque supports insert/delete at both ends', visualizationData: { deque }, memory: { deque }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Demonstrates deque front and rear operations.'
);

export const monotonicQueue = createQueueAlgorithm(
  'Monotonic Queue',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const input = [1, 3, -1, -3, 5, 3, 6, 7];
    const mono: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    input.forEach((value) => {
      while (mono.length && mono[mono.length - 1] < value) mono.pop();
      mono.push(value);
      recorder.push({ description: `Push ${value} while maintaining decreasing queue`, visualizationData: { input, mono: [...mono] }, memory: { mono: [...mono] }, codeLine: 1 });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Maintains monotonic order for range max/min queries.'
);

export const lruCacheUsingQueue = createQueueAlgorithm(
  'LRU Cache Using Queue',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = 3;
    const queue = [1, 2, 3];
    const access = 2;
    const idx = queue.indexOf(access);
    if (idx >= 0) queue.splice(idx, 1);
    queue.push(access);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(capacity)' });
    recorder.push({ description: 'Move recently used key to rear', visualizationData: { capacity, queue }, memory: { queue }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(capacity)' },
  'Approximates LRU recency order with queue behavior.'
);

export const bfsTraversalQueue = graphBFS;
export const levelOrderTraversal = bfs;

export const taskScheduler = createQueueAlgorithm(
  'Task Scheduler',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const cooldown = getNumber(input, 'cooldown', 2);
    const tasks = getString(input, 'tasks', 'AAABBB').split('');
    const queue: Array<{ task: string; release: number }> = [];
    let time = 0;
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });

    tasks.forEach((task) => {
      queue.push({ task, release: time + cooldown });
      recorder.push({ description: `Schedule ${task} at time ${time}`, visualizationData: { time, task, queue: [...queue] }, memory: { queue: [...queue] }, codeLine: 1 });
      time += 1;
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Simulates queue-driven task scheduling with cooldown constraints.'
);

export const queueAdvancedAlgorithms = [
  queueUsingLinkedList,
  doubleEndedQueue,
  monotonicQueue,
  lruCacheUsingQueue,
  bfsTraversalQueue,
  levelOrderTraversal,
  taskScheduler,
] as const;
