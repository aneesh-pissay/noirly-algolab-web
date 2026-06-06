import type { Algorithm } from '../../../engine/types';
import { bubbleSort, selectionSort, insertionSort } from './easy-lessons';
import { mergeSort, quickSort, heapSort, shellSort } from './medium-lessons';
import { countingSort, radixSort, bucketSort, timSort, introSort } from './hard-lessons';

export { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort, shellSort, countingSort, radixSort, bucketSort, timSort, introSort };

export const sortingAlgorithmsByLevel = {
  easyLessons: [bubbleSort, selectionSort, insertionSort],
  mediumLessons: [mergeSort, quickSort, heapSort, shellSort],
  hardLessons: [countingSort, radixSort, bucketSort, timSort, introSort],
} as const;

export const sortingAlgorithms = [
  ...sortingAlgorithmsByLevel.easyLessons,
  ...sortingAlgorithmsByLevel.mediumLessons,
  ...sortingAlgorithmsByLevel.hardLessons,
] as const;

export const sortingAlgorithmRegistry = {
  'sorting-bubble': bubbleSort,
  'sorting-selection': selectionSort,
  'sorting-insertion': insertionSort,
  'sorting-merge': mergeSort,
  'sorting-quick': quickSort,
  'sorting-heap': heapSort,
  'sorting-shell': shellSort,
  'sorting-counting': countingSort,
  'sorting-radix': radixSort,
  'sorting-bucket': bucketSort,
  'sorting-tim': timSort,
  'sorting-intro': introSort,
} as const satisfies Record<string, Algorithm>;

export function registerSortingAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(sortingAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));
}
