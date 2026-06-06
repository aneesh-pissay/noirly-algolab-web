import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber, getString } from '../../../_shared/helpers';

export const printNumbers = createAlgorithm(
  'Print Numbers',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = Math.max(1, Math.trunc(getNumber(input, 'n', 5)));
    const recorder = createStepRecorder('recursion', { time: 'O(n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: `printNumbers(${n}): base case when n === 0`, visualizationData: { n }, variables: { n }, memory: {}, codeLine: 1 });

    const print = (k: number): void => {
      if (k === 0) {
        recorder.push({ action: 'visit', description: 'Base case reached — return', visualizationData: { k }, memory: {}, codeLine: 2 });
        return;
      }
      print(k - 1);
      recorder.push({ action: 'visit', description: `Print ${k} on unwind`, visualizationData: { printed: k }, variables: { k }, memory: {}, codeLine: 3 });
    };
    print(n);
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Recursively prints 1..n using call-stack unwinding.'
);

export const factorial = createAlgorithm(
  'Factorial',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = Math.max(0, Math.trunc(getNumber(input, 'n', 5)));
    const recorder = createStepRecorder('recursion', { time: 'O(n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: `factorial(${n})`, visualizationData: { n }, variables: { n }, memory: {}, codeLine: 1 });

    const fact = (k: number): number => {
      recorder.push({ action: 'visit', description: `Call factorial(${k})`, visualizationData: { k }, variables: { k }, memory: {}, codeLine: 2 });
      if (k <= 1) return 1;
      return k * fact(k - 1);
    };
    const result = fact(n);
    recorder.push({ action: 'found', description: `factorial(${n}) = ${result}`, visualizationData: { result }, variables: { result }, memory: {}, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Classic recursive factorial with call-stack steps.'
);

export const fibonacci = createAlgorithm(
  'Fibonacci',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = Math.max(0, Math.trunc(getNumber(input, 'n', 5)));
    const recorder = createStepRecorder('recursion', { time: 'O(2^n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: `fib(${n}) naive recursion`, visualizationData: { n }, variables: { n }, memory: {}, codeLine: 1 });

    const fib = (k: number): number => {
      recorder.push({ action: 'visit', description: `Call fib(${k})`, visualizationData: { k }, variables: { k }, memory: {}, codeLine: 2 });
      if (k <= 1) return k;
      return fib(k - 1) + fib(k - 2);
    };
    const result = fib(n);
    recorder.push({ action: 'found', description: `fib(${n}) = ${result}`, visualizationData: { result }, variables: { result }, memory: {}, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(2^n)', space: 'O(n)' },
  'Naive recursive Fibonacci showing call-tree growth.'
);

export const sumOfArray = createAlgorithm(
  'Sum Of Array',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 2, 3, 4, 5]);
    const recorder = createStepRecorder('recursion', { time: 'O(n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: 'sum(arr, i) = arr[i] + sum(arr, i+1)', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    const sum = (i: number): number => {
      if (i >= arr.length) return 0;
      recorder.push({ action: 'visit', description: `Include arr[${i}]=${arr[i]}`, visualizationData: { index: i }, highlights: [i], memory: { array: [...arr] }, codeLine: 2 });
      return arr[i] + sum(i + 1);
    };
    recorder.push({ action: 'found', description: `Sum = ${sum(0)}`, visualizationData: { sum: sum(0) }, memory: {}, codeLine: 3 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Recursively sums array elements.'
);

export const reverseString = createAlgorithm(
  'Reverse String',
  'recursion',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const str = getString(input, 'str', 'hello');
    const chars = [...str];
    const recorder = createStepRecorder('recursion', { time: 'O(n)', space: 'O(n)' });

    recorder.push({ action: 'initialize', description: 'Swap ends and recurse inward', visualizationData: { string: chars }, memory: {}, codeLine: 1 });

    const rev = (lo: number, hi: number): void => {
      if (lo >= hi) return;
      [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
      recorder.push({ action: 'swap', description: `Swap ${lo}↔${hi} → "${chars.join('')}"`, visualizationData: { string: [...chars], lo, hi }, highlights: [lo, hi], memory: {}, codeLine: 2 });
      rev(lo + 1, hi - 1);
    };
    rev(0, chars.length - 1);
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Recursively reverses a string by swapping ends.'
);

export const recursionBeginnerEasyAlgorithms = [printNumbers, factorial, fibonacci, sumOfArray, reverseString] as const;
