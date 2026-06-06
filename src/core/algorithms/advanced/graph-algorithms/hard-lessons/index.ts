import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';



export const floydWarshall = createAlgorithm(

  'Floyd Warshall',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = 4;

    const dist = [

      [0, 3, Infinity, 7],

      [8, 0, 2, Infinity],

      [5, Infinity, 0, 1],

      [2, Infinity, Infinity, 0],

    ];

    const recorder = createStepRecorder('graph', { time: 'O(V³)', space: 'O(V²)' });



    recorder.push({ action: 'initialize', description: 'All-pairs shortest paths via intermediate k', visualizationData: { dist: dist.map((r) => [...r]) }, memory: {}, codeLine: 1 });



    for (let k = 0; k < n; k += 1) {

      recorder.push({ action: 'visit', description: `Intermediate node k=${k}`, visualizationData: { k }, memory: {}, codeLine: 2 });

      for (let i = 0; i < n; i += 1) {

        for (let j = 0; j < n; j += 1) {

          if (dist[i][k] !== Infinity && dist[k][j] !== Infinity && dist[i][k] + dist[k][j] < dist[i][j]) {

            dist[i][j] = dist[i][k] + dist[k][j];

            recorder.push({ action: 'relax', description: `dist[${i}][${j}] = ${dist[i][j]} via ${k}`, visualizationData: { i, j, k, val: dist[i][j] }, memory: { dist: dist.map((r) => [...r]) }, codeLine: 3 });

          }

        }

      }

    }

    recorder.push({ action: 'found', description: 'All-pairs distances computed', visualizationData: { dist: dist.map((r) => [...r]) }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(V³)', space: 'O(V²)' },

  'Dynamic programming for all-pairs shortest paths.'

);



export const aStarSearch = createAlgorithm(

  'A* Search',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const start = Math.trunc(getNumber(input, 'start', 0));

    const goal = Math.trunc(getNumber(input, 'goal', 4));

    const adj: [number, number, number][] = [[0, 1, 1], [0, 2, 4], [1, 3, 2], [2, 3, 1], [3, 4, 1]];

    const h = (u: number): number => Math.abs(goal - u);

    const g = new Map<number, number>([[start, 0]]);

    const recorder = createStepRecorder('graph', { time: 'O(E log V)', space: 'O(V)' });

    const open = [start];

    const closed = new Set<number>();



    recorder.push({ action: 'initialize', description: `A* from ${start} to ${goal} with f=g+h`, visualizationData: { start, goal }, memory: {}, codeLine: 1 });



    while (open.length) {

      open.sort((a, b) => (g.get(a) ?? Infinity) + h(a) - ((g.get(b) ?? Infinity) + h(b)));

      const u = open.shift()!;

      if (closed.has(u)) continue;

      closed.add(u);

      recorder.push({ action: 'visit', description: `Expand ${u}, g=${g.get(u)}, h=${h(u)}`, visualizationData: { u, g: g.get(u), h: h(u) }, highlights: [u], memory: {}, codeLine: 2 });

      if (u === goal) {

        recorder.push({ action: 'found', description: `Goal reached with cost ${g.get(u)}`, visualizationData: { cost: g.get(u) }, memory: {}, codeLine: 3 });

        break;

      }

      for (const [a, b, w] of adj) {

        if (a !== u) continue;

        const ng = (g.get(u) ?? Infinity) + w;

        if (ng < (g.get(b) ?? Infinity)) {

          g.set(b, ng);

          open.push(b);

          recorder.push({ action: 'enqueue', description: `Update ${b}: g=${ng}, f=${ng + h(b)}`, visualizationData: { b, ng }, memory: {}, codeLine: 4 });

        }

      }

    }

    return recorder.steps;

  },

  { time: 'O(E log V)', space: 'O(V)' },

  'Heuristic best-first search for shortest path.'

);



export const tarjanAlgorithm = createAlgorithm(

  'Tarjan Algorithm',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const adj = [[1], [2, 3], [0], [4], [3]];

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const index = new Array(adj.length).fill(-1);

    const low = new Array(adj.length).fill(-1);

    const onStack = new Array(adj.length).fill(false);

    const stack: number[] = [];

    let time = 0;

    let sccCount = 0;



    recorder.push({ action: 'initialize', description: 'Tarjan SCC via DFS lowlink', visualizationData: { adj }, memory: {}, codeLine: 1 });



    const dfs = (u: number): void => {

      index[u] = time;

      low[u] = time;

      time += 1;

      stack.push(u);

      onStack[u] = true;

      recorder.push({ action: 'visit', description: `Enter ${u}: index=${index[u]}`, visualizationData: { u, index: index[u], low: low[u] }, highlights: [u], memory: {}, codeLine: 2 });

      for (const v of adj[u]) {

        if (index[v] === -1) {

          dfs(v);

          low[u] = Math.min(low[u], low[v]);

        } else if (onStack[v]) low[u] = Math.min(low[u], index[v]);

      }

      if (low[u] === index[u]) {

        sccCount += 1;

        const comp: number[] = [];

        while (true) {

          const w = stack.pop()!;

          onStack[w] = false;

          comp.push(w);

          if (w === u) break;

        }

        recorder.push({ action: 'found', description: `SCC #${sccCount}: [${comp.join(', ')}]`, visualizationData: { comp, sccCount }, memory: {}, codeLine: 3 });

      }

    };



    for (let i = 0; i < adj.length; i += 1) if (index[i] === -1) dfs(i);

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Finds strongly connected components in one DFS pass.'

);



export const primAlgorithm = createAlgorithm(

  'Prim Algorithm',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const n = 5;

    const edges: [number, number, number][] = [[0, 1, 2], [0, 3, 6], [1, 2, 3], [1, 3, 8], [1, 4, 5], [2, 4, 7], [3, 4, 9]];

    const inMst = new Array(n).fill(false);

    const key = new Array(n).fill(Infinity);

    key[0] = 0;

    const recorder = createStepRecorder('graph', { time: 'O(E log V)', space: 'O(V)' });

    let mstWeight = 0;



    recorder.push({ action: 'initialize', description: 'Grow MST by minimum edge to fringe', visualizationData: { edges }, memory: {}, codeLine: 1 });



    for (let count = 0; count < n; count += 1) {

      let u = -1;

      let best = Infinity;

      for (let i = 0; i < n; i += 1) if (!inMst[i] && key[i] < best) { best = key[i]; u = i; }

      if (u === -1) break;

      inMst[u] = true;

      mstWeight += key[u];

      recorder.push({ action: 'visit', description: `Add vertex ${u}, key=${key[u]}, weight=${mstWeight}`, visualizationData: { u, mstWeight }, highlights: [u], memory: {}, codeLine: 2 });

      for (const [a, b, w] of edges) {

        const v = a === u ? b : b === u ? a : -1;

        if (v >= 0 && !inMst[v] && w < key[v]) {

          key[v] = w;

          recorder.push({ action: 'relax', description: `Update key[${v}]=${w}`, visualizationData: { v, w }, memory: {}, codeLine: 3 });

        }

      }

    }

    recorder.push({ action: 'found', description: `MST weight = ${mstWeight}`, visualizationData: { mstWeight }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(E log V)', space: 'O(V)' },

  'Builds minimum spanning tree starting from a vertex.'

);



export const kruskalAlgorithm = createAlgorithm(

  'Kruskal Algorithm',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const edges = ([[0, 1, 2], [0, 3, 6], [1, 2, 3], [1, 3, 8], [1, 4, 5], [2, 4, 7], [3, 4, 9]] as [number, number, number][]).sort((a, b) => a[2] - b[2]);

    const parent = [0, 1, 2, 3, 4];

    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));

    const recorder = createStepRecorder('graph', { time: 'O(E log E)', space: 'O(V)' });

    let mstWeight = 0;

    let edgesUsed = 0;



    recorder.push({ action: 'initialize', description: 'Sort edges, union-find to avoid cycles', visualizationData: { edges }, memory: {}, codeLine: 1 });



    for (const [u, v, w] of edges) {

      const pu = find(u);

      const pv = find(v);

      recorder.push({ action: 'compare', description: `Edge (${u},${v}) weight ${w}`, visualizationData: { u, v, w }, memory: {}, codeLine: 2 });

      if (pu !== pv) {

        parent[pu] = pv;

        mstWeight += w;

        edgesUsed += 1;

        recorder.push({ action: 'choose', description: `Take edge, MST weight=${mstWeight}`, visualizationData: { mstWeight, edgesUsed }, memory: {}, codeLine: 3 });

      }

    }

    recorder.push({ action: 'found', description: `MST weight = ${mstWeight}`, visualizationData: { mstWeight }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(E log E)', space: 'O(V)' },

  'MST via sorted edges and disjoint-set union.'

);



export const graphAlgorithmsAdvancedHardAlgorithms = [floydWarshall, aStarSearch, tarjanAlgorithm, primAlgorithm, kruskalAlgorithm] as const;


