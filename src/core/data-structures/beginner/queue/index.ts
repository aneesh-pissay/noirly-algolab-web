import type { Algorithm } from '../../../engine/types';

import {
  dequeueElement,
  enqueueElement,
  frontRearElement,
  traverseQueue,
} from './easy-lessons';
import {
  circularQueue,
  implementStackUsingQueue,
  reverseQueue,
  slidingWindowMaximumQueue,
} from './medium-lessons';
import {
  doubleEndedQueue,
  levelOrderTraversal,
  monotonicQueue,
  taskScheduler,
} from './hard-lessons';

export {
  enqueueElement,
  dequeueElement,
  frontRearElement,
  traverseQueue,
};

export {
  circularQueue,
  implementStackUsingQueue,
  reverseQueue,
  levelOrderTraversal,
};

export {
  doubleEndedQueue,
  monotonicQueue,
  slidingWindowMaximumQueue,
  taskScheduler,
};

export const queueAlgorithmsByLevel = {
  easyLessons: [enqueueElement, dequeueElement, frontRearElement, traverseQueue],
  mediumLessons: [circularQueue, implementStackUsingQueue, reverseQueue, levelOrderTraversal],
  hardLessons: [doubleEndedQueue, monotonicQueue, slidingWindowMaximumQueue, taskScheduler],
} as const;

export const queueAlgorithms = [
  ...queueAlgorithmsByLevel.easyLessons,
  ...queueAlgorithmsByLevel.mediumLessons,
  ...queueAlgorithmsByLevel.hardLessons,
] as const;

export const queueAlgorithmRegistry = {
  'queue-enqueue-element': enqueueElement,
  'queue-dequeue-element': dequeueElement,
  'queue-front-rear': frontRearElement,
  'queue-traverse': traverseQueue,
  'queue-circular-queue': circularQueue,
  'queue-implement-stack-using-queue': implementStackUsingQueue,
  'queue-reverse-queue': reverseQueue,
  'queue-level-order-traversal': levelOrderTraversal,
  'queue-double-ended-queue': doubleEndedQueue,
  'queue-monotonic-queue': monotonicQueue,
  'queue-sliding-window-maximum': slidingWindowMaximumQueue,
  'queue-task-scheduler': taskScheduler,
} as const satisfies Record<string, Algorithm>;

export type QueueAlgorithmId = keyof typeof queueAlgorithmRegistry;

export function registerQueueAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(queueAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
