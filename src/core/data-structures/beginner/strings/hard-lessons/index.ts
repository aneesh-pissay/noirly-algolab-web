import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { characterReplacement, longestUniqueSubstring, minWindowSubstring, permutationString } from '../../../_internal/window-algorithms';
import { createStepRecorder, createStringAlgorithm, getString, toChars } from '../easy-lessons/helpers';

function generateLongestPalindromicSubstringSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'babad');
  const chars = toChars(str);
  const complexity = { time: 'O(n^2)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);

  let bestStart = 0;
  let bestLength = 1;

  const expand = (left: number, right: number) => {
    while (left >= 0 && right < chars.length && chars[left] === chars[right]) {
      recorder.push({
        action: 'compare',
        description: `Expand around center: compare ${left} and ${right}`,
        visualizationData: { string: chars, left, right, bestStart, bestLength },
        highlights: [left, right],
        variables: { left, right, bestLength },
        memory: { best: str.slice(bestStart, bestStart + bestLength) },
        codeLine: 1,
      });

      const length = right - left + 1;
      if (length > bestLength) {
        bestLength = length;
        bestStart = left;
      }
      left -= 1;
      right += 1;
    }
  };

  for (let center = 0; center < chars.length; center += 1) {
    expand(center, center);
    expand(center, center + 1);
  }

  recorder.push({
    action: 'found',
    description: `Longest palindromic substring: "${str.slice(bestStart, bestStart + bestLength)}"`,
    visualizationData: { string: chars, start: bestStart, length: bestLength },
    highlights: Array.from({ length: bestLength }, (_, i) => bestStart + i),
    variables: { bestStart, bestLength },
    memory: { result: str.slice(bestStart, bestStart + bestLength) },
    codeLine: 2,
  });

  return recorder.steps;
}

export const longestPalindromicSubstring = createStringAlgorithm(
  'Longest Palindrome',
  generateLongestPalindromicSubstringSteps,
  { time: 'O(n^2)', space: 'O(1)' },
  'Expands around each center to find the longest palindrome.'
);

function generateRabinKarpSteps(input: AlgorithmInput): AlgorithmStep[] {
  const text = getString(input, 'str', 'abracadabra');
  const pattern = getString(input, 'pattern', 'cada');
  const complexity = { time: 'O(n + m)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);
  const base = 101;

  const hash = (value: string): number => {
    let sum = 0;
    for (let i = 0; i < value.length; i += 1) {
      sum = sum * base + value.charCodeAt(i);
    }
    return sum;
  };

  const patternHash = hash(pattern);
  for (let i = 0; i + pattern.length <= text.length; i += 1) {
    const window = text.slice(i, i + pattern.length);
    const windowHash = hash(window);
    recorder.push({
      action: 'compare',
      description: `Compare rolling hash at index ${i}`,
      visualizationData: { text: toChars(text), pattern: toChars(pattern), index: i, windowHash, patternHash },
      highlights: Array.from({ length: pattern.length }, (_, step) => i + step),
      variables: { index: i, windowHash, patternHash },
      memory: { window },
      codeLine: 1,
    });

    if (windowHash === patternHash && window === pattern) {
      recorder.push({
        action: 'found',
        description: `Pattern found at index ${i}`,
        visualizationData: { index: i, text: toChars(text), pattern: toChars(pattern) },
        highlights: Array.from({ length: pattern.length }, (_, step) => i + step),
        variables: { index: i },
        memory: { result: i },
        codeLine: 2,
      });
      return recorder.steps;
    }
  }

  recorder.push({
    action: 'not-found',
    description: 'Pattern not found',
    visualizationData: { text: toChars(text), pattern: toChars(pattern) },
    memory: { result: -1 },
    codeLine: 2,
  });

  return recorder.steps;
}

export const rabinKarpAlgorithm = createStringAlgorithm(
  'Rabin Karp',
  generateRabinKarpSteps,
  { time: 'O(n + m)', space: 'O(1)' },
  'Searches a pattern using hash comparison before exact check.'
);

function buildLps(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let length = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length += 1;
      lps[i] = length;
      i += 1;
    } else if (length > 0) {
      length = lps[length - 1];
    } else {
      lps[i] = 0;
      i += 1;
    }
  }

  return lps;
}

function generateKmpSteps(input: AlgorithmInput): AlgorithmStep[] {
  const text = getString(input, 'str', 'ababcabcabababd');
  const pattern = getString(input, 'pattern', 'ababd');
  const complexity = { time: 'O(n + m)', space: 'O(m)' };
  const recorder = createStepRecorder(complexity);

  const lps = buildLps(pattern);
  let i = 0;
  let j = 0;

  while (i < text.length) {
    recorder.push({
      action: 'compare',
      description: `Compare text[${i}] and pattern[${j}]`,
      visualizationData: { text: toChars(text), pattern: toChars(pattern), i, j, lps },
      highlights: [i],
      variables: { i, j },
      memory: { lps },
      codeLine: 1,
    });

    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) {
        recorder.push({
          action: 'found',
          description: `Pattern found at index ${i - j}`,
          visualizationData: { text: toChars(text), pattern: toChars(pattern), index: i - j, lps },
          highlights: Array.from({ length: pattern.length }, (_, step) => i - j + step),
          variables: { index: i - j },
          memory: { result: i - j },
          codeLine: 2,
        });
        return recorder.steps;
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }

  recorder.push({
    action: 'not-found',
    description: 'Pattern not found',
    visualizationData: { text: toChars(text), pattern: toChars(pattern), lps },
    memory: { result: -1 },
    codeLine: 2,
  });

  return recorder.steps;
}

export const kmpAlgorithm = createStringAlgorithm(
  'KMP Algorithm',
  generateKmpSteps,
  { time: 'O(n + m)', space: 'O(m)' },
  'Uses LPS table to skip redundant comparisons in pattern matching.'
);

function generateZAlgorithmSteps(input: AlgorithmInput): AlgorithmStep[] {
  const text = getString(input, 'str', 'abxabcabcaby');
  const pattern = getString(input, 'pattern', 'abcaby');
  const combined = `${pattern}$${text}`;
  const z = new Array(combined.length).fill(0);
  const complexity = { time: 'O(n + m)', space: 'O(n + m)' };
  const recorder = createStepRecorder(complexity);

  let left = 0;
  let right = 0;

  for (let i = 1; i < combined.length; i += 1) {
    if (i <= right) {
      z[i] = Math.min(right - i + 1, z[i - left]);
    }
    while (i + z[i] < combined.length && combined[z[i]] === combined[i + z[i]]) {
      z[i] += 1;
    }
    if (i + z[i] - 1 > right) {
      left = i;
      right = i + z[i] - 1;
    }

    recorder.push({
      action: 'compare',
      description: `Build Z at index ${i}: ${z[i]}`,
      visualizationData: { combined: toChars(combined), z, i, left, right },
      highlights: [i],
      variables: { i, zValue: z[i], left, right },
      memory: { z },
      codeLine: 1,
    });
  }

  const matchIndex = z.findIndex((value) => value === pattern.length);
  const found = matchIndex >= 0;
  const result = found ? matchIndex - pattern.length - 1 : -1;

  recorder.push({
    action: found ? 'found' : 'not-found',
    description: found ? `Pattern found at index ${result}` : 'Pattern not found',
    visualizationData: { combined: toChars(combined), z, result },
    variables: { result },
    memory: { result },
    codeLine: 2,
  });

  return recorder.steps;
}

export const zAlgorithm = createStringAlgorithm(
  'Z Algorithm',
  generateZAlgorithmSteps,
  { time: 'O(n + m)', space: 'O(n + m)' },
  'Builds Z-array on pattern+delimiter+text for linear-time search.'
);

export const manacherAlgorithm = createStringAlgorithm(
  'Manacher Algorithm',
  generateLongestPalindromicSubstringSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Uses center expansion surrogate steps to explain palindrome growth workflow.'
);

export { longestUniqueSubstring, minWindowSubstring, permutationString, characterReplacement };