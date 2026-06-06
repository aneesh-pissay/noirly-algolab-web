import { AlgorithmInput } from '../../../engine/types';
import { getNumberArray } from '../../_shared/helpers';

export interface BTNode {
  value: number;
  left: BTNode | null;
  right: BTNode | null;
}

/**
 * Builds a binary tree from a level-order array. Use `null` entries for missing children.
 */
export function buildTree(values: Array<number | null>): BTNode | null {
  if (values.length === 0 || values[0] === null) return null;
  const nodes: Array<BTNode | null> = values.map((v) => (v === null ? null : { value: v, left: null, right: null }));
  let childIndex = 1;
  for (let i = 0; i < nodes.length && childIndex < nodes.length; i += 1) {
    const node = nodes[i];
    if (!node) continue;
    if (childIndex < nodes.length) node.left = nodes[childIndex++] ?? null;
    if (childIndex < nodes.length) node.right = nodes[childIndex++] ?? null;
  }
  return nodes[0];
}

export function getTreeValues(input: AlgorithmInput, fallback: Array<number | null>): Array<number | null> {
  const value = input.tree as unknown;
  if (Array.isArray(value) && value.every((v) => v === null || typeof v === 'number')) {
    return [...(value as Array<number | null>)];
  }
  const arr = getNumberArray(input, 'array', []);
  return arr.length > 0 ? arr : [...fallback];
}
