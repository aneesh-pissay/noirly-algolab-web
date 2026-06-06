import type { Algorithm } from '../../../engine/types';

import {
  addElement,
  checkElementExists,
  removeElement,
} from './easy-lessons';
import {
  containsDuplicateSet,
  findMissingNumberSet,
  happyNumber,
  intersectionOfArraysSet,
  removeDuplicatesSet,
} from './medium-lessons';
import {
  longestConsecutiveSequenceSet,
  sudokuValidation,
} from './hard-lessons';

export {
  addElement,
  removeElement,
  checkElementExists,
  containsDuplicateSet,
};

export {
  removeDuplicatesSet,
  intersectionOfArraysSet,
  happyNumber,
  findMissingNumberSet,
};

export {
  longestConsecutiveSequenceSet,
  sudokuValidation,
};

export const hashSetAlgorithmsByLevel = {
  easyLessons: [addElement, removeElement, checkElementExists, containsDuplicateSet],
  mediumLessons: [removeDuplicatesSet, intersectionOfArraysSet, happyNumber, findMissingNumberSet],
  hardLessons: [longestConsecutiveSequenceSet, sudokuValidation],
} as const;

export const hashSetAlgorithms = [
  ...hashSetAlgorithmsByLevel.easyLessons,
  ...hashSetAlgorithmsByLevel.mediumLessons,
  ...hashSetAlgorithmsByLevel.hardLessons,
] as const;

export const hashSetAlgorithmRegistry = {
  'hashset-add-element': addElement,
  'hashset-remove-element': removeElement,
  'hashset-contains-element': checkElementExists,
  'hashset-contains-duplicate': containsDuplicateSet,
  'hashset-remove-duplicates': removeDuplicatesSet,
  'hashset-intersection-of-arrays': intersectionOfArraysSet,
  'hashset-find-missing-number': findMissingNumberSet,
  'hashset-happy-number': happyNumber,
  'hashset-longest-consecutive-sequence': longestConsecutiveSequenceSet,
  'hashset-sudoku-validation': sudokuValidation,
} as const satisfies Record<string, Algorithm>;

export type HashSetAlgorithmId = keyof typeof hashSetAlgorithmRegistry;

export function registerHashSetAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(hashSetAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
