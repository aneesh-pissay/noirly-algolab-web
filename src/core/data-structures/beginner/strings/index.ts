import type { Algorithm } from '../../../engine/types';

// Beginner
export {
  characterCount,
  palindromeCheckString,
  removeSpaces,
  reverseString,
  stringTraversal,
} from './easy-lessons';

// Intermediate
export {
  groupAnagrams,
  longestCommonPrefix,
  stringCompression,
  substringSearch,
  validAnagram,
} from './medium-lessons';

// Advanced
export {
  kmpAlgorithm,
  longestPalindromicSubstring,
  manacherAlgorithm,
  minWindowSubstring,
  rabinKarpAlgorithm,
} from './hard-lessons';

import {
  characterCount,
  palindromeCheckString,
  removeSpaces,
  reverseString,
  stringTraversal,
} from './easy-lessons';
import {
  groupAnagrams,
  longestCommonPrefix,
  stringCompression,
  substringSearch,
  validAnagram,
} from './medium-lessons';
import {
  kmpAlgorithm,
  longestPalindromicSubstring,
  manacherAlgorithm,
  minWindowSubstring,
  rabinKarpAlgorithm,
} from './hard-lessons';

export const stringAlgorithmsByLevel = {
  easyLessons: [
    stringTraversal,
    reverseString,
    palindromeCheckString,
    characterCount,
    removeSpaces,
  ],
  mediumLessons: [
    validAnagram,
    stringCompression,
    longestCommonPrefix,
    substringSearch,
    groupAnagrams,
  ],
  hardLessons: [
    longestPalindromicSubstring,
    minWindowSubstring,
    rabinKarpAlgorithm,
    kmpAlgorithm,
    manacherAlgorithm,
  ],
} as const;

export const stringAlgorithms = [
  ...stringAlgorithmsByLevel.easyLessons,
  ...stringAlgorithmsByLevel.mediumLessons,
  ...stringAlgorithmsByLevel.hardLessons,
] as const;

export const stringAlgorithmRegistry = {
  'string-traversal': stringTraversal,
  'string-reverse': reverseString,
  'string-palindrome-check': palindromeCheckString,
  'string-character-count': characterCount,
  'string-remove-spaces': removeSpaces,
  'string-valid-anagram': validAnagram,
  'string-compression': stringCompression,
  'string-longest-common-prefix': longestCommonPrefix,
  'string-substring-search': substringSearch,
  'string-group-anagrams': groupAnagrams,
  'string-longest-palindromic-substring': longestPalindromicSubstring,
  'string-minimum-window-substring': minWindowSubstring,
  'string-rabin-karp': rabinKarpAlgorithm,
  'string-kmp': kmpAlgorithm,
  'string-manacher': manacherAlgorithm,
} as const satisfies Record<string, Algorithm>;

export type StringAlgorithmId = keyof typeof stringAlgorithmRegistry;

export function registerStringAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(stringAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}