import { Algorithm, AlgorithmInput, AlgorithmStep } from '../../engine/types';
import { createAlgorithm, createStepRecorder, getArray } from '../_shared/helpers';

/** Lightweight placeholder for visual-lab pages outside algorithms.txt scope. */
export function minimalAlgorithm(name: string, category: Algorithm['category'] = 'pattern'): Algorithm {
  return createAlgorithm(
    name,
    category,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const arr = getArray(input, [1, 2, 3]);
      const recorder = createStepRecorder(category, { time: 'O(n)', space: 'O(1)' });
      recorder.push({ action: 'initialize', description: `${name} visualization`, visualizationData: { array: [...arr] }, memory: { array: [...arr] }, codeLine: 1 });
      arr.forEach((v, i) => recorder.push({ action: 'visit', description: `Step at index ${i} = ${v}`, highlights: [i], memory: { array: [...arr] }, codeLine: 2 }));
      return recorder.steps;
    },
    { time: 'O(n)', space: 'O(1)' },
    `${name} step visualization.`
  );
}
