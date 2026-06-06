import { AlgorithmInput } from '../../../engine/types';

export type Edge = [number, number, number?];

export function getGraphEdges(input: AlgorithmInput, fallback: Edge[]): Edge[] {
  const value = input.edges as unknown;
  if (Array.isArray(value) && value.every((e) => Array.isArray(e) && e.length >= 2)) {
    return value.map((e) => [Number(e[0]), Number(e[1]), e[2] !== undefined ? Number(e[2]) : undefined] as Edge);
  }
  return fallback.map((e) => [...e] as Edge);
}

export function getVertexCount(input: AlgorithmInput, edges: Edge[], fallback: number): number {
  const explicit = typeof input.vertices === 'number' ? input.vertices : undefined;
  if (explicit) return explicit;
  const maxFromEdges = edges.reduce((max, [u, v]) => Math.max(max, u, v), -1);
  return Math.max(fallback, maxFromEdges + 1);
}

export function buildAdjacency(vertices: number, edges: Edge[], directed = false): Map<number, number[]> {
  const adj = new Map<number, number[]>();
  for (let i = 0; i < vertices; i += 1) adj.set(i, []);
  edges.forEach(([u, v]) => {
    adj.get(u)?.push(v);
    if (!directed) adj.get(v)?.push(u);
  });
  adj.forEach((list) => list.sort((a, b) => a - b));
  return adj;
}

export function adjacencyToRecord(adj: Map<number, number[]>): Record<string, number[]> {
  return Object.fromEntries([...adj.entries()].map(([k, v]) => [String(k), [...v]]));
}
