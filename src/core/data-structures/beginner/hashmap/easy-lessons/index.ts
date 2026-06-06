import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import {
  createHashMapAlgorithm,
  createStepRecorder,
  getNumber,
  getString,
  mapToRecord,
} from './helpers';

function seedMap(input: AlgorithmInput): Map<string, number> {
  const map = new Map<string, number>();
  const defaultEntries: Array<[string, number]> = [
    ['apple', 1],
    ['banana', 2],
  ];
  const entries = Array.isArray(input.entries) ? (input.entries as Array<[string, number]>) : defaultEntries;
  entries.forEach(([key, value]) => map.set(String(key), Number(value)));
  return map;
}

function oneStep(
  name: string,
  description: string,
  mutator: (map: Map<string, number>, input: AlgorithmInput) => Record<string, unknown>,
  complexity = { time: 'O(1)', space: 'O(1)' }
) {
  return createHashMapAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const map = seedMap(input);
      const recorder = createStepRecorder(complexity);
      const details = mutator(map, input);
      recorder.push({
        action: 'visit',
        description,
        visualizationData: { map: mapToRecord(map), ...details },
        variables: details,
        memory: { map: mapToRecord(map) },
        codeLine: 1,
      });
      return recorder.steps;
    },
    complexity,
    description
  );
}

export const hashMapBasics = createHashMapAlgorithm(
  'HashMap Basics',
  (input: AlgorithmInput) => {
    const map = seedMap(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      action: 'visit',
      description: 'HashMap stores key-value pairs for near constant-time access',
      visualizationData: { map: mapToRecord(map), keys: Array.from(map.keys()) },
      variables: { size: map.size },
      memory: { map: mapToRecord(map) },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Introduces hashmap structure, keys, values, and lookup behavior.'
);

export const createHashMap = oneStep(
  'Create HashMap',
  'Create a new hashmap from initial entries',
  (map) => ({ created: true, size: map.size }),
  { time: 'O(n)', space: 'O(n)' }
);

export const insertKeyValue = oneStep(
  'Insert Key',
  'Insert key-value pair into hashmap',
  (map, input) => {
    const key = getString(input, 'key', 'orange');
    const value = getNumber(input, 'value', 5);
    map.set(key, value);
    return { key, value, size: map.size };
  }
);

export const getValueByKey = oneStep(
  'Lookup Key',
  'Retrieve value by key from hashmap',
  (map, input) => {
    const key = getString(input, 'key', 'banana');
    const value = map.get(key) ?? null;
    return { key, value, found: value !== null };
  }
);

export const updateValue = oneStep(
  'Update Value',
  'Update existing key with new value',
  (map, input) => {
    const key = getString(input, 'key', 'banana');
    const value = getNumber(input, 'value', 7);
    map.set(key, value);
    return { key, value, updated: true };
  }
);

export const deleteKey = oneStep(
  'Delete Key',
  'Delete key from hashmap',
  (map, input) => {
    const key = getString(input, 'key', 'apple');
    const deleted = map.delete(key);
    return { key, deleted, size: map.size };
  }
);

export const checkKeyExists = oneStep(
  'Check Key Exists',
  'Check if key exists in hashmap',
  (map, input) => {
    const key = getString(input, 'key', 'apple');
    const exists = map.has(key);
    return { key, exists };
  }
);

export const iterateHashMap = createHashMapAlgorithm(
  'Iterate HashMap',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const map = seedMap(input);
    const entries = Array.from(map.entries());
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    entries.forEach(([key, value], index) => {
      recorder.push({
        action: 'traverse',
        description: `Visit entry ${index}: ${key} -> ${value}`,
        visualizationData: { map: mapToRecord(map), index, key, value },
        highlights: [index],
        variables: { index, key, value },
        memory: { current: `${key}:${value}` },
        codeLine: 1,
      });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Traverses all hashmap entries.'
);

export const hashMapSize = oneStep(
  'HashMap Size',
  'Read hashmap size',
  (map) => ({ size: map.size })
);

export const hashMapBeginnerAlgorithms = [
  hashMapBasics,
  createHashMap,
  insertKeyValue,
  getValueByKey,
  updateValue,
  deleteKey,
  checkKeyExists,
  iterateHashMap,
  hashMapSize,
] as const;
