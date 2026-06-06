import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getString } from '../../../_shared/helpers';



export const editDistance = createAlgorithm(

  'Edit Distance',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const word1 = getString(input, 'word1', 'horse');

    const word2 = getString(input, 'word2', 'ros');

    const m = word1.length;

    const n = word2.length;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    const recorder = createStepRecorder('dp', { time: 'O(m·n)', space: 'O(m·n)' });



    for (let i = 0; i <= m; i += 1) dp[i][0] = i;

    for (let j = 0; j <= n; j += 1) dp[0][j] = j;

    recorder.push({ action: 'initialize', description: 'Levenshtein DP table', visualizationData: { word1, word2 }, memory: {}, codeLine: 1 });



    for (let i = 1; i <= m; i += 1) {

      for (let j = 1; j <= n; j += 1) {

        if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];

        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);

        recorder.push({ action: 'visit', description: `dp[${i}][${j}] = ${dp[i][j]}`, visualizationData: { i, j, val: dp[i][j] }, memory: {}, codeLine: 2 });

      }

    }

    recorder.push({ action: 'found', description: `Edit distance = ${dp[m][n]}`, visualizationData: { result: dp[m][n] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(m·n)', space: 'O(m·n)' },

  'Minimum edits to transform word1 into word2.'

);



export const longestCommonSubsequence = createAlgorithm(

  'Longest Common Subsequence',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const text1 = getString(input, 'text1', 'abcde');

    const text2 = getString(input, 'text2', 'ace');

    const m = text1.length;

    const n = text2.length;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    const recorder = createStepRecorder('dp', { time: 'O(m·n)', space: 'O(m·n)' });



    recorder.push({ action: 'initialize', description: 'LCS DP table', visualizationData: { text1, text2 }, memory: {}, codeLine: 1 });



    for (let i = 1; i <= m; i += 1) {

      for (let j = 1; j <= n; j += 1) {

        if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;

        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);

        recorder.push({ action: 'visit', description: `dp[${i}][${j}] = ${dp[i][j]}`, visualizationData: { i, j, val: dp[i][j] }, memory: {}, codeLine: 2 });

      }

    }

    recorder.push({ action: 'found', description: `LCS length = ${dp[m][n]}`, visualizationData: { result: dp[m][n] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(m·n)', space: 'O(m·n)' },

  'Longest common subsequence of two strings.'

);



export const matrixChainMultiplication = createAlgorithm(

  'Matrix Chain Multiplication',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const dims = getArray(input, [10, 30, 5, 60]);

    const n = dims.length - 1;

    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    const recorder = createStepRecorder('dp', { time: 'O(n³)', space: 'O(n²)' });



    recorder.push({ action: 'initialize', description: 'Min scalar multiplications for chain', visualizationData: { dims }, memory: {}, codeLine: 1 });



    for (let len = 2; len <= n; len += 1) {

      for (let i = 0; i <= n - len; i += 1) {

        const j = i + len - 1;

        dp[i][j] = Infinity;

        for (let k = i; k < j; k += 1) {

          const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];

          if (cost < dp[i][j]) {

            dp[i][j] = cost;

            recorder.push({ action: 'visit', description: `dp[${i}][${j}] = ${cost} split at ${k}`, visualizationData: { i, j, k, cost }, memory: {}, codeLine: 2 });

          }

        }

      }

    }

    recorder.push({ action: 'found', description: `Min multiplications = ${dp[0][n - 1]}`, visualizationData: { result: dp[0][n - 1] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n³)', space: 'O(n²)' },

  'Optimal parenthesization for matrix chain product.'

);



export const burstBalloons = createAlgorithm(

  'Burst Balloons',

  'dp',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [3, 1, 5, 8]);

    const balloons = [1, ...nums, 1];

    const n = balloons.length;

    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    const recorder = createStepRecorder('dp', { time: 'O(n³)', space: 'O(n²)' });



    recorder.push({ action: 'initialize', description: 'Burst last in interval DP', visualizationData: { balloons }, memory: {}, codeLine: 1 });



    for (let len = 3; len <= n; len += 1) {

      for (let left = 0; left <= n - len; left += 1) {

        const right = left + len - 1;

        for (let k = left + 1; k < right; k += 1) {

          const coins = dp[left][k] + dp[k][right] + balloons[left] * balloons[k] * balloons[right];

          dp[left][right] = Math.max(dp[left][right], coins);

          recorder.push({ action: 'visit', description: `Interval [${left},${right}] burst ${k} last → ${coins}`, visualizationData: { left, right, k, coins }, memory: {}, codeLine: 2 });

        }

      }

    }

    recorder.push({ action: 'found', description: `Max coins = ${dp[0][n - 1]}`, visualizationData: { result: dp[0][n - 1] }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n³)', space: 'O(n²)' },

  'Max coins bursting balloons with interval DP.'

);



export const dynamicProgrammingAdvancedHardAlgorithms = [editDistance, longestCommonSubsequence, matrixChainMultiplication, burstBalloons] as const;


