import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';
import { adjacencyToRecord, buildAdjacency, Edge, getGraphEdges, getVertexCount } from '../helpers';

const DEFAULT_EDGES: Edge[] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
];

export const breadthFirstSearch = createDSAlgorithm(
  'Breadth First Search (BFS)',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges);
    const start = getNumber(input, 'start', 0);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const visited = new Set<number>([start]);
    const order: number[] = [];
    const queue = [start];

    recorder.push({
      action: 'initialize',
      description: `BFS from ${start} using a queue`,
      visualizationData: { adjacency: adjacencyToRecord(adj), queue: [...queue], order: [] },
      memory: {},
      codeLine: 1,
    });

    while (queue.length > 0) {
      const node = queue.shift() as number;
      order.push(node);
      (adj.get(node) ?? []).forEach((n) => {
        if (!visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      });
      recorder.push({
        action: 'dequeue',
        description: `Dequeue ${node}, enqueue unvisited neighbors`,
        visualizationData: { adjacency: adjacencyToRecord(adj), queue: [...queue], order: [...order], current: node },
        highlights: [node],
        variables: { current: node },
        memory: { order: [...order] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Explores the graph level by level from a source.'
);

export const depthFirstSearch = createDSAlgorithm(
  'Depth First Search (DFS)',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges);
    const start = getNumber(input, 'start', 0);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const visited = new Set<number>();
    const order: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `DFS from ${start} using recursion/stack`,
      visualizationData: { adjacency: adjacencyToRecord(adj), order: [] },
      memory: {},
      codeLine: 1,
    });

    const dfs = (node: number): void => {
      visited.add(node);
      order.push(node);
      recorder.push({
        action: 'visit',
        description: `Visit ${node}, recurse into neighbors`,
        visualizationData: { adjacency: adjacencyToRecord(adj), order: [...order], current: node },
        highlights: [node],
        variables: { current: node },
        memory: { order: [...order] },
        codeLine: 2,
      });
      (adj.get(node) ?? []).forEach((n) => {
        if (!visited.has(n)) dfs(n);
      });
    };
    dfs(start);

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Explores as deep as possible before backtracking.'
);

export const detectCycleGraph = createDSAlgorithm(
  'Detect Cycle',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 3],
    ]);
    const vertices = getVertexCount(input, edges, 4);
    const adj = buildAdjacency(vertices, edges);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const visited = new Set<number>();
    let cycle = false;

    recorder.push({
      action: 'initialize',
      description: 'DFS tracking parents; a visited non-parent neighbor implies a cycle',
      visualizationData: { adjacency: adjacencyToRecord(adj) },
      memory: {},
      codeLine: 1,
    });

    const dfs = (node: number, parent: number): void => {
      visited.add(node);
      for (const n of adj.get(node) ?? []) {
        if (!visited.has(n)) {
          recorder.push({
            action: 'visit',
            description: `Tree edge ${node} → ${n}`,
            visualizationData: { adjacency: adjacencyToRecord(adj), current: node, neighbor: n },
            highlights: [node, n],
            memory: {},
            codeLine: 2,
          });
          dfs(n, node);
        } else if (n !== parent && !cycle) {
          cycle = true;
          recorder.push({
            action: 'found',
            description: `Back edge ${node} → ${n} detected → cycle exists`,
            visualizationData: { adjacency: adjacencyToRecord(adj), backEdge: [node, n] },
            highlights: [node, n],
            variables: { cycle: true },
            memory: {},
            codeLine: 3,
          });
        }
      }
    };
    for (let i = 0; i < vertices; i += 1) if (!visited.has(i)) dfs(i, -1);

    if (!cycle) {
      recorder.push({
        action: 'not-found',
        description: 'No back edges found → acyclic',
        visualizationData: { adjacency: adjacencyToRecord(adj) },
        variables: { cycle: false },
        memory: {},
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Detects cycles in an undirected graph via DFS back edges.'
);

export const connectedComponents = createDSAlgorithm(
  'Connected Components',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [2, 3],
      [4, 4],
    ]);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const visited = new Set<number>();
    let count = 0;

    recorder.push({
      action: 'initialize',
      description: 'Run DFS from each unvisited vertex; each launch is a new component',
      visualizationData: { adjacency: adjacencyToRecord(adj), components: 0 },
      memory: {},
      codeLine: 1,
    });

    const dfs = (node: number): void => {
      visited.add(node);
      (adj.get(node) ?? []).forEach((n) => {
        if (!visited.has(n)) dfs(n);
      });
    };

    for (let i = 0; i < vertices; i += 1) {
      if (!visited.has(i)) {
        count += 1;
        dfs(i);
        recorder.push({
          action: 'count',
          description: `New component #${count} starting at ${i}`,
          visualizationData: { adjacency: adjacencyToRecord(adj), components: count, root: i },
          highlights: [i],
          variables: { components: count },
          memory: { visited: [...visited] },
          codeLine: 2,
        });
      }
    }

    recorder.push({
      action: 'found',
      description: `Total connected components = ${count}`,
      visualizationData: { components: count },
      variables: { components: count },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Counts connected components by repeated DFS.'
);

export const numberOfIslands = createDSAlgorithm(
  'Number Of Islands',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const grid =
      Array.isArray(input.grid) && (input.grid as unknown[]).every((r) => Array.isArray(r))
        ? (input.grid as number[][]).map((r) => [...r])
        : [
            [1, 1, 0, 0],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
          ];
    const recorder = createStepRecorder({ time: 'O(R · C)', space: 'O(R · C)' });
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;
    const seen = grid.map((r) => r.map(() => false));
    let islands = 0;

    recorder.push({
      action: 'initialize',
      description: 'Flood-fill each unvisited land cell; each fill is one island',
      visualizationData: { grid: grid.map((r) => [...r]), islands: 0 },
      memory: {},
      codeLine: 1,
    });

    const fill = (r: number, c: number): void => {
      if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] === 0) return;
      seen[r][c] = true;
      fill(r + 1, c);
      fill(r - 1, c);
      fill(r, c + 1);
      fill(r, c - 1);
    };

    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (grid[r][c] === 1 && !seen[r][c]) {
          islands += 1;
          fill(r, c);
          recorder.push({
            action: 'count',
            description: `Found island #${islands} at (${r}, ${c})`,
            visualizationData: { grid: grid.map((row) => [...row]), islands, cell: [r, c] },
            variables: { islands },
            memory: {},
            codeLine: 2,
          });
        }
      }
    }

    recorder.push({
      action: 'found',
      description: `Total islands = ${islands}`,
      visualizationData: { islands },
      variables: { islands },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(R · C)', space: 'O(R · C)' },
  'Counts islands in a grid using flood-fill DFS.'
);

export const topologicalSort = createDSAlgorithm(
  'Topological Sort',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
    ]);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges, true);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const indegree = new Array(vertices).fill(0);
    edges.forEach(([, v]) => (indegree[v] += 1));
    const order: number[] = [];
    const queue: number[] = [];
    for (let i = 0; i < vertices; i += 1) if (indegree[i] === 0) queue.push(i);

    recorder.push({
      action: 'initialize',
      description: "Kahn's algorithm: start with all zero-indegree vertices",
      visualizationData: { indegree: [...indegree], queue: [...queue], order: [] },
      memory: {},
      codeLine: 1,
    });

    while (queue.length > 0) {
      const node = queue.shift() as number;
      order.push(node);
      (adj.get(node) ?? []).forEach((n) => {
        indegree[n] -= 1;
        if (indegree[n] === 0) queue.push(n);
      });
      recorder.push({
        action: 'visit',
        description: `Output ${node}; decrement neighbors' indegree`,
        visualizationData: { indegree: [...indegree], queue: [...queue], order: [...order], current: node },
        highlights: [node],
        variables: { current: node },
        memory: { order: [...order] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Topological order: [${order.join(', ')}]`,
      visualizationData: { order: [...order] },
      variables: { order },
      memory: { order: [...order] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Orders a DAG so every edge points forward (Kahn’s algorithm).'
);

export const graphIntermediateAlgorithms = [
  breadthFirstSearch,
  depthFirstSearch,
  detectCycleGraph,
  connectedComponents,
  numberOfIslands,
  topologicalSort,
] as const;
