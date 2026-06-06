import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getString, getStringArray } from '../../../_shared/helpers';
import { buildTrie } from '../helpers';

const DEFAULT_WORDS = ['cat', 'car', 'card', 'dog'];

export const createTrie = createDSAlgorithm(
  'Create Trie',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', DEFAULT_WORDS);
    const recorder = createStepRecorder({ time: 'O(total chars)', space: 'O(total chars)' });

    recorder.push({
      action: 'initialize',
      description: 'A trie starts with an empty root node',
      visualizationData: { words: [...words], inserted: [] },
      memory: { inserted: [] },
      codeLine: 1,
    });

    const inserted: string[] = [];
    words.forEach((word) => {
      inserted.push(word);
      recorder.push({
        action: 'insert',
        description: `Insert "${word}", creating nodes for new characters`,
        visualizationData: { words: [...words], inserted: [...inserted] },
        variables: { word },
        memory: { inserted: [...inserted] },
        codeLine: 2,
      });
    });

    return recorder.steps;
  },
  { time: 'O(total chars)', space: 'O(total chars)' },
  'Builds a trie by inserting a set of words.'
);

export const insertWordTrie = createDSAlgorithm(
  'Insert Word',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const word = getString(input, 'word', 'card');
    const recorder = createStepRecorder({ time: 'O(m)', space: 'O(m)' });

    recorder.push({
      action: 'initialize',
      description: `Insert "${word}" character by character from the root`,
      visualizationData: { word, path: '' },
      variables: { word },
      memory: {},
      codeLine: 1,
    });

    let path = '';
    for (const ch of word) {
      path += ch;
      recorder.push({
        action: 'move-pointer',
        description: `Follow/create child '${ch}' → path "${path}"`,
        visualizationData: { word, path, char: ch },
        variables: { char: ch, path },
        memory: {},
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'place',
      description: `Mark the node after "${word}" as end-of-word`,
      visualizationData: { word, isEnd: true },
      variables: { isEnd: true },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(m)', space: 'O(m)' },
  'Inserts a single word, marking its terminal node.'
);

export const searchWordTrie = createDSAlgorithm(
  'Search Word',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', DEFAULT_WORDS);
    const word = getString(input, 'word', 'car');
    const root = buildTrie(words);
    const recorder = createStepRecorder({ time: 'O(m)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Search for "${word}" by walking child links`,
      visualizationData: { word, words: [...words] },
      variables: { word },
      memory: {},
      codeLine: 1,
    });

    let node = root;
    let ok = true;
    let path = '';
    for (const ch of word) {
      if (node.children[ch]) {
        node = node.children[ch];
        path += ch;
        recorder.push({
          action: 'compare',
          description: `Child '${ch}' exists → path "${path}"`,
          visualizationData: { word, path, char: ch },
          variables: { char: ch },
          memory: {},
          codeLine: 2,
        });
      } else {
        ok = false;
        recorder.push({
          action: 'not-found',
          description: `No child '${ch}' → "${word}" absent`,
          visualizationData: { word, char: ch },
          variables: { found: false },
          memory: {},
          codeLine: 3,
        });
        break;
      }
    }

    if (ok) {
      recorder.push({
        action: node.isEnd ? 'found' : 'not-found',
        description: node.isEnd ? `"${word}" found (terminal node)` : `Prefix exists but "${word}" is not a complete word`,
        visualizationData: { word, isEnd: node.isEnd },
        variables: { found: node.isEnd },
        memory: {},
        codeLine: 4,
      });
    }

    return recorder.steps;
  },
  { time: 'O(m)', space: 'O(1)' },
  'Searches for a full word, checking the end-of-word flag.'
);

export const prefixSearch = createDSAlgorithm(
  'Prefix Search',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', DEFAULT_WORDS);
    const prefix = getString(input, 'prefix', 'ca');
    const root = buildTrie(words);
    const recorder = createStepRecorder({ time: 'O(m)', space: 'O(1)' });

    recorder.push({
      action: 'initialize',
      description: `Check whether any word starts with "${prefix}"`,
      visualizationData: { prefix, words: [...words] },
      variables: { prefix },
      memory: {},
      codeLine: 1,
    });

    let node = root;
    let ok = true;
    for (const ch of prefix) {
      if (node.children[ch]) {
        node = node.children[ch];
        recorder.push({
          action: 'compare',
          description: `Child '${ch}' exists → continue`,
          visualizationData: { prefix, char: ch },
          variables: { char: ch },
          memory: {},
          codeLine: 2,
        });
      } else {
        ok = false;
        break;
      }
    }

    recorder.push({
      action: ok ? 'found' : 'not-found',
      description: ok ? `Prefix "${prefix}" exists in the trie` : `Prefix "${prefix}" not present`,
      visualizationData: { prefix, exists: ok },
      variables: { exists: ok },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(m)', space: 'O(1)' },
  'Checks whether a prefix path exists in the trie.'
);

export const trieBeginnerAlgorithms = [createTrie, insertWordTrie, searchWordTrie, prefixSearch] as const;
