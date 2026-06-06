import { AlgorithmInput, AlgorithmStep } from '../../engine/types';
import { createAlgorithm, createStepRecorder, getArray, getNumber, getString } from '../../algorithms/_shared/helpers';

export const longestUniqueSubstring = createAlgorithm(
  'Longest Unique Substring',
  'pattern',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const s = getString(input, 'str', 'abcabcbb');
    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(k)' });
    const seen = new Set<string>();
    let best = 0;
    let start = 0;

    for (let end = 0; end < s.length; end += 1) {
      while (seen.has(s[end])) {
        seen.delete(s[start]);
        start += 1;
      }
      seen.add(s[end]);
      best = Math.max(best, end - start + 1);
      recorder.push({
        action: 'visit',
        description: `Window [${start}..${end}] length ${end - start + 1}`,
        visualizationData: { string: s, start, end, best },
        variables: { best },
        memory: {},
        codeLine: 1,
      });
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Sliding window for longest substring without repeating characters.'
);

export const minWindowSubstring = createAlgorithm(
  'Minimum Window Substring',
  'pattern',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const s = getString(input, 'str', 'ADOBECODEBANC');
    const t = getString(input, 'pattern', 'ABC');
    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(k)' });
    let left = 0;
    let formed = 0;
    const need = t.length;
    const required = new Map<string, number>();
    t.split('').forEach((c) => required.set(c, (required.get(c) ?? 0) + 1));

    recorder.push({ action: 'initialize', description: `Find smallest window in "${s}" containing "${t}"`, visualizationData: { s, t }, memory: {}, codeLine: 1 });

    for (let right = 0; right < s.length; right += 1) {
      const ch = s[right];
      if (required.has(ch) && (required.get(ch) ?? 0) > 0) formed += 1;
      recorder.push({ action: 'move-pointer', description: `Expand to ${right}, formed=${formed}/${need}`, visualizationData: { left, right, formed }, memory: {}, codeLine: 2 });
      while (formed >= need && left <= right) {
        recorder.push({ action: 'found', description: `Candidate window [${left}..${right}]`, visualizationData: { left, right }, memory: {}, codeLine: 3 });
        left += 1;
        formed = Math.max(0, formed - 1);
      }
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Minimum window substring using expand/shrink sliding window.'
);

export const slidingWindowMax = createAlgorithm(
  'Sliding Window Maximum',
  'pattern',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const arr = getArray(input, [1, 3, -1, -3, 5, 3, 6, 7]);
    const k = Math.max(1, Math.trunc(getNumber(input, 'k', 3)));
    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(k)' });
    const deque: number[] = [];
    const result: number[] = [];

    for (let i = 0; i < arr.length; i += 1) {
      while (deque.length && deque[0] <= i - k) deque.shift();
      while (deque.length && arr[deque[deque.length - 1]] <= arr[i]) deque.pop();
      deque.push(i);
      if (i >= k - 1) {
        result.push(arr[deque[0]]);
        recorder.push({ action: 'dequeue', description: `Window ending ${i}: max = ${arr[deque[0]]}`, visualizationData: { array: [...arr], i, max: arr[deque[0]], result: [...result] }, memory: {}, codeLine: 1 });
      }
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(k)' },
  'Deque-based sliding window maximum.'
);

export const characterReplacement = createAlgorithm(
  'Character Replacement',
  'pattern',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const s = getString(input, 'str', 'ABAB');
    const k = Math.max(0, Math.trunc(getNumber(input, 'k', 2)));
    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });
    let left = 0;
    let maxFreq = 0;
    let best = 0;
    const freq = new Map<string, number>();

    for (let right = 0; right < s.length; right += 1) {
      const ch = s[right];
      freq.set(ch, (freq.get(ch) ?? 0) + 1);
      maxFreq = Math.max(maxFreq, freq.get(ch) ?? 0);
      while (right - left + 1 - maxFreq > k) {
        const leftCh = s[left];
        freq.set(leftCh, (freq.get(leftCh) ?? 1) - 1);
        left += 1;
      }
      best = Math.max(best, right - left + 1);
      recorder.push({ action: 'visit', description: `Window [${left}..${right}] best=${best}`, visualizationData: { left, right, best }, memory: {}, codeLine: 1 });
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Longest repeating character replacement with k changes.'
);

export const permutationString = createAlgorithm(
  'Permutation String',
  'pattern',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const s1 = getString(input, 's1', 'ab');
    const s2 = getString(input, 's2', 'eidbaooo');
    const recorder = createStepRecorder('pattern', { time: 'O(n)', space: 'O(1)' });
    const need = new Map<string, number>();
    s1.split('').forEach((c) => need.set(c, (need.get(c) ?? 0) + 1));
    let left = 0;
    let matches = 0;

    recorder.push({ action: 'initialize', description: `Check if "${s2}" contains permutation of "${s1}"`, visualizationData: { s1, s2 }, memory: {}, codeLine: 1 });

    for (let right = 0; right < s2.length; right += 1) {
      const ch = s2[right];
      if (need.has(ch)) {
        need.set(ch, (need.get(ch) ?? 0) - 1);
        if ((need.get(ch) ?? 0) === 0) matches += 1;
      }
      recorder.push({ action: 'compare', description: `Window [${left}..${right}] matches=${matches}`, visualizationData: { left, right, matches }, memory: {}, codeLine: 2 });
      if (matches === need.size) {
        recorder.push({ action: 'found', description: 'Permutation found', visualizationData: { left, right }, memory: {}, codeLine: 3 });
        break;
      }
      while (right - left + 1 > s1.length) left += 1;
    }
    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(1)' },
  'Checks if s2 contains a permutation of s1.'
);
