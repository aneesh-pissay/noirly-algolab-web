import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber } from '../../../_shared/helpers';

function getN(input: AlgorithmInput, fallback: number): number {
  return Math.max(1, Math.trunc(getNumber(input, 'n', fallback)));
}

export const createDsu = createDSAlgorithm(
  'Create DSU',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = getN(input, 6);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const parent = Array.from({ length: n }, (_, i) => i);

    recorder.push({
      action: 'initialize',
      description: `Initialize ${n} singleton sets — each element is its own parent`,
      visualizationData: { parent: [...parent] },
      variables: { n },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    parent.forEach((p, i) => {
      recorder.push({
        action: 'visit',
        description: `parent[${i}] = ${p} (rank 0)`,
        visualizationData: { parent: [...parent], current: i },
        highlights: [i],
        variables: { index: i },
        memory: { parent: [...parent] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Initializes a disjoint-set forest of singletons.'
);

export const findOperation = createDSAlgorithm(
  'Find Operation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const parent = [0, 0, 1, 2, 4, 4];
    const target = getNumber(input, 'x', 3);
    const recorder = createStepRecorder({ time: 'O(α(n))', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `find(${target}): follow parent links up to the root`,
      visualizationData: { parent: [...parent], target },
      variables: { target },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    let cur = target;
    while (parent[cur] !== cur) {
      recorder.push({
        action: 'move-pointer',
        description: `parent[${cur}] = ${parent[cur]} → climb`,
        visualizationData: { parent: [...parent], current: cur },
        highlights: [cur],
        variables: { current: cur },
        memory: { parent: [...parent] },
        codeLine: 2,
      });
      cur = parent[cur];
    }

    recorder.push({
      action: 'found',
      description: `Root of ${target} is ${cur}`,
      visualizationData: { parent: [...parent], root: cur },
      variables: { root: cur },
      memory: { parent: [...parent] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(α(n))', space: 'O(1)' },
  'Finds the representative root of an element.'
);

export const unionOperation = createDSAlgorithm(
  'Union Operation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const n = getN(input, 6);
    const a = getNumber(input, 'a', 1);
    const b = getNumber(input, 'b', 3);
    const recorder = createStepRecorder({ time: 'O(α(n))', space: 'O(1)' });
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));

    recorder.push({
      action: 'initialize',
      description: `union(${a}, ${b}): attach one root under the other`,
      visualizationData: { parent: [...parent], a, b },
      variables: { a, b },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      recorder.push({
        action: 'insert',
        description: `Roots ${ra} and ${rb} differ → parent[${ra}] = ${rb}`,
        visualizationData: { parent: [...parent], merged: [ra, rb] },
        highlights: [ra, rb],
        memory: { parent: [...parent] },
        codeLine: 2,
      });
    } else {
      recorder.push({
        action: 'compare',
        description: `Already in the same set (root ${ra})`,
        visualizationData: { parent: [...parent] },
        memory: { parent: [...parent] },
        codeLine: 3,
      });
    }

    return recorder.steps;
  },
  { time: 'O(α(n))', space: 'O(1)' },
  'Merges the sets containing two elements.'
);

export const connectedCheck = createDSAlgorithm(
  'Connected Check',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const parent = [0, 0, 0, 3, 3];
    const a = getNumber(input, 'a', 1);
    const b = getNumber(input, 'b', 4);
    const recorder = createStepRecorder({ time: 'O(α(n))', space: 'O(1)' });
    const find = (x: number): number => {
      let c = x;
      while (parent[c] !== c) c = parent[c];
      return c;
    };

    recorder.push({
      action: 'initialize',
      description: `connected(${a}, ${b})? Compare their roots`,
      visualizationData: { parent: [...parent], a, b },
      variables: { a, b },
      memory: { parent: [...parent] },
      codeLine: 1,
    });

    const ra = find(a);
    const rb = find(b);
    recorder.push({
      action: ra === rb ? 'found' : 'not-found',
      description: ra === rb ? `Same root ${ra} → connected` : `Roots ${ra} ≠ ${rb} → not connected`,
      visualizationData: { parent: [...parent], rootA: ra, rootB: rb, connected: ra === rb },
      variables: { connected: ra === rb },
      memory: { parent: [...parent] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(α(n))', space: 'O(1)' },
  'Checks whether two elements share the same set.'
);

export const dsuBeginnerAlgorithms = [createDsu, findOperation, unionOperation, connectedCheck] as const;
