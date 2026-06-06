import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';



export const andOrXor = createAlgorithm(

  'AND / OR / XOR',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const a = Math.trunc(getNumber(input, 'a', 12));

    const b = Math.trunc(getNumber(input, 'b', 10));

    const recorder = createStepRecorder('pattern', { time: 'O(1)', space: 'O(1)' });



    recorder.push({ action: 'initialize', description: `Bitwise ops on ${a} (${a.toString(2)}) and ${b} (${b.toString(2)})`, visualizationData: { a, b }, memory: {}, codeLine: 1 });

    recorder.push({ action: 'visit', description: `AND: ${a} & ${b} = ${a & b}`, visualizationData: { op: 'AND', result: a & b }, memory: {}, codeLine: 2 });

    recorder.push({ action: 'visit', description: `OR: ${a} | ${b} = ${a | b}`, visualizationData: { op: 'OR', result: a | b }, memory: {}, codeLine: 3 });

    recorder.push({ action: 'found', description: `XOR: ${a} ^ ${b} = ${a ^ b}`, visualizationData: { op: 'XOR', result: a ^ b }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(1)', space: 'O(1)' },

  'Demonstrates fundamental bitwise AND, OR, XOR.'

);



export const checkEvenOdd = createAlgorithm(

  'Check Even Odd',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.trunc(getNumber(input, 'n', 42));

    const recorder = createStepRecorder('pattern', { time: 'O(1)', space: 'O(1)' });



    recorder.push({ action: 'initialize', description: 'Test least significant bit (n & 1)', visualizationData: { n, binary: n.toString(2) }, memory: {}, codeLine: 1 });

    const isOdd = (n & 1) === 1;

    recorder.push({ action: 'found', description: `${n} is ${isOdd ? 'odd' : 'even'}`, visualizationData: { n, isOdd, lsb: n & 1 }, memory: {}, codeLine: 2 });

    return recorder.steps;

  },

  { time: 'O(1)', space: 'O(1)' },

  'Checks parity using n & 1.'

);



export const powerOfTwo = createAlgorithm(

  'Power Of Two',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.trunc(getNumber(input, 'n', 16));

    const recorder = createStepRecorder('pattern', { time: 'O(1)', space: 'O(1)' });



    recorder.push({ action: 'initialize', description: 'Power of 2 iff n > 0 and (n & (n-1)) === 0', visualizationData: { n, binary: n.toString(2) }, memory: {}, codeLine: 1 });

    const masked = n & (n - 1);

    recorder.push({ action: 'visit', description: `n & (n-1) = ${masked}`, visualizationData: { n, masked }, memory: {}, codeLine: 2 });

    const result = n > 0 && masked === 0;

    recorder.push({ action: 'found', description: `${n} is ${result ? '' : 'not '}a power of two`, visualizationData: { result }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(1)', space: 'O(1)' },

  'Detects power of two via n & (n-1) trick.'

);



export const countBits = createAlgorithm(

  'Count Bits',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(0, Math.trunc(getNumber(input, 'n', 5)));

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(n)' });

    const result: number[] = [];



    recorder.push({ action: 'initialize', description: 'Count set bits for 0..n', visualizationData: { n }, memory: {}, codeLine: 1 });



    for (let i = 0; i <= n; i += 1) {

      let count = 0;

      let x = i;

      while (x) {

        count += x & 1;

        x >>= 1;

      }

      result.push(count);

      recorder.push({ action: 'visit', description: `popcount(${i}) = ${count}`, visualizationData: { i, count, binary: i.toString(2) }, memory: { result: [...result] }, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `Result: [${result.join(', ')}]`, visualizationData: { result }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Counts 1-bits for every number up to n.'

);



export const bitAlgorithmsAdvancedEasyAlgorithms = [andOrXor, checkEvenOdd, powerOfTwo, countBits] as const;


