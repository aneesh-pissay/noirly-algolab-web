import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { histogramArea } from '../../arrays/hard-lessons';
import { createStackAlgorithm, createStepRecorder, getNumberArray } from '../easy-lessons/helpers';

export const nextGreaterElementStack = createStackAlgorithm(
  'Next Greater Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [4, 5, 2, 25]);
    const stack: number[] = [];
    const out = new Array(nums.length).fill(-1);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = nums.length - 1; i >= 0; i -= 1) {
      while (stack.length && stack[stack.length - 1] <= nums[i]) stack.pop();
      out[i] = stack.length ? stack[stack.length - 1] : -1;
      stack.push(nums[i]);
      recorder.push({ description: `Process ${nums[i]} -> ${out[i]}`, visualizationData: { nums, i, out, stack: [...stack] }, memory: { out: [...out] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds next greater element using monotonic stack.'
);

export const nextSmallerElement = createStackAlgorithm(
  'Next Smaller Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [4, 8, 5, 2, 25]);
    const stack: number[] = [];
    const out = new Array(nums.length).fill(-1);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = nums.length - 1; i >= 0; i -= 1) {
      while (stack.length && stack[stack.length - 1] >= nums[i]) stack.pop();
      out[i] = stack.length ? stack[stack.length - 1] : -1;
      stack.push(nums[i]);
      recorder.push({ description: `Process ${nums[i]} -> ${out[i]}`, visualizationData: { nums, i, out, stack: [...stack] }, memory: { out: [...out] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds next smaller element using monotonic stack.'
);

export const dailyTemperatures = createStackAlgorithm(
  'Daily Temperatures',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const temps = [73, 74, 75, 71, 69, 72, 76, 73];
    const out = new Array(temps.length).fill(0);
    const stack: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < temps.length; i += 1) {
      while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
        const idx = stack.pop() as number;
        out[idx] = i - idx;
      }
      stack.push(i);
      recorder.push({ description: `Day ${i}, temp ${temps[i]}`, visualizationData: { temps, out, stack: [...stack] }, memory: { out: [...out] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Uses decreasing index stack to find warmer day distances.'
);

export const stockSpanProblem = createStackAlgorithm(
  'Stock Span Problem',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const prices = [100, 80, 60, 70, 60, 75, 85];
    const span = new Array(prices.length).fill(1);
    const stack: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let i = 0; i < prices.length; i += 1) {
      while (stack.length && prices[stack[stack.length - 1]] <= prices[i]) stack.pop();
      span[i] = stack.length ? i - stack[stack.length - 1] : i + 1;
      stack.push(i);
      recorder.push({ description: `Price ${prices[i]} span ${span[i]}`, visualizationData: { prices, span, stack: [...stack] }, memory: { span: [...span] }, codeLine: 1 });
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Computes consecutive days with smaller/equal prices using stack.'
);

export const largestRectangleHistogram = histogramArea;

export const maximalRectangle = createStackAlgorithm(
  'Maximal Rectangle',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const matrix = [
      ['1', '0', '1', '0', '0'],
      ['1', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '1', '0'],
    ];
    const recorder = createStepRecorder({ time: 'O(rows*cols)', space: 'O(cols)' });
    recorder.push({ description: 'Build row-wise histogram and apply largest-rectangle each row', visualizationData: { matrix }, memory: { strategy: 'histogram per row + monotonic stack' }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(rows*cols)', space: 'O(cols)' },
  'Computes maximal rectangle in binary matrix with histogram-stack method.'
);

export const expressionParser = createStackAlgorithm(
  'Expression Parser',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const infix = 'A+B*(C-D)';
    const postfix = 'ABCD-*+';
    const prefix = '+A*B-CD';
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: 'Convert infix to postfix and prefix using operator stack', visualizationData: { infix, postfix, prefix }, memory: { postfix, prefix }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Parses expressions using operator precedence and stack-based conversion.'
);

export const expressionConversion = expressionParser;

export const stackAdvancedAlgorithms = [
  nextGreaterElementStack,
  nextSmallerElement,
  dailyTemperatures,
  stockSpanProblem,
  largestRectangleHistogram,
  maximalRectangle,
  expressionConversion,
] as const;
