import type { Algorithm } from '../../../engine/types';

import { createGraph, addVertex, addEdge, adjacencyList, adjacencyMatrix, graphTraversalBasics } from './easy-lessons';
import {
  breadthFirstSearch,
  depthFirstSearch,
  detectCycleGraph,
  connectedComponents,
  numberOfIslands,
  topologicalSort,
} from './medium-lessons';
import {
  dijkstraAlgorithm,
  bellmanFord,
  floydWarshall,
  aStarSearch,
  primAlgorithm,
  kruskalAlgorithm,
} from './hard-lessons';

export { createGraph, addVertex, addEdge, adjacencyList, adjacencyMatrix, graphTraversalBasics };
export { breadthFirstSearch, depthFirstSearch, detectCycleGraph, connectedComponents, numberOfIslands, topologicalSort };
export { dijkstraAlgorithm, bellmanFord, floydWarshall, aStarSearch, primAlgorithm, kruskalAlgorithm };

export const graphAlgorithmsByLevel = {
  easyLessons: [createGraph, addVertex, addEdge, adjacencyList, adjacencyMatrix, graphTraversalBasics],
  mediumLessons: [breadthFirstSearch, depthFirstSearch, detectCycleGraph, connectedComponents, numberOfIslands, topologicalSort],
  hardLessons: [dijkstraAlgorithm, bellmanFord, floydWarshall, aStarSearch, primAlgorithm, kruskalAlgorithm],
} as const;

export const graphAlgorithms = [
  ...graphAlgorithmsByLevel.easyLessons,
  ...graphAlgorithmsByLevel.mediumLessons,
  ...graphAlgorithmsByLevel.hardLessons,
] as const;

export const graphAlgorithmRegistry = {
  'graph-create': createGraph,
  'graph-add-vertex': addVertex,
  'graph-add-edge': addEdge,
  'graph-adjacency-list': adjacencyList,
  'graph-adjacency-matrix': adjacencyMatrix,
  'graph-traversal-basics': graphTraversalBasics,
  'graph-bfs': breadthFirstSearch,
  'graph-dfs': depthFirstSearch,
  'graph-detect-cycle': detectCycleGraph,
  'graph-connected-components': connectedComponents,
  'graph-number-of-islands': numberOfIslands,
  'graph-topological-sort': topologicalSort,
  'graph-dijkstra': dijkstraAlgorithm,
  'graph-bellman-ford': bellmanFord,
  'graph-floyd-warshall': floydWarshall,
  'graph-a-star': aStarSearch,
  'graph-prim': primAlgorithm,
  'graph-kruskal': kruskalAlgorithm,
} as const satisfies Record<string, Algorithm>;

export type GraphAlgorithmId = keyof typeof graphAlgorithmRegistry;

export function registerGraphAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(graphAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
