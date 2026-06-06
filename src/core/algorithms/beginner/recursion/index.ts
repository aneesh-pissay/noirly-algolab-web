import type { Algorithm } from '../../../engine/types';
import { printNumbers, factorial, fibonacci, sumOfArray, reverseString } from './easy-lessons';
import { generateSubsets, generatePermutations, towerOfHanoi, recursiveBinarySearch } from './medium-lessons';
import { nQueens, sudokuSolver, wordSearch } from './hard-lessons';

export { printNumbers, factorial, fibonacci, sumOfArray, reverseString, generateSubsets, generatePermutations, towerOfHanoi, recursiveBinarySearch, nQueens, sudokuSolver, wordSearch };

export const recursionAlgorithmsByLevel = {
  easyLessons: [printNumbers, factorial, fibonacci, sumOfArray, reverseString],
  mediumLessons: [generateSubsets, generatePermutations, towerOfHanoi, recursiveBinarySearch],
  hardLessons: [nQueens, sudokuSolver, wordSearch],
} as const;

export const recursionAlgorithms = [
  ...recursionAlgorithmsByLevel.easyLessons,
  ...recursionAlgorithmsByLevel.mediumLessons,
  ...recursionAlgorithmsByLevel.hardLessons,
] as const;

export const recursionAlgorithmRegistry = {
  'recursion-print-numbers': printNumbers,
  'recursion-factorial': factorial,
  'recursion-fibonacci': fibonacci,
  'recursion-sum-of-array': sumOfArray,
  'recursion-reverse-string': reverseString,
  'recursion-generate-subsets': generateSubsets,
  'recursion-generate-permutations': generatePermutations,
  'recursion-tower-of-hanoi': towerOfHanoi,
  'recursion-binary-search': recursiveBinarySearch,
  'recursion-n-queens': nQueens,
  'recursion-sudoku-solver': sudokuSolver,
  'recursion-word-search': wordSearch,
} as const satisfies Record<string, Algorithm>;

export function registerRecursionAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(recursionAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));
}
