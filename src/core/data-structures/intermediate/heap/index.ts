import type { Algorithm } from '../../../engine/types';

import { heapBasics, createMinHeap, createMaxHeap, insertElementHeap, removeElementHeap } from './easy-lessons';
import { heapify, kLargestElements, kSmallestElements, mergeKSortedArrays, topKFrequent } from './medium-lessons';
import { medianFromStream, slidingWindowMedian, minimumCostProblems } from './hard-lessons';

export { heapBasics, createMinHeap, createMaxHeap, insertElementHeap, removeElementHeap };
export { heapify, kLargestElements, kSmallestElements, mergeKSortedArrays, topKFrequent };
export { medianFromStream, slidingWindowMedian, minimumCostProblems };

export const heapAlgorithmsByLevel = {
  easyLessons: [heapBasics, createMinHeap, createMaxHeap, insertElementHeap, removeElementHeap],
  mediumLessons: [heapify, kLargestElements, kSmallestElements, mergeKSortedArrays, topKFrequent],
  hardLessons: [medianFromStream, slidingWindowMedian, minimumCostProblems],
} as const;

export const heapAlgorithms = [
  ...heapAlgorithmsByLevel.easyLessons,
  ...heapAlgorithmsByLevel.mediumLessons,
  ...heapAlgorithmsByLevel.hardLessons,
] as const;

export const heapAlgorithmRegistry = {
  'heap-basics': heapBasics,
  'heap-create-min': createMinHeap,
  'heap-create-max': createMaxHeap,
  'heap-insert-element': insertElementHeap,
  'heap-remove-element': removeElementHeap,
  'heap-heapify': heapify,
  'heap-k-largest': kLargestElements,
  'heap-k-smallest': kSmallestElements,
  'heap-merge-k-sorted-arrays': mergeKSortedArrays,
  'heap-top-k-frequent': topKFrequent,
  'heap-median-from-stream': medianFromStream,
  'heap-sliding-window-median': slidingWindowMedian,
  'heap-minimum-cost': minimumCostProblems,
} as const satisfies Record<string, Algorithm>;

export type HeapAlgorithmId = keyof typeof heapAlgorithmRegistry;

export function registerHeapAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(heapAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
