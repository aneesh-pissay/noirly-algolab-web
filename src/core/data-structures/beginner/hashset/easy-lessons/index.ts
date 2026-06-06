import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { asRecord, createHashSetAlgorithm, createStepRecorder, getNumber, getNumberArray } from './helpers';

function seedSet(input: AlgorithmInput): Set<number> {
  return new Set(getNumberArray(input, 'array', [1, 2, 3, 2, 1]));
}

export const hashSetBasics = createHashSetAlgorithm(
  'HashSet Basics',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      description: 'HashSet stores unique values and supports near O(1) lookup',
      visualizationData: { set: asRecord(set), values: [...set.values()] },
      variables: { size: set.size },
      memory: { set: asRecord(set) },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Introduces unique-value behavior of hash sets.'
);

export const createHashSet = createHashSetAlgorithm(
  'Create HashSet',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const source = getNumberArray(input, 'array', [4, 4, 1, 2]);
    const set = new Set(source);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      description: 'Created set from array values',
      visualizationData: { source, set: asRecord(set) },
      variables: { sourceLength: source.length, uniqueLength: set.size },
      memory: { set: asRecord(set) },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Creates a hash set from input values.'
);

export const addElement = createHashSetAlgorithm(
  'Add Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const value = getNumber(input, 'value', 9);
    set.add(value);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'insert',
      description: `Added ${value} to set`,
      visualizationData: { set: asRecord(set), value },
      variables: { value, size: set.size },
      memory: { set: asRecord(set) },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Adds an element to hash set.'
);

export const removeElement = createHashSetAlgorithm(
  'Remove Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const value = getNumber(input, 'value', 2);
    const removed = set.delete(value);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'delete',
      description: `Remove ${value}: ${removed ? 'success' : 'not found'}`,
      visualizationData: { set: asRecord(set), value, removed },
      variables: { value, removed },
      memory: { set: asRecord(set) },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Removes an element from hash set.'
);

export const checkElementExists = createHashSetAlgorithm(
  'Contains Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const value = getNumber(input, 'value', 3);
    const exists = set.has(value);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'search',
      description: `Check ${value} in set: ${exists}`,
      visualizationData: { set: asRecord(set), value, exists },
      variables: { value, exists },
      memory: { exists },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Checks whether an element exists in the hash set.'
);

export const iterateHashSet = createHashSetAlgorithm(
  'Iterate HashSet',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const values = [...set.values()];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    values.forEach((value, index) => {
      recorder.push({
        action: 'traverse',
        description: `Visit set value ${value}`,
        visualizationData: { set: asRecord(set), index, value },
        highlights: [index],
        variables: { index, value },
        memory: { current: value },
        codeLine: 1,
      });
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Iterates through all set elements.'
);

export const uniqueElements = createHashSetAlgorithm(
  'Unique Elements',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const source = getNumberArray(input, 'array', [1, 2, 2, 3, 3, 4]);
    const set = new Set(source);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      action: 'visit',
      description: 'Extract unique elements from array',
      visualizationData: { source, unique: [...set.values()] },
      variables: { uniqueCount: set.size },
      memory: { unique: [...set.values()] },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Returns unique values using hash set.'
);

export const hashSetSize = createHashSetAlgorithm(
  'HashSet Size',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const set = seedSet(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: `Current set size is ${set.size}`,
      visualizationData: { set: asRecord(set), size: set.size },
      variables: { size: set.size },
      memory: { size: set.size },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Returns number of unique values in set.'
);

export const hashSetBeginnerAlgorithms = [
  hashSetBasics,
  createHashSet,
  addElement,
  removeElement,
  checkElementExists,
  iterateHashSet,
  uniqueElements,
  hashSetSize,
] as const;
