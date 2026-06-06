import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';



export const huffmanCoding = createAlgorithm(

  'Huffman Coding',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const freqs = getArray(input, [5, 9, 12, 13, 16, 45]);

    const chars = 'abcdef'.split('');

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(n)' });

    type Node = { freq: number; char?: string; left?: Node; right?: Node };

    const heap: Node[] = chars.map((c, i) => ({ freq: freqs[i] ?? 0, char: c }));



    recorder.push({ action: 'initialize', description: 'Merge two smallest nodes repeatedly', visualizationData: { freqs }, memory: {}, codeLine: 1 });



    while (heap.length > 1) {

      heap.sort((a, b) => a.freq - b.freq);

      const left = heap.shift()!;

      const right = heap.shift()!;

      const merged: Node = { freq: left.freq + right.freq, left, right };

      heap.push(merged);

      recorder.push({ action: 'merge', description: `Merge ${left.freq} + ${right.freq} = ${merged.freq}`, visualizationData: { left: left.freq, right: right.freq, merged: merged.freq }, memory: {}, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `Root frequency = ${heap[0]?.freq}`, visualizationData: { root: heap[0]?.freq }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(n)' },

  'Builds optimal prefix codes via Huffman tree merging.'

);



export const minimumPlatforms = createAlgorithm(

  'Minimum Platforms',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const arrivals = getArray(input, [900, 940, 950, 1100, 1500, 1800]);

    const departures = [910, 1200, 1120, 1130, 1900, 2000];

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(1)' });

    const events: { time: number; type: 1 | -1 }[] = [];

    arrivals.forEach((t) => events.push({ time: t, type: 1 }));

    departures.forEach((t) => events.push({ time: t, type: -1 }));

    events.sort((a, b) => a.time - b.time || a.type - b.type);

    let platforms = 0;

    let maxPlatforms = 0;



    recorder.push({ action: 'initialize', description: 'Sweep line: +1 arrival, -1 departure', visualizationData: { arrivals, departures }, memory: {}, codeLine: 1 });



    for (const ev of events) {

      platforms += ev.type;

      maxPlatforms = Math.max(maxPlatforms, platforms);

      recorder.push({ action: 'visit', description: `Time ${ev.time}: platforms=${platforms}`, visualizationData: { time: ev.time, platforms, maxPlatforms }, variables: { maxPlatforms }, memory: {}, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `Minimum platforms = ${maxPlatforms}`, visualizationData: { maxPlatforms }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(1)' },

  'Finds minimum railway platforms via event sweep.'

);



export const candyProblem = createAlgorithm(

  'Candy Problem',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const ratings = getArray(input, [1, 0, 2]);

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(n)' });

    const candies = new Array(ratings.length).fill(1);



    recorder.push({ action: 'initialize', description: 'Two-pass greedy: left then right neighbors', visualizationData: { ratings: [...ratings] }, memory: {}, codeLine: 1 });



    for (let i = 1; i < ratings.length; i += 1) {

      if (ratings[i] > ratings[i - 1]) {

        candies[i] = candies[i - 1] + 1;

        recorder.push({ action: 'visit', description: `Left pass: child ${i} gets ${candies[i]}`, visualizationData: { i, candies: [...candies] }, memory: {}, codeLine: 2 });

      }

    }

    for (let i = ratings.length - 2; i >= 0; i -= 1) {

      if (ratings[i] > ratings[i + 1]) {

        candies[i] = Math.max(candies[i], candies[i + 1] + 1);

        recorder.push({ action: 'visit', description: `Right pass: child ${i} gets ${candies[i]}`, visualizationData: { i, candies: [...candies] }, memory: {}, codeLine: 3 });

      }

    }

    const total = candies.reduce((a, b) => a + b, 0);

    recorder.push({ action: 'found', description: `Total candies = ${total}`, visualizationData: { total, candies: [...candies] }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Distributes candies by rating with two-pass greedy.'

);



export const greedyIntermediateHardAlgorithms = [huffmanCoding, minimumPlatforms, candyProblem] as const;


