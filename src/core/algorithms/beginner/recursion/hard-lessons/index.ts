import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getMatrix, getNumber, getString } from '../../../_shared/helpers';

export const nQueens = createAlgorithm(
  'N Queens',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = Math.max(4, Math.min(8, Math.trunc(getNumber(input, 'n', 4))));
    const recorder = createStepRecorder('recursion', { time: 'O(n!)', space: 'O(n)' });
    const board = Array.from({ length: n }, () => new Array(n).fill(0));
    let solutions = 0;

    recorder.push({ action: 'initialize', description: `Place ${n} queens row by row with backtracking`, visualizationData: { n }, memory: {}, codeLine: 1 });

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
          recorder.push({ action: 'place', description: `Place queen at (${row}, ${col})`, visualizationData: { row, col }, memory: {}, codeLine: 3 });
          solve(row + 1);
          board[row][col] = 0;
        }
      }
    };
    solve(0);
    return recorder.steps;
  },
  { time: 'O(n!)', space: 'O(n)' },
  'Places n queens on a board with recursive backtracking.'
);

export const sudokuSolver = createAlgorithm(
  'Sudoku Solver',
  'recursion',
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
    const recorder = createStepRecorder('recursion', { time: 'O(9^m)', space: 'O(1)' });

    recorder.push({ action: 'initialize', description: 'Find empty cell, try digits 1-9, backtrack on conflict', visualizationData: { grid: grid.map((r) => [...r]) }, memory: {}, codeLine: 1 });

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
          recorder.push({ action: 'place', description: `Try ${d} at (${r},${c})`, visualizationData: { r, c, d }, memory: {}, codeLine: 3 });
          if (solve()) return true;
          grid[r][c] = 0;
        }
      }
      return false;
    };
    solve();
    return recorder.steps;
  },
  { time: 'O(9^m)', space: 'O(1)' },
  'Solves Sudoku via recursive backtracking.'
);

export const wordSearch = createAlgorithm(
  'Word Search',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const board = getMatrix(input, 'grid', [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ].map((r) => r.map((c) => c.charCodeAt(0) - 65)) as unknown as number[][]);
    const word = getString(input, 'word', 'ABCCED');
    const recorder = createStepRecorder('recursion', { time: 'O(m·n·4^L)', space: 'O(L)' });

    recorder.push({ action: 'initialize', description: `DFS from each cell to spell "${word}"`, visualizationData: { word }, memory: {}, codeLine: 1 });

    const rows = board.length;
    const cols = board[0]?.length ?? 0;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const dfs = (r: number, c: number, idx: number): boolean => {
      if (idx === word.length) return true;
      if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
      recorder.push({ action: 'visit', description: `Cell (${r},${c}) char index ${idx}`, visualizationData: { r, c, idx }, memory: {}, codeLine: 2 });
      for (const [dr, dc] of dirs) dfs(r + dr, c + dc, idx + 1);
      return false;
    };

    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) dfs(r, c, 0);
    return recorder.steps;
  },
  { time: 'O(m·n·4^L)', space: 'O(L)' },
  'Finds a word on a grid using recursive DFS.'
);

export const recursionBeginnerHardAlgorithms = [nQueens, sudokuSolver, wordSearch] as const;
