import type { Algorithm } from '../../../engine/types';

import { createTreeRb, insertNodeRb, searchNodeRb, nodeColoring } from './easy-lessons';
import { rotationsRb, balanceAfterInsert, fixViolations, deleteNodeRb } from './medium-lessons';
import { treeRebalancing, redBlackProperties, internalMapImplementation } from './hard-lessons';

export { createTreeRb, insertNodeRb, searchNodeRb, nodeColoring };
export { rotationsRb, balanceAfterInsert, fixViolations, deleteNodeRb };
export { treeRebalancing, redBlackProperties, internalMapImplementation };

export const redBlackTreeAlgorithmsByLevel = {
  easyLessons: [createTreeRb, insertNodeRb, searchNodeRb, nodeColoring],
  mediumLessons: [rotationsRb, balanceAfterInsert, fixViolations, deleteNodeRb],
  hardLessons: [treeRebalancing, redBlackProperties, internalMapImplementation],
} as const;

export const redBlackTreeAlgorithms = [
  ...redBlackTreeAlgorithmsByLevel.easyLessons,
  ...redBlackTreeAlgorithmsByLevel.mediumLessons,
  ...redBlackTreeAlgorithmsByLevel.hardLessons,
] as const;

export const redBlackTreeAlgorithmRegistry = {
  'red-black-create': createTreeRb,
  'red-black-insert-node': insertNodeRb,
  'red-black-search-node': searchNodeRb,
  'red-black-node-coloring': nodeColoring,
  'red-black-rotations': rotationsRb,
  'red-black-balance-after-insert': balanceAfterInsert,
  'red-black-fix-violations': fixViolations,
  'red-black-delete-node': deleteNodeRb,
  'red-black-tree-rebalancing': treeRebalancing,
  'red-black-properties': redBlackProperties,
  'red-black-internal-map': internalMapImplementation,
} as const satisfies Record<string, Algorithm>;

export type RedBlackTreeAlgorithmId = keyof typeof redBlackTreeAlgorithmRegistry;

export function registerRedBlackTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(redBlackTreeAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
