export * from './backtracking';

export * from './tree-algorithms';

export * from './greedy';



import { registerBacktrackingAlgorithms } from './backtracking';

import { registerTreeAlgorithms } from './tree-algorithms';

import { registerGreedyAlgorithms } from './greedy';

import type { Algorithm } from '../../engine/types';



export function registerIntermediateAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  registerBacktrackingAlgorithms(engine);

  registerTreeAlgorithms(engine);

  registerGreedyAlgorithms(engine);

}


