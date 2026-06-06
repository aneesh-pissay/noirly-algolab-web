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

export const createGraph = createDSAlgorithm(
  'Create Graph',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V + E)' });

    recorder.push({
      action: 'initialize',
      description: `Create a graph with ${vertices} vertices and ${edges.length} edges`,
      visualizationData: { vertices, edges: edges.map((e) => [...e]) },
      variables: { vertices, edgeCount: edges.length },
      memory: {},
      codeLine: 1,
    });

    edges.forEach(([u, v]) => {
      recorder.push({
        action: 'insert',
        description: `Register edge ${u} — ${v}`,
        visualizationData: { vertices, edge: [u, v] },
        variables: { u, v },
        memory: {},
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V + E)' },
  'Creates a graph from a vertex count and edge list.'
);

export const addVertex = createDSAlgorithm(
  'Add Vertex',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Graph currently has ${vertices} vertices`,
      visualizationData: { vertices },
      variables: { vertices },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: `Add vertex ${vertices} with an empty adjacency list`,
      visualizationData: { vertices: vertices + 1, added: vertices },
      variables: { vertices: vertices + 1 },
      memory: {},
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Adds a new isolated vertex to the graph.'
);

export const addEdge = createDSAlgorithm(
  'Add Edge',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const u = getNumber(input, 'u', 1);
    const v = getNumber(input, 'v', 4);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Add an undirected edge between ${u} and ${v}`,
      visualizationData: { vertices, edges: edges.map((e) => [...e]) },
      variables: { u, v },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'insert',
      description: `adj[${u}].push(${v}) and adj[${v}].push(${u})`,
      visualizationData: { vertices, edge: [u, v] },
      variables: { u, v },
      memory: {},
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Connects two vertices by updating adjacency lists.'
);

export const adjacencyList = createDSAlgorithm(
  'Adjacency List',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V + E)' });

    recorder.push({
      action: 'initialize',
      description: 'Represent the graph as adjacency lists',
      visualizationData: { adjacency: adjacencyToRecord(adj) },
      memory: { adjacency: adjacencyToRecord(adj) },
      codeLine: 1,
    });

    adj.forEach((neighbors, vertex) => {
      recorder.push({
        action: 'visit',
        description: `adj[${vertex}] = [${neighbors.join(', ')}]`,
        visualizationData: { adjacency: adjacencyToRecord(adj), current: vertex },
        highlights: [vertex],
        variables: { vertex, neighbors },
        memory: { adjacency: adjacencyToRecord(adj) },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V + E)' },
  'Builds and lists the adjacency-list representation.'
);

export const adjacencyMatrix = createDSAlgorithm(
  'Adjacency Matrix',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const recorder = createStepRecorder({ time: 'O(V^2)', space: 'O(V^2)' });
    const matrix = Array.from({ length: vertices }, () => new Array(vertices).fill(0));
    edges.forEach(([u, v]) => {
      matrix[u][v] = 1;
      matrix[v][u] = 1;
    });

    recorder.push({
      action: 'initialize',
      description: `Build a ${vertices}×${vertices} adjacency matrix`,
      visualizationData: { matrix: matrix.map((r) => [...r]) },
      memory: { matrix: matrix.map((r) => [...r]) },
      codeLine: 1,
    });

    edges.forEach(([u, v]) => {
      recorder.push({
        action: 'insert',
        description: `Set matrix[${u}][${v}] = matrix[${v}][${u}] = 1`,
        visualizationData: { matrix: matrix.map((r) => [...r]), edge: [u, v] },
        variables: { u, v },
        memory: { matrix: matrix.map((r) => [...r]) },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(V^2)', space: 'O(V^2)' },
  'Builds the adjacency-matrix representation.'
);

export const graphTraversalBasics = createDSAlgorithm(
  'Graph Traversal Basics',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const edges = getGraphEdges(input, DEFAULT_EDGES);
    const vertices = getVertexCount(input, edges, 5);
    const adj = buildAdjacency(vertices, edges);
    const recorder = createStepRecorder({ time: 'O(V + E)', space: 'O(V)' });
    const visited = new Set<number>();

    recorder.push({
      action: 'initialize',
      description: 'Traversal visits each vertex once, tracking a visited set',
      visualizationData: { adjacency: adjacencyToRecord(adj), visited: [] },
      memory: {},
      codeLine: 1,
    });

    const stack = [0];
    while (stack.length > 0) {
      const node = stack.pop() as number;
      if (visited.has(node)) continue;
      visited.add(node);
      (adj.get(node) ?? []).forEach((n) => {
        if (!visited.has(n)) stack.push(n);
      });
      recorder.push({
        action: 'visit',
        description: `Visit ${node}; mark visited and queue unseen neighbors`,
        visualizationData: { adjacency: adjacencyToRecord(adj), visited: [...visited], current: node },
        highlights: [node],
        variables: { current: node },
        memory: { visited: [...visited] },
        codeLine: 2,
      });
    }

    return recorder.steps;
  },
  { time: 'O(V + E)', space: 'O(V)' },
  'Demonstrates visiting every vertex while avoiding repeats.'
);

export const graphBeginnerAlgorithms = [
  createGraph,
  addVertex,
  addEdge,
  adjacencyList,
  adjacencyMatrix,
  graphTraversalBasics,
] as const;
