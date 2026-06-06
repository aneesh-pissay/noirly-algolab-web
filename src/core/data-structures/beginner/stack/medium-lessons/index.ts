import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createStackAlgorithm, createStepRecorder, getString } from '../easy-lessons/helpers';

export const reverseStringUsingStack = createStackAlgorithm(
  'Reverse String',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const str = getString(input, 'str', 'stack');
    const stack = str.split('');
    const reversed = stack.reverse().join('');
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: `Reversed string: ${reversed}`, visualizationData: { str, reversed }, memory: { reversed }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Reverses a string by push/pop behavior.'
);

function bracketCheck(name: string, sourceKey: string, fallback: string) {
  return createStackAlgorithm(
    name,
    (input: AlgorithmInput): AlgorithmStep[] => {
      const str = getString(input, sourceKey, fallback);
      const stack: string[] = [];
      const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
      const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

      for (let i = 0; i < str.length; i += 1) {
        const ch = str[i];
        if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
        else if (ch in pairs) {
          const top = stack.pop();
          if (top !== pairs[ch]) {
            recorder.push({ action: 'not-found', description: `Invalid at index ${i}`, visualizationData: { str, i }, memory: { valid: false }, codeLine: 1 });
            return recorder.steps;
          }
        }
      }

      recorder.push({ action: stack.length === 0 ? 'found' : 'not-found', description: stack.length === 0 ? 'Valid sequence' : 'Invalid sequence', visualizationData: { str }, memory: { valid: stack.length === 0 }, codeLine: 2 });
      return recorder.steps;
    },
    { time: 'O(n)', space: 'O(n)' },
    `${name} using stack-based pair matching.`
  );
}

export const balancedParentheses = bracketCheck('Balanced Parentheses', 'str', '(()())');
export const validBrackets = bracketCheck('Valid Brackets', 'str', '{[()]}');
export const validParentheses = bracketCheck('Valid Parentheses', 'str', '(()[]){}');

export const minStack = createStackAlgorithm(
  'Min Stack',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const ops = ['push 5', 'push 3', 'push 7', 'getMin', 'pop', 'getMin'];
    const stack: number[] = [];
    const mins: number[] = [];
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });

    ops.forEach((op, idx) => {
      if (op.startsWith('push')) {
        const value = Number(op.split(' ')[1]);
        stack.push(value);
        mins.push(mins.length ? Math.min(mins[mins.length - 1], value) : value);
      } else if (op === 'pop') {
        stack.pop();
        mins.pop();
      }
      recorder.push({ action: 'visit', description: op, visualizationData: { op, idx, stack, min: mins[mins.length - 1] ?? null }, memory: { stack: [...stack], min: mins[mins.length - 1] ?? null }, codeLine: 1 });
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Tracks minimum in O(1) with auxiliary stack.'
);

export const removeAdjacentDuplicates = createStackAlgorithm(
  'Remove Adjacent Duplicates',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const str = getString(input, 'str', 'abbaca');
    const stack: string[] = [];
    for (const ch of str) {
      if (stack.length && stack[stack.length - 1] === ch) stack.pop();
      else stack.push(ch);
    }
    const result = stack.join('');
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: `Result: ${result}`, visualizationData: { str, result }, memory: { result }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Eliminates adjacent duplicates using stack.'
);

export const evaluateReversePolishNotation = createStackAlgorithm(
  'Evaluate Reverse Polish Notation',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const tokens = ['2', '1', '+', '3', '*'];
    const stack: number[] = [];
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    tokens.forEach((t) => {
      if (!Number.isNaN(Number(t))) stack.push(Number(t));
      else {
        const b = stack.pop() ?? 0;
        const a = stack.pop() ?? 0;
        const val = t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : Math.trunc(a / b);
        stack.push(val);
      }
      recorder.push({ description: `Token ${t}`, visualizationData: { tokens, stack: [...stack] }, memory: { stack: [...stack] }, codeLine: 1 });
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Evaluates postfix expression using stack.'
);

export const implementQueueUsingStack = createStackAlgorithm(
  'Implement Queue Using Stack',
  (_input: AlgorithmInput): AlgorithmStep[] => {
    const inStack: number[] = [1, 2, 3];
    const outStack: number[] = [];
    while (inStack.length) outStack.push(inStack.pop() as number);
    const front = outStack[outStack.length - 1] ?? null;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    recorder.push({ description: 'Transferred input stack to output stack', visualizationData: { inStack, outStack, front }, memory: { front }, codeLine: 1 });
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Builds queue semantics using two stacks.'
);

export const decodeString = createStackAlgorithm(
  'Decode String',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const encoded = getString(input, 'str', '3[a2[c]]');
    const countStack: number[] = [];
    const stringStack: string[] = [];
    let current = '';
    let repeat = 0;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });

    for (let index = 0; index < encoded.length; index += 1) {
      const char = encoded[index];
      if (/\d/.test(char)) {
        repeat = repeat * 10 + Number(char);
      } else if (char === '[') {
        countStack.push(repeat);
        stringStack.push(current);
        repeat = 0;
        current = '';
      } else if (char === ']') {
        const times = countStack.pop() ?? 1;
        const previous = stringStack.pop() ?? '';
        current = previous + current.repeat(times);
      } else {
        current += char;
      }

      recorder.push({
        action: 'visit',
        description: `Process "${char}"`,
        visualizationData: { encoded, index, current, countStack: [...countStack], stringStack: [...stringStack] },
        variables: { index, char, current },
        memory: { current },
        codeLine: 1,
      });
    }

    recorder.push({
      action: 'found',
      description: `Decoded string: ${current}`,
      visualizationData: { encoded, decoded: current },
      variables: { decoded: current },
      memory: { decoded: current },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Decodes nested repetition patterns using stacks for counts and substrings.'
);

export const stackIntermediateAlgorithms = [
  reverseStringUsingStack,
  balancedParentheses,
  validBrackets,
  minStack,
  removeAdjacentDuplicates,
  evaluateReversePolishNotation,
  implementQueueUsingStack,
] as const;
