export * from './sorting';
export * from './searching';
export * from './recursion';

import { registerSortingAlgorithms } from './sorting';
import { registerSearchingAlgorithms } from './searching';
import { registerRecursionAlgorithms } from './recursion';
import type { Algorithm } from '../../engine/types';

export function registerBeginnerAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  registerSortingAlgorithms(engine);
  registerSearchingAlgorithms(engine);
  registerRecursionAlgorithms(engine);
}
