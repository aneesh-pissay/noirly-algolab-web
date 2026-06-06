import type { Algorithm } from '../../../engine/types';

import { createTree, preorderTraversal, inorderTraversal, postorderTraversal, levelOrderTraversalTree } from './easy-lessons';
import { heightOfTree, diameterOfTree, checkBalancedTree, rightSideView, lowestCommonAncestor } from './medium-lessons';
import { serializeDeserializeTree, maximumPathSum, binaryTreeCameras, recoverBinaryTree } from './hard-lessons';

export { createTree, preorderTraversal, inorderTraversal, postorderTraversal, levelOrderTraversalTree };
export { heightOfTree, diameterOfTree, checkBalancedTree, rightSideView, lowestCommonAncestor };
export { serializeDeserializeTree, maximumPathSum, binaryTreeCameras, recoverBinaryTree };

export const binaryTreeAlgorithmsByLevel = {
  easyLessons: [createTree, preorderTraversal, inorderTraversal, postorderTraversal, levelOrderTraversalTree],
  mediumLessons: [heightOfTree, diameterOfTree, checkBalancedTree, rightSideView, lowestCommonAncestor],
  hardLessons: [serializeDeserializeTree, maximumPathSum, binaryTreeCameras, recoverBinaryTree],
} as const;

export const binaryTreeAlgorithms = [
  ...binaryTreeAlgorithmsByLevel.easyLessons,
  ...binaryTreeAlgorithmsByLevel.mediumLessons,
  ...binaryTreeAlgorithmsByLevel.hardLessons,
] as const;

export const binaryTreeAlgorithmRegistry = {
  'binary-tree-create': createTree,
  'binary-tree-preorder': preorderTraversal,
  'binary-tree-inorder': inorderTraversal,
  'binary-tree-postorder': postorderTraversal,
  'binary-tree-level-order': levelOrderTraversalTree,
  'binary-tree-height': heightOfTree,
  'binary-tree-diameter': diameterOfTree,
  'binary-tree-check-balanced': checkBalancedTree,
  'binary-tree-right-side-view': rightSideView,
  'binary-tree-lowest-common-ancestor': lowestCommonAncestor,
  'binary-tree-serialize-deserialize': serializeDeserializeTree,
  'binary-tree-maximum-path-sum': maximumPathSum,
  'binary-tree-cameras': binaryTreeCameras,
  'binary-tree-recover': recoverBinaryTree,
} as const satisfies Record<string, Algorithm>;

export type BinaryTreeAlgorithmId = keyof typeof binaryTreeAlgorithmRegistry;

export function registerBinaryTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(binaryTreeAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
