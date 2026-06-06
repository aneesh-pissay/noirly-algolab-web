import { AlgorithmStep } from '@/src/core/engine/types';

export type RendererType = 'array' | 'stack' | 'queue' | 'tree' | 'graph' | 'generic';

export function getRendererType(step: AlgorithmStep | null): RendererType {
  if (!step) return 'generic';

  const data = step.visualizationData ?? {};

  if (Array.isArray(data.stack) || data.stack !== undefined) return 'stack';
  if (Array.isArray(data.queue) || data.queue !== undefined) return 'queue';
  if (data.tree !== undefined || data.nodes !== undefined || data.levelOrder !== undefined) return 'tree';
  if (data.graph !== undefined || data.edges !== undefined || data.vertices !== undefined) return 'graph';
  if (Array.isArray(data.array) || Array.isArray(data.nums) || Array.isArray(data.values)) return 'array';

  return 'generic';
}
