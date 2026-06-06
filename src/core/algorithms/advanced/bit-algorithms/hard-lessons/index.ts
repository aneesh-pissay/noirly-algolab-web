import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getArray, getNumber } from '../../../_shared/helpers';



export const nQueensBitmask = createAlgorithm(

  'N Queens Bitmask',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = Math.max(4, Math.min(8, Math.trunc(getNumber(input, 'n', 4))));

    const recorder = createStepRecorder('pattern', { time: 'O(n!)', space: 'O(n)' });

    let solutions = 0;



    recorder.push({ action: 'initialize', description: 'N-Queens with column/diag bitmasks', visualizationData: { n }, memory: {}, codeLine: 1 });



    const solve = (row: number, cols: number, diag1: number, diag2: number): void => {

      if (row === n) {

        solutions += 1;

        recorder.push({ action: 'found', description: `Solution #${solutions}`, visualizationData: { row, solutions }, memory: {}, codeLine: 2 });

        return;

      }

      let available = ((1 << n) - 1) & ~(cols | diag1 | diag2);

      while (available) {

        const bit = available & -available;

        available -= bit;

        const col = Math.log2(bit);

        recorder.push({ action: 'place', description: `Row ${row}, col ${col}`, visualizationData: { row, col: Math.trunc(col), cols, diag1, diag2 }, memory: {}, codeLine: 3 });

        solve(row + 1, cols | bit, (diag1 | bit) << 1, (diag2 | bit) >> 1);

      }

    };

    solve(0, 0, 0, 0);

    return recorder.steps;

  },

  { time: 'O(n!)', space: 'O(n)' },

  'N-Queens using bitmasks for O(1) conflict checks.'

);



export const travelingSalesmanDP = createAlgorithm(

  'Traveling Salesman DP',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const dist = [

      [0, 10, 15, 20],

      [10, 0, 35, 25],

      [15, 35, 0, 30],

      [20, 25, 30, 0],

    ];

    const n = dist.length;

    const size = 1 << n;

    const dp = Array.from({ length: size }, () => new Array(n).fill(Infinity));

    dp[1][0] = 0;

    const recorder = createStepRecorder('pattern', { time: 'O(n²·2^n)', space: 'O(n·2^n)' });



    recorder.push({ action: 'initialize', description: 'Held-Karp TSP bitmask DP', visualizationData: { n }, memory: {}, codeLine: 1 });



    for (let mask = 1; mask < size; mask += 1) {

      for (let u = 0; u < n; u += 1) {

        if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue;

        for (let v = 0; v < n; v += 1) {

          if (mask & (1 << v)) continue;

          const next = mask | (1 << v);

          const nd = dp[mask][u] + dist[u][v];

          if (nd < dp[next][v]) {

            dp[next][v] = nd;

            recorder.push({ action: 'visit', description: `mask=${mask.toString(2)}, ${u}→${v}: ${nd}`, visualizationData: { mask, u, v, nd }, memory: {}, codeLine: 2 });

          }

        }

      }

    }

    let ans = Infinity;

    for (let u = 1; u < n; u += 1) ans = Math.min(ans, dp[size - 1][u] + dist[u][0]);

    recorder.push({ action: 'found', description: `Min tour cost = ${ans}`, visualizationData: { result: ans }, memory: {}, codeLine: 3 });

    return recorder.steps;

  },

  { time: 'O(n²·2^n)', space: 'O(n·2^n)' },

  'Exact TSP via bitmask dynamic programming.'

);



export const maximumXor = createAlgorithm(

  'Maximum XOR',

  'pattern',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const nums = getArray(input, [3, 10, 5, 25, 2, 8]);

    const recorder = createStepRecorder('pattern', { time: 'O(n·L)', space: 'O(n·L)' });

    type TrieNode = { children: [TrieNode | null, TrieNode | null] };

    const root: TrieNode = { children: [null, null] };



    recorder.push({ action: 'initialize', description: 'Binary trie for max XOR pair', visualizationData: { nums: [...nums] }, memory: {}, codeLine: 1 });



    const insert = (num: number): void => {

      let node = root;

      for (let i = 31; i >= 0; i -= 1) {

        const bit = (num >> i) & 1;

        if (!node.children[bit]) node.children[bit] = { children: [null, null] };

        node = node.children[bit]!;

      }

      recorder.push({ action: 'visit', description: `Insert ${num}`, visualizationData: { num }, memory: {}, codeLine: 2 });

    };



    const query = (num: number): number => {

      let node = root;

      let xor = 0;

      for (let i = 31; i >= 0; i -= 1) {

        const bit = (num >> i) & 1;

        const want = 1 - bit;

        if (node.children[want]) { xor |= 1 << i; node = node.children[want]!; }

        else node = node.children[bit]!;

      }

      return xor;

    };



    nums.forEach(insert);

    let best = 0;

    for (const num of nums) {

      const val = query(num);

      best = Math.max(best, val);

      recorder.push({ action: 'compare', description: `Max XOR with ${num} = ${val}`, visualizationData: { num, val, best }, variables: { best }, memory: {}, codeLine: 3 });

    }

    recorder.push({ action: 'found', description: `Maximum XOR = ${best}`, visualizationData: { result: best }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(n·L)', space: 'O(n·L)' },

  'Maximum XOR of two numbers using a binary trie.'

);



export const bitAlgorithmsAdvancedHardAlgorithms = [nQueensBitmask, travelingSalesmanDP, maximumXor] as const;


