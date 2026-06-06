import type { Algorithm } from '../../../engine/types';

import { graphBFS, graphDFS, connectedComponents } from './easy-lessons';

import { topologicalSort, detectCycle, dijkstraAlgorithm, bellmanFord } from './medium-lessons';

import { floydWarshall, aStarSearch, tarjanAlgorithm, primAlgorithm, kruskalAlgorithm } from './hard-lessons';



export { graphBFS, graphDFS, connectedComponents, topologicalSort, detectCycle, dijkstraAlgorithm, bellmanFord, floydWarshall, aStarSearch, tarjanAlgorithm, primAlgorithm, kruskalAlgorithm };



export const graphAlgorithmsByLevel = {

  easyLessons: [graphBFS, graphDFS, connectedComponents],

  mediumLessons: [topologicalSort, detectCycle, dijkstraAlgorithm, bellmanFord],

  hardLessons: [floydWarshall, aStarSearch, tarjanAlgorithm, primAlgorithm, kruskalAlgorithm],

} as const;



export const graphAlgorithms = [

  ...graphAlgorithmsByLevel.easyLessons,

  ...graphAlgorithmsByLevel.mediumLessons,

  ...graphAlgorithmsByLevel.hardLessons,

] as const;



export const graphAlgorithmRegistry = {

  'graph-bfs': graphBFS,

  'graph-dfs': graphDFS,

  'graph-connected-components': connectedComponents,

  'graph-topological-sort': topologicalSort,

  'graph-detect-cycle': detectCycle,

  'graph-dijkstra': dijkstraAlgorithm,

  'graph-bellman-ford': bellmanFord,

  'graph-floyd-warshall': floydWarshall,

  'graph-a-star': aStarSearch,

  'graph-tarjan': tarjanAlgorithm,

  'graph-prim': primAlgorithm,

  'graph-kruskal': kruskalAlgorithm,

} as const satisfies Record<string, Algorithm>;



export function registerGraphAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(graphAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


