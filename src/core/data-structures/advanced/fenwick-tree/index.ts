import type { Algorithm } from '../../../engine/types';

import { createBit, prefixSumQuery, updateIndex, buildTreeBit } from './easy-lessons';
import { rangeSumQueryBit, countInversions, coordinateCompression } from './medium-lessons';
import { fenwickTree2D, rangeUpdateQuery, offlineQueries } from './hard-lessons';

export { createBit, prefixSumQuery, updateIndex, buildTreeBit };
export { rangeSumQueryBit, countInversions, coordinateCompression };
export { fenwickTree2D, rangeUpdateQuery, offlineQueries };

export const fenwickTreeAlgorithmsByLevel = {
  easyLessons: [createBit, prefixSumQuery, updateIndex, buildTreeBit],
  mediumLessons: [rangeSumQueryBit, countInversions, coordinateCompression],
  hardLessons: [fenwickTree2D, rangeUpdateQuery, offlineQueries],
} as const;

export const fenwickTreeAlgorithms = [
  ...fenwickTreeAlgorithmsByLevel.easyLessons,
  ...fenwickTreeAlgorithmsByLevel.mediumLessons,
  ...fenwickTreeAlgorithmsByLevel.hardLessons,
] as const;

export const fenwickTreeAlgorithmRegistry = {
  'fenwick-create': createBit,
  'fenwick-prefix-sum': prefixSumQuery,
  'fenwick-update-index': updateIndex,
  'fenwick-build': buildTreeBit,
  'fenwick-range-sum': rangeSumQueryBit,
  'fenwick-count-inversions': countInversions,
  'fenwick-coordinate-compression': coordinateCompression,
  'fenwick-2d': fenwickTree2D,
  'fenwick-range-update-query': rangeUpdateQuery,
  'fenwick-offline-queries': offlineQueries,
} as const satisfies Record<string, Algorithm>;

export type FenwickTreeAlgorithmId = keyof typeof fenwickTreeAlgorithmRegistry;

export function registerFenwickTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(fenwickTreeAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
