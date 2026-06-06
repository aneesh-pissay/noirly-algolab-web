import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getString } from '../../../_shared/helpers';



export const subsets = createAlgorithm(

  'Subsets',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [1, 2, 3]);

    const recorder = createStepRecorder('pattern', { time: 'O(n·2^n)', space: 'O(n)' });

    const result: number[][] = [];

    const path: number[] = [];



    recorder.push({ action: 'initialize', description: 'Backtrack to include or exclude each element', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    const backtrack = (start: number): void => {

      result.push([...path]);

      recorder.push({ action: 'found', description: `Subset: [${path.join(', ')}]`, visualizationData: { subset: [...path], resultCount: result.length }, memory: { result: result.map((s) => [...s]) }, codeLine: 2 });

      for (let i = start; i < nums.length; i += 1) {

        path.push(nums[i]);

        recorder.push({ action: 'choose', description: `Include ${nums[i]}`, visualizationData: { path: [...path] }, variables: { i }, memory: {}, codeLine: 3 });

        backtrack(i + 1);

        path.pop();

        recorder.push({ action: 'backtrack', description: `Exclude ${nums[i]}`, visualizationData: { path: [...path] }, memory: {}, codeLine: 4 });

      }

    };

    backtrack(0);

    return recorder.steps;

  },

  { time: 'O(n·2^n)', space: 'O(n)' },

  'Generates all subsets by choosing to include or skip each element.'

);



export const letterCombinations = createAlgorithm(

  'Letter Combinations',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const digits = getString(input, 'digits', '23');

    const map: Record<string, string> = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };

    const recorder = createStepRecorder('pattern', { time: 'O(4^n)', space: 'O(n)' });

    const result: string[] = [];

    const path: string[] = [];



    recorder.push({ action: 'initialize', description: `Map digits "${digits}" to letter combinations`, visualizationData: { digits }, memory: {}, codeLine: 1 });



    const backtrack = (idx: number): void => {

      if (idx === digits.length) {

        const combo = path.join('');

        result.push(combo);

        recorder.push({ action: 'found', description: `Combination: "${combo}"`, visualizationData: { combo }, memory: { result: [...result] }, codeLine: 2 });

        return;

      }

      const letters = map[digits[idx]] ?? '';

      for (const ch of letters) {

        path.push(ch);

        recorder.push({ action: 'choose', description: `Digit ${digits[idx]} → '${ch}'`, visualizationData: { path: [...path], idx }, memory: {}, codeLine: 3 });

        backtrack(idx + 1);

        path.pop();

      }

    };

    backtrack(0);

    return recorder.steps;

  },

  { time: 'O(4^n)', space: 'O(n)' },

  'Builds all letter combinations for a phone digit string.'

);



export const generateParentheses = createAlgorithm(

  'Generate Parentheses',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(1, Math.min(8, Math.trunc((input.n as number) ?? 3)));

    const recorder = createStepRecorder('pattern', { time: 'O(4^n/√n)', space: 'O(n)' });

    const result: string[] = [];



    recorder.push({ action: 'initialize', description: `Generate ${n} pairs of valid parentheses`, visualizationData: { n }, memory: {}, codeLine: 1 });



    const backtrack = (open: number, close: number, path: string): void => {

      if (path.length === 2 * n) {

        result.push(path);

        recorder.push({ action: 'found', description: `Valid: "${path}"`, visualizationData: { path }, memory: { result: [...result] }, codeLine: 2 });

        return;

      }

      if (open < n) {

        recorder.push({ action: 'choose', description: `Add '(' (${open + 1} open)`, visualizationData: { path: `${path}(`, open: open + 1, close }, memory: {}, codeLine: 3 });

        backtrack(open + 1, close, `${path}(`);

      }

      if (close < open) {

        recorder.push({ action: 'choose', description: `Add ')' (${close + 1} close)`, visualizationData: { path: `${path})`, open, close: close + 1 }, memory: {}, codeLine: 4 });

        backtrack(open, close + 1, `${path})`);

      }

    };

    backtrack(0, 0, '');

    return recorder.steps;

  },

  { time: 'O(4^n/√n)', space: 'O(n)' },

  'Backtracks to build all balanced parenthesis strings.'

);



export const backtrackingIntermediateEasyAlgorithms = [subsets, letterCombinations, generateParentheses] as const;


