import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { asStack, createStackAlgorithm, createStepRecorder, getNumber } from './helpers';

export const stackBasics = createStackAlgorithm(
  'Stack Basics',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    recorder.push({
      description: 'Stack follows LIFO (Last In First Out)',
      visualizationData: { stack, top: stack[stack.length - 1] ?? null },
      variables: { size: stack.length },
      memory: { stack },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Introduces stack and top-based operations.'
);

export const createStack = createStackAlgorithm(
  'Create Stack',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({
      description: 'Create stack from input array',
      visualizationData: { stack },
      variables: { size: stack.length },
      memory: { stack },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Creates stack state from given values.'
);

export const pushElement = createStackAlgorithm(
  'Push Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const value = getNumber(input, 'value', 99);
    stack.push(value);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'push',
      description: `Push ${value}`,
      visualizationData: { stack, pushed: value },
      variables: { value, size: stack.length },
      memory: { stack },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Pushes element to top of stack.'
);

export const popElement = createStackAlgorithm(
  'Pop Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const popped = stack.pop() ?? null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      action: 'pop',
      description: popped === null ? 'Pop on empty stack' : `Popped ${popped}`,
      visualizationData: { stack, popped },
      variables: { popped, size: stack.length },
      memory: { stack },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Pops top element from stack.'
);

export const peekTopElement = createStackAlgorithm(
  'Peek / Top Element',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const top = stack.length ? stack[stack.length - 1] : null;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: top === null ? 'Empty stack has no top' : `Top element is ${top}`,
      visualizationData: { stack, top },
      variables: { top },
      memory: { top },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Returns top element without removal.'
);

export const checkEmptyStack = createStackAlgorithm(
  'Check Empty Stack',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const isEmpty = stack.length === 0;
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: isEmpty ? 'Stack is empty' : 'Stack is not empty',
      visualizationData: { stack, isEmpty },
      variables: { isEmpty },
      memory: { isEmpty },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Checks if stack has no elements.'
);

export const stackSize = createStackAlgorithm(
  'Stack Size',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(1)' });
    recorder.push({
      description: `Stack size is ${stack.length}`,
      visualizationData: { stack, size: stack.length },
      variables: { size: stack.length },
      memory: { size: stack.length },
      codeLine: 1,
    });
    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(1)' },
  'Returns number of stack elements.'
);

export const traverseStack = createStackAlgorithm(
  'Traverse Stack',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const stack = asStack(input);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    for (let i = stack.length - 1; i >= 0; i -= 1) {
      recorder.push({
        action: 'traverse',
        description: `Visit stack[${i}] = ${stack[i]}`,
        visualizationData: { stack, index: i, value: stack[i] },
        highlights: [i],
        variables: { index: i, value: stack[i] },
        memory: { topToBottom: stack.slice().reverse() },
        codeLine: 1,
      });
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Traverses stack from top to bottom.'
);

export const stackBeginnerAlgorithms = [
  stackBasics,
  createStack,
  pushElement,
  popElement,
  peekTopElement,
  checkEmptyStack,
  stackSize,
  traverseStack,
] as const;

export const stackDS = createStackAlgorithm(
  'Stack',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const ops = (input.operations as string[]) ?? ['push', 'push', 'pop', 'peek'];
    const values = asStack(input);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    const stack: number[] = [];
    let valueIndex = 0;

    recorder.push({
      description: 'Starting stack operations',
      visualizationData: { stack: [], operations: ops },
      variables: { size: 0 },
      memory: { stack: [] },
      codeLine: 1,
    });

    for (const op of ops) {
      if (op === 'push' && valueIndex < values.length) {
        const value = values[valueIndex++];
        stack.push(value);
        recorder.push({
          action: 'push',
          description: `Push ${value}`,
          visualizationData: { stack: [...stack], operation: op },
          variables: { value, size: stack.length },
          memory: { stack: [...stack] },
          codeLine: 2,
        });
      } else if (op === 'pop') {
        const popped = stack.pop() ?? null;
        recorder.push({
          action: 'pop',
          description: popped === null ? 'Cannot pop from empty stack' : `Pop ${popped}`,
          visualizationData: { stack: [...stack], popped, operation: op },
          variables: { popped, size: stack.length },
          memory: { stack: [...stack] },
          codeLine: 3,
        });
      } else if (op === 'peek') {
        const top = stack.length ? stack[stack.length - 1] : null;
        recorder.push({
          description: top === null ? 'Cannot peek empty stack' : `Peek ${top}`,
          visualizationData: { stack: [...stack], top, operation: op },
          variables: { top, size: stack.length },
          memory: { stack: [...stack] },
          codeLine: 4,
        });
      }
    }

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'LIFO data structure with push, pop, and peek operations.'
);
