import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createHashSetAlgorithm, createStepRecorder, getNumberArray } from '../easy-lessons/helpers';

export const longestConsecutiveSequenceSet = createHashSetAlgorithm(
  'Longest Consecutive Sequence',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [100, 4, 200, 1, 3, 2]);
    const set = new Set(nums);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    let best = 0;

    nums.forEach((num, index) => {
      if (set.has(num - 1)) return;
      let length = 1;
      while (set.has(num + length)) length += 1;
      if (length > best) best = length;

      recorder.push({
        action: 'visit',
        description: `Sequence from ${num} has length ${length}`,
        visualizationData: { nums, index, start: num, length, best },
        highlights: [index],
        variables: { start: num, length, best },
        memory: { best },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds longest consecutive run using set membership.'
);

export const firstMissingPositive = createHashSetAlgorithm(
  'First Missing Positive',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [3, 4, -1, 1]);
    const set = new Set(nums.filter((value) => value > 0));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 1; i <= nums.length + 1; i += 1) {
      recorder.push({
        action: 'search',
        description: `Check ${i} in positive set`,
        visualizationData: { nums, i },
        variables: { i, exists: set.has(i) },
        memory: { exists: set.has(i) },
        codeLine: 1,
      });

      if (!set.has(i)) {
        recorder.push({
          action: 'found',
          description: `First missing positive is ${i}`,
          visualizationData: { nums, result: i },
          variables: { result: i },
          memory: { result: i },
          codeLine: 2,
        });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds smallest missing positive integer using set.'
);

export const detectCycleUsingSet = createHashSetAlgorithm(
  'Detect Cycle Using Set',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const values = getNumberArray(input, 'path', [1, 2, 3, 4, 2]);
    const seen = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < values.length; i += 1) {
      if (seen.has(values[i])) {
        recorder.push({
          action: 'found',
          description: `Cycle detected at value ${values[i]}`,
          visualizationData: { values, index: i },
          highlights: [i],
          variables: { cycleValue: values[i] },
          memory: { hasCycle: true },
          codeLine: 1,
        });
        return recorder.steps;
      }
      seen.add(values[i]);
    }

    recorder.push({
      action: 'not-found',
      description: 'No cycle detected',
      visualizationData: { values },
      memory: { hasCycle: false },
      codeLine: 2,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Detects cycle/revisit by tracking visited nodes in set.'
);

export const subarrayWithUniqueElements = createHashSetAlgorithm(
  'Subarray With Unique Elements',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [1, 2, 1, 3, 4]);
    const seen = new Set<number>();
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    let left = 0;
    let best = 0;

    for (let right = 0; right < nums.length; right += 1) {
      while (seen.has(nums[right])) {
        seen.delete(nums[left]);
        left += 1;
      }
      seen.add(nums[right]);
      best = Math.max(best, right - left + 1);

      recorder.push({
        action: 'visit',
        description: `Window [${left}, ${right}] unique size ${right - left + 1}`,
        visualizationData: { nums, left, right, best, seen: [...seen.values()] },
        highlights: [right],
        variables: { left, right, best },
        memory: { seen: [...seen.values()] },
        codeLine: 1,
      });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Maintains unique sliding window with hash set.'
);

export const sudokuValidation = createHashSetAlgorithm(
  'Sudoku Validation',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const board: string[][] = [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ];

    const seen = new Set<string>();
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    for (let r = 0; r < 9; r += 1) {
      for (let c = 0; c < 9; c += 1) {
        const val = board[r][c];
        if (val === '.') continue;

        const rowKey = `r${r}-${val}`;
        const colKey = `c${c}-${val}`;
        const boxKey = `b${Math.floor(r / 3)}${Math.floor(c / 3)}-${val}`;

        if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
          recorder.push({
            action: 'not-found',
            description: `Invalid sudoku due to duplicate ${val}`,
            visualizationData: { row: r, col: c, val },
            variables: { row: r, col: c, val },
            memory: { valid: false },
            codeLine: 1,
          });
          return recorder.steps;
        }

        seen.add(rowKey);
        seen.add(colKey);
        seen.add(boxKey);
      }
    }

    recorder.push({
      action: 'found',
      description: 'Sudoku board is valid',
      visualizationData: { valid: true },
      variables: { valid: true },
      memory: { valid: true },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Validates rows, columns, and boxes with set keys.'
);

export const hashSetAdvancedAlgorithms = [
  longestConsecutiveSequenceSet,
  firstMissingPositive,
  detectCycleUsingSet,
  subarrayWithUniqueElements,
  sudokuValidation,
] as const;
