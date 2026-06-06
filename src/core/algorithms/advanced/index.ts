export * from './graph-algorithms';

export * from './dynamic-programming';

export * from './bit-algorithms';



import { registerGraphAlgorithms } from './graph-algorithms';

import { registerDynamicProgrammingAlgorithms } from './dynamic-programming';

import { registerBitAlgorithms } from './bit-algorithms';

import type { Algorithm } from '../../engine/types';



export function registerAdvancedAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  registerGraphAlgorithms(engine);

  registerDynamicProgrammingAlgorithms(engine);

  registerBitAlgorithms(engine);

}


