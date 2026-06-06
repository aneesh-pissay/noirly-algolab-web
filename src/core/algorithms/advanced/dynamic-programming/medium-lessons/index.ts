import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';



export const houseRobber = createAlgorithm(

  'House Robber',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [2, 7, 9, 3, 1]);

    const recorder = createStepRecorder('dp', { time: 'O(n)', space: 'O(1)' });

    let rob = 0;

    let skip = 0;



    recorder.push({ action: 'initialize', description: 'dp[i] = max(rob prev+nums[i], skip prev)', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    for (let i = 0; i < nums.length; i += 1) {

      const newRob = skip + nums[i];

      const newSkip = Math.max(rob, skip);

      recorder.push({ action: 'visit', description: `House ${i}: rob=${newRob}, skip=${newSkip}`, visualizationData: { i, newRob, newSkip }, variables: { newRob, newSkip }, memory: {}, codeLine: 2 });

      rob = newRob;

      skip = newSkip;

    }

    const result = Math.max(rob, skip);

    recorder.push({ action: 'found', description: `Max loot = ${result}`, visualizationData: { result }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Max sum with no adjacent houses robbed.'

);



export const coinChange = createAlgorithm(

  'Coin Change',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const coins = getArray(input, [1, 2, 5]);

    const amount = Math.trunc((input.amount as number) ?? 11);

    const dp = new Array(amount + 1).fill(Infinity);

    dp[0] = 0;

    const recorder = createStepRecorder('dp', { time: 'O(n·amount)', space: 'O(amount)' });



    recorder.push({ action: 'initialize', description: 'Min coins for each amount 0..target', visualizationData: { coins, amount }, memory: { dp: [...dp] }, codeLine: 1 });



    for (let a = 1; a <= amount; a += 1) {

      for (const c of coins) {

        if (c <= a && dp[a - c] + 1 < dp[a]) {

          dp[a] = dp[a - c] + 1;

          recorder.push({ action: 'visit', description: `dp[${a}] = ${dp[a]} using coin ${c}`, visualizationData: { a, dp: [...dp] }, memory: { dp: [...dp] }, codeLine: 2 });

        }

      }

    }

    recorder.push({ action: 'found', description: `Min coins = ${dp[amount] === Infinity ? -1 : dp[amount]}`, visualizationData: { result: dp[amount] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n·amount)', space: 'O(amount)' },

  'Minimum coins to make a given amount.'

);



export const longestIncreasingSubsequence = createAlgorithm(

  'Longest Increasing Subsequence',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [10, 9, 2, 5, 3, 7, 101, 18]);

    const recorder = createStepRecorder('dp', { time: 'O(n²)', space: 'O(n)' });

    const dp = new Array(nums.length).fill(1);



    recorder.push({ action: 'initialize', description: 'dp[i] = LIS ending at i', visualizationData: { nums: [...nums] }, memory: { dp: [...dp] }, codeLine: 1 });



    for (let i = 1; i < nums.length; i += 1) {

      for (let j = 0; j < i; j += 1) {

        if (nums[j] < nums[i]) {

          dp[i] = Math.max(dp[i], dp[j] + 1);

          recorder.push({ action: 'visit', description: `i=${i}, j=${j}: dp[${i}]=${dp[i]}`, visualizationData: { i, j, dp: [...dp] }, memory: { dp: [...dp] }, codeLine: 2 });

        }

      }

    }

    const result = Math.max(...dp);

    recorder.push({ action: 'found', description: `LIS length = ${result}`, visualizationData: { result }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n²)', space: 'O(n)' },

  'Classic O(n²) LIS dynamic programming.'

);



export const knapsack = createAlgorithm(

  'Knapsack',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const weights = getArray(input, [1, 3, 4, 5]);

    const values = [1, 4, 5, 7];

    const capacity = Math.trunc((input.capacity as number) ?? 7);

    const dp = Array.from({ length: weights.length + 1 }, () => new Array(capacity + 1).fill(0));

    const recorder = createStepRecorder('dp', { time: 'O(n·W)', space: 'O(n·W)' });



    recorder.push({ action: 'initialize', description: '0/1 knapsack 2D DP table', visualizationData: { weights, values, capacity }, memory: {}, codeLine: 1 });



    for (let i = 1; i <= weights.length; i += 1) {

      for (let w = 0; w <= capacity; w += 1) {

        dp[i][w] = dp[i - 1][w];

        if (weights[i - 1] <= w) {

          dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + (values[i - 1] ?? 0));

        }

        recorder.push({ action: 'visit', description: `dp[${i}][${w}] = ${dp[i][w]}`, visualizationData: { i, w, val: dp[i][w] }, memory: {}, codeLine: 2 });

      }

    }

    recorder.push({ action: 'found', description: `Max value = ${dp[weights.length][capacity]}`, visualizationData: { result: dp[weights.length][capacity] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n·W)', space: 'O(n·W)' },

  '0/1 knapsack maximum value DP.'

);



export const dynamicProgrammingAdvancedMediumAlgorithms = [houseRobber, coinChange, longestIncreasingSubsequence, knapsack] as const;


