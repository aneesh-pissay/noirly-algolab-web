import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';



export const fibonacciDP = createAlgorithm(

  'Fibonacci DP',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(0, Math.trunc(getNumber(input, 'n', 6)));

    const recorder = createStepRecorder('dp', { time: 'O(n)', space: 'O(n)' });

    const dp = new Array(n + 1).fill(0);

    dp[0] = 0;

    if (n > 0) dp[1] = 1;



    recorder.push({ action: 'initialize', description: 'Bottom-up DP table for Fibonacci', visualizationData: { n }, memory: { dp: [...dp] }, codeLine: 1 });



    for (let i = 2; i <= n; i += 1) {

      dp[i] = dp[i - 1] + dp[i - 2];

      recorder.push({ action: 'visit', description: `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`, visualizationData: { i, dp: [...dp] }, variables: { i }, memory: { dp: [...dp] }, codeLine: 2 });

    }

    recorder.push({ action: 'found', description: `fib(${n}) = ${dp[n]}`, visualizationData: { result: dp[n] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(n)' },

  'Fibonacci via bottom-up dynamic programming.'

);



export const climbingStairs = createAlgorithm(

  'Climbing Stairs',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(1, Math.trunc(getNumber(input, 'n', 5)));

    const recorder = createStepRecorder('dp', { time: 'O(n)', space: 'O(1)' });

    let a = 1;

    let b = 1;



    recorder.push({ action: 'initialize', description: 'Ways to reach step n = ways(n-1) + ways(n-2)', visualizationData: { n }, memory: {}, codeLine: 1 });



    for (let i = 2; i <= n; i += 1) {

      const c = a + b;

      recorder.push({ action: 'visit', description: `Step ${i}: ways = ${a} + ${b} = ${c}`, visualizationData: { i, ways: c }, variables: { i, ways: c }, memory: {}, codeLine: 2 });

      a = b;

      b = c;

    }

    recorder.push({ action: 'found', description: `Ways to climb ${n} stairs = ${b}`, visualizationData: { result: b }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Count distinct ways to climb n stairs (1 or 2 steps).'

);



export const minCostClimbing = createAlgorithm(

  'Min Cost Climbing',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const cost = getArray(input, [10, 15, 20]);

    const recorder = createStepRecorder('dp', { time: 'O(n)', space: 'O(1)' });

    let prev2 = 0;

    let prev1 = 0;



    recorder.push({ action: 'initialize', description: 'Min cost to reach step i from i-1 or i-2', visualizationData: { cost: [...cost] }, memory: {}, codeLine: 1 });



    for (let i = 0; i < cost.length; i += 1) {

      const cur = cost[i] + Math.min(prev1, prev2);

      recorder.push({ action: 'visit', description: `Step ${i}: minCost = ${cur}`, visualizationData: { i, cur }, variables: { cur }, memory: {}, codeLine: 2 });

      prev2 = prev1;

      prev1 = cur;

    }

    recorder.push({ action: 'found', description: `Min cost = ${Math.min(prev1, prev2)}`, visualizationData: { result: Math.min(prev1, prev2) }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n)', space: 'O(1)' },

  'Minimum cost to reach top of stairs with step costs.'

);



export const dynamicProgrammingAdvancedEasyAlgorithms = [fibonacciDP, climbingStairs, minCostClimbing] as const;


