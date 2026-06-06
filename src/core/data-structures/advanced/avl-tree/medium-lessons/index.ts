import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumberArray } from '../../../_shared/helpers';

export const balanceFactor = createDSAlgorithm(
  'Balance Factor',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    const leftH = getNumberArray(input, 'heights', [2, 0])[0] ?? 2;
    const rightH = getNumberArray(input, 'heights', [2, 0])[1] ?? 0;
    const bf = leftH - rightH;

    recorder.push({
      action: 'initialize',
      description: 'balanceFactor(node) = height(left) − height(right)',
      visualizationData: { leftH, rightH },
      variables: { leftH, rightH },
      memory: {},
      codeLine: 1,
    });

    recorder.push({
      action: 'calculate',
      description: `BF = ${leftH} − ${rightH} = ${bf} ${Math.abs(bf) > 1 ? '→ unbalanced (needs rotation)' : '→ balanced'}`,
      visualizationData: { balanceFactor: bf, balanced: Math.abs(bf) <= 1 },
      variables: { balanceFactor: bf },
      memory: {},
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Computes a node’s balance factor to detect imbalance.'
);

function rotationLesson(name: string, description: string, before: number[], after: number[]) {
  return createDSAlgorithm(
    name,
    (): AlgorithmStep[] => {
      const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
      recorder.push({
        action: 'initialize',
        description,
        visualizationData: { before: [...before] },
        memory: {},
        codeLine: 1,
      });
      recorder.push({
        action: 'rotate',
        description: 'Re-point child/parent links and recompute heights',
        visualizationData: { before: [...before], after: [...after] },
        memory: {},
        codeLine: 2,
      });
      recorder.push({
        action: 'found',
        description: `Subtree balanced (inorder unchanged: [${after.join(', ')}])`,
        visualizationData: { after: [...after] },
        memory: {},
        codeLine: 3,
      });
      return recorder.steps;
    },
    { time: 'O(1)', space: 'O(1)' },
    description
  );
}

export const leftRotation = rotationLesson(
  'Left Rotation',
  'Fixes a right-right (RR) imbalance by rotating left around the node.',
  [10, 20, 30],
  [10, 20, 30]
);

export const rightRotation = rotationLesson(
  'Right Rotation',
  'Fixes a left-left (LL) imbalance by rotating right around the node.',
  [30, 20, 10],
  [10, 20, 30]
);

export const lrRotation = rotationLesson(
  'LR Rotation',
  'Fixes a left-right (LR) imbalance: rotate child left, then node right.',
  [30, 10, 20],
  [10, 20, 30]
);

export const rlRotation = rotationLesson(
  'RL Rotation',
  'Fixes a right-left (RL) imbalance: rotate child right, then node left.',
  [10, 30, 20],
  [10, 20, 30]
);

export const avlTreeIntermediateAlgorithms = [balanceFactor, leftRotation, rightRotation, lrRotation, rlRotation] as const;
