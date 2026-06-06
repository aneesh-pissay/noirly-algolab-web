import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createAlgorithm, createStepRecorder, getArray } from '../../../_shared/helpers';

export const mergeSort = createAlgorithm(
  'Merge Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [38, 27, 43, 3, 9, 82, 10]);
    const recorder = createStepRecorder('sorting', { time: 'O(n log n)', space: 'O(n)' });
    const work = [...arr];

    recorder.push({ action: 'initialize', description: 'Divide array, merge sorted halves', visualizationData: { array: [...work] }, memory: { array: [...work] }, codeLine: 1 });

    const merge = (lo: number, mid: number, hi: number): void => {
      const left = work.slice(lo, mid + 1);
      const right = work.slice(mid + 1, hi + 1);
      let i = 0;
      let j = 0;
      let k = lo;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) work[k++] = left[i++];
        else work[k++] = right[j++];
      }
      while (i < left.length) work[k++] = left[i++];
      while (j < right.length) work[k++] = right[j++];
      recorder.push({ action: 'merge', description: `Merged [${lo}..${hi}] → [${work.slice(lo, hi + 1).join(', ')}]`, visualizationData: { array: [...work], lo, hi }, memory: { array: [...work] }, codeLine: 2 });
    };

    const sort = (lo: number, hi: number): void => {
      if (lo >= hi) return;
      const mid = Math.floor((lo + hi) / 2);
      recorder.push({ action: 'divide', description: `Divide [${lo}..${hi}] at mid ${mid}`, visualizationData: { lo, mid, hi }, memory: {}, codeLine: 3 });
      sort(lo, mid);
      sort(mid + 1, hi);
      merge(lo, mid, hi);
    };

    sort(0, work.length - 1);
    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Divide-and-conquer merge sort.'
);

export const quickSort = createAlgorithm(
  'Quick Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [10, 7, 8, 9, 1, 5]);
    const recorder = createStepRecorder('sorting', { time: 'O(n log n) avg', space: 'O(log n)' });

    recorder.push({ action: 'initialize', description: 'Partition around pivot, recurse', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    const partition = (lo: number, hi: number): number => {
      const pivot = arr[hi];
      let i = lo - 1;
      for (let j = lo; j < hi; j += 1) {
        recorder.push({ action: 'compare', description: `Compare ${arr[j]} with pivot ${pivot}`, visualizationData: { array: [...arr], pivot }, highlights: [j, hi], memory: { array: [...arr] }, codeLine: 2 });
        if (arr[j] < pivot) {
          i += 1;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
      recorder.push({ action: 'partition', description: `Pivot ${pivot} placed at index ${i + 1}`, visualizationData: { array: [...arr], pivotIndex: i + 1 }, highlights: [i + 1], memory: { array: [...arr] }, codeLine: 3 });
      return i + 1;
    };

    const sort = (lo: number, hi: number): void => {
      if (lo >= hi) return;
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    };

    sort(0, arr.length - 1);
    return recorder.steps;
  },
  { time: 'O(n log n) avg', space: 'O(log n)' },
  'Partitions around a pivot and recurses.'
);

export const heapSort = createAlgorithm(
  'Heap Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [12, 11, 13, 5, 6, 7]);
    const recorder = createStepRecorder('sorting', { time: 'O(n log n)', space: 'O(1)' });
    const n = arr.length;

    const heapify = (size: number, i: number): void => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < size && arr[l] > arr[largest]) largest = l;
      if (r < size && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        recorder.push({ action: 'heapify', description: `Heapify at ${i}`, visualizationData: { array: [...arr] }, highlights: [i, largest], memory: { array: [...arr] }, codeLine: 1 });
        heapify(size, largest);
      }
    };

    recorder.push({ action: 'initialize', description: 'Build max-heap, then extract max repeatedly', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 2 });
    for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) heapify(n, i);
    for (let end = n - 1; end > 0; end -= 1) {
      [arr[0], arr[end]] = [arr[end], arr[0]];
      recorder.push({ action: 'swap', description: `Swap root with index ${end}`, visualizationData: { array: [...arr] }, highlights: [0, end], memory: { array: [...arr] }, codeLine: 3 });
      heapify(end, 0);
    }

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(1)' },
  'Sorts in-place using a max-heap.'
);

export const shellSort = createAlgorithm(
  'Shell Sort',
  'sorting',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [35, 33, 42, 10, 14, 19, 27, 44]);
    const recorder = createStepRecorder('sorting', { time: 'O(n^1.3)', space: 'O(1)' });

    recorder.push({ action: 'initialize', description: 'Insertion sort with decreasing gap (shell gaps)', visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });

    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      recorder.push({ action: 'set-gap', description: `Gap = ${gap}`, visualizationData: { array: [...arr], gap }, variables: { gap }, memory: { array: [...arr] }, codeLine: 2 });
      for (let i = gap; i < arr.length; i += 1) {
        const temp = arr[i];
        let j = i;
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        arr[j] = temp;
        recorder.push({ action: 'insert', description: `Gap-insert ${temp} at ${j}`, visualizationData: { array: [...arr], gap }, highlights: [j], memory: { array: [...arr] }, codeLine: 3 });
      }
    }

    return recorder.steps;
  },
  { time: 'O(n^1.3)', space: 'O(1)' },
  'Generalized insertion sort with diminishing gaps.'
);

export const sortingBeginnerMediumAlgorithms = [mergeSort, quickSort, heapSort, shellSort] as const;
