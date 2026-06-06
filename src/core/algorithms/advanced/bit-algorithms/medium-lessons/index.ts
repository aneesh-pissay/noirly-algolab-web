import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';



export const singleNumber = createAlgorithm(

  'Single Number',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [4, 1, 2, 1, 2]);

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });

    let xor = 0;



    recorder.push({ action: 'initialize', description: 'XOR all numbers — pairs cancel', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    for (const num of nums) {

      xor ^= num;

      recorder.push({ action: 'visit', description: `xor ^= ${num} → ${xor}`, visualizationData: { num, xor }, variables: { xor }, memory: {}, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `Single number = ${xor}`, visualizationData: { result: xor }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Finds the unique element using XOR.'

);



export const subsetsUsingBits = createAlgorithm(

  'Subsets Using Bits',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [1, 2, 3]);

    const recorder = createStepRecorder('pattern', { time: 'O(n·2^n)', space: 'O(n)' });

    const n = nums.length;

    const total = 1 << n;

    const result: number[][] = [];



    recorder.push({ action: 'initialize', description: 'Enumerate masks 0..2^n-1', visualizationData: { nums: [...nums], total }, memory: {}, codeLine: 1 });



    for (let mask = 0; mask < total; mask += 1) {

      const subset: number[] = [];

      for (let i = 0; i < n; i += 1) if (mask & (1 << i)) subset.push(nums[i]);

      result.push(subset);

      recorder.push({ action: 'found', description: `Mask ${mask.toString(2).padStart(n, '0')}: [${subset.join(', ')}]`, visualizationData: { mask, subset: [...subset] }, memory: { result: result.map((s) => [...s]) }, codeLine: 2 });

    }

    return recorder.steps;

  },

  { time: 'O(n·2^n)', space: 'O(n)' },

  'Generates all subsets via bitmask enumeration.'

);



export const bitMasking = createAlgorithm(

  'Bit Masking',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const flags = Math.trunc((input.flags as number) ?? 0b1010);

    const recorder = createStepRecorder('pattern', { time: 'O(1)', space: 'O(1)' });



    recorder.push({ action: 'initialize', description: `Flags = ${flags.toString(2)}`, visualizationData: { flags }, memory: {}, codeLine: 1 });



    const setBit = flags | (1 << 2);

    recorder.push({ action: 'visit', description: `Set bit 2: ${setBit.toString(2)}`, visualizationData: { op: 'set', result: setBit }, memory: {}, codeLine: 2 });



    const clearBit = flags & ~(1 << 1);

    recorder.push({ action: 'visit', description: `Clear bit 1: ${clearBit.toString(2)}`, visualizationData: { op: 'clear', result: clearBit }, memory: {}, codeLine: 3 });



    const toggleBit = flags ^ (1 << 0);

    recorder.push({ action: 'found', description: `Toggle bit 0: ${toggleBit.toString(2)}`, visualizationData: { op: 'toggle', result: toggleBit }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(1)', space: 'O(1)' },

  'Set, clear, and toggle bits with masks.'

);



export const bitAlgorithmsAdvancedMediumAlgorithms = [singleNumber, subsetsUsingBits, bitMasking] as const;


