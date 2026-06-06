export type HeapKind = 'min' | 'max';

export function siftUp(heap: number[], index: number, kind: HeapKind): void {
  const cmp = (a: number, b: number) => (kind === 'min' ? a < b : a > b);
  let i = index;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (cmp(heap[i], heap[parent])) {
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    } else break;
  }
}

export function siftDown(heap: number[], index: number, kind: HeapKind, size = heap.length): void {
  const cmp = (a: number, b: number) => (kind === 'min' ? a < b : a > b);
  let i = index;
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let best = i;
    if (left < size && cmp(heap[left], heap[best])) best = left;
    if (right < size && cmp(heap[right], heap[best])) best = right;
    if (best === i) break;
    [heap[i], heap[best]] = [heap[best], heap[i]];
    i = best;
  }
}

export function buildHeap(values: number[], kind: HeapKind): number[] {
  const heap = [...values];
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i -= 1) {
    siftDown(heap, i, kind);
  }
  return heap;
}
