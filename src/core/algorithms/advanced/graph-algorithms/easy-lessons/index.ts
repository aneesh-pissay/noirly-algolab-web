import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';

import { createAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';



function defaultGraph(): number[][] {

  return [

    [1, 2],

    [0, 2, 3],

    [0, 1],

    [1],

  ];

}



export const graphBFS = createAlgorithm(

  'BFS',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const adj = defaultGraph();

    const start = Math.trunc(getNumber(input, 'start', 0));

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const visited = new Set<number>();

    const order: number[] = [];

    const queue = [start];



    recorder.push({ action: 'initialize', description: `BFS from node ${start}`, visualizationData: { adj, start }, memory: {}, codeLine: 1 });



    while (queue.length) {

      const node = queue.shift()!;

      if (visited.has(node)) continue;

      visited.add(node);

      order.push(node);

      recorder.push({ action: 'visit', description: `Visit node ${node}`, visualizationData: { node, order: [...order] }, highlights: [node], memory: { order: [...order] }, codeLine: 2 });

      for (const nei of adj[node] ?? []) {

        if (!visited.has(nei)) {

          queue.push(nei);

          recorder.push({ action: 'enqueue', description: `Enqueue neighbor ${nei}`, visualizationData: { nei, queue: [...queue] }, memory: {}, codeLine: 3 });

        }

      }

    }

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Breadth-first search on an adjacency-list graph.'

);



export const graphDFS = createAlgorithm(

  'DFS',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const adj = defaultGraph();

    const start = Math.trunc(getNumber(input, 'start', 0));

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const visited = new Set<number>();

    const order: number[] = [];



    recorder.push({ action: 'initialize', description: `DFS from node ${start}`, visualizationData: { adj, start }, memory: {}, codeLine: 1 });



    const dfs = (node: number): void => {

      visited.add(node);

      order.push(node);

      recorder.push({ action: 'visit', description: `Visit node ${node}`, visualizationData: { node, order: [...order] }, highlights: [node], memory: { order: [...order] }, codeLine: 2 });

      for (const nei of adj[node] ?? []) {

        if (!visited.has(nei)) dfs(nei);

      }

    };

    dfs(start);

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Depth-first search on an adjacency-list graph.'

);



export const connectedComponents = createAlgorithm(

  'Connected Components',

  'graph',

  (input: AlgorithmInput): AlgorithmStep[] => {

    const adj = [

      [1],

      [0, 2],

      [1],

      [4],

      [3],

    ];

    const recorder = createStepRecorder('graph', { time: 'O(V + E)', space: 'O(V)' });

    const visited = new Set<number>();

    let components = 0;



    recorder.push({ action: 'initialize', description: 'DFS each unvisited node to count components', visualizationData: { adj }, memory: {}, codeLine: 1 });



    const dfs = (node: number, comp: number): void => {

      visited.add(node);

      recorder.push({ action: 'visit', description: `Component ${comp}: visit ${node}`, visualizationData: { node, comp }, highlights: [node], memory: {}, codeLine: 2 });

      for (const nei of adj[node] ?? []) if (!visited.has(nei)) dfs(nei, comp);

    };



    for (let i = 0; i < adj.length; i += 1) {

      if (!visited.has(i)) {

        components += 1;

        dfs(i, components);

        recorder.push({ action: 'found', description: `Finished component ${components}`, visualizationData: { components }, variables: { components }, memory: {}, codeLine: 3 });

      }

    }

    recorder.push({ action: 'found', description: `Total components = ${components}`, visualizationData: { components }, memory: {}, codeLine: 4 });

    return recorder.steps;

  },

  { time: 'O(V + E)', space: 'O(V)' },

  'Counts connected components via repeated DFS.'

);



export const graphAlgorithmsAdvancedEasyAlgorithms = [graphBFS, graphDFS, connectedComponents] as const;


