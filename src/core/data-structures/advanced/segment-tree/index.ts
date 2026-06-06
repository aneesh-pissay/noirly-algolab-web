import type { Algorithm } from '../../../engine/types';

import { createSegmentTree, buildTree, rangeSumQuery, pointUpdate } from './easy-lessons';
import { rangeMinimumQuery, rangeMaximumQuery, lazyPropagation, countQueries } from './medium-lessons';
import { rangeUpdates, persistentSegmentTree, dynamicSegmentTree, mergeSortTree } from './hard-lessons';

export { createSegmentTree, buildTree, rangeSumQuery, pointUpdate };
export { rangeMinimumQuery, rangeMaximumQuery, lazyPropagation, countQueries };
export { rangeUpdates, persistentSegmentTree, dynamicSegmentTree, mergeSortTree };

export const segmentTreeAlgorithmsByLevel = {
  easyLessons: [createSegmentTree, buildTree, rangeSumQuery, pointUpdate],
  mediumLessons: [rangeMinimumQuery, rangeMaximumQuery, lazyPropagation, countQueries],
  hardLessons: [rangeUpdates, persistentSegmentTree, dynamicSegmentTree, mergeSortTree],
} as const;

export const segmentTreeAlgorithms = [
  ...segmentTreeAlgorithmsByLevel.easyLessons,
  ...segmentTreeAlgorithmsByLevel.mediumLessons,
  ...segmentTreeAlgorithmsByLevel.hardLessons,
] as const;

export const segmentTreeAlgorithmRegistry = {
  'segment-tree-create': createSegmentTree,
  'segment-tree-build': buildTree,
  'segment-tree-range-sum': rangeSumQuery,
  'segment-tree-point-update': pointUpdate,
  'segment-tree-range-minimum': rangeMinimumQuery,
  'segment-tree-range-maximum': rangeMaximumQuery,
  'segment-tree-lazy-propagation': lazyPropagation,
  'segment-tree-count-queries': countQueries,
  'segment-tree-range-updates': rangeUpdates,
  'segment-tree-persistent': persistentSegmentTree,
  'segment-tree-dynamic': dynamicSegmentTree,
  'segment-tree-merge-sort-tree': mergeSortTree,
} as const satisfies Record<string, Algorithm>;

export type SegmentTreeAlgorithmId = keyof typeof segmentTreeAlgorithmRegistry;

export function registerSegmentTreeAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(segmentTreeAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
