import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';



export const topologicalSort = createAlgorithm(

  'Topological Sort',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = 6;

    const edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]];

    const adj: number[][] = Array.from({ length: n }, () => []);

    const indeg = new Array(n).fill(0);

    edges.forEach(([u, v]) => { adj[u].push(v); indeg[v] += 1; });

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const queue: number[] = [];

    const order: number[] = [];



    indeg.forEach((d, i) => { if (d === 0) queue.push(i); });

    recorder.push({ action: 'initialize', description: 'Kahn BFS: enqueue zero-indegree nodes', visualizationData: { indeg: [...indeg] }, memory: {}, codeLine: 1 });



    while (queue.length) {

      const u = queue.shift()!;

      order.push(u);

      recorder.push({ action: 'visit', description: `Dequeue ${u}`, visualizationData: { u, order: [...order] }, memory: { order: [...order] }, codeLine: 2 });

      for (const v of adj[u]) {

        indeg[v] -= 1;

        if (indeg[v] === 0) {

          queue.push(v);

          recorder.push({ action: 'enqueue', description: `Enqueue ${v} (indeg 0)`, visualizationData: { v }, memory: {}, codeLine: 3 });

        }

      }

    }

    recorder.push({ action: 'found', description: `Order: [${order.join(', ')}]`, visualizationData: { order }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Kahn algorithm topological ordering of a DAG.'

);



export const detectCycle = createAlgorithm(

  'Detect Cycle',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const adj = [[1], [2], [0, 3], []];

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const state = new Array(adj.length).fill(0);

    let hasCycle = false;



    recorder.push({ action: 'initialize', description: 'DFS 3-color cycle detection', visualizationData: { adj }, memory: {}, codeLine: 1 });



    const dfs = (u: number): void => {

      state[u] = 1;

      recorder.push({ action: 'visit', description: `Enter ${u} (gray)`, visualizationData: { u, state: [...state] }, highlights: [u], memory: {}, codeLine: 2 });

      for (const v of adj[u]) {

        if (state[v] === 1) {

          hasCycle = true;

          recorder.push({ action: 'found', description: `Cycle via edge ${u}→${v}`, visualizationData: { u, v }, memory: {}, codeLine: 3 });

          return;

        }

        if (state[v] === 0) dfs(v);

      }

      state[u] = 2;

    };



    for (let i = 0; i < adj.length && !hasCycle; i += 1) if (state[i] === 0) dfs(i);

    recorder.push({ action: 'found', description: hasCycle ? 'Cycle detected' : 'Acyclic', visualizationData: { hasCycle }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Detects directed cycle using DFS coloring.'

);



export const dijkstraAlgorithm = createAlgorithm(

  'Dijkstra Algorithm',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = 5;

    const edges: [number, number, number][] = [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5], [3, 4, 3]];

    const start = Math.trunc(getNumber(input, 'start', 0));

    const dist = new Array(n).fill(Infinity);

    dist[start] = 0;

    const visited = new Set<number>();

    const recorder = createStepRecorder('graph', { time: 'O((V+E) log V)', space: 'O(V)' });



    recorder.push({ action: 'initialize', description: `Single-source shortest paths from ${start}`, visualizationData: { edges, start }, memory: { dist: [...dist] }, codeLine: 1 });



    for (let k = 0; k < n; k += 1) {

      let u = -1;

      let best = Infinity;

      for (let i = 0; i < n; i += 1) if (!visited.has(i) && dist[i] < best) { best = dist[i]; u = i; }

      if (u === -1) break;

      visited.add(u);

      recorder.push({ action: 'visit', description: `Settle node ${u}, dist=${dist[u]}`, visualizationData: { u, dist: [...dist] }, highlights: [u], memory: { dist: [...dist] }, codeLine: 2 });

      for (const [a, b, w] of edges) {

        if (a === u && dist[a] + w < dist[b]) {

          dist[b] = dist[a] + w;

          recorder.push({ action: 'relax', description: `Relax ${a}→${b}: dist[${b}]=${dist[b]}`, visualizationData: { a, b, w }, memory: { dist: [...dist] }, codeLine: 3 });

        }

      }

    }

    return recorder.steps;

  },

  { time: 'O((V+E) log V)', space: 'O(V)' },

  'Greedy shortest paths with non-negative edge weights.'

);



export const bellmanFord = createAlgorithm(

  'Bellman Ford',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = 4;

    const edges: [number, number, number][] = [[0, 1, 5], [1, 2, -3], [2, 3, 1], [0, 3, 2]];

    const start = 0;

    const dist = new Array(n).fill(Infinity);

    dist[start] = 0;

    const recorder = createStepRecorder('graph', { time: 'O(VE)', space: 'O(V)' });



    recorder.push({ action: 'initialize', description: 'Relax all edges V-1 times', visualizationData: { edges }, memory: { dist: [...dist] }, codeLine: 1 });



    for (let i = 0; i < n - 1; i += 1) {

      recorder.push({ action: 'visit', description: `Pass ${i + 1}`, visualizationData: { pass: i + 1 }, memory: {}, codeLine: 2 });

      for (const [u, v, w] of edges) {

        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {

          dist[v] = dist[u] + w;

          recorder.push({ action: 'relax', description: `Relax ${u}→${v}: dist[${v}]=${dist[v]}`, visualizationData: { u, v, w }, memory: { dist: [...dist] }, codeLine: 3 });

        }

      }

    }

    recorder.push({ action: 'found', description: `Distances: [${dist.join(', ')}]`, visualizationData: { dist: [...dist] }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(VE)', space: 'O(V)' },

  'Shortest paths allowing negative edges (no negative cycles).'

);



export const graphAlgorithmsAdvancedMediumAlgorithms = [topologicalSort, detectCycle, dijkstraAlgorithm, bellmanFord] as const;


