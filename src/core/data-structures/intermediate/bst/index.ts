import type { Algorithm } from '../../../engine/types';

import { insertNodeBst, searchNodeBst, deleteNodeBst, minimumNode, maximumNode } from './easy-lessons';
import { validateBst, kthSmallestElement, bstIterator, convertSortedArrayToBst, lowestCommonAncestorBst } from './medium-lessons';
import { recoverBst, balanceBst, mergeBsts } from './hard-lessons';

export { insertNodeBst, searchNodeBst, deleteNodeBst, minimumNode, maximumNode };
export { validateBst, kthSmallestElement, bstIterator, convertSortedArrayToBst, lowestCommonAncestorBst };
export { recoverBst, balanceBst, mergeBsts };

export const bstAlgorithmsByLevel = {
  easyLessons: [insertNodeBst, searchNodeBst, deleteNodeBst, minimumNode, maximumNode],
  mediumLessons: [validateBst, kthSmallestElement, bstIterator, convertSortedArrayToBst, lowestCommonAncestorBst],
  hardLessons: [recoverBst, balanceBst, mergeBsts],
} as const;

export const bstAlgorithms = [
  ...bstAlgorithmsByLevel.easyLessons,
  ...bstAlgorithmsByLevel.mediumLessons,
  ...bstAlgorithmsByLevel.hardLessons,
] as const;

export const bstAlgorithmRegistry = {
  'bst-insert-node': insertNodeBst,
  'bst-search-node': searchNodeBst,
  'bst-delete-node': deleteNodeBst,
  'bst-minimum-node': minimumNode,
  'bst-maximum-node': maximumNode,
  'bst-validate': validateBst,
  'bst-kth-smallest': kthSmallestElement,
  'bst-iterator': bstIterator,
  'bst-convert-sorted-array': convertSortedArrayToBst,
  'bst-lowest-common-ancestor': lowestCommonAncestorBst,
  'bst-recover': recoverBst,
  'bst-balance': balanceBst,
  'bst-merge': mergeBsts,
} as const satisfies Record<string, Algorithm>;

export type BstAlgorithmId = keyof typeof bstAlgorithmRegistry;

export function registerBstAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(bstAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
