/**
 * Core type definitions for the Noirly AlgoLab visualization engine
 */

export type AlgorithmCategory = 'sorting' | 'searching' | 'tree' | 'graph' | 'dp' | 'pattern' | 'recursion' | 'data-structure';

export type AlgorithmAction =
  | 'compare'
  | 'swap'
  | 'move-pointer'
  | 'visit'
  | 'insert'
  | 'delete'
  | 'calculate'
  | 'push'
  | 'pop'
  | 'enqueue'
  | 'dequeue'
  | 'traverse'
  | 'merge'
  | 'partition'
  | 'shift'
  | 'place'
  | 'count'
  | 'distribute'
  | 'sort-bucket'
  | 'heap-build'
  | 'heapify'
  | 'set-gap'
  | 'update-gap'
  | 'flip'
  | 'flipped'
  | 'find-max'
  | 'find-position'
  | 'rotate'
  | 'process-digit'
  | 'count-digit'
  | 'create-count-array'
  | 'cumulative'
  | 'create-run'
  | 'insertion'
  | 'switch-to-heapsort'
  | 'switch-to-insertion'
  | 'initialize'
  | 'search'
  | 'search-left'
  | 'search-right'
  | 'found'
  | 'not-found'
  | 'divide'
  | 'relax'
  | 'choose'
  | 'backtrack';

export interface ComplexityInfo {
  time: string;
  space: string;
}

export interface AlgorithmStep {
  id: number;
  category: AlgorithmCategory;
  action: AlgorithmAction;
  description: string;
  visualizationData: Record<string, any>;
  highlights: number[];
  variables: Record<string, any>;
  memory: Record<string, any>;
  complexity: ComplexityInfo;
  codeLine: number;
}

export interface AlgorithmInput {
  array?: number[];
  target?: number;
  graph?: Graph;
  tree?: TreeNode;
  size?: number;
  [key: string]: any;
}

export interface AlgorithmResult {
  steps: AlgorithmStep[];
  finalState: any;
  metadata: {
    totalSteps: number;
    comparisons: number;
    swaps: number;
    complexity: ComplexityInfo;
  };
}

export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface Graph {
  vertices: number;
  edges: Map<number, number[]>;
  weighted?: boolean;
  weights?: Map<string, number>;
}

export interface VisualizerState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  steps: AlgorithmStep[];
  algorithm: string | null;
}

export interface Algorithm {
  name: string;
  category: AlgorithmCategory;
  generateSteps: (input: AlgorithmInput) => AlgorithmStep[];
  complexity: ComplexityInfo;
  description: string;
}
