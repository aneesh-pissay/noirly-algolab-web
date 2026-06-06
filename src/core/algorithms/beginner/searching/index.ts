import type { Algorithm } from '../../../engine/types';
import { linearSearch, binarySearch } from './easy-lessons';
import { jumpSearch, exponentialSearch, interpolationSearch, ternarySearch } from './medium-lessons';
import { searchRotatedArray, findPeakElement, medianTwoSortedArrays, binarySearchOnAnswer } from './hard-lessons';

export { linearSearch, binarySearch, jumpSearch, exponentialSearch, interpolationSearch, ternarySearch, searchRotatedArray, findPeakElement, medianTwoSortedArrays, binarySearchOnAnswer };

export const searchingAlgorithmsByLevel = {
  easyLessons: [linearSearch, binarySearch],
  mediumLessons: [jumpSearch, exponentialSearch, interpolationSearch, ternarySearch],
  hardLessons: [searchRotatedArray, findPeakElement, medianTwoSortedArrays, binarySearchOnAnswer],
} as const;

export const searchingAlgorithms = [
  ...searchingAlgorithmsByLevel.easyLessons,
  ...searchingAlgorithmsByLevel.mediumLessons,
  ...searchingAlgorithmsByLevel.hardLessons,
] as const;

export const searchingAlgorithmRegistry = {
  'searching-linear': linearSearch,
  'searching-binary': binarySearch,
  'searching-jump': jumpSearch,
  'searching-exponential': exponentialSearch,
  'searching-interpolation': interpolationSearch,
  'searching-ternary': ternarySearch,
  'searching-rotated-array': searchRotatedArray,
  'searching-peak-element': findPeakElement,
  'searching-median-two-arrays': medianTwoSortedArrays,
  'searching-binary-on-answer': binarySearchOnAnswer,
} as const satisfies Record<string, Algorithm>;

export function registerSearchingAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(searchingAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));
}
