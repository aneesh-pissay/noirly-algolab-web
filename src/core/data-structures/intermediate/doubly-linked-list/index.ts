import type { Algorithm } from '../../../engine/types';

import { createDll, forwardTraversal, backwardTraversal, insertNodeDll, deleteNodeDll } from './easy-lessons';
import { reverseDll, removeDuplicatesDll, findPairsWithSum, rotateDll } from './medium-lessons';
import { flattenMultilevelDll, designBrowserHistory, lruCacheDll } from './hard-lessons';

export { createDll, forwardTraversal, backwardTraversal, insertNodeDll, deleteNodeDll };
export { reverseDll, removeDuplicatesDll, findPairsWithSum, rotateDll };
export { flattenMultilevelDll, designBrowserHistory, lruCacheDll };

export const doublyLinkedListAlgorithmsByLevel = {
  easyLessons: [createDll, forwardTraversal, backwardTraversal, insertNodeDll, deleteNodeDll],
  mediumLessons: [reverseDll, removeDuplicatesDll, findPairsWithSum, rotateDll],
  hardLessons: [flattenMultilevelDll, designBrowserHistory, lruCacheDll],
} as const;

export const doublyLinkedListAlgorithms = [
  ...doublyLinkedListAlgorithmsByLevel.easyLessons,
  ...doublyLinkedListAlgorithmsByLevel.mediumLessons,
  ...doublyLinkedListAlgorithmsByLevel.hardLessons,
] as const;

export const doublyLinkedListAlgorithmRegistry = {
  'dll-create': createDll,
  'dll-forward-traversal': forwardTraversal,
  'dll-backward-traversal': backwardTraversal,
  'dll-insert-node': insertNodeDll,
  'dll-delete-node': deleteNodeDll,
  'dll-reverse': reverseDll,
  'dll-remove-duplicates': removeDuplicatesDll,
  'dll-find-pairs-with-sum': findPairsWithSum,
  'dll-rotate': rotateDll,
  'dll-flatten-multilevel': flattenMultilevelDll,
  'dll-design-browser-history': designBrowserHistory,
  'dll-lru-cache': lruCacheDll,
} as const satisfies Record<string, Algorithm>;

export type DoublyLinkedListAlgorithmId = keyof typeof doublyLinkedListAlgorithmRegistry;

export function registerDoublyLinkedListAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(doublyLinkedListAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
