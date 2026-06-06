import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createArrayAlgorithm, createStepRecorder, getArray, getIntervals } from '../easy-lessons/helpers';

export const productExceptSelf = createArrayAlgorithm(
  'Product Except Self',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const array = getArray(input, [1, 2, 3, 4]);
    const output = Array(array.length).fill(1) as number[];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1) extra' });
    let leftProduct = 1;
    let rightProduct = 1;

    recorder.push({
      action: 'calculate',
      description: 'Initialize output with 1s',
      visualizationData: { array: [...array], output: [...output] },
      variables: { leftProduct, rightProduct },
      memory: { output: [...output] },
      codeLine: 1,
    });

    for (let i = 0; i < array.length; i += 1) {
      output[i] = leftProduct;
      leftProduct *= array[i];
      recorder.push({
        action: 'calculate',
        description: `Store product to the left of index ${i}: ${output[i]}`,
        visualizationData: { array: [...array], output: [...output], currentIndex: i, pass: 'left' },
        highlights: [i],
        variables: { index: i, leftProduct },
        memory: { output: [...output] },
        codeLine: 2,
      });
    }

    for (let i = array.length - 1; i >= 0; i -= 1) {
      output[i] *= rightProduct;
      rightProduct *= array[i];
      recorder.push({
        action: 'calculate',
        description: `Multiply by product to the right of index ${i}: ${output[i]}`,
        visualizationData: { array: [...array], output: [...output], currentIndex: i, pass: 'right' },
        highlights: [i],
        variables: { index: i, rightProduct },
        memory: { output: [...output] },
        codeLine: 3,
      });
    }

    recorder.push({
      action: 'visit',
      description: `Product except self: [${output.join(', ')}]`,
      visualizationData: { array: [...array], output: [...output], complete: true },
      memory: { output: [...output] },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1) extra' },
  'Builds the product of every element except itself using left and right products.'
);

export const mergeIntervals = createArrayAlgorithm(
  'Merge Intervals',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const intervals = getIntervals(input, [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ]);
    const sorted = intervals.map((interval) => [...interval]).sort((a, b) => a[0] - b[0]);
    const merged: number[][] = [];
    const recorder = createStepRecorder({ time: 'O(n log n)', space: 'O(n)' });

    recorder.push({
      action: 'sort-bucket',
      description: 'Sort intervals by start time',
      visualizationData: { intervals, sorted },
      memory: { sorted },
      codeLine: 1,
    });

    for (const interval of sorted) {
      if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
        merged.push([...interval]);
        recorder.push({
          action: 'insert',
          description: `Add non-overlapping interval [${interval.join(', ')}]`,
          visualizationData: { intervals: sorted, merged: merged.map((item) => [...item]), currentInterval: interval },
          variables: { currentInterval: interval },
          memory: { merged: merged.map((item) => [...item]) },
          codeLine: 2,
        });
      } else {
        const last = merged[merged.length - 1];
        const previousEnd = last[1];
        last[1] = Math.max(last[1], interval[1]);
        recorder.push({
          action: 'merge',
          description: `Merge overlap with [${interval.join(', ')}], end ${previousEnd} -> ${last[1]}`,
          visualizationData: { intervals: sorted, merged: merged.map((item) => [...item]), currentInterval: interval },
          variables: { currentInterval: interval, previousEnd, newEnd: last[1] },
          memory: { merged: merged.map((item) => [...item]) },
          codeLine: 3,
        });
      }
    }

    recorder.push({
      action: 'merge',
      description: `Merged intervals: ${JSON.stringify(merged)}`,
      visualizationData: { intervals: sorted, merged: merged.map((item) => [...item]), complete: true },
      memory: { merged: merged.map((item) => [...item]) },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n log n)', space: 'O(n)' },
  'Sorts intervals and merges overlapping ranges.'
);

export const nextPermutation = createArrayAlgorithm(
  'Next Permutation',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const array = getArray(input, [1, 2, 3]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let pivot = array.length - 2;

    recorder.push({
      action: 'search',
      description: 'Find first decreasing element from the right',
      visualizationData: { array: [...array] },
      memory: { array: [...array] },
      codeLine: 1,
    });

    while (pivot >= 0 && array[pivot] >= array[pivot + 1]) {
      recorder.push({
        action: 'compare',
        description: `array[${pivot}] (${array[pivot]}) >= array[${pivot + 1}] (${array[pivot + 1]}), move left`,
        visualizationData: { array: [...array], pivot },
        highlights: [pivot, pivot + 1],
        variables: { pivot },
        memory: { array: [...array] },
        codeLine: 2,
      });
      pivot -= 1;
    }

    if (pivot >= 0) {
      let successor = array.length - 1;
      while (array[successor] <= array[pivot]) {
        successor -= 1;
      }
      [array[pivot], array[successor]] = [array[successor], array[pivot]];
      recorder.push({
        action: 'swap',
        description: `Swap pivot ${pivot} with successor ${successor}`,
        visualizationData: { array: [...array], pivot, successor },
        highlights: [pivot, successor],
        variables: { pivot, successor },
        memory: { array: [...array] },
        codeLine: 3,
      });
    }

    let left = pivot + 1;
    let right = array.length - 1;
    while (left < right) {
      [array[left], array[right]] = [array[right], array[left]];
      recorder.push({
        action: 'swap',
        description: `Reverse suffix by swapping index ${left} and ${right}`,
        visualizationData: { array: [...array], left, right },
        highlights: [left, right],
        variables: { left, right },
        memory: { array: [...array] },
        codeLine: 4,
      });
      left += 1;
      right -= 1;
    }

    recorder.push({
      action: 'visit',
      description: `Next permutation: [${array.join(', ')}]`,
      visualizationData: { array: [...array], complete: true },
      memory: { array: [...array] },
      codeLine: 5,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Transforms an array into the next lexicographic permutation in place.'
);

export const histogramArea = createArrayAlgorithm(
  'Histogram Area',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const heights = getArray(input, [2, 1, 5, 6, 2, 3]);
    const stack: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    let maxArea = 0;

    recorder.push({
      action: 'initialize',
      description: 'Use a monotonic increasing stack of bar indices',
      visualizationData: { heights: [...heights], stack: [...stack], maxArea },
      memory: { stack: [...stack] },
      codeLine: 1,
    });

    for (let i = 0; i <= heights.length; i += 1) {
      const currentHeight = i === heights.length ? 0 : heights[i];
      while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
        const top = stack.pop() ?? 0;
        const height = heights[top];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;
        maxArea = Math.max(maxArea, area);
        recorder.push({
          action: 'calculate',
          description: `Area with height ${height} and width ${width}: ${area}`,
          visualizationData: { heights: [...heights], stack: [...stack], currentIndex: i, barIndex: top, area, maxArea },
          highlights: [top],
          variables: { height, width, area, maxArea },
          memory: { stack: [...stack] },
          codeLine: 2,
        });
      }

      stack.push(i);
      recorder.push({
        action: 'push',
        description: `Push index ${i} with height ${currentHeight}`,
        visualizationData: { heights: [...heights], stack: [...stack], currentIndex: i, maxArea },
        highlights: i < heights.length ? [i] : [],
        variables: { index: i, currentHeight, maxArea },
        memory: { stack: [...stack] },
        codeLine: 3,
      });
    }

    recorder.push({
      action: 'found',
      description: `Largest histogram area is ${maxArea}`,
      visualizationData: { heights: [...heights], maxArea, complete: true },
      variables: { maxArea },
      memory: { maxArea },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Computes the largest rectangle in a histogram using a monotonic stack.'
);

export const rainWater = createArrayAlgorithm(
  'Rain Water',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const heights = getArray(input, [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    const waterLevels = Array(heights.length).fill(0) as number[];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let left = 0;
    let right = heights.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    recorder.push({
      action: 'move-pointer',
      description: 'Use two pointers and track max walls from both sides',
      visualizationData: { heights: [...heights], waterLevels: [...waterLevels], left, right, totalWater },
      highlights: heights.length > 0 ? [left, right] : [],
      variables: { left, right, leftMax, rightMax, totalWater },
      memory: { waterLevels: [...waterLevels] },
      codeLine: 1,
    });

    while (left < right) {
      if (heights[left] <= heights[right]) {
        leftMax = Math.max(leftMax, heights[left]);
        const water = leftMax - heights[left];
        waterLevels[left] = water;
        totalWater += water;
        recorder.push({
          action: 'calculate',
          description: `Left index ${left}: trap ${water}, total ${totalWater}`,
          visualizationData: { heights: [...heights], waterLevels: [...waterLevels], left, right, leftMax, rightMax, totalWater },
          highlights: [left],
          variables: { left, height: heights[left], leftMax, water, totalWater },
          memory: { waterLevels: [...waterLevels] },
          codeLine: 2,
        });
        left += 1;
      } else {
        rightMax = Math.max(rightMax, heights[right]);
        const water = rightMax - heights[right];
        waterLevels[right] = water;
        totalWater += water;
        recorder.push({
          action: 'calculate',
          description: `Right index ${right}: trap ${water}, total ${totalWater}`,
          visualizationData: { heights: [...heights], waterLevels: [...waterLevels], left, right, leftMax, rightMax, totalWater },
          highlights: [right],
          variables: { right, height: heights[right], rightMax, water, totalWater },
          memory: { waterLevels: [...waterLevels] },
          codeLine: 3,
        });
        right -= 1;
      }
    }

    recorder.push({
      action: 'found',
      description: `Total trapped water: ${totalWater}`,
      visualizationData: { heights: [...heights], waterLevels: [...waterLevels], totalWater, complete: true },
      variables: { totalWater },
      memory: { waterLevels: [...waterLevels] },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Computes trapped rain water using two pointers and running max walls.'
);

export const arrayAdvancedAlgorithms = [
  productExceptSelf,
  mergeIntervals,
  nextPermutation,
  histogramArea,
  rainWater,
] as const;