import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getMatrix, getNumber } from '../../../_shared/helpers';



export const nQueensBacktrack = createAlgorithm(

  'N Queens',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(4, Math.min(8, Math.trunc(getNumber(input, 'n', 4))));

    const recorder = createStepRecorder('pattern', { time: 'O(n!)', space: 'O(n)' });

    const board = Array.from({ length: n }, () => new Array(n).fill(0));

    let solutions = 0;



    recorder.push({ action: 'initialize', description: `Place ${n} queens with backtracking`, visualizationData: { n }, memory: {}, codeLine: 1 });



    const safe = (row: number, col: number): boolean => {

      for (let i = 0; i < row; i += 1) {

        const c = board[i].indexOf(1);

        if (c === col || Math.abs(c - col) === row - i) return false;

      }

      return true;

    };



    const solve = (row: number): void => {

      if (row === n) {

        solutions += 1;

        recorder.push({ action: 'found', description: `Solution #${solutions}`, visualizationData: { board: board.map((r) => [...r]) }, memory: {}, codeLine: 2 });

        return;

      }

      for (let col = 0; col < n; col += 1) {

        if (safe(row, col)) {

          board[row][col] = 1;

          recorder.push({ action: 'place', description: `Queen at (${row}, ${col})`, visualizationData: { row, col }, memory: {}, codeLine: 3 });

          solve(row + 1);

          board[row][col] = 0;

          recorder.push({ action: 'backtrack', description: `Remove queen at (${row}, ${col})`, visualizationData: { row, col }, memory: {}, codeLine: 4 });

        }

      }

    };

    solve(0);

    return recorder.steps;

  },

  { time: 'O(n!)', space: 'O(n)' },

  'Classic N-Queens backtracking on a chess board.'

);



export const sudokuSolverBacktrack = createAlgorithm(

  'Sudoku Solver',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const grid = getMatrix(input, 'grid', [

      [5, 3, 0, 0, 7, 0, 0, 0, 0],

      [6, 0, 0, 1, 9, 5, 0, 0, 0],

      [0, 9, 8, 0, 0, 0, 0, 6, 0],

      [8, 0, 0, 0, 6, 0, 0, 0, 3],

      [4, 0, 0, 8, 0, 3, 0, 0, 1],

      [7, 0, 0, 0, 2, 0, 0, 0, 6],

      [0, 6, 0, 0, 0, 0, 2, 8, 0],

      [0, 0, 0, 4, 1, 9, 0, 0, 5],

      [0, 0, 0, 0, 8, 0, 0, 7, 9],

    ]);

    const recorder = createStepRecorder('pattern', { time: 'O(9^m)', space: 'O(1)' });



    recorder.push({ action: 'initialize', description: 'Backtrack digits 1-9 on empty cells', visualizationData: { grid: grid.map((r) => [...r]) }, memory: {}, codeLine: 1 });



    const findEmpty = (): [number, number] | null => {

      for (let r = 0; r < 9; r += 1) for (let c = 0; c < 9; c += 1) if (grid[r][c] === 0) return [r, c];

      return null;

    };



    const valid = (r: number, c: number, d: number): boolean => {

      for (let i = 0; i < 9; i += 1) if (grid[r][i] === d || grid[i][c] === d) return false;

      const br = Math.floor(r / 3) * 3;

      const bc = Math.floor(c / 3) * 3;

      for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) if (grid[br + i][bc + j] === d) return false;

      return true;

    };



    const solve = (): boolean => {

      const empty = findEmpty();

      if (!empty) {

        recorder.push({ action: 'found', description: 'Sudoku solved', visualizationData: { grid: grid.map((r) => [...r]) }, memory: {}, codeLine: 2 });

        return true;

      }

      const [r, c] = empty;

      for (let d = 1; d <= 9; d += 1) {

        if (valid(r, c, d)) {

          grid[r][c] = d;

          recorder.push({ action: 'place', description: `Set (${r},${c}) = ${d}`, visualizationData: { r, c, d }, memory: {}, codeLine: 3 });

          if (solve()) return true;

          grid[r][c] = 0;

          recorder.push({ action: 'backtrack', description: `Clear (${r},${c})`, visualizationData: { r, c }, memory: {}, codeLine: 4 });

        }

      }

      return false;

    };

    solve();

    return recorder.steps;

  },

  { time: 'O(9^m)', space: 'O(1)' },

  'Solves Sudoku via constraint backtracking.'

);



export const crosswordSolver = createAlgorithm(

  'Crossword Solver',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const grid = [

      ['#', '#', '#', '#', '#'],

      ['#', ' ', ' ', ' ', '#'],

      ['#', ' ', '#', ' ', '#'],

      ['#', ' ', ' ', ' ', '#'],

      ['#', '#', '#', '#', '#'],

    ];

    const words = ['CAT', 'CAR', 'ART'];

    const recorder = createStepRecorder('pattern', { time: 'O(W·L)', space: 'O(W·L)' });



    recorder.push({ action: 'initialize', description: 'Fill crossword slots with dictionary words', visualizationData: { grid, words }, memory: {}, codeLine: 1 });



    const slots: { r: number; c: number; len: number; horiz: boolean }[] = [

      { r: 1, c: 1, len: 3, horiz: true },

      { r: 1, c: 1, len: 3, horiz: false },

    ];



    const canPlace = (word: string, slot: typeof slots[0]): boolean => {

      for (let i = 0; i < word.length; i += 1) {

        const r = slot.horiz ? slot.r : slot.r + i;

        const c = slot.horiz ? slot.c + i : slot.c;

        const cell = grid[r][c];

        if (cell !== ' ' && cell !== word[i]) return false;

      }

      return true;

    };



    const place = (word: string, slot: typeof slots[0]): void => {

      for (let i = 0; i < word.length; i += 1) {

        const r = slot.horiz ? slot.r : slot.r + i;

        const c = slot.horiz ? slot.c + i : slot.c;

        grid[r][c] = word[i];

      }

      recorder.push({ action: 'place', description: `Place "${word}" ${slot.horiz ? 'across' : 'down'} at (${slot.r},${slot.c})`, visualizationData: { word, grid: grid.map((r) => [...r]) }, memory: {}, codeLine: 2 });

    };



    const backtrack = (slotIdx: number, used: Set<string>): boolean => {

      if (slotIdx === slots.length) {

        recorder.push({ action: 'found', description: 'Crossword filled', visualizationData: { grid: grid.map((r) => [...r]) }, memory: {}, codeLine: 3 });

        return true;

      }

      const slot = slots[slotIdx];

      for (const word of words) {

        if (used.has(word) || word.length !== slot.len || !canPlace(word, slot)) continue;

        place(word, slot);

        used.add(word);

        if (backtrack(slotIdx + 1, used)) return true;

        used.delete(word);

      }

      return false;

    };

    backtrack(0, new Set());

    return recorder.steps;

  },

  { time: 'O(W·L)', space: 'O(W·L)' },

  'Backtracking crossword fill with word constraints.'

);



export const backtrackingIntermediateHardAlgorithms = [nQueensBacktrack, sudokuSolverBacktrack, crosswordSolver] as const;


