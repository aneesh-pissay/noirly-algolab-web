import type { Algorithm } from '../../../engine/types';

import {
  createHashMap,
  deleteKey,
  getValueByKey,
  insertKeyValue,
} from './easy-lessons';
import {
  hashMapFrequencyCounter,
  firstUniqueCharacter,
  groupAnagramsHashMap,
  twoSumHashMap,
} from './medium-lessons';
import {
  designHashMap,
  lfuCache,
  lruCache,
  subarraySumEqualsK,
  topKFrequentElements,
} from './hard-lessons';

export {
  createHashMap,
  insertKeyValue,
  deleteKey,
  getValueByKey,
  hashMapFrequencyCounter,
};

export {
  twoSumHashMap,
  firstUniqueCharacter,
  groupAnagramsHashMap,
  subarraySumEqualsK,
};

export {
  lruCache,
  lfuCache,
  topKFrequentElements,
  designHashMap,
};

export const hashMapAlgorithmsByLevel = {
  easyLessons: [createHashMap, insertKeyValue, deleteKey, getValueByKey, hashMapFrequencyCounter],
  mediumLessons: [twoSumHashMap, firstUniqueCharacter, groupAnagramsHashMap, subarraySumEqualsK],
  hardLessons: [lruCache, lfuCache, topKFrequentElements, designHashMap],
} as const;

export const hashMapAlgorithms = [
  ...hashMapAlgorithmsByLevel.easyLessons,
  ...hashMapAlgorithmsByLevel.mediumLessons,
  ...hashMapAlgorithmsByLevel.hardLessons,
] as const;

export const hashMapAlgorithmRegistry = {
  'hashmap-create': createHashMap,
  'hashmap-insert-key': insertKeyValue,
  'hashmap-lookup-key': getValueByKey,
  'hashmap-delete-key': deleteKey,
  'hashmap-frequency-counter': hashMapFrequencyCounter,
  'hashmap-two-sum': twoSumHashMap,
  'hashmap-first-unique-character': firstUniqueCharacter,
  'hashmap-group-anagrams': groupAnagramsHashMap,
  'hashmap-subarray-sum-equals-k': subarraySumEqualsK,
  'hashmap-top-k-frequent-elements': topKFrequentElements,
  'hashmap-lru-cache': lruCache,
  'hashmap-lfu-cache': lfuCache,
  'hashmap-design-hashmap': designHashMap,
} as const satisfies Record<string, Algorithm>;

export type HashMapAlgorithmId = keyof typeof hashMapAlgorithmRegistry;

export function registerHashMapAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(hashMapAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
