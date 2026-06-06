import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';



export const activitySelection = createAlgorithm(

  'Activity Selection',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const starts = getArray(input, [1, 3, 0, 5, 8, 5]);

    const ends = [2, 4, 6, 7, 9, 9];

    const activities = starts.map((s, i) => ({ id: i, start: s, end: ends[i] ?? s + 1 })).sort((a, b) => a.end - b.end);

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(1)' });

    const selected: number[] = [];

    let lastEnd = -1;



    recorder.push({ action: 'initialize', description: 'Greedy: pick earliest-finishing compatible activity', visualizationData: { activities }, memory: {}, codeLine: 1 });



    for (const act of activities) {

      recorder.push({ action: 'compare', description: `Activity ${act.id} [${act.start},${act.end}] vs lastEnd=${lastEnd}`, visualizationData: { act }, memory: {}, codeLine: 2 });

      if (act.start >= lastEnd) {

        selected.push(act.id);

        lastEnd = act.end;

        recorder.push({ action: 'choose', description: `Select activity ${act.id}`, visualizationData: { selected: [...selected], lastEnd }, memory: { selected: [...selected] }, codeLine: 3 });

      }

    }

    recorder.push({ action: 'found', description: `Selected: [${selected.join(', ')}]`, visualizationData: { selected }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(1)' },

  'Maximizes non-overlapping activities by earliest finish time.'

);



export const assignCookies = createAlgorithm(

  'Assign Cookies',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const children = getArray(input, [1, 2, 3]).sort((a, b) => a - b);

    const cookies = [1, 1, 2].sort((a, b) => a - b);

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(1)' });

    let satisfied = 0;

    let j = 0;



    recorder.push({ action: 'initialize', description: 'Match smallest sufficient cookie to each child', visualizationData: { children, cookies }, memory: {}, codeLine: 1 });



    for (let i = 0; i < children.length && j < cookies.length; i += 1) {

      while (j < cookies.length && cookies[j] < children[i]) {

        recorder.push({ action: 'compare', description: `Cookie ${cookies[j]} too small for child ${children[i]}`, visualizationData: { child: children[i], cookie: cookies[j] }, memory: {}, codeLine: 2 });

        j += 1;

      }

      if (j < cookies.length) {

        satisfied += 1;

        recorder.push({ action: 'choose', description: `Assign cookie ${cookies[j]} to child ${children[i]}`, visualizationData: { satisfied }, variables: { satisfied }, memory: {}, codeLine: 3 });

        j += 1;

      }

    }

    recorder.push({ action: 'found', description: `Satisfied children: ${satisfied}`, visualizationData: { satisfied }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(1)' },

  'Assigns cookies greedily to maximize satisfied children.'

);



export const lemonadeChange = createAlgorithm(

  'Lemonade Change',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const bills = getArray(input, [5, 5, 5, 10, 20]);

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });

    let five = 0;

    let ten = 0;



    recorder.push({ action: 'initialize', description: 'Track $5 and $10 bills for change', visualizationData: { bills: [...bills] }, memory: {}, codeLine: 1 });



    for (const bill of bills) {

      if (bill === 5) {

        five += 1;

        recorder.push({ action: 'visit', description: `Paid $5 → five=${five}`, visualizationData: { bill, five, ten }, memory: {}, codeLine: 2 });

      } else if (bill === 10) {

        if (five === 0) {

          recorder.push({ action: 'found', description: 'Cannot give $5 change', visualizationData: { bill }, memory: {}, codeLine: 3 });

          return recorder.steps;

        }

        five -= 1;

        ten += 1;

        recorder.push({ action: 'visit', description: `Paid $10 → give $5 change`, visualizationData: { five, ten }, memory: {}, codeLine: 4 });

      } else {

        if (ten > 0 && five > 0) { ten -= 1; five -= 1; }

        else if (five >= 3) five -= 3;

        else {

          recorder.push({ action: 'found', description: 'Cannot make $15 change', visualizationData: { bill }, memory: {}, codeLine: 5 });

          return recorder.steps;

        }

        recorder.push({ action: 'visit', description: `Paid $20 → change given`, visualizationData: { five, ten }, memory: {}, codeLine: 6 });

      }

    }

    recorder.push({ action: 'found', description: 'All customers served', visualizationData: { five, ten }, memory: {}, codeLine: 7 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Simulates lemonade stand change-making greedily.'

);



export const greedyIntermediateEasyAlgorithms = [activitySelection, assignCookies, lemonadeChange] as const;


