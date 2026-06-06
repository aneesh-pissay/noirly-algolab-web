import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getString } from '../../../_shared/helpers';



export const combinationSum = createAlgorithm(

  'Combination Sum',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const candidates = getArray(input, [2, 3, 6, 7]);

    const target = Math.trunc((input.target as number) ?? 7);

    const recorder = createStepRecorder('pattern', { time: 'O(2^t)', space: 'O(t)' });

    const result: number[][] = [];

    const path: number[] = [];



    recorder.push({ action: 'initialize', description: `Find combinations summing to ${target}`, visualizationData: { candidates: [...candidates], target }, memory: {}, codeLine: 1 });



    const backtrack = (start: number, remain: number): void => {

      if (remain === 0) {

        result.push([...path]);

        recorder.push({ action: 'found', description: `Sum ${target}: [${path.join(', ')}]`, visualizationData: { path: [...path] }, memory: { result: result.map((r) => [...r]) }, codeLine: 2 });

        return;

      }

      if (remain < 0) return;

      for (let i = start; i < candidates.length; i += 1) {

        path.push(candidates[i]);

        recorder.push({ action: 'choose', description: `Add ${candidates[i]}, remain ${remain - candidates[i]}`, visualizationData: { path: [...path], remain: remain - candidates[i] }, memory: {}, codeLine: 3 });

        backtrack(i, remain - candidates[i]);

        path.pop();

      }

    };

    backtrack(0, target);

    return recorder.steps;

  },

  { time: 'O(2^t)', space: 'O(t)' },

  'Finds combinations that sum to target (reuse allowed).'

);



export const permutations = createAlgorithm(

  'Permutations',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [1, 2, 3]);

    const recorder = createStepRecorder('pattern', { time: 'O(n·n!)', space: 'O(n)' });

    const result: number[][] = [];

    const used = new Array(nums.length).fill(false);

    const path: number[] = [];



    recorder.push({ action: 'initialize', description: 'Swap / pick unused elements each level', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    const backtrack = (): void => {

      if (path.length === nums.length) {

        result.push([...path]);

        recorder.push({ action: 'found', description: `Permutation: [${path.join(', ')}]`, visualizationData: { path: [...path] }, memory: { result: result.map((r) => [...r]) }, codeLine: 2 });

        return;

      }

      for (let i = 0; i < nums.length; i += 1) {

        if (used[i]) continue;

        used[i] = true;

        path.push(nums[i]);

        recorder.push({ action: 'choose', description: `Pick ${nums[i]} at position ${path.length - 1}`, visualizationData: { path: [...path] }, highlights: [i], memory: {}, codeLine: 3 });

        backtrack();

        path.pop();

        used[i] = false;

      }

    };

    backtrack();

    return recorder.steps;

  },

  { time: 'O(n·n!)', space: 'O(n)' },

  'Generates all permutations via backtracking.'

);



export const wordSearchBacktrack = createAlgorithm(

  'Word Search',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const board = [

      ['A', 'B', 'C', 'E'],

      ['S', 'F', 'C', 'S'],

      ['A', 'D', 'E', 'E'],

    ];

    const word = getString(input, 'word', 'ABCCED');

    const recorder = createStepRecorder('pattern', { time: 'O(m·n·4^L)', space: 'O(L)' });

    const rows = board.length;

    const cols = board[0].length;

    const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));



    recorder.push({ action: 'initialize', description: `Search grid for "${word}"`, visualizationData: { board, word }, memory: {}, codeLine: 1 });



    const dfs = (r: number, c: number, idx: number): boolean => {

      if (idx === word.length) {

        recorder.push({ action: 'found', description: `Found "${word}"`, visualizationData: { r, c }, memory: {}, codeLine: 2 });

        return true;

      }

      if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || board[r][c] !== word[idx]) return false;

      visited[r][c] = true;

      recorder.push({ action: 'visit', description: `Match '${board[r][c]}' at (${r},${c}) index ${idx}`, visualizationData: { r, c, idx }, highlights: [r * cols + c], memory: {}, codeLine: 3 });

      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

      for (const [dr, dc] of dirs) if (dfs(r + dr, c + dc, idx + 1)) return true;

      visited[r][c] = false;

      recorder.push({ action: 'backtrack', description: `Unmark (${r},${c})`, visualizationData: { r, c }, memory: {}, codeLine: 4 });

      return false;

    };



    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) dfs(r, c, 0);

    return recorder.steps;

  },

  { time: 'O(m·n·4^L)', space: 'O(L)' },

  'DFS backtracking to find a word on a 2D board.'

);



export const palindromePartitioning = createAlgorithm(

  'Palindrome Partitioning',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const s = getString(input, 's', 'aab');

    const recorder = createStepRecorder('pattern', { time: 'O(n·2^n)', space: 'O(n)' });

    const result: string[][] = [];

    const path: string[] = [];



    const isPalindrome = (lo: number, hi: number): boolean => {

      while (lo < hi) {

        if (s[lo] !== s[hi]) return false;

        lo += 1;

        hi -= 1;

      }

      return true;

    };



    recorder.push({ action: 'initialize', description: `Partition "${s}" into palindrome substrings`, visualizationData: { s }, memory: {}, codeLine: 1 });



    const backtrack = (start: number): void => {

      if (start === s.length) {

        result.push([...path]);

        recorder.push({ action: 'found', description: `Partition: [${path.join(' | ')}]`, visualizationData: { path: [...path] }, memory: { result: result.map((r) => [...r]) }, codeLine: 2 });

        return;

      }

      for (let end = start; end < s.length; end += 1) {

        const sub = s.slice(start, end + 1);

        if (isPalindrome(start, end)) {

          path.push(sub);

          recorder.push({ action: 'choose', description: `Palindrome "${sub}" from index ${start}`, visualizationData: { sub, start, end }, memory: {}, codeLine: 3 });

          backtrack(end + 1);

          path.pop();

        }

      }

    };

    backtrack(0);

    return recorder.steps;

  },

  { time: 'O(n·2^n)', space: 'O(n)' },

  'Partitions a string into all-palindrome splits.'

);



export const backtrackingIntermediateMediumAlgorithms = [combinationSum, permutations, wordSearchBacktrack, palindromePartitioning] as const;


