import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder } from '../../../_shared/helpers';
import { Edge, getGraphEdges } from '../../graph/helpers';

export const kruskalMst = createDSAlgorithm(
  'Kruskal MST',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1, 1],
      [1, 2, 2],
      [0, 2, 2],
      [2, 3, 3],
    ] as Edge[]);
    const n = edges.reduce((m, [u, v]) => Math.max(m, u, v), 0) + 1;
    const recorder = createStepRecorder({ time: 'O(E log E)', space: 'O(n)' });
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const sorted = [...edges].sort((a, b) => (a[2] ?? 1) - (b[2] ?? 1));
    let weight = 0;
    const mst: Edge[] = [];

    recorder.push({
      action: 'initialize',
      description: 'Sort edges ascending; union-find rejects edges that form cycles',
      visualizationData: { sortedEdges: sorted.map((e) => [...e]) },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    sorted.forEach(([u, v, w]) => {
      const ru = find(u);
      const rv = find(v);
      if (ru !== rv) {
        parent[ru] = rv;
        weight += w ?? 1;
        mst.push([u, v, w]);
        recorder.push({
          action: 'insert',
          description: `Add ${u}—${v} (${w}); total ${weight}`,
          visualizationData: { mst: mst.map((e) => [...e]), weight },
          highlights: [u, v],
          variables: { weight },
          memory: { parent: [...parent] },
          codeLine: 2,
        });
      } else {
        recorder.push({
          action: 'compare',
          description: `Skip ${u}—${v}: same component`,
          visualizationData: { edge: [u, v] },
          memory: { parent: [...parent] },
          codeLine: 3,
        });
      }
    });

    return recorder.steps;
  },
  { time: 'O(E log E)', space: 'O(n)' },
  'Constructs a minimum spanning tree with union-find.'
);

export const accountsMerge = createDSAlgorithm(
  'Accounts Merge',
  (): AlgorithmStep[] => {
    const accounts = [
      ['John', 'a@x.com', 'b@x.com'],
      ['John', 'b@x.com', 'c@x.com'],
      ['Mary', 'm@x.com'],
    ];
    const recorder = createStepRecorder({ time: 'O(N · K · α)', space: 'O(N · K)' });

    recorder.push({
      action: 'initialize',
      description: 'Map each email to an id; union emails within the same account',
      visualizationData: { accounts: accounts.map((a) => [...a]) },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: 'Accounts 0 and 1 share b@x.com → union their email sets',
      visualizationData: { merged: ['a@x.com', 'b@x.com', 'c@x.com'] },
      memory: {},
      codeLine: 2,
    });

    recorder.push({
      action: 'found',
      description: 'Group emails by root, sort, prepend the owner name',
      visualizationData: {
        result: [
          ['John', 'a@x.com', 'b@x.com', 'c@x.com'],
          ['Mary', 'm@x.com'],
        ],
      },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(N · K · α)', space: 'O(N · K)' },
  'Merges user accounts that share any email using union-find.'
);

export const redundantConnection = createDSAlgorithm(
  'Redundant Connection',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [1, 2],
      [0, 2],
    ] as Edge[]);
    const n = edges.reduce((m, [u, v]) => Math.max(m, u, v), 0) + 1;
    const recorder = createStepRecorder({ time: 'O(E · α(n))', space: 'O(n)' });
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));

    recorder.push({
      action: 'initialize',
      description: 'The redundant edge is the first one connecting two already-joined vertices',
      visualizationData: { edges: edges.map((e) => [...e]) },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    let answer: [number, number] | null = null;
    for (const [u, v] of edges) {
      const ru = find(u);
      const rv = find(v);
      if (ru === rv) {
        answer = [u, v];
        recorder.push({
          action: 'found',
          description: `Edge ${u}—${v} is redundant`,
          visualizationData: { redundant: [u, v] },
          highlights: [u, v],
          variables: { redundant: [u, v] },
          memory: { parent: [...parent] },
          codeLine: 2,
        });
        break;
      }
      parent[ru] = rv;
      recorder.push({
        action: 'insert',
        description: `Union ${u}—${v}`,
        visualizationData: { parent: [...parent], edge: [u, v] },
        highlights: [u, v],
        memory: { parent: [...parent] },
        codeLine: 3,
      });
    }

    if (!answer) {
      recorder.push({
        action: 'not-found',
        description: 'No redundant edge found',
        visualizationData: {},
        memory: {},
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(E · α(n))', space: 'O(n)' },
  'Finds the extra edge that turns a tree into a graph with one cycle.'
);

export const dynamicConnectivity = createDSAlgorithm(
  'Dynamic Connectivity',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(α(n)) per op', space: 'O(n)' });
    const ops = ['union:0,1', 'query:0,1', 'union:2,3', 'query:1,3', 'union:1,2', 'query:0,3'];
    const parent = [0, 1, 2, 3];
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));

    recorder.push({
      action: 'initialize',
      description: 'Process an online stream of union and connectivity queries',
      visualizationData: { parent: [...parent] },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    ops.forEach((op) => {
      const [kind, raw] = op.split(':');
      const [a, b] = raw.split(',').map(Number);
      if (kind === 'union') {
        parent[find(a)] = find(b);
        recorder.push({
          action: 'insert',
          description: `union(${a}, ${b})`,
          visualizationData: { parent: [...parent], op },
          highlights: [a, b],
          memory: { parent: [...parent] },
          codeLine: 2,
        });
      } else {
        const connected = find(a) === find(b);
        recorder.push({
          action: connected ? 'found' : 'not-found',
          description: `query(${a}, ${b}) → ${connected ? 'connected' : 'separate'}`,
          visualizationData: { parent: [...parent], connected },
          highlights: [a, b],
          variables: { connected },
          memory: { parent: [...parent] },
          codeLine: 3,
        });
      }
    });

    return recorder.steps;
  },
  { time: 'O(α(n)) per op', space: 'O(n)' },
  'Answers a stream of union/connectivity operations efficiently.'
);

export const dsuAdvancedAlgorithms = [kruskalMst, accountsMerge, redundantConnection, dynamicConnectivity] as const;
