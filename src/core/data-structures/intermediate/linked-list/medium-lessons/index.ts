import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createLinkedListAlgorithm, createStepRecorder, getList, getNumber, getSecondList } from '../helpers';

export const reverseLinkedList = createLinkedListAlgorithm(
  'Reverse Linked List',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [1, 2, 3, 4, 5]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const reversed: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'prev = null, current = head',
      visualizationData: { list: [...list], reversed: [], prev: null },
      variables: { prev: null },
      memory: { list: [...list] },
      codeLine: 1,
    });

    list.forEach((value, index) => {
      reversed.unshift(value);
      recorder.push({
        action: 'move-pointer',
        description: `Point node ${value}'s next to prev, advance prev/current`,
        visualizationData: { list: [...list], reversed: [...reversed], current: index },
        highlights: [index],
        variables: { current: value, prev: reversed[1] ?? null },
        memory: { reversed: [...reversed] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: 'current is null — new head is the old tail',
      visualizationData: { list: [...reversed], reversed: [...reversed], head: reversed[0] },
      variables: { head: reversed[0] },
      memory: { reversed: [...reversed] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Iteratively reverses next pointers using prev/current/next.'
);

export const middleOfLinkedList = createLinkedListAlgorithm(
  'Middle Of Linked List',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [1, 2, 3, 4, 5, 6]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let slow = 0;
    let fast = 0;

    recorder.push({
      action: 'initialize',
      description: 'slow and fast both start at head',
      visualizationData: { list: [...list], slow, fast },
      variables: { slow, fast },
      memory: { list: [...list] },
      codeLine: 1,
    });

    while (fast < list.length && fast + 1 < list.length) {
      slow += 1;
      fast += 2;
      recorder.push({
        action: 'move-pointer',
        description: `slow → node[${slow}], fast → node[${Math.min(fast, list.length - 1)}]`,
        visualizationData: { list: [...list], slow, fast: Math.min(fast, list.length - 1) },
        highlights: [slow, Math.min(fast, list.length - 1)],
        variables: { slow, fast },
        memory: { list: [...list] },
        codeLine: 2,
      });
    }

    recorder.push({
      action: 'found',
      description: `Fast reached the end — middle node is node[${slow}] = ${list[slow]}`,
      visualizationData: { list: [...list], middle: slow },
      highlights: [slow],
      variables: { middle: list[slow] },
      memory: { list: [...list] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Finds the middle node using slow and fast pointers.'
);

export const detectCycle = createLinkedListAlgorithm(
  'Detect Cycle',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [3, 2, 0, -4]);
    const cycleAt = getNumber(input, 'cycleIndex', 1);
    const hasCycle = cycleAt >= 0 && cycleAt < list.length;
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    let slow = 0;
    let fast = 0;

    recorder.push({
      action: 'initialize',
      description: `Floyd's algorithm: slow/fast at head${hasCycle ? `, tail links back to node[${cycleAt}]` : ', no cycle'}`,
      visualizationData: { list: [...list], slow, fast, cycleAt: hasCycle ? cycleAt : null },
      variables: { slow, fast },
      memory: { list: [...list] },
      codeLine: 1,
    });

    const next = (pos: number): number => {
      if (pos >= list.length - 1) return hasCycle ? cycleAt : list.length;
      return pos + 1;
    };

    for (let step = 0; step < list.length * 2 + 2; step += 1) {
      slow = next(slow);
      fast = next(next(fast));
      if (slow >= list.length || fast >= list.length) {
        recorder.push({
          action: 'not-found',
          description: 'fast pointer reached null — no cycle exists',
          visualizationData: { list: [...list], result: 'no-cycle' },
          variables: { hasCycle: false },
          memory: { list: [...list] },
          codeLine: 3,
        });
        break;
      }
      recorder.push({
        action: 'move-pointer',
        description: `slow → node[${slow}], fast → node[${fast}]`,
        visualizationData: { list: [...list], slow, fast },
        highlights: [slow, fast],
        variables: { slow, fast },
        memory: { list: [...list] },
        codeLine: 2,
      });
      if (slow === fast) {
        recorder.push({
          action: 'found',
          description: `slow and fast met at node[${slow}] — cycle detected`,
          visualizationData: { list: [...list], meet: slow, result: 'cycle' },
          highlights: [slow],
          variables: { hasCycle: true },
          memory: { list: [...list] },
          codeLine: 3,
        });
        break;
      }
    }

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  "Uses Floyd's tortoise and hare to detect a loop."
);

export const removeNthNode = createLinkedListAlgorithm(
  'Remove Nth Node',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const list = getList(input, [1, 2, 3, 4, 5]);
    const n = Math.max(1, Math.min(list.length, Math.trunc(getNumber(input, 'n', 2))));
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(1)' });
    const removeIndex = list.length - n;

    recorder.push({
      action: 'initialize',
      description: `Remove ${n}th node from the end (node[${removeIndex}])`,
      visualizationData: { list: [...list], n, target: removeIndex },
      variables: { n },
      memory: { list: [...list] },
      codeLine: 1,
    });

    let fast = 0;
    for (let i = 0; i < n; i += 1) {
      fast += 1;
      recorder.push({
        action: 'move-pointer',
        description: `Advance fast pointer ${i + 1}/${n} to create a gap`,
        visualizationData: { list: [...list], fast },
        highlights: [Math.min(fast, list.length - 1)],
        variables: { fast },
        memory: { list: [...list] },
        codeLine: 2,
      });
    }

    let slow = 0;
    while (fast < list.length) {
      fast += 1;
      slow += 1;
      recorder.push({
        action: 'move-pointer',
        description: 'Move slow and fast together until fast hits the end',
        visualizationData: { list: [...list], slow, fast },
        highlights: [slow],
        variables: { slow, fast },
        memory: { list: [...list] },
        codeLine: 3,
      });
    }

    const removed = list.splice(removeIndex, 1)[0];
    recorder.push({
      action: 'delete',
      description: `Unlink node ${removed} (slow.next = slow.next.next)`,
      visualizationData: { list: [...list], removed },
      variables: { removed },
      memory: { list: [...list] },
      codeLine: 4,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Removes the nth node from the end in one pass using two pointers.'
);

export const mergeTwoSortedLists = createLinkedListAlgorithm(
  'Merge Two Sorted Lists',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getList(input, [1, 3, 5, 7]);
    const b = getSecondList(input, [2, 4, 6]);
    const recorder = createStepRecorder({ time: 'O(n + m)', space: 'O(1)' });
    const merged: number[] = [];
    let i = 0;
    let j = 0;

    recorder.push({
      action: 'initialize',
      description: 'Use a dummy head; compare front nodes of both lists',
      visualizationData: { listA: [...a], listB: [...b], merged: [] },
      variables: { i, j },
      memory: { merged: [] },
      codeLine: 1,
    });

    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) {
        merged.push(a[i]);
        recorder.push({
          action: 'compare',
          description: `${a[i]} ≤ ${b[j]} → link node from list A`,
          visualizationData: { listA: [...a], listB: [...b], merged: [...merged], i, j },
          highlights: [i],
          variables: { picked: a[i] },
          memory: { merged: [...merged] },
          codeLine: 2,
        });
        i += 1;
      } else {
        merged.push(b[j]);
        recorder.push({
          action: 'compare',
          description: `${b[j]} < ${a[i]} → link node from list B`,
          visualizationData: { listA: [...a], listB: [...b], merged: [...merged], i, j },
          highlights: [j],
          variables: { picked: b[j] },
          memory: { merged: [...merged] },
          codeLine: 2,
        });
        j += 1;
      }
    }

    while (i < a.length) merged.push(a[i++]);
    while (j < b.length) merged.push(b[j++]);

    recorder.push({
      action: 'merge',
      description: 'Append remaining nodes — merge complete',
      visualizationData: { merged: [...merged] },
      variables: { length: merged.length },
      memory: { merged: [...merged] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n + m)', space: 'O(1)' },
  'Merges two sorted lists by splicing nodes in order.'
);

export const addTwoNumbers = createLinkedListAlgorithm(
  'Add Two Numbers',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const a = getList(input, [2, 4, 3]);
    const b = getSecondList(input, [5, 6, 4]);
    const recorder = createStepRecorder({ time: 'O(max(n, m))', space: 'O(max(n, m))' });
    const result: number[] = [];
    let carry = 0;
    const len = Math.max(a.length, b.length);

    recorder.push({
      action: 'initialize',
      description: 'Digits stored in reverse order; add node-by-node with carry',
      visualizationData: { listA: [...a], listB: [...b], result: [] },
      variables: { carry },
      memory: { result: [] },
      codeLine: 1,
    });

    for (let k = 0; k < len; k += 1) {
      const x = a[k] ?? 0;
      const y = b[k] ?? 0;
      const sum = x + y + carry;
      carry = Math.floor(sum / 10);
      result.push(sum % 10);
      recorder.push({
        action: 'calculate',
        description: `${x} + ${y} + carry = ${sum} → digit ${sum % 10}, carry ${carry}`,
        visualizationData: { listA: [...a], listB: [...b], result: [...result], position: k },
        highlights: [k],
        variables: { sum, carry, digit: sum % 10 },
        memory: { result: [...result] },
        codeLine: 2,
      });
    }

    if (carry > 0) {
      result.push(carry);
      recorder.push({
        action: 'insert',
        description: `Final carry ${carry} becomes a new leading node`,
        visualizationData: { result: [...result] },
        variables: { carry },
        memory: { result: [...result] },
        codeLine: 3,
      });
    }

    return recorder.steps;
  },
  { time: 'O(max(n, m))', space: 'O(max(n, m))' },
  'Adds two numbers represented as reversed digit lists with carry.'
);

export const linkedListIntermediateAlgorithms = [
  reverseLinkedList,
  middleOfLinkedList,
  detectCycle,
  removeNthNode,
  mergeTwoSortedLists,
  addTwoNumbers,
] as const;
