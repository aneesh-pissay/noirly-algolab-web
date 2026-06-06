import type { Algorithm } from '../../../engine/types';
import {
  arrayTraversal,
  insertElement,
  deleteElement,
  searchElement,
  findMaxMin,
  arrayReverse,
} from './easy-lessons';
import {
  arrayRotate,
  prefixSum,
  kadaneAlgorithm,
  mergeSortedArrays,
  dutchFlagAlgorithm,
  twoSum,
} from './medium-lessons';
import {
  productExceptSelf,
  mergeIntervals,
  nextPermutation,
  histogramArea,
  rainWater,
} from './hard-lessons';

export {
  arrayTraversal,
  insertElement,
  deleteElement,
  searchElement,
  findMaxMin,
  arrayReverse,
};

export {
  arrayRotate,
  prefixSum,
  twoSum,
  kadaneAlgorithm,
  mergeSortedArrays,
  dutchFlagAlgorithm,
};

export {
  productExceptSelf,
  mergeIntervals,
  nextPermutation,
  rainWater,
  histogramArea,
};

export const arrayAlgorithmsByLevel = {
  easyLessons: [arrayTraversal, insertElement, deleteElement, searchElement, findMaxMin, arrayReverse],
  mediumLessons: [arrayRotate, prefixSum, twoSum, kadaneAlgorithm, mergeSortedArrays, dutchFlagAlgorithm],
  hardLessons: [productExceptSelf, mergeIntervals, nextPermutation, rainWater, histogramArea],
} as const;

export const arrayAlgorithms = [
  ...arrayAlgorithmsByLevel.easyLessons,
  ...arrayAlgorithmsByLevel.mediumLessons,
  ...arrayAlgorithmsByLevel.hardLessons,
] as const;

export const arrayAlgorithmRegistry = {
  'array-traversal': arrayTraversal,
  'array-insert-element': insertElement,
  'array-delete-element': deleteElement,
  'array-search-element': searchElement,
  'array-find-max-min': findMaxMin,
  'array-reverse': arrayReverse,
  'array-rotate': arrayRotate,
  'array-prefix-sum': prefixSum,
  'array-two-sum': twoSum,
  'array-kadane': kadaneAlgorithm,
  'array-merge-sorted': mergeSortedArrays,
  'array-dutch-flag': dutchFlagAlgorithm,
  'array-product-except-self': productExceptSelf,
  'array-merge-intervals': mergeIntervals,
  'array-next-permutation': nextPermutation,
  'array-rain-water': rainWater,
  'array-histogram-area': histogramArea,
} as const satisfies Record<string, Algorithm>;

export type ArrayAlgorithmId = keyof typeof arrayAlgorithmRegistry;

export function registerArrayAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(arrayAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
