import type { Algorithm } from '../../../engine/types';

import { subsets, letterCombinations, generateParentheses } from './easy-lessons';

import { combinationSum, permutations, wordSearchBacktrack, palindromePartitioning } from './medium-lessons';

import { nQueensBacktrack, sudokuSolverBacktrack, crosswordSolver } from './hard-lessons';



export { subsets, letterCombinations, generateParentheses, combinationSum, permutations, wordSearchBacktrack, palindromePartitioning, nQueensBacktrack, sudokuSolverBacktrack, crosswordSolver };



export const backtrackingAlgorithmsByLevel = {

  easyLessons: [subsets, letterCombinations, generateParentheses],

  mediumLessons: [combinationSum, permutations, wordSearchBacktrack, palindromePartitioning],

  hardLessons: [nQueensBacktrack, sudokuSolverBacktrack, crosswordSolver],

} as const;



export const backtrackingAlgorithms = [

  ...backtrackingAlgorithmsByLevel.easyLessons,

  ...backtrackingAlgorithmsByLevel.mediumLessons,

  ...backtrackingAlgorithmsByLevel.hardLessons,

] as const;



export const backtrackingAlgorithmRegistry = {

  'backtracking-subsets': subsets,

  'backtracking-letter-combinations': letterCombinations,

  'backtracking-generate-parentheses': generateParentheses,

  'backtracking-combination-sum': combinationSum,

  'backtracking-permutations': permutations,

  'backtracking-word-search': wordSearchBacktrack,

  'backtracking-palindrome-partitioning': palindromePartitioning,

  'backtracking-n-queens': nQueensBacktrack,

  'backtracking-sudoku-solver': sudokuSolverBacktrack,

  'backtracking-crossword-solver': crosswordSolver,

} as const satisfies Record<string, Algorithm>;



export function registerBacktrackingAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(backtrackingAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


