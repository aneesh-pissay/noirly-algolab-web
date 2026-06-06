import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';



export const jumpGame = createAlgorithm(

  'Jump Game',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [2, 3, 1, 1, 4]);

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });

    let reach = 0;



    recorder.push({ action: 'initialize', description: 'Track farthest reachable index', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    for (let i = 0; i < nums.length; i += 1) {

      if (i > reach) {

        recorder.push({ action: 'found', description: `Stuck at index ${i}`, visualizationData: { i, reach }, memory: {}, codeLine: 2 });

        return recorder.steps;

      }

      reach = Math.max(reach, i + nums[i]);

      recorder.push({ action: 'visit', description: `i=${i}, reach=${reach}`, visualizationData: { i, reach, jump: nums[i] }, variables: { reach }, memory: {}, codeLine: 3 });

    }

    recorder.push({ action: 'found', description: 'Can reach last index', visualizationData: { reach }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Determines if the last index is reachable via jumps.'

);



export const gasStation = createAlgorithm(

  'Gas Station',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const gas = getArray(input, [1, 2, 3, 4, 5]);

    const cost = [3, 4, 5, 1, 2];

    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });

    let tank = 0;

    let start = 0;

    let total = 0;



    recorder.push({ action: 'initialize', description: 'Find circular tour start if total gas ≥ total cost', visualizationData: { gas, cost }, memory: {}, codeLine: 1 });



    for (let i = 0; i < gas.length; i += 1) {

      const diff = gas[i] - (cost[i] ?? 0);

      tank += diff;

      total += diff;

      recorder.push({ action: 'visit', description: `Station ${i}: diff=${diff}, tank=${tank}`, visualizationData: { i, tank, diff }, variables: { tank }, memory: {}, codeLine: 2 });

      if (tank < 0) {

        start = i + 1;

        tank = 0;

        recorder.push({ action: 'backtrack', description: `Reset start to ${start}`, visualizationData: { start }, memory: {}, codeLine: 3 });

      }

    }

    const result = total >= 0 ? start : -1;

    recorder.push({ action: 'found', description: result >= 0 ? `Start at station ${result}` : 'No solution', visualizationData: { start: result }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Finds starting gas station for a circular tour.'

);



export const jobScheduling = createAlgorithm(

  'Job Scheduling',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const jobs = [

      { id: 'A', deadline: 2, profit: 100 },

      { id: 'B', deadline: 1, profit: 19 },

      { id: 'C', deadline: 2, profit: 27 },

      { id: 'D', deadline: 1, profit: 25 },

    ].sort((a, b) => b.profit - a.profit);

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(n)' });

    const slots: (string | null)[] = [null, null];

    let profit = 0;



    recorder.push({ action: 'initialize', description: 'Schedule highest-profit jobs before deadline', visualizationData: { jobs }, memory: {}, codeLine: 1 });



    for (const job of jobs) {

      for (let d = job.deadline; d >= 1; d -= 1) {

        if (!slots[d - 1]) {

          slots[d - 1] = job.id;

          profit += job.profit;

          recorder.push({ action: 'choose', description: `Schedule ${job.id} at slot ${d}, profit=${profit}`, visualizationData: { slots: [...slots], profit }, memory: {}, codeLine: 2 });

          break;

        }

      }

    }

    recorder.push({ action: 'found', description: `Max profit = ${profit}`, visualizationData: { profit, slots }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(n)' },

  'Schedules jobs by profit to maximize total earnings.'

);



export const fractionalKnapsack = createAlgorithm(

  'Fractional Knapsack',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const weights = getArray(input, [10, 20, 30]);

    const values = [60, 100, 120];

    const capacity = Math.trunc((input.capacity as number) ?? 50);

    const items = weights.map((w, i) => ({ w, v: values[i] ?? 0, ratio: (values[i] ?? 0) / w })).sort((a, b) => b.ratio - a.ratio);

    const recorder = createStepRecorder('pattern', { time: 'O(n log n)', space: 'O(1)' });

    let remain = capacity;

    let total = 0;



    recorder.push({ action: 'initialize', description: 'Take items by value/weight ratio', visualizationData: { items, capacity }, memory: {}, codeLine: 1 });



    for (const item of items) {

      if (remain <= 0) break;

      const take = Math.min(remain, item.w);

      const value = item.ratio * take;

      total += value;

      remain -= take;

      recorder.push({ action: 'choose', description: `Take ${take}/${item.w} weight, +${value.toFixed(1)} value`, visualizationData: { take, total, remain }, variables: { total }, memory: {}, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `Max value = ${total.toFixed(1)}`, visualizationData: { total }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n log n)', space: 'O(1)' },

  'Fractional knapsack solved by greedy value/weight ratio.'

);



export const greedyIntermediateMediumAlgorithms = [jumpGame, gasStation, jobScheduling, fractionalKnapsack] as const;


