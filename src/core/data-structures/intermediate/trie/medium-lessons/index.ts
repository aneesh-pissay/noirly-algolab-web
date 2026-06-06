import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getString, getStringArray } from '../../../_shared/helpers';
import { buildTrie, collectWords } from '../helpers';

export const autoComplete = createDSAlgorithm(
  'Auto Complete',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['apple', 'app', 'apply', 'application', 'banana']);
    const prefix = getString(input, 'prefix', 'app');
    const root = buildTrie(words);
    const recorder = createStepRecorder({ time: 'O(p + matches)', space: 'O(n)' });

    recorder.push({
      action: 'initialize',
      description: `Navigate to the "${prefix}" node, then DFS to collect completions`,
      visualizationData: { words: [...words], prefix },
      variables: { prefix },
      memory: {},
      codeLine: 1,
    });

    let node = root;
    let valid = true;
    for (const ch of prefix) {
      if (node.children[ch]) node = node.children[ch];
      else {
        valid = false;
        break;
      }
    }

    const suggestions = valid ? collectWords(node, prefix) : [];
    recorder.push({
      action: 'found',
      description: `Suggestions for "${prefix}": [${suggestions.join(', ')}]`,
      visualizationData: { prefix, suggestions: [...suggestions] },
      variables: { suggestions },
      memory: { suggestions: [...suggestions] },
      codeLine: 2,
    });

    return recorder.steps;
  },
  { time: 'O(p + matches)', space: 'O(n)' },
  'Returns all words sharing a given prefix via trie DFS.'
);

export const wordDictionary = createDSAlgorithm(
  'Word Dictionary',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['bad', 'dad', 'mad']);
    const pattern = getString(input, 'pattern', '.ad');
    const recorder = createStepRecorder({ time: 'O(n · m)', space: 'O(n · m)' });

    recorder.push({
      action: 'initialize',
      description: `Match pattern "${pattern}" where '.' is a wildcard`,
      visualizationData: { words: [...words], pattern },
      variables: { pattern },
      memory: {},
      codeLine: 1,
    });

    const matches = words.filter((w) => {
      if (w.length !== pattern.length) return false;
      return [...pattern].every((c, i) => c === '.' || c === w[i]);
    });

    matches.forEach((w) => {
      recorder.push({
        action: 'compare',
        description: `"${w}" matches "${pattern}"`,
        visualizationData: { pattern, match: w },
        variables: { match: w },
        memory: {},
        codeLine: 2,
      });
    });

    recorder.push({
      action: matches.length ? 'found' : 'not-found',
      description: matches.length ? `Matches: [${matches.join(', ')}]` : 'No words match the pattern',
      visualizationData: { matches: [...matches] },
      variables: { matches },
      memory: { matches: [...matches] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n · m)', space: 'O(n · m)' },
  'Supports word matching with "." wildcards via DFS over the trie.'
);

export const replaceWords = createDSAlgorithm(
  'Replace Words',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const roots = getStringArray(input, 'roots', ['cat', 'bat', 'rat']);
    const sentence = getStringArray(input, 'sentence', ['the', 'cattle', 'was', 'rattled', 'by', 'the', 'battery']);
    const recorder = createStepRecorder({ time: 'O(total chars)', space: 'O(total chars)' });
    const rootSet = [...roots].sort((a, b) => a.length - b.length);

    recorder.push({
      action: 'initialize',
      description: 'Replace each word with the shortest matching root prefix',
      visualizationData: { roots: [...roots], sentence: [...sentence] },
      memory: {},
      codeLine: 1,
    });

    const result = sentence.map((word) => {
      const root = rootSet.find((r) => word.startsWith(r));
      const replacement = root ?? word;
      recorder.push({
        action: 'visit',
        description: root ? `"${word}" → root "${root}"` : `"${word}" has no root → unchanged`,
        visualizationData: { word, replacement },
        variables: { word, replacement },
        memory: {},
        codeLine: 2,
      });
      return replacement;
    });

    recorder.push({
      action: 'found',
      description: `Result: "${result.join(' ')}"`,
      visualizationData: { result: [...result] },
      variables: { result: result.join(' ') },
      memory: { result: [...result] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(total chars)', space: 'O(total chars)' },
  'Replaces words by their shortest root using a trie of roots.'
);

export const longestCommonPrefixTrie = createDSAlgorithm(
  'Longest Common Prefix',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['flower', 'flow', 'flight']);
    const recorder = createStepRecorder({ time: 'O(total chars)', space: 'O(total chars)' });

    recorder.push({
      action: 'initialize',
      description: 'Insert all words; the LCP is the single-child chain from the root',
      visualizationData: { words: [...words] },
      memory: {},
      codeLine: 1,
    });

    let prefix = '';
    if (words.length > 0) {
      const first = words[0];
      for (let i = 0; i < first.length; i += 1) {
        const ch = first[i];
        if (words.every((w) => w[i] === ch)) {
          prefix += ch;
          recorder.push({
            action: 'compare',
            description: `All words share '${ch}' at position ${i} → prefix "${prefix}"`,
            visualizationData: { words: [...words], prefix },
            variables: { prefix },
            memory: {},
            codeLine: 2,
          });
        } else {
          recorder.push({
            action: 'not-found',
            description: `Branch at position ${i} → stop`,
            visualizationData: { words: [...words], prefix },
            variables: { prefix },
            memory: {},
            codeLine: 3,
          });
          break;
        }
      }
    }

    recorder.push({
      action: 'found',
      description: `Longest common prefix = "${prefix}"`,
      visualizationData: { prefix },
      variables: { prefix },
      memory: {},
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(total chars)', space: 'O(total chars)' },
  'Finds the longest common prefix as the trie root chain.'
);

export const trieIntermediateAlgorithms = [autoComplete, wordDictionary, replaceWords, longestCommonPrefixTrie] as const;
