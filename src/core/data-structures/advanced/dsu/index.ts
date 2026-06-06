import type { Algorithm } from '../../../engine/types';

import { createDsu, findOperation, unionOperation, connectedCheck } from './easy-lessons';
import { pathCompression, unionByRank, detectCycleDsu, numberOfProvinces } from './medium-lessons';
import { kruskalMst, accountsMerge, redundantConnection, dynamicConnectivity } from './hard-lessons';

export { createDsu, findOperation, unionOperation, connectedCheck };
export { pathCompression, unionByRank, detectCycleDsu, numberOfProvinces };
export { kruskalMst, accountsMerge, redundantConnection, dynamicConnectivity };

export const dsuAlgorithmsByLevel = {
  easyLessons: [createDsu, findOperation, unionOperation, connectedCheck],
  mediumLessons: [pathCompression, unionByRank, detectCycleDsu, numberOfProvinces],
  hardLessons: [kruskalMst, accountsMerge, redundantConnection, dynamicConnectivity],
} as const;

export const dsuAlgorithms = [
  ...dsuAlgorithmsByLevel.easyLessons,
  ...dsuAlgorithmsByLevel.mediumLessons,
  ...dsuAlgorithmsByLevel.hardLessons,
] as const;

export const dsuAlgorithmRegistry = {
  'dsu-create': createDsu,
  'dsu-find': findOperation,
  'dsu-union': unionOperation,
  'dsu-connected-check': connectedCheck,
  'dsu-path-compression': pathCompression,
  'dsu-union-by-rank': unionByRank,
  'dsu-detect-cycle': detectCycleDsu,
  'dsu-number-of-provinces': numberOfProvinces,
  'dsu-kruskal-mst': kruskalMst,
  'dsu-accounts-merge': accountsMerge,
  'dsu-redundant-connection': redundantConnection,
  'dsu-dynamic-connectivity': dynamicConnectivity,
} as const satisfies Record<string, Algorithm>;

export type DsuAlgorithmId = keyof typeof dsuAlgorithmRegistry;

export function registerDsuAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(dsuAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
