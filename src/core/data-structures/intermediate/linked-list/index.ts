import type { Algorithm } from '../../../engine/types';

import {
  createLinkedList,
  traverseLinkedList,
  insertNode,
  deleteNode,
  searchNode,
  findLength,
} from './easy-lessons';
import {
  reverseLinkedList,
  middleOfLinkedList,
  detectCycle,
  removeNthNode,
  mergeTwoSortedLists,
  addTwoNumbers,
} from './medium-lessons';
import {
  reverseNodesInKGroup,
  mergeKSortedLists,
  copyListWithRandomPointer,
  lruCacheImplementation,
} from './hard-lessons';

export {
  createLinkedList,
  traverseLinkedList,
  insertNode,
  deleteNode,
  searchNode,
  findLength,
};

export {
  reverseLinkedList,
  middleOfLinkedList,
  detectCycle,
  removeNthNode,
  mergeTwoSortedLists,
  addTwoNumbers,
};

export {
  reverseNodesInKGroup,
  mergeKSortedLists,
  copyListWithRandomPointer,
  lruCacheImplementation,
};

export const linkedListAlgorithmsByLevel = {
  easyLessons: [createLinkedList, traverseLinkedList, insertNode, deleteNode, searchNode, findLength],
  mediumLessons: [reverseLinkedList, middleOfLinkedList, detectCycle, removeNthNode, mergeTwoSortedLists, addTwoNumbers],
  hardLessons: [reverseNodesInKGroup, mergeKSortedLists, copyListWithRandomPointer, lruCacheImplementation],
} as const;

export const linkedListAlgorithms = [
  ...linkedListAlgorithmsByLevel.easyLessons,
  ...linkedListAlgorithmsByLevel.mediumLessons,
  ...linkedListAlgorithmsByLevel.hardLessons,
] as const;

export const linkedListAlgorithmRegistry = {
  'linked-list-create': createLinkedList,
  'linked-list-traverse': traverseLinkedList,
  'linked-list-insert-node': insertNode,
  'linked-list-delete-node': deleteNode,
  'linked-list-search-node': searchNode,
  'linked-list-find-length': findLength,
  'linked-list-reverse': reverseLinkedList,
  'linked-list-middle': middleOfLinkedList,
  'linked-list-detect-cycle': detectCycle,
  'linked-list-remove-nth-node': removeNthNode,
  'linked-list-merge-two-sorted': mergeTwoSortedLists,
  'linked-list-add-two-numbers': addTwoNumbers,
  'linked-list-reverse-k-group': reverseNodesInKGroup,
  'linked-list-merge-k-sorted': mergeKSortedLists,
  'linked-list-copy-random-pointer': copyListWithRandomPointer,
  'linked-list-lru-cache': lruCacheImplementation,
} as const satisfies Record<string, Algorithm>;

export type LinkedListAlgorithmId = keyof typeof linkedListAlgorithmRegistry;

export function registerLinkedListAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(linkedListAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
