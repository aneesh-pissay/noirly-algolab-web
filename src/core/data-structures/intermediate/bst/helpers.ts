import { AlgorithmInput } from '../../../engine/types';
import { getNumberArray } from '../../_shared/helpers';

export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export function bstInsert(root: BSTNode | null, value: number): BSTNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = bstInsert(root.left, value);
  else root.right = bstInsert(root.right, value);
  return root;
}

export function buildBST(values: number[]): BSTNode | null {
  let root: BSTNode | null = null;
  values.forEach((v) => {
    root = bstInsert(root, v);
  });
  return root;
}

export function inorder(root: BSTNode | null): number[] {
  const out: number[] = [];
  const walk = (node: BSTNode | null): void => {
    if (!node) return;
    walk(node.left);
    out.push(node.value);
    walk(node.right);
  };
  walk(root);
  return out;
}

export function getInsertValues(input: AlgorithmInput, fallback: number[]): number[] {
  return getNumberArray(input, 'array', fallback);
}
