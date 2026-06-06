import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createStepRecorder, createStringAlgorithm, getString, getStringArray, toChars } from '../easy-lessons/helpers';

function generateValidAnagramSteps(input: AlgorithmInput): AlgorithmStep[] {
  const source = getString(input, 'str', 'listen');
  const target = getString(input, 'targetStr', 'silent');
  const complexity = { time: 'O(n)', space: 'O(k)' };
  const recorder = createStepRecorder(complexity);

  const sourceSorted = toChars(source).sort().join('');
  const targetSorted = toChars(target).sort().join('');
  const isAnagram = sourceSorted === targetSorted;

  recorder.push({
    action: 'compare',
    description: `Compare sorted strings "${sourceSorted}" and "${targetSorted}"`,
    visualizationData: { source: toChars(source), target: toChars(target), sourceSorted, targetSorted },
    variables: { sourceLength: source.length, targetLength: target.length },
    memory: { isAnagram },
    codeLine: 1,
  });

  return recorder.steps;
}

export const validAnagram = createStringAlgorithm(
  'Valid Anagram',
  generateValidAnagramSteps,
  { time: 'O(n log n)', space: 'O(n)' },
  'Checks whether two strings contain the same characters with same frequencies.'
);

function generateFrequencyCounterSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'aabccde');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(k)' };
  const recorder = createStepRecorder(complexity);
  const freq = new Map<string, number>();

  chars.forEach((char, index) => {
    freq.set(char, (freq.get(char) ?? 0) + 1);
    recorder.push({
      action: 'count',
      description: `freq["${char}"] = ${freq.get(char)}`,
      visualizationData: { string: chars, index, freq: Object.fromEntries(freq.entries()) },
      highlights: [index],
      variables: { char, count: freq.get(char) },
      memory: { freq: Object.fromEntries(freq.entries()) },
      codeLine: 1,
    });
  });

  return recorder.steps;
}

export const frequencyCounter = createStringAlgorithm(
  'Frequency Counter',
  generateFrequencyCounterSteps,
  { time: 'O(n)', space: 'O(k)' },
  'Builds a frequency hash map for string characters.'
);

function generateFirstUniqueCharacterSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'leetcode');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(k)' };
  const recorder = createStepRecorder(complexity);
  const freq = new Map<string, number>();

  chars.forEach((char) => {
    freq.set(char, (freq.get(char) ?? 0) + 1);
  });

  recorder.push({
    description: 'Frequency map prepared',
    visualizationData: { string: chars, freq: Object.fromEntries(freq.entries()) },
    memory: { freq: Object.fromEntries(freq.entries()) },
    codeLine: 1,
  });

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    recorder.push({
      action: 'compare',
      description: `Check if "${char}" is unique`,
      visualizationData: { string: chars, index, freq: Object.fromEntries(freq.entries()) },
      highlights: [index],
      variables: { index, char, count: freq.get(char) },
      memory: { current: char },
      codeLine: 2,
    });

    if (freq.get(char) === 1) {
      recorder.push({
        action: 'found',
        description: `First unique character found at index ${index}`,
        visualizationData: { string: chars, index, uniqueChar: char },
        highlights: [index],
        variables: { index, char },
        memory: { result: index },
        codeLine: 3,
      });
      return recorder.steps;
    }
  }

  recorder.push({
    action: 'not-found',
    description: 'No unique character found',
    visualizationData: { string: chars },
    memory: { result: -1 },
    codeLine: 3,
  });

  return recorder.steps;
}

export const firstUniqueCharacter = createStringAlgorithm(
  'First Unique Character',
  generateFirstUniqueCharacterSteps,
  { time: 'O(n)', space: 'O(k)' },
  'Finds the first index with frequency 1.'
);

function generateRemoveDuplicatesSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'programming');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(k)' };
  const recorder = createStepRecorder(complexity);
  const seen = new Set<string>();
  const output: string[] = [];

  chars.forEach((char, index) => {
    const alreadySeen = seen.has(char);
    if (!alreadySeen) {
      seen.add(char);
      output.push(char);
    }

    recorder.push({
      action: alreadySeen ? 'compare' : 'insert',
      description: alreadySeen ? `Skip duplicate "${char}"` : `Keep "${char}"`,
      visualizationData: { string: chars, index, output, seen: Array.from(seen.values()) },
      highlights: [index],
      variables: { char, alreadySeen },
      memory: { result: output.join('') },
      codeLine: 1,
    });
  });

  return recorder.steps;
}

export const removeDuplicatesString = createStringAlgorithm(
  'Remove Duplicates',
  generateRemoveDuplicatesSteps,
  { time: 'O(n)', space: 'O(k)' },
  'Removes repeated characters while preserving first occurrence order.'
);

function generateStringCompressionSteps(input: AlgorithmInput): AlgorithmStep[] {
  const str = getString(input, 'str', 'aaabbc');
  const chars = toChars(str);
  const complexity = { time: 'O(n)', space: 'O(n)' };
  const recorder = createStepRecorder(complexity);
  const out: string[] = [];

  let index = 0;
  while (index < chars.length) {
    const char = chars[index];
    let runLength = 1;
    while (index + runLength < chars.length && chars[index + runLength] === char) {
      runLength += 1;
    }

    out.push(runLength > 1 ? `${char}${runLength}` : char);
    recorder.push({
      action: 'count',
      description: `Compress run "${char}" x ${runLength}`,
      visualizationData: { string: chars, start: index, runLength, output: out.join('') },
      highlights: Array.from({ length: runLength }, (_, step) => index + step),
      variables: { char, runLength },
      memory: { output: out.join('') },
      codeLine: 1,
    });

    index += runLength;
  }

  return recorder.steps;
}

export const stringCompression = createStringAlgorithm(
  'String Compression',
  generateStringCompressionSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Compresses repeated character runs (RLE style).' 
);

function generateLongestCommonPrefixSteps(input: AlgorithmInput): AlgorithmStep[] {
  const words = getStringArray(input, 'words', ['flower', 'flow', 'flight']);
  const complexity = { time: 'O(n * m)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);

  if (words.length === 0) {
    recorder.push({ description: 'No words provided', memory: { prefix: '' }, codeLine: 1 });
    return recorder.steps;
  }

  let prefix = words[0];
  for (let i = 1; i < words.length; i += 1) {
    while (!words[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      recorder.push({
        action: 'compare',
        description: `Trim prefix -> "${prefix}"`,
        visualizationData: { words, currentWord: words[i], prefix },
        variables: { wordIndex: i, prefixLength: prefix.length },
        memory: { prefix },
        codeLine: 2,
      });
      if (!prefix) break;
    }
  }

  recorder.push({
    action: 'found',
    description: `Longest common prefix: "${prefix}"`,
    visualizationData: { words, prefix },
    memory: { prefix },
    codeLine: 3,
  });

  return recorder.steps;
}

export const longestCommonPrefix = createStringAlgorithm(
  'Longest Common Prefix',
  generateLongestCommonPrefixSteps,
  { time: 'O(n * m)', space: 'O(1)' },
  'Finds the longest starting substring shared by all words.'
);

function generateStringRotationCheckSteps(input: AlgorithmInput): AlgorithmStep[] {
  const source = getString(input, 'str', 'abcd');
  const target = getString(input, 'targetStr', 'cdab');
  const complexity = { time: 'O(n)', space: 'O(n)' };
  const recorder = createStepRecorder(complexity);

  const doubled = source + source;
  const isRotation = source.length === target.length && doubled.includes(target);

  recorder.push({
    action: 'search',
    description: `Check if "${target}" is inside "${doubled}"`,
    visualizationData: { source: toChars(source), target: toChars(target), doubled: toChars(doubled) },
    variables: { sourceLength: source.length, targetLength: target.length },
    memory: { isRotation },
    codeLine: 1,
  });

  return recorder.steps;
}

export const stringRotationCheck = createStringAlgorithm(
  'String Rotation Check',
  generateStringRotationCheckSteps,
  { time: 'O(n)', space: 'O(n)' },
  'Checks if one string is a rotation of another using concatenation.'
);

function generateSubstringSearchSteps(input: AlgorithmInput): AlgorithmStep[] {
  const source = getString(input, 'str', 'abracadabra');
  const target = getString(input, 'targetStr', 'cada');
  const complexity = { time: 'O(n * m)', space: 'O(1)' };
  const recorder = createStepRecorder(complexity);

  const index = source.indexOf(target);
  recorder.push({
    action: index >= 0 ? 'found' : 'not-found',
    description: index >= 0 ? `Substring found at index ${index}` : 'Substring not found',
    visualizationData: { source: toChars(source), target: toChars(target), index },
    variables: { index },
    memory: { source, target },
    codeLine: 1,
  });

  return recorder.steps;
}

export const substringSearch = createStringAlgorithm(
  'Substring Search',
  generateSubstringSearchSteps,
  { time: 'O(n * m)', space: 'O(1)' },
  'Searches the first occurrence of a pattern in a source string.'
);

function generateGroupAnagramsSteps(input: AlgorithmInput): AlgorithmStep[] {
  const words = getStringArray(input, 'words', ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
  const complexity = { time: 'O(n * k log k)', space: 'O(n * k)' };
  const recorder = createStepRecorder(complexity);
  const groups = new Map<string, string[]>();

  words.forEach((word, index) => {
    const key = toChars(word).sort().join('');
    const bucket = groups.get(key) ?? [];
    bucket.push(word);
    groups.set(key, bucket);

    recorder.push({
      action: 'insert',
      description: `Place "${word}" in anagram bucket "${key}"`,
      visualizationData: { words, index, key, groups: Object.fromEntries(groups.entries()) },
      highlights: [index],
      variables: { word, key },
      memory: { groups: Object.fromEntries(groups.entries()) },
      codeLine: 1,
    });
  });

  return recorder.steps;
}

export const groupAnagrams = createStringAlgorithm(
  'Group Anagrams',
  generateGroupAnagramsSteps,
  { time: 'O(n * k log k)', space: 'O(n * k)' },
  'Groups words that share the same sorted-character signature.'
);