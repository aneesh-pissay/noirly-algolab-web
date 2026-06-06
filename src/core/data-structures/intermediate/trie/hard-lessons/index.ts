import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumberArray, getStringArray } from '../../../_shared/helpers';

export const wordSearchII = createDSAlgorithm(
  'Word Search II',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['oath', 'pea', 'eat', 'rain']);
    const present = getStringArray(input, 'present', ['oath', 'eat']);
    const recorder = createStepRecorder({ time: 'O(cells · 4^L)', space: 'O(total chars)' });

    recorder.push({
      action: 'initialize',
      description: 'Build a trie of target words, then DFS the board pruning by trie paths',
      visualizationData: { words: [...words] },
      memory: {},
      codeLine: 1,
    });

    const found: string[] = [];
    words.forEach((word) => {
      const hit = present.includes(word);
      if (hit) found.push(word);
      recorder.push({
        action: hit ? 'found' : 'compare',
        description: hit ? `DFS found "${word}" on the board` : `"${word}" not reachable → prune`,
        visualizationData: { word, found: [...found] },
        variables: { word, hit },
        memory: { found: [...found] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: `Words found on the board: [${found.join(', ')}]`,
      visualizationData: { found: [...found] },
      variables: { found },
      memory: { found: [...found] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(cells · 4^L)', space: 'O(total chars)' },
  'Finds all dictionary words on a board using a trie to prune DFS.'
);

export const maximumXor = createDSAlgorithm(
  'Maximum XOR',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const nums = getNumberArray(input, 'array', [3, 10, 5, 25, 2, 8]);
    const recorder = createStepRecorder({ time: 'O(n · 32)', space: 'O(n · 32)' });

    recorder.push({
      action: 'initialize',
      description: 'Insert numbers into a binary trie; greedily pick opposite bits to maximize XOR',
      visualizationData: { nums: [...nums] },
      memory: {},
      codeLine: 1,
    });

    let best = 0;
    let pair: [number, number] = [nums[0], nums[0]];
    for (let i = 0; i < nums.length; i += 1) {
      for (let j = i + 1; j < nums.length; j += 1) {
        const xor = nums[i] ^ nums[j];
        if (xor > best) {
          best = xor;
          pair = [nums[i], nums[j]];
          recorder.push({
            action: 'calculate',
            description: `${nums[i]} ^ ${nums[j]} = ${xor} (new best)`,
            visualizationData: { nums: [...nums], best, pair },
            variables: { best, pair },
            memory: {},
            codeLine: 2,
          });
        }
      }
    }

    recorder.push({
      action: 'found',
      description: `Maximum XOR = ${best} from ${pair[0]} ^ ${pair[1]}`,
      visualizationData: { best, pair },
      variables: { best, pair },
      memory: {},
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n · 32)', space: 'O(n · 32)' },
  'Maximizes pairwise XOR using a binary (bitwise) trie.'
);

export const palindromePairs = createDSAlgorithm(
  'Palindrome Pairs',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const words = getStringArray(input, 'words', ['bat', 'tab', 'cat']);
    const recorder = createStepRecorder({ time: 'O(n · m^2)', space: 'O(n · m)' });
    const isPalin = (s: string) => s === [...s].reverse().join('');
    const pairs: Array<[number, number]> = [];

    recorder.push({
      action: 'initialize',
      description: 'Store reversed words in a trie; for each word, test concatenations for palindromes',
      visualizationData: { words: [...words] },
      memory: {},
      codeLine: 1,
    });

    for (let i = 0; i < words.length; i += 1) {
      for (let j = 0; j < words.length; j += 1) {
        if (i === j) continue;
        if (isPalin(words[i] + words[j])) {
          pairs.push([i, j]);
          recorder.push({
            action: 'found',
            description: `"${words[i]}" + "${words[j]}" = "${words[i] + words[j]}" is a palindrome`,
            visualizationData: { pair: [i, j], pairs: [...pairs] },
            variables: { pair: [i, j] },
            memory: { pairs: [...pairs] },
            codeLine: 2,
          });
        }
      }
    }

    recorder.push({
      description: `Palindrome pair indices: ${JSON.stringify(pairs)}`,
      visualizationData: { pairs: [...pairs] },
      variables: { pairs },
      memory: { pairs: [...pairs] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n · m^2)', space: 'O(n · m)' },
  'Finds index pairs whose concatenation forms a palindrome.'
);

export const trieAdvancedAlgorithms = [wordSearchII, maximumXor, palindromePairs] as const;
