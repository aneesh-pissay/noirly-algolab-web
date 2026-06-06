import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { cloneCounts, cloneIndexMap, createArrayAlgorithm, createStepRecorder, getArray, getNumber, getNumberArray } from '../easy-lessons/helpers';

export const kadaneAlgorithm = createArrayAlgorithm(
  'Kadane Algorithm',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const array = getArray(input, [-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

    if (array.length === 0) {
      recorder.push({
        action: 'calculate',
        description: 'Empty array has no maximum subarray',
        visualizationData: { array: [] },
        variables: { maxSum: 0 },
        memory: { array: [] },
        codeLine: 1,
      });
      return recorder.steps;
    }

    let currentSum = array[0];
    let bestSum = array[0];
    let currentStart = 0;
    let bestStart = 0;
    let bestEnd = 0;

    recorder.push({
      action: 'calculate',
      description: `Initialize current and best sum to ${array[0]}`,
      visualizationData: { array: [...array], currentRange: [0, 0], bestRange: [0, 0] },
      highlights: [0],
      variables: { currentSum, bestSum },
      memory: { array: [...array] },
      codeLine: 1,
    });

    for (let i = 1; i < array.length; i += 1) {
      const extendSum = currentSum + array[i];
      if (array[i] > extendSum) {
        currentSum = array[i];
        currentStart = i;
      } else {
        currentSum = extendSum;
      }

      if (currentSum > bestSum) {
        bestSum = currentSum;
        bestStart = currentStart;
        bestEnd = i;
      }

      recorder.push({
        action: 'calculate',
        description: `Process ${array[i]}: current sum ${currentSum}, best sum ${bestSum}`,
        visualizationData: { array: [...array], currentRange: [currentStart, i], bestRange: [bestStart, bestEnd] },
        highlights: [i],
        variables: { index: i, value: array[i], currentSum, bestSum },
        memory: { array: [...array], bestSubarray: array.slice(bestStart, bestEnd + 1) },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Maximum subarray sum is ${bestSum}`,
      visualizationData: { array: [...array], bestRange: [bestStart, bestEnd], complete: true },
      highlights: Array.from({ length: bestEnd - bestStart + 1 }, (_, offset) => bestStart + offset),
      variables: { bestSum, bestStart, bestEnd },
      memory: { bestSubarray: array.slice(bestStart, bestEnd + 1) },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Finds the maximum sum contiguous subarray in one pass.'
);

export const mergeSortedArrays = createArrayAlgorithm(
  'Merge Sorted Arrays',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const leftArray = getArray(input, [1, 3, 5, 7]);
    const rightArray = getNumberArray(input, 'array2', [2, 4, 6, 8]);
    const merged: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(n + m)' });
    let left = 0;
    let right = 0;

    recorder.push({
      action: 'merge',
      description: 'Merge two sorted arrays',
      visualizationData: { leftArray, rightArray, merged: [] },
      variables: { left, right },
      memory: { leftArray, rightArray, merged: [] },
      codeLine: 1,
    });

    while (left < leftArray.length && right < rightArray.length) {
      const takeLeft = leftArray[left] <= rightArray[right];
      recorder.push({
        action: 'compare',
        description: `Compare ${leftArray[left]} and ${rightArray[right]}`,
        visualizationData: { leftArray, rightArray, merged: [...merged], left, right },
        highlights: [left, right],
        variables: { leftValue: leftArray[left], rightValue: rightArray[right], takeFrom: takeLeft ? 'left' : 'right' },
        memory: { merged: [...merged] },
        codeLine: 2,
      });

      merged.push(takeLeft ? leftArray[left++] : rightArray[right++]);

      recorder.push({
        action: 'place',
        description: `Append ${merged[merged.length - 1]} to merged output`,
        visualizationData: { leftArray, rightArray, merged: [...merged], left, right },
        variables: { left, right, mergedLength: merged.length },
        memory: { merged: [...merged] },
        codeLine: 3,
      });
    }

    while (left < leftArray.length) {
      merged.push(leftArray[left]);
      recorder.push({
        action: 'place',
        description: `Append remaining left value ${leftArray[left]}`,
        visualizationData: { leftArray, rightArray, merged: [...merged], left },
        highlights: [left],
        variables: { left },
        memory: { merged: [...merged] },
        codeLine: 4,
      });
      left += 1;
    }

    while (right < rightArray.length) {
      merged.push(rightArray[right]);
      recorder.push({
        action: 'place',
        description: `Append remaining right value ${rightArray[right]}`,
        visualizationData: { leftArray, rightArray, merged: [...merged], right },
        highlights: [right],
        variables: { right },
        memory: { merged: [...merged] },
        codeLine: 5,
      });
      right += 1;
    }

    recorder.push({
      action: 'merge',
      description: `Merged array: [${merged.join(', ')}]`,
      visualizationData: { array: [...merged], leftArray, rightArray, complete: true },
      variables: { mergedLength: merged.length },
      memory: { merged: [...merged] },
      codeLine: 6,
    });

    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(n + m)' },
  'Merges two already sorted arrays into one sorted output.'
);

export const dutchFlagAlgorithm = createArrayAlgorithm(
  'Dutch Flag Algorithm',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const array = getArray(input, [2, 0, 2, 1, 1, 0]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let low = 0;
    let mid = 0;
    let high = array.length - 1;

    recorder.push({
      action: 'partition',
      description: 'Partition 0s, 1s, and 2s using low, mid, and high pointers',
      visualizationData: { array: [...array], low, mid, high },
      highlights: array.length > 0 ? [low, mid, high] : [],
      variables: { low, mid, high },
      memory: { array: [...array] },
      codeLine: 1,
    });

    while (mid <= high) {
      const value = array[mid];
      recorder.push({
        action: 'compare',
        description: `Inspect array[${mid}] = ${value}`,
        visualizationData: { array: [...array], low, mid, high },
        highlights: [mid],
        variables: { low, mid, high, value },
        memory: { array: [...array] },
        codeLine: 2,
      });

      if (value === 0) {
        [array[low], array[mid]] = [array[mid], array[low]];
        recorder.push({
          action: 'swap',
          description: `Swap 0 into low region at index ${low}`,
          visualizationData: { array: [...array], low, mid, high },
          highlights: [low, mid],
          variables: { low, mid, high },
          memory: { array: [...array] },
          codeLine: 3,
        });
        low += 1;
        mid += 1;
      } else if (value === 1) {
        mid += 1;
        recorder.push({
          action: 'move-pointer',
          description: 'Value is 1, keep it in the middle region',
          visualizationData: { array: [...array], low, mid, high },
          variables: { low, mid, high },
          memory: { array: [...array] },
          codeLine: 4,
        });
      } else {
        [array[mid], array[high]] = [array[high], array[mid]];
        recorder.push({
          action: 'swap',
          description: `Swap 2 into high region at index ${high}`,
          visualizationData: { array: [...array], low, mid, high },
          highlights: [mid, high],
          variables: { low, mid, high },
          memory: { array: [...array] },
          codeLine: 5,
        });
        high -= 1;
      }
    }

    recorder.push({
      action: 'partition',
      description: `Dutch flag partition complete: [${array.join(', ')}]`,
      visualizationData: { array: [...array], complete: true },
      memory: { array: [...array] },
      codeLine: 6,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Sorts an array containing only 0, 1, and 2 in one pass.'
);

export const twoSum = createArrayAlgorithm(
  'Two Sum',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const array = getArray(input, [2, 7, 11, 15]);
    const target = input.target ?? getNumber(input, 'target', 9);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const seen = new Map<number, number>();

    recorder.push({
      action: 'search',
      description: `Find two indices that sum to ${target}`,
      visualizationData: { array: [...array], target },
      variables: { target },
      memory: { seen: {} },
      codeLine: 1,
    });

    for (let i = 0; i < array.length; i += 1) {
      const complement = target - array[i];
      recorder.push({
        action: 'search',
        description: `Need complement ${complement} for array[${i}] = ${array[i]}`,
        visualizationData: { array: [...array], target, currentIndex: i },
        highlights: [i],
        variables: { index: i, value: array[i], complement },
        memory: { seen: cloneIndexMap(seen) },
        codeLine: 2,
      });

      if (seen.has(complement)) {
        const otherIndex = seen.get(complement) ?? -1;
        recorder.push({
          action: 'found',
          description: `Found ${complement} at index ${otherIndex}; pair sums to ${target}`,
          visualizationData: { array: [...array], target, pair: [otherIndex, i] },
          highlights: [otherIndex, i],
          variables: { indices: [otherIndex, i], values: [complement, array[i]], target },
          memory: { seen: cloneIndexMap(seen) },
          codeLine: 3,
        });
        return recorder.steps;
      }

      seen.set(array[i], i);
      recorder.push({
        action: 'insert',
        description: `Store ${array[i]} at index ${i}`,
        visualizationData: { array: [...array], target, currentIndex: i },
        highlights: [i],
        variables: { storedValue: array[i], storedIndex: i },
        memory: { seen: cloneIndexMap(seen) },
        codeLine: 4,
      });
    }

    recorder.push({
      action: 'not-found',
      description: 'No pair sums to target',
      visualizationData: { array: [...array], target },
      variables: { target },
      memory: { seen: cloneIndexMap(seen) },
      codeLine: 5,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Finds two array indices whose values add up to a target.'
);

export const arrayRotate = createArrayAlgorithm(
	'Rotate Array',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [1, 2, 3, 4, 5, 6, 7]);
		const rawK = getNumber(input, 'k', 2);
		const k = array.length === 0 ? 0 : Math.abs(Math.trunc(rawK)) % array.length;
		const directionValue = input.direction as unknown;
		const direction = directionValue === 'left' ? 'left' : 'right';
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

		recorder.push({
			action: 'rotate',
			description: `Rotate array ${direction} by ${k} positions`,
			visualizationData: { array: [...array], k, direction },
			variables: { k, direction, length: array.length },
			memory: { array: [...array] },
			codeLine: 1,
		});

		const splitIndex = direction === 'right' ? array.length - k : k;
		const firstPart = array.slice(0, splitIndex);
		const secondPart = array.slice(splitIndex);

		recorder.push({
			action: 'divide',
			description: `Split into [${firstPart.join(', ')}] and [${secondPart.join(', ')}]`,
			visualizationData: { array: [...array], splitIndex, firstPart, secondPart },
			highlights: splitIndex < array.length ? [splitIndex] : [],
			variables: { splitIndex },
			memory: { firstPart, secondPart },
			codeLine: 2,
		});

		const rotated = [...secondPart, ...firstPart];

		recorder.push({
			action: 'merge',
			description: `Rotation complete: [${rotated.join(', ')}]`,
			visualizationData: { array: rotated, rotated: true },
			variables: { k, direction },
			memory: { array: rotated },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(n)' },
	'Rotates an array left or right by k positions.'
);

export const prefixSum = createArrayAlgorithm(
	'Prefix Sum',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [2, 4, 1, 7, 3]);
		const prefix: number[] = [];
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
		let runningSum = 0;

		recorder.push({
			action: 'calculate',
			description: 'Build prefix sum array',
			visualizationData: { array: [...array], prefix: [] },
			variables: { runningSum },
			memory: { array: [...array], prefix: [] },
			codeLine: 1,
		});

		array.forEach((value, index) => {
			runningSum += value;
			prefix.push(runningSum);
			recorder.push({
				action: 'calculate',
				description: `prefix[${index}] = previous sum + ${value} = ${runningSum}`,
				visualizationData: { array: [...array], prefix: [...prefix], currentIndex: index },
				highlights: [index],
				variables: { index, value, runningSum },
				memory: { array: [...array], prefix: [...prefix] },
				codeLine: 2,
			});
		});

		recorder.push({
			action: 'visit',
			description: `Prefix sum complete: [${prefix.join(', ')}]`,
			visualizationData: { array: [...array], prefix: [...prefix], complete: true },
			variables: { finalSum: runningSum },
			memory: { array: [...array], prefix: [...prefix] },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(n)' },
	'Precomputes cumulative sums so range sums can be answered quickly.'
);

export const arrayIntermediateAlgorithms = [
  kadaneAlgorithm,
  mergeSortedArrays,
  dutchFlagAlgorithm,
  twoSum,
  arrayRotate,
  prefixSum,
] as const;