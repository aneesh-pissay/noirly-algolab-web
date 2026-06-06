import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';

export const bubbleSort = createAlgorithm(
  'Bubble Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [5, 3, 8, 1, 9]);
    const recorder = createStepRecorder('sorting', { time: 'O(n²)', space: 'O(1)' });
    let swaps = 0;

    recorder.push({ action: 'initialize', description: 'Start bubble sort on the array', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    for (let i = 0; i < arr.length - 1; i += 1) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; j += 1) {
        recorder.push({
          action: 'compare',
          description: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
          visualizationData: { array: [...arr], i, j },
          highlights: [j, j + 1],
          variables: { j },
          memory: { array: [...arr] },
          codeLine: 4,
        });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps += 1;
          swapped = true;
          recorder.push({
            action: 'swap',
            description: `Swap → [${arr.join(', ')}]`,
            visualizationData: { array: [...arr], swaps },
            highlights: [j, j + 1],
            variables: { swaps },
            memory: { array: [...arr] },
            codeLine: 5,
          });
        }
      }
      if (!swapped) {
        recorder.push({ description: 'No swaps in pass — array is sorted', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 8 });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n²)', space: 'O(1)' },
  'Repeatedly swaps adjacent out-of-order elements.'
);

export const selectionSort = createAlgorithm(
  'Selection Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [64, 25, 12, 22, 11]);
    const recorder = createStepRecorder('sorting', { time: 'O(n²)', space: 'O(1)' });

    recorder.push({ action: 'initialize', description: 'Find minimum and swap to front each pass', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    for (let i = 0; i < arr.length - 1; i += 1) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j += 1) {
        if (arr[j] < arr[minIdx]) minIdx = j;
        recorder.push({
          action: 'compare',
          description: `Scan j=${j}: min so far at index ${minIdx} (${arr[minIdx]})`,
          visualizationData: { array: [...arr], i, minIdx },
          highlights: [i, minIdx, j],
          variables: { minIdx },
          memory: { array: [...arr] },
          codeLine: 4,
        });
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        recorder.push({
          action: 'swap',
          description: `Place minimum ${arr[i]} at index ${i}`,
          visualizationData: { array: [...arr] },
          highlights: [i, minIdx],
          memory: { array: [...arr] },
          codeLine: 6,
        });
      }
    }

    return recorder.steps;
  },
  { time: 'O(n²)', space: 'O(1)' },
  'Selects the minimum each pass and places it at the front.'
);

export const insertionSort = createAlgorithm(
  'Insertion Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [12, 11, 13, 5, 6]);
    const recorder = createStepRecorder('sorting', { time: 'O(n²)', space: 'O(1)' });

    recorder.push({ action: 'initialize', description: 'Build sorted prefix by inserting each key', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    for (let i = 1; i < arr.length; i += 1) {
      const key = arr[i];
      let j = i - 1;
      recorder.push({ action: 'visit', description: `Key = ${key} at index ${i}`, visualizationData: { array: [...arr], key, i }, highlights: [i], variables: { key }, memory: { array: [...arr] }, codeLine: 3 });
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        recorder.push({ action: 'shift', description: `Shift ${arr[j + 1]} right`, visualizationData: { array: [...arr] }, highlights: [j, j + 1], memory: { array: [...arr] }, codeLine: 6 });
        j -= 1;
      }
      arr[j + 1] = key;
      recorder.push({ action: 'insert', description: `Insert key ${key} at index ${j + 1}`, visualizationData: { array: [...arr] }, highlights: [j + 1], memory: { array: [...arr] }, codeLine: 9 });
    }

    return recorder.steps;
  },
  { time: 'O(n²)', space: 'O(1)' },
  'Inserts each element into its correct position in the sorted prefix.'
);

export const sortingBeginnerEasyAlgorithms = [bubbleSort, selectionSort, insertionSort] as const;
