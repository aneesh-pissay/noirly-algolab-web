import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';
import { Edge, getGraphEdges, getVertexCount } from '../helpers';

const WEIGHTED: Edge[] = [
  [0, 1, 4],
  [0, 2, 1],
  [2, 1, 2],
  [1, 3, 1],
  [2, 3, 5],
];

function buildWeighted(vertices: number, edges: Edge[], directed = false): Map<number, Array<[number, number]>> {
  const adj = new Map<number, Array<[number, number]>>();
  for (let i = 0; i < vertices; i += 1) adj.set(i, []);
  edges.forEach(([u, v, w]) => {
    adj.get(u)?.push([v, w ?? 1]);
    if (!directed) adj.get(v)?.push([u, w ?? 1]);
  });
  return adj;
}

export const dijkstraAlgorithm = createDSAlgorithm(
  'Dijkstra Algorithm',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const adj = buildWeighted(vertices, edges);
    const start = getNumber(input, 'start', 0);
    const recorder = createStepRecorder({ time: 'O((V + E) log V)', space: 'O(V)' });
    const dist = new Array(vertices).fill(Infinity);
    dist[start] = 0;
    const done = new Set<number>();

    recorder.push({
      action: 'initialize',
      description: `Dijkstra from ${start}; all distances ∞ except source = 0`,
      visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)) },
      memory: {},
      codeLine: 1,
    });

    for (let iter = 0; iter < vertices; iter += 1) {
      let u = -1;
      let best = Infinity;
      for (let i = 0; i < vertices; i += 1) {
        if (!done.has(i) && dist[i] < best) {
          best = dist[i];
          u = i;
        }
      }
      if (u === -1) break;
      done.add(u);
      (adj.get(u) ?? []).forEach(([v, w]) => {
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
        }
      });
      recorder.push({
        action: 'calculate',
        description: `Settle vertex ${u} (dist ${best}); relax its edges`,
        visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)), settled: [...done], current: u },
        highlights: [u],
        variables: { current: u, dist: dist.map((d) => (d === Infinity ? null : d)) },
        memory: { dist: dist.map((d) => (d === Infinity ? null : d)) },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Shortest distances: [${dist.map((d) => (d === Infinity ? '∞' : d)).join(', ')}]`,
      visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)) },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O((V + E) log V)', space: 'O(V)' },
  'Computes single-source shortest paths with non-negative weights.'
);

export const bellmanFord = createDSAlgorithm(
  'Bellman Ford',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const start = getNumber(input, 'start', 0);
    const recorder = createStepRecorder({ time: 'O(V · E)', space: 'O(V)' });
    const dist = new Array(vertices).fill(Infinity);
    dist[start] = 0;

    recorder.push({
      action: 'initialize',
      description: `Bellman-Ford from ${start}; relax all edges V−1 times`,
      visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)) },
      memory: {},
      codeLine: 1,
    });

    for (let pass = 1; pass < vertices; pass += 1) {
      let changed = false;
      edges.forEach(([u, v, w]) => {
        const weight = w ?? 1;
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          changed = true;
        }
        if (dist[v] + weight < dist[u]) {
          dist[u] = dist[v] + weight;
          changed = true;
        }
      });
      recorder.push({
        action: 'calculate',
        description: `Pass ${pass}: ${changed ? 'distances updated' : 'no change (early stop possible)'}`,
        visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)), pass },
        variables: { pass, changed },
        memory: { dist: dist.map((d) => (d === Infinity ? null : d)) },
        codeLine: 2,
      });
      if (!changed) break;
    }

    recorder.push({
      action: 'found',
      description: 'Final distances computed; a further relaxation would signal a negative cycle',
      visualizationData: { dist: dist.map((d) => (d === Infinity ? null : d)) },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(V · E)', space: 'O(V)' },
  'Shortest paths that also handles negative edge weights.'
);

export const floydWarshall = createDSAlgorithm(
  'Floyd Warshall',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const recorder = createStepRecorder({ time: 'O(V^3)', space: 'O(V^2)' });
    const INF = Infinity;
    const dist = Array.from({ length: vertices }, (_, i) =>
      Array.from({ length: vertices }, (_, j) => (i === j ? 0 : INF))
    );
    edges.forEach(([u, v, w]) => {
      dist[u][v] = Math.min(dist[u][v], w ?? 1);
      dist[v][u] = Math.min(dist[v][u], w ?? 1);
    });

    recorder.push({
      action: 'initialize',
      description: 'All-pairs shortest paths via intermediate vertex k',
      visualizationData: { matrix: dist.map((r) => r.map((d) => (d === INF ? null : d))) },
      memory: {},
      codeLine: 1,
    });

    for (let k = 0; k < vertices; k += 1) {
      for (let i = 0; i < vertices; i += 1) {
        for (let j = 0; j < vertices; j += 1) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
      recorder.push({
        action: 'calculate',
        description: `Allow paths through vertex ${k}`,
        visualizationData: { matrix: dist.map((r) => r.map((d) => (d === INF ? null : d))), k },
        variables: { k },
        memory: {},
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(V^3)', space: 'O(V^2)' },
  'Computes shortest paths between all pairs of vertices.'
);

export const aStarSearch = createDSAlgorithm(
  'A* Search',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const adj = buildWeighted(vertices, edges);
    const start = getNumber(input, 'start', 0);
    const goal = getNumber(input, 'goal', 3);
    const recorder = createStepRecorder({ time: 'O(E log V)', space: 'O(V)' });
    const g = new Array(vertices).fill(Infinity);
    g[start] = 0;
    const h = (n: number) => Math.abs(goal - n); // simple admissible heuristic
    const open = new Set<number>([start]);
    const closed = new Set<number>();

    recorder.push({
      action: 'initialize',
      description: `A* from ${start} to ${goal}; f(n) = g(n) + h(n)`,
      visualizationData: { g: g.map((d) => (d === Infinity ? null : d)), goal },
      memory: {},
      codeLine: 1,
    });

    while (open.size > 0) {
      let current = -1;
      let bestF = Infinity;
      open.forEach((n) => {
        const f = g[n] + h(n);
        if (f < bestF) {
          bestF = f;
          current = n;
        }
      });
      open.delete(current);
      closed.add(current);
      recorder.push({
        action: 'calculate',
        description: `Expand ${current} with f = ${bestF === Infinity ? '∞' : bestF}`,
        visualizationData: { g: g.map((d) => (d === Infinity ? null : d)), current, open: [...open] },
        highlights: [current],
        variables: { current, f: bestF },
        memory: {},
        codeLine: 2,
      });
      if (current === goal) {
        recorder.push({
          action: 'found',
          description: `Reached goal ${goal} with cost ${g[goal]}`,
          visualizationData: { cost: g[goal], goal },
          variables: { cost: g[goal] },
          memory: {},
          codeLine: 3,
        });
        break;
      }
      (adj.get(current) ?? []).forEach(([v, w]) => {
        if (closed.has(v)) return;
        if (g[current] + w < g[v]) {
          g[v] = g[current] + w;
          open.add(v);
        }
      });
    }

    return recorder.steps;
  },
  { time: 'O(E log V)', space: 'O(V)' },
  'Heuristic-guided shortest path search.'
);

export const primAlgorithm = createDSAlgorithm(
  'Prim Algorithm',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const adj = buildWeighted(vertices, edges);
    const recorder = createStepRecorder({ time: 'O(E log V)', space: 'O(V)' });
    const inMST = new Set<number>([0]);
    let totalWeight = 0;
    const mst: Array<[number, number, number]> = [];

    recorder.push({
      action: 'initialize',
      description: 'Grow an MST from vertex 0, always adding the cheapest crossing edge',
      visualizationData: { inMST: [...inMST], mst: [] },
      memory: {},
      codeLine: 1,
    });

    while (inMST.size < vertices) {
      let best: [number, number, number] | null = null;
      inMST.forEach((u) => {
        (adj.get(u) ?? []).forEach(([v, w]) => {
          if (!inMST.has(v) && (best === null || w < best[2])) best = [u, v, w];
        });
      });
      if (!best) break;
      const [u, v, w] = best as [number, number, number];
      inMST.add(v);
      totalWeight += w;
      mst.push([u, v, w]);
      recorder.push({
        action: 'insert',
        description: `Add edge ${u} — ${v} (weight ${w}); MST weight = ${totalWeight}`,
        visualizationData: { inMST: [...inMST], mst: mst.map((e) => [...e]), totalWeight },
        highlights: [u, v],
        variables: { totalWeight },
        memory: { mst: mst.map((e) => [...e]) },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(E log V)', space: 'O(V)' },
  'Builds a minimum spanning tree by growing from one vertex.'
);

export const kruskalAlgorithm = createDSAlgorithm(
  'Kruskal Algorithm',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, WEIGHTED);
    const vertices = getVertexCount(input, edges, 4);
    const recorder = createStepRecorder({ time: 'O(E log E)', space: 'O(V)' });
    const parent = Array.from({ length: vertices }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const sorted = [...edges].sort((a, b) => (a[2] ?? 1) - (b[2] ?? 1));
    let totalWeight = 0;
    const mst: Array<[number, number, number]> = [];

    recorder.push({
      action: 'initialize',
      description: 'Sort edges by weight; add an edge if it joins two different components',
      visualizationData: { sortedEdges: sorted.map((e) => [...e]), mst: [] },
      memory: {},
      codeLine: 1,
    });

    sorted.forEach(([u, v, w]) => {
      const weight = w ?? 1;
      const ru = find(u);
      const rv = find(v);
      if (ru !== rv) {
        parent[ru] = rv;
        totalWeight += weight;
        mst.push([u, v, weight]);
        recorder.push({
          action: 'insert',
          description: `Add ${u} — ${v} (${weight}); union components`,
          visualizationData: { mst: mst.map((e) => [...e]), totalWeight, edge: [u, v] },
          highlights: [u, v],
          variables: { totalWeight },
          memory: { mst: mst.map((e) => [...e]) },
          codeLine: 2,
        });
      } else {
        recorder.push({
          action: 'compare',
          description: `Skip ${u} — ${v}: same component → would form a cycle`,
          visualizationData: { edge: [u, v] },
          variables: { skipped: [u, v] },
          memory: {},
          codeLine: 3,
        });
      }
    });

    return recorder.steps;
  },
  { time: 'O(E log E)', space: 'O(V)' },
  'Builds an MST by adding cheapest cycle-free edges using union-find.'
);

export const graphAdvancedAlgorithms = [
  dijkstraAlgorithm,
  bellmanFord,
  floydWarshall,
  aStarSearch,
  primAlgorithm,
  kruskalAlgorithm,
] as const;
