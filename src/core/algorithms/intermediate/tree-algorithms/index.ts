import type { Algorithm } from '../../../engine/types';

import { dfsTraversal, bfs, treeHeight, countNodes } from './easy-lessons';

import { diameterOfTree, lowestCommonAncestor, zigzagTraversal, boundaryTraversal } from './medium-lessons';

import { serializeDeserializeTree, maximumPathSum, recoverTree } from './hard-lessons';



export { dfsTraversal, bfs, treeHeight, countNodes, diameterOfTree, lowestCommonAncestor, zigzagTraversal, boundaryTraversal, serializeDeserializeTree, maximumPathSum, recoverTree };



export const treeAlgorithmsByLevel = {

  easyLessons: [dfsTraversal, bfs, treeHeight, countNodes],

  mediumLessons: [diameterOfTree, lowestCommonAncestor, zigzagTraversal, boundaryTraversal],

  hardLessons: [serializeDeserializeTree, maximumPathSum, recoverTree],

} as const;



export const treeAlgorithms = [

  ...treeAlgorithmsByLevel.easyLessons,

  ...treeAlgorithmsByLevel.mediumLessons,

  ...treeAlgorithmsByLevel.hardLessons,

] as const;



export const treeAlgorithmRegistry = {

  'tree-dfs-traversal': dfsTraversal,

  'tree-bfs-traversal': bfs,

  'tree-height': treeHeight,

  'tree-count-nodes': countNodes,

  'tree-diameter': diameterOfTree,

  'tree-lca': lowestCommonAncestor,

  'tree-zigzag': zigzagTraversal,

  'tree-boundary': boundaryTraversal,

  'tree-serialize': serializeDeserializeTree,

  'tree-max-path-sum': maximumPathSum,

  'tree-recover': recoverTree,

} as const satisfies Record<string, Algorithm>;



export function registerTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(treeAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


