import type { Algorithm } from '../../../engine/types';

import { andOrXor, checkEvenOdd, powerOfTwo, countBits } from './easy-lessons';

import { singleNumber, subsetsUsingBits, bitMasking } from './medium-lessons';

import { nQueensBitmask, travelingSalesmanDP, maximumXor } from './hard-lessons';



export { andOrXor, checkEvenOdd, powerOfTwo, countBits, singleNumber, subsetsUsingBits, bitMasking, nQueensBitmask, travelingSalesmanDP, maximumXor };



export const bitAlgorithmsByLevel = {

  easyLessons: [andOrXor, checkEvenOdd, powerOfTwo, countBits],

  mediumLessons: [singleNumber, subsetsUsingBits, bitMasking],

  hardLessons: [nQueensBitmask, travelingSalesmanDP, maximumXor],

} as const;



export const bitAlgorithms = [

  ...bitAlgorithmsByLevel.easyLessons,

  ...bitAlgorithmsByLevel.mediumLessons,

  ...bitAlgorithmsByLevel.hardLessons,

] as const;



export const bitAlgorithmRegistry = {

  'bit-and-or-xor': andOrXor,

  'bit-check-even-odd': checkEvenOdd,

  'bit-power-of-two': powerOfTwo,

  'bit-count-bits': countBits,

  'bit-single-number': singleNumber,

  'bit-subsets': subsetsUsingBits,

  'bit-masking': bitMasking,

  'bit-n-queens': nQueensBitmask,

  'bit-tsp': travelingSalesmanDP,

  'bit-maximum-xor': maximumXor,

} as const satisfies Record<string, Algorithm>;



export function registerBitAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(bitAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


