export * from './graph';
export * from './dsu';
export * from './segment-tree';
export * from './fenwick-tree';
export * from './avl-tree';
export * from './red-black-tree';

import { registerGraphAlgorithms } from './graph';
import { registerDsuAlgorithms } from './dsu';
import { registerSegmentTreeAlgorithms } from './segment-tree';
import { registerFenwickTreeAlgorithms } from './fenwick-tree';
import { registerAvlTreeAlgorithms } from './avl-tree';
import { registerRedBlackTreeAlgorithms } from './red-black-tree';
import type { Algorithm } from '../../engine/types';

export function registerAdvancedDataStructureAlgorithms(engine: {
  registerAlgorithm(id: string, algorithm: Algorithm): void;
}): void {
  registerGraphAlgorithms(engine);
  registerDsuAlgorithms(engine);
  registerSegmentTreeAlgorithms(engine);
  registerFenwickTreeAlgorithms(engine);
  registerAvlTreeAlgorithms(engine);
  registerRedBlackTreeAlgorithms(engine);
}
