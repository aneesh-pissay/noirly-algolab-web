export * from './linked-list';
export * from './doubly-linked-list';
export * from './binary-tree';
export * from './bst';
export * from './heap';
export * from './trie';

import { registerLinkedListAlgorithms } from './linked-list';
import { registerDoublyLinkedListAlgorithms } from './doubly-linked-list';
import { registerBinaryTreeAlgorithms } from './binary-tree';
import { registerBstAlgorithms } from './bst';
import { registerHeapAlgorithms } from './heap';
import { registerTrieAlgorithms } from './trie';
import type { Algorithm } from '../../engine/types';

export function registerIntermediateDataStructureAlgorithms(engine: {
  registerAlgorithm(id: string, algorithm: Algorithm): void;
}): void {
  registerLinkedListAlgorithms(engine);
  registerDoublyLinkedListAlgorithms(engine);
  registerBinaryTreeAlgorithms(engine);
  registerBstAlgorithms(engine);
  registerHeapAlgorithms(engine);
  registerTrieAlgorithms(engine);
}
