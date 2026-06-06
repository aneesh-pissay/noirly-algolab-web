export * from './beginner';

export * from './intermediate';

export * from './advanced';



export { graphBFS } from './advanced/graph-algorithms';

export { bfs } from './intermediate/tree-algorithms';



import { registerBeginnerAlgorithms } from './beginner';

import { registerIntermediateAlgorithms } from './intermediate';

import { registerAdvancedAlgorithms } from './advanced';

import type { Algorithm } from '../engine/types';



export function registerAllAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  registerBeginnerAlgorithms(engine);

  registerIntermediateAlgorithms(engine);

  registerAdvancedAlgorithms(engine);

}


