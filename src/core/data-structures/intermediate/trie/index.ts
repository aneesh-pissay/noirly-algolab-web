import type { Algorithm } from '../../../engine/types';

import { createTrie, insertWordTrie, searchWordTrie, prefixSearch } from './easy-lessons';
import { autoComplete, wordDictionary, replaceWords, longestCommonPrefixTrie } from './medium-lessons';
import { wordSearchII, maximumXor, palindromePairs } from './hard-lessons';

export { createTrie, insertWordTrie, searchWordTrie, prefixSearch };
export { autoComplete, wordDictionary, replaceWords, longestCommonPrefixTrie };
export { wordSearchII, maximumXor, palindromePairs };

export const trieAlgorithmsByLevel = {
  easyLessons: [createTrie, insertWordTrie, searchWordTrie, prefixSearch],
  mediumLessons: [autoComplete, wordDictionary, replaceWords, longestCommonPrefixTrie],
  hardLessons: [wordSearchII, maximumXor, palindromePairs],
} as const;

export const trieAlgorithms = [
  ...trieAlgorithmsByLevel.easyLessons,
  ...trieAlgorithmsByLevel.mediumLessons,
  ...trieAlgorithmsByLevel.hardLessons,
] as const;

export const trieAlgorithmRegistry = {
  'trie-create': createTrie,
  'trie-insert-word': insertWordTrie,
  'trie-search-word': searchWordTrie,
  'trie-prefix-search': prefixSearch,
  'trie-auto-complete': autoComplete,
  'trie-word-dictionary': wordDictionary,
  'trie-replace-words': replaceWords,
  'trie-longest-common-prefix': longestCommonPrefixTrie,
  'trie-word-search-ii': wordSearchII,
  'trie-maximum-xor': maximumXor,
  'trie-palindrome-pairs': palindromePairs,
} as const satisfies Record<string, Algorithm>;

export type TrieAlgorithmId = keyof typeof trieAlgorithmRegistry;

export function registerTrieAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(trieAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
