import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createStepRecorder, createStringAlgorithm, getString, toChars } from './helpers';

const traversalComplexity = { time: 'O(n)', space: 'O(1)' };

function generateTraversalSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'Noirly');
  const chars = toChars(str);
  const recorder = createStepRecorder(traversalComplexity);

  recorder.push({
    action: 'traverse',
    description: `Traverse string of length ${chars.length}`,
    visualizationData: { string: chars },
    variables: { length: chars.length },
    memory: { string: str },
    codeLine: 1,
  });

  chars.forEach((char, index) => {
    recorder.push({
      action: 'visit',
      description: `Visit char at index ${index}: "${char}"`,
      visualizationData: { string: chars, index },
      highlights: [index],
      variables: { index, char },
      memory: { prefix: str.slice(0, index + 1) },
      codeLine: 2,
    });
  });

  recorder.push({
    action: 'visit',
    description: 'Traversal complete',
    visualizationData: { string: chars, complete: true },
    variables: { visited: chars.length },
    memory: { string: str },
    codeLine: 3,
  });

  return recorder.steps;
}

export const stringTraversal = createStringAlgorithm(
  'String Traversal',
  generateTraversalSteps,
  traversalComplexity,
  'Visits each character in order from left to right.'
);

function generateCharacterAccessSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'Noirly');
  const chars = toChars(str);
  const index = typeof input.index === 'number' ? input.index : 2;
  const complexity = { time: 'O(1)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);

  recorder.push({
    description: `Access index ${index} in string`,
    visualizationData: { string: chars, index },
    variables: { index, length: chars.length },
    memory: { string: str },
    codeLine: 1,
  });

  if (index >= 0 && index < chars.length) {
    recorder.push({
      action: 'visit',
      description: `Character found: "${chars[index]}"`,
      visualizationData: { string: chars, index, value: chars[index] },
      highlights: [index],
      variables: { index, value: chars[index] },
      memory: { result: chars[index] },
      codeLine: 2,
    });
  } else {
    recorder.push({
      action: 'not-found',
      description: 'Index out of bounds',
      visualizationData: { string: chars, index, error: true },
      variables: { index, length: chars.length },
      memory: { result: null },
      codeLine: 2,
    });
  }

  return recorder.steps;
}

export const characterAccess = createStringAlgorithm(
  'Character Access',
  generateCharacterAccessSteps,
  { time: 'O(1)', space: 'O(1)' },
  'Retrieves a character by index.'
);

function generateReverseStringSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'algorithm');
  const chars = toChars(str);
  const reversed = [...chars].reverse();
  const complexity = { time: 'O(n)', space: 'O(n)' };
  const recorder = createStepRecorder(complexity);

  recorder.push({
    description: 'Reverse the string',
    visualizationData: { string: chars, reversed: [] },
    memory: { original: str },
    codeLine: 1,
  });

  reversed.forEach((char, index) => {
    recorder.push({
      action: 'insert',
      description: `Append "${char}" to reversed output`,
      visualizationData: { string: chars, reversed: reversed.slice(0, index + 1) },
      highlights: [chars.length - 1 - index],
      variables: { index, char },
      memory: { partial: reversed.slice(0, index + 1).join('') },
      codeLine: 2,
    });
  });

  recorder.push({
    description: `Result: "${reversed.join('')}"`,
    visualizationData: { string: chars, reversed, complete: true },
    memory: { result: reversed.join('') },
    codeLine: 3,
  });

  return recorder.steps;
}

export const reverseString = createStringAlgorithm(
  'Reverse String',
  generateReverseStringSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Builds the reversed string character by character.'
);

function generatePalindromeCheckSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'racecar');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);
  let left = 0;
  let right = chars.length - 1;
  let isPalindrome = true;

  recorder.push({
    description: 'Check palindrome using two pointers',
    visualizationData: { string: chars, left, right },
    variables: { left, right },
    memory: { string: str },
    codeLine: 1,
  });

  while (left < right) {
    recorder.push({
      action: 'compare',
      description: `Compare "${chars[left]}" and "${chars[right]}"`,
      visualizationData: { string: chars, left, right },
      highlights: [left, right],
      variables: { left, right, leftChar: chars[left], rightChar: chars[right] },
      memory: { isPalindrome },
      codeLine: 2,
    });

    if (chars[left] !== chars[right]) {
      isPalindrome = false;
      recorder.push({
        action: 'not-found',
        description: 'Mismatch found, string is not a palindrome',
        visualizationData: { string: chars, left, right, mismatch: true },
        highlights: [left, right],
        variables: { isPalindrome },
        memory: { result: false },
        codeLine: 3,
      });
      break;
    }

    left += 1;
    right -= 1;
  }

  recorder.push({
    action: isPalindrome ? 'found' : 'not-found',
    description: isPalindrome ? 'All mirrored pairs match' : 'Palindrome check completed with mismatch',
    visualizationData: { string: chars, complete: true, isPalindrome },
    variables: { isPalindrome },
    memory: { result: isPalindrome },
    codeLine: 4,
  });

  return recorder.steps;
}

export const palindromeCheckString = createStringAlgorithm(
  'Palindrome Check',
  generatePalindromeCheckSteps,
  { time: 'O(n)', space: 'O(1)' },
  'Checks mirrored characters from both ends.'
);

function generateCharacterCountSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'banana');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(k)' };
  const recorder = createStepRecorder(complexity);
  const counts = new Map<string, number>();

  chars.forEach((char, index) => {
    counts.set(char, (counts.get(char) ?? 0) + 1);
    recorder.push({
      action: 'count',
      description: `Count "${char}" -> ${counts.get(char)}`,
      visualizationData: { string: chars, index, counts: Object.fromEntries(counts.entries()) },
      highlights: [index],
      variables: { char, count: counts.get(char) },
      memory: { counts: Object.fromEntries(counts.entries()) },
      codeLine: 1,
    });
  });

  return recorder.steps;
}

export const characterCount = createStringAlgorithm(
  'Character Count',
  generateCharacterCountSteps,
  { time: 'O(n)', space: 'O(k)' },
  'Builds a frequency map of characters.'
);

function generateFindLengthSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'Noirly');
  const chars = toChars(str);
  const complexity = { time: 'O(1)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);

  recorder.push({
    description: `Read string length: ${chars.length}`,
    visualizationData: { string: chars },
    variables: { length: chars.length },
    memory: { string: str },
    codeLine: 1,
  });

  return recorder.steps;
}

export const findLength = createStringAlgorithm(
  'Find Length',
  generateFindLengthSteps,
  { time: 'O(1)', space: 'O(1)' },
  'Returns the string length property.'
);

function generateUpperLowerSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'Noirly Lab');
  const chars = toChars(str);
  const upper = str.toUpperCase();
  const lower = str.toLowerCase();
  const complexity = { time: 'O(n)', space: 'O(n)' };
  const recorder = createStepRecorder(complexity);

  recorder.push({
    action: 'visit',
    description: 'Transform string to uppercase and lowercase forms',
    visualizationData: { string: chars, upper: toChars(upper), lower: toChars(lower) },
    variables: { upper, lower },
    memory: { original: str },
    codeLine: 1,
  });

  return recorder.steps;
}

export const uppercaseLowercase = createStringAlgorithm(
  'Uppercase / Lowercase',
  generateUpperLowerSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Applies case transformations across all characters.'
);

function generateRemoveSpacesSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'Noirly Code Lab');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(n)' };
  const recorder = createStepRecorder(complexity);

  recorder.push({
    description: 'Remove spaces from input string',
    visualizationData: { string: chars },
    memory: { original: str },
    codeLine: 1,
  });

  const removed = str.replace(/\s+/g, '');

  recorder.push({
    action: 'delete',
    description: `Result after removing spaces: "${removed}"`,
    visualizationData: { string: chars, cleaned: toChars(removed), removedCount: str.length - removed.length },
    variables: { removedCount: str.length - removed.length },
    memory: { result: removed, cleanedLength: removed.length },
    codeLine: 2,
  });

  return recorder.steps;
}

export const removeSpaces = createStringAlgorithm(
  'Remove Spaces',
  generateRemoveSpacesSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Filters whitespace characters from the string.'
);