import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createArrayAlgorithm, createStepRecorder, getArray, getNumber } from './helpers';

export const arrayTraversal = createArrayAlgorithm(
	'Array Traversal',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [4, 8, 15, 16, 23, 42]);
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

		recorder.push({
			action: 'traverse',
			description: `Start traversing array of length ${array.length}`,
			visualizationData: { array: [...array] },
			variables: { length: array.length },
			memory: { array: [...array] },
			codeLine: 1,
		});

		array.forEach((value, index) => {
			recorder.push({
				action: 'visit',
				description: `Visit array[${index}] = ${value}`,
				visualizationData: { array: [...array], currentIndex: index },
				highlights: [index],
				variables: { index, value },
				memory: { array: [...array], currentValue: value },
				codeLine: 2,
			});
		});

		recorder.push({
			action: 'traverse',
			description: 'Traversal complete',
			visualizationData: { array: [...array], visited: array.map((_, index) => index) },
			variables: { visitedCount: array.length },
			memory: { array: [...array] },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Visits each array element once from left to right.'
);

export const insertElement = createArrayAlgorithm(
	'Insert Element',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [10, 20, 30, 40, 50]);
		const value = getNumber(input, 'value', 25);
		const requestedIndex = getNumber(input, 'index', 2);
		const index = Math.max(0, Math.min(array.length, Math.trunc(requestedIndex)));
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

		recorder.push({
			action: 'insert',
			description: `Insert ${value} at index ${index}`,
			visualizationData: { array: [...array], insertIndex: index, value },
			highlights: index < array.length ? [index] : [],
			variables: { index, value, length: array.length },
			memory: { array: [...array], value },
			codeLine: 1,
		});

		for (let i = array.length - 1; i >= index; i -= 1) {
			recorder.push({
				action: 'shift',
				description: `Shift array[${i}] (${array[i]}) right to index ${i + 1}`,
				visualizationData: { array: [...array], from: i, to: i + 1, insertIndex: index },
				highlights: [i],
				variables: { from: i, to: i + 1 },
				memory: { array: [...array] },
				codeLine: 2,
			});
		}

		array.splice(index, 0, value);

		recorder.push({
			action: 'place',
			description: `Placed ${value}. New array: [${array.join(', ')}]`,
			visualizationData: { array: [...array], insertedIndex: index },
			highlights: [index],
			variables: { index, value, length: array.length },
			memory: { array: [...array] },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Inserts a value at a chosen index and shifts following elements to the right.'
);

export const deleteElement = createArrayAlgorithm(
	'Delete Element',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [10, 20, 30, 40, 50]);
		const requestedIndex = getNumber(input, 'index', 2);
		const index = Math.max(0, Math.min(array.length - 1, Math.trunc(requestedIndex)));
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

		if (array.length === 0) {
			recorder.push({
				action: 'delete',
				description: 'Array is empty; nothing can be deleted',
				visualizationData: { array: [] },
				memory: { array: [] },
				codeLine: 1,
			});
			return recorder.steps;
		}

		const deleted = array[index];
		recorder.push({
			action: 'delete',
			description: `Delete array[${index}] = ${deleted}`,
			visualizationData: { array: [...array], deleteIndex: index },
			highlights: [index],
			variables: { index, deleted },
			memory: { array: [...array], deleted },
			codeLine: 1,
		});

		for (let i = index + 1; i < array.length; i += 1) {
			recorder.push({
				action: 'shift',
				description: `Shift array[${i}] (${array[i]}) left to index ${i - 1}`,
				visualizationData: { array: [...array], from: i, to: i - 1 },
				highlights: [i],
				variables: { from: i, to: i - 1 },
				memory: { array: [...array], deleted },
				codeLine: 2,
			});
		}

		array.splice(index, 1);

		recorder.push({
			action: 'delete',
			description: `Deleted ${deleted}. New array: [${array.join(', ')}]`,
			visualizationData: { array: [...array] },
			variables: { deleted, length: array.length },
			memory: { array: [...array] },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Deletes an element by index and shifts following elements to the left.'
);

export const searchElement = createArrayAlgorithm(
	'Search Element',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [10, 20, 30, 40, 50]);
		const target = getNumber(input, 'target', 30);
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

		recorder.push({
			action: 'search',
			description: `Search for ${target} in the array`,
			visualizationData: { array: [...array], target },
			variables: { target, length: array.length },
			memory: { array: [...array] },
			codeLine: 1,
		});

		for (let index = 0; index < array.length; index += 1) {
			recorder.push({
				action: 'compare',
				description: `Compare array[${index}] = ${array[index]} with ${target}`,
				visualizationData: { array: [...array], index, target },
				highlights: [index],
				variables: { index, value: array[index], target },
				memory: { target },
				codeLine: 2,
			});

			if (array[index] === target) {
				recorder.push({
					action: 'found',
					description: `Found ${target} at index ${index}`,
					visualizationData: { array: [...array], index, target },
					highlights: [index],
					variables: { index, target },
					memory: { result: index },
					codeLine: 3,
				});
				return recorder.steps;
			}
		}

		recorder.push({
			action: 'not-found',
			description: `${target} is not present in the array`,
			visualizationData: { array: [...array], target },
			variables: { target },
			memory: { result: -1 },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Searches linearly through the array to find a target value.'
);

export const findMaxMin = createArrayAlgorithm(
	'Find Max / Min',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [7, 2, 9, 4, 1, 8]);
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });

		if (array.length === 0) {
			recorder.push({
				action: 'not-found',
				description: 'Empty array has no maximum or minimum',
				visualizationData: { array: [] },
				memory: { max: null, min: null },
				codeLine: 1,
			});
			return recorder.steps;
		}

		let max = array[0];
		let min = array[0];

		recorder.push({
			action: 'visit',
			description: `Start with max = ${max} and min = ${min}`,
			visualizationData: { array: [...array], max, min },
			highlights: [0],
			variables: { max, min },
			memory: { max, min },
			codeLine: 1,
		});

		for (let index = 1; index < array.length; index += 1) {
			const value = array[index];
			max = Math.max(max, value);
			min = Math.min(min, value);

			recorder.push({
				action: 'compare',
				description: `Check ${value}: max = ${max}, min = ${min}`,
				visualizationData: { array: [...array], index, max, min },
				highlights: [index],
				variables: { index, value, max, min },
				memory: { max, min },
				codeLine: 2,
			});
		}

		recorder.push({
			action: 'found',
			description: `Maximum is ${max} and minimum is ${min}`,
			visualizationData: { array: [...array], max, min },
			variables: { max, min },
			memory: { max, min },
			codeLine: 3,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Traverses the array once to compute both the maximum and minimum values.'
);

export const arrayReverse = createArrayAlgorithm(
	'Reverse Array',
	(input: AlgorithmInput): AlgorithmStep[] => {
		const array = getArray(input, [1, 2, 3, 4, 5, 6]);
		const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
		let left = 0;
		let right = array.length - 1;
		let swaps = 0;

		recorder.push({
			action: 'move-pointer',
			description: 'Place pointers at both ends of the array',
			visualizationData: { array: [...array], left, right },
			highlights: array.length > 0 ? [left, right] : [],
			variables: { left, right },
			memory: { array: [...array] },
			codeLine: 1,
		});

		while (left < right) {
			recorder.push({
				action: 'swap',
				description: `Swap array[${left}] (${array[left]}) with array[${right}] (${array[right]})`,
				visualizationData: { array: [...array], left, right },
				highlights: [left, right],
				variables: { left, right, swaps },
				memory: { array: [...array] },
				codeLine: 2,
			});

			[array[left], array[right]] = [array[right], array[left]];
			swaps += 1;

			recorder.push({
				action: 'move-pointer',
				description: `Move inward after swap ${swaps}`,
				visualizationData: { array: [...array], left: left + 1, right: right - 1 },
				highlights: [left, right],
				variables: { left: left + 1, right: right - 1, swaps },
				memory: { array: [...array] },
				codeLine: 3,
			});

			left += 1;
			right -= 1;
		}

		recorder.push({
			action: 'visit',
			description: `Array reversed: [${array.join(', ')}]`,
			visualizationData: { array: [...array], complete: true },
			variables: { swaps },
			memory: { array: [...array] },
			codeLine: 4,
		});

		return recorder.steps;
	},
	{ time: 'O(n)', space: 'O(1)' },
	'Reverses an array in place using two pointers.'
);

export const arrayBeginnerAlgorithms = [
	arrayTraversal,
	insertElement,
	deleteElement,
	searchElement,
	findMaxMin,
	arrayReverse,
] as const;