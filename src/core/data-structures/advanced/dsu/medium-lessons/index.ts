import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder } from '../../../_shared/helpers';
import { Edge, getGraphEdges } from '../../graph/helpers';

export const pathCompression = createDSAlgorithm(
  'Path Compression',
  (): AlgorithmStep[] => {
    const parent = [1, 2, 3, 4, 4];
    const recorder = createStepRecorder({ time: 'O(α(n))', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: 'find(0) walks a long chain 0→1→2→3→4, then points everything to the root',
      visualizationData: { parent: [...parent] },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    const path: number[] = [];
    let cur = 0;
    while (parent[cur] !== cur) {
      path.push(cur);
      recorder.push({
        action: 'move-pointer',
        description: `Traverse ${cur} → ${parent[cur]}`,
        visualizationData: { parent: [...parent], current: cur, path: [...path] },
        highlights: [cur],
        memory: { parent: [...parent] },
        codeLine: 2,
      });
      cur = parent[cur];
    }

    path.forEach((node) => (parent[node] = cur));
    recorder.push({
      action: 'place',
      description: `Compress path: point ${path.join(', ')} directly to root ${cur}`,
      visualizationData: { parent: [...parent], root: cur },
      memory: { parent: [...parent] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(α(n))', space: 'O(1)' },
  'Flattens the find path so future queries are near O(1).'
);

export const unionByRank = createDSAlgorithm(
  'Union By Rank',
  (): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(α(n))', space: 'O(n)' });
    const parent = [0, 1, 2, 3];
    const rank = [1, 0, 2, 0];

    recorder.push({
      action: 'initialize',
      description: 'Attach the shorter tree under the taller one to keep height low',
      visualizationData: { parent: [...parent], rank: [...rank] },
      memory: { parent: [...parent], rank: [...rank] },
      codeLine: 1,
    });

    const a = 0;
    const b = 2;
    if (rank[a] < rank[b]) {
      parent[a] = b;
    } else if (rank[a] > rank[b]) {
      parent[b] = a;
    } else {
      parent[b] = a;
      rank[a] += 1;
    }

    recorder.push({
      action: 'insert',
      description: `union(${a}, ${b}): rank[${a}]=${rank[a]} vs rank[${b}]=${rank[b]} → attach smaller under larger`,
      visualizationData: { parent: [...parent], rank: [...rank] },
      highlights: [a, b],
      memory: { parent: [...parent], rank: [...rank] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(α(n))', space: 'O(n)' },
  'Keeps trees shallow by uniting by subtree rank.'
);

export const detectCycleDsu = createDSAlgorithm(
  'Detect Cycle',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [1, 2],
      [2, 0],
    ] as Edge[]);
    const n = edges.reduce((m, [u, v]) => Math.max(m, u, v), 0) + 1;
    const recorder = createStepRecorder({ time: 'O(E · α(n))', space: 'O(n)' });
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    let cycle = false;

    recorder.push({
      action: 'initialize',
      description: 'For each edge, union endpoints; if they already share a root → cycle',
      visualizationData: { parent: [...parent], edges: edges.map((e) => [...e]) },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    for (const [u, v] of edges) {
      const ru = find(u);
      const rv = find(v);
      if (ru === rv) {
        cycle = true;
        recorder.push({
          action: 'found',
          description: `Edge ${u}—${v}: both in set ${ru} → cycle detected`,
          visualizationData: { parent: [...parent], edge: [u, v] },
          highlights: [u, v],
          variables: { cycle: true },
          memory: { parent: [...parent] },
          codeLine: 2,
        });
        break;
      }
      parent[ru] = rv;
      recorder.push({
        action: 'insert',
        description: `Edge ${u}—${v}: union sets ${ru} and ${rv}`,
        visualizationData: { parent: [...parent], edge: [u, v] },
        highlights: [u, v],
        memory: { parent: [...parent] },
        codeLine: 3,
      });
    }

    if (!cycle) {
      recorder.push({
        action: 'not-found',
        description: 'All edges processed without conflict → acyclic',
        visualizationData: { parent: [...parent] },
        variables: { cycle: false },
        memory: { parent: [...parent] },
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(E · α(n))', space: 'O(n)' },
  'Detects a cycle in an undirected graph using union-find.'
);

export const numberOfProvinces = createDSAlgorithm(
  'Number Of Provinces',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [2, 3],
    ] as Edge[]);
    const n = Math.max(4, edges.reduce((m, [u, v]) => Math.max(m, u, v), 0) + 1);
    const recorder = createStepRecorder({ time: 'O(n^2)', space: 'O(n)' });
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));

    recorder.push({
      action: 'initialize',
      description: 'Union directly-connected cities; provinces = number of distinct roots',
      visualizationData: { parent: [...parent] },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    edges.forEach(([u, v]) => {
      const ru = find(u);
      const rv = find(v);
      if (ru !== rv) parent[ru] = rv;
      recorder.push({
        action: 'insert',
        description: `Connect ${u} — ${v}`,
        visualizationData: { parent: [...parent], edge: [u, v] },
        highlights: [u, v],
        memory: { parent: [...parent] },
        codeLine: 2,
      });
    });

    const roots = new Set<number>();
    for (let i = 0; i < n; i += 1) roots.add(find(i));
    recorder.push({
      action: 'found',
      description: `Number of provinces = ${roots.size}`,
      visualizationData: { parent: [...parent], provinces: roots.size },
      variables: { provinces: roots.size },
      memory: { parent: [...parent] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n^2)', space: 'O(n)' },
  'Counts provinces (connected city groups) using union-find.'
);

export const dsuIntermediateAlgorithms = [pathCompression, unionByRank, detectCycleDsu, numberOfProvinces] as const;
