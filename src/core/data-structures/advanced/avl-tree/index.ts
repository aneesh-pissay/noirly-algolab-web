import type { Algorithm } from '../../../engine/types';

import { createAvlTree, insertNodeAvl, searchNodeAvl, heightCalculation } from './easy-lessons';
import { balanceFactor, leftRotation, rightRotation, lrRotation, rlRotation } from './medium-lessons';
import { deleteNodeAvl, joinAvlTrees, splitAvlTrees } from './hard-lessons';

export { createAvlTree, insertNodeAvl, searchNodeAvl, heightCalculation };
export { balanceFactor, leftRotation, rightRotation, lrRotation, rlRotation };
export { deleteNodeAvl, joinAvlTrees, splitAvlTrees };

export const avlTreeAlgorithmsByLevel = {
  easyLessons: [createAvlTree, insertNodeAvl, searchNodeAvl, heightCalculation],
  mediumLessons: [balanceFactor, leftRotation, rightRotation, lrRotation, rlRotation],
  hardLessons: [deleteNodeAvl, joinAvlTrees, splitAvlTrees],
} as const;

export const avlTreeAlgorithms = [
  ...avlTreeAlgorithmsByLevel.easyLessons,
  ...avlTreeAlgorithmsByLevel.mediumLessons,
  ...avlTreeAlgorithmsByLevel.hardLessons,
] as const;

export const avlTreeAlgorithmRegistry = {
  'avl-create': createAvlTree,
  'avl-insert-node': insertNodeAvl,
  'avl-search-node': searchNodeAvl,
  'avl-height-calculation': heightCalculation,
  'avl-balance-factor': balanceFactor,
  'avl-left-rotation': leftRotation,
  'avl-right-rotation': rightRotation,
  'avl-lr-rotation': lrRotation,
  'avl-rl-rotation': rlRotation,
  'avl-delete-node': deleteNodeAvl,
  'avl-join': joinAvlTrees,
  'avl-split': splitAvlTrees,
} as const satisfies Record<string, Algorithm>;

export type AvlTreeAlgorithmId = keyof typeof avlTreeAlgorithmRegistry;

export function registerAvlTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(avlTreeAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
