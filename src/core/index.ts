/**
 * Core export hub — algorithm engines, data-structure engines, visualizer.
 */

// Algorithms (beginner / intermediate / advanced — matches algorithms.txt)
export * from './algorithms';

// Data-structure registration (import lesson modules directly to avoid name clashes with algorithms)
export { registerArrayAlgorithms } from './data-structures/beginner/arrays';
export { registerStringAlgorithms } from './data-structures/beginner/strings';
export { registerHashMapAlgorithms } from './data-structures/beginner/hashmap';
export { registerHashSetAlgorithms } from './data-structures/beginner/hashset';
export { registerStackAlgorithms } from './data-structures/beginner/stack';
export { registerQueueAlgorithms } from './data-structures/beginner/queue';
export { registerIntermediateDataStructureAlgorithms } from './data-structures/intermediate';
export { registerAdvancedDataStructureAlgorithms } from './data-structures/advanced';

// Engine
export { visualizerEngine } from './engine/VisualizerEngine';
export { visualizerStore } from './engine/store';
export type { Algorithm, AlgorithmInput, AlgorithmStep, VisualizerState } from './engine/types';
