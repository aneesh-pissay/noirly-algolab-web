import { AlgorithmInput, AlgorithmStep } from '../../../../engine/types';
import { createDSAlgorithm, createStepRecorder, getNumber, getNumberArray, getStringArray } from '../../../_shared/helpers';

export const flattenMultilevelDll = createDSAlgorithm(
  'Flatten Multilevel DLL',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const top = getNumberArray(input, 'list', [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]);
    const recorder = createStepRecorder({ time: 'O(n)', space: 'O(n)' });
    const flat: number[] = [];

    recorder.push({
      action: 'initialize',
      description: 'DFS each node; when a child branch exists, splice it before next',
      visualizationData: { list: [...top], flat: [] },
      memory: { list: [...top] },
      codeLine: 1,
    });

    top.forEach((value, index) => {
      flat.push(value);
      recorder.push({
        action: 'visit',
        description: `Append node ${value}; if it has a child, descend and inline that level`,
        visualizationData: { list: [...top], flat: [...flat], current: index },
        highlights: [index],
        variables: { value },
        memory: { flat: [...flat] },
        codeLine: 2,
      });
    });

    recorder.push({
      description: 'All child pointers resolved — single-level DLL produced',
      visualizationData: { flat: [...flat] },
      memory: { flat: [...flat] },
      codeLine: 3,
    });

    return recorder.steps;
  },
  { time: 'O(n)', space: 'O(n)' },
  'Flattens a multilevel DLL by inlining child lists via DFS.'
);

export const designBrowserHistory = createDSAlgorithm(
  'Design Browser History',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const ops = getStringArray(input, 'operations', ['visit:A', 'visit:B', 'visit:C', 'back:1', 'back:1', 'forward:1', 'visit:D']);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(n)' });
    const history: string[] = ['home'];
    let current = 0;

    recorder.push({
      action: 'initialize',
      description: 'Browser history as a DLL with a current pointer at "home"',
      visualizationData: { history: [...history], current },
      variables: { current },
      memory: { history: [...history] },
      codeLine: 1,
    });

    ops.forEach((op) => {
      const [kind, raw] = op.split(':');
      if (kind === 'visit') {
        history.splice(current + 1);
        history.push(raw);
        current = history.length - 1;
        recorder.push({
          action: 'insert',
          description: `visit(${raw}): clear forward history, append, advance current`,
          visualizationData: { history: [...history], current },
          highlights: [current],
          variables: { current, page: raw },
          memory: { history: [...history] },
          codeLine: 2,
        });
      } else if (kind === 'back') {
        current = Math.max(0, current - Number(raw));
        recorder.push({
          action: 'move-pointer',
          description: `back(${raw}): move current to ${history[current]}`,
          visualizationData: { history: [...history], current },
          highlights: [current],
          variables: { current, page: history[current] },
          memory: { history: [...history] },
          codeLine: 3,
        });
      } else {
        current = Math.min(history.length - 1, current + Number(raw));
        recorder.push({
          action: 'move-pointer',
          description: `forward(${raw}): move current to ${history[current]}`,
          visualizationData: { history: [...history], current },
          highlights: [current],
          variables: { current, page: history[current] },
          memory: { history: [...history] },
          codeLine: 4,
        });
      }
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(n)' },
  'Models browser back/forward navigation with a DLL and a cursor.'
);

export const lruCacheDll = createDSAlgorithm(
  'LRU Cache',
  (input: AlgorithmInput): AlgorithmStep[] => {
    const capacity = Math.max(1, Math.trunc(getNumber(input, 'capacity', 2)));
    const ops = getStringArray(input, 'operations', ['put:1', 'put:2', 'get:1', 'put:3', 'get:2', 'put:4']);
    const recorder = createStepRecorder({ time: 'O(1)', space: 'O(capacity)' });
    const order: number[] = [];

    recorder.push({
      action: 'initialize',
      description: `LRU cache (capacity ${capacity}) backed by a DLL ordered by recency`,
      visualizationData: { order: [], capacity },
      variables: { capacity },
      memory: { order: [] },
      codeLine: 1,
    });

    ops.forEach((op) => {
      const [kind, raw] = op.split(':');
      const key = Number(raw);
      const idx = order.indexOf(key);
      if (kind === 'get') {
        if (idx !== -1) {
          order.splice(idx, 1);
          order.push(key);
          recorder.push({
            action: 'found',
            description: `get(${key}) hit → move node to front (MRU)`,
            visualizationData: { order: [...order], capacity },
            highlights: [order.length - 1],
            variables: { hit: true },
            memory: { order: [...order] },
            codeLine: 2,
          });
        } else {
          recorder.push({
            action: 'not-found',
            description: `get(${key}) miss`,
            visualizationData: { order: [...order], capacity },
            variables: { hit: false },
            memory: { order: [...order] },
            codeLine: 2,
          });
        }
      } else {
        if (idx !== -1) order.splice(idx, 1);
        order.push(key);
        if (order.length > capacity) {
          const evicted = order.shift();
          recorder.push({
            action: 'delete',
            description: `put(${key}) over capacity → evict LRU tail ${evicted}`,
            visualizationData: { order: [...order], capacity, evicted },
            variables: { evicted },
            memory: { order: [...order] },
            codeLine: 3,
          });
        } else {
          recorder.push({
            action: 'insert',
            description: `put(${key}) → insert at front`,
            visualizationData: { order: [...order], capacity },
            highlights: [order.length - 1],
            variables: { key },
            memory: { order: [...order] },
            codeLine: 3,
          });
        }
      }
    });

    return recorder.steps;
  },
  { time: 'O(1)', space: 'O(capacity)' },
  'LRU cache using a doubly linked list for O(1) recency updates.'
);

export const doublyLinkedListAdvancedAlgorithms = [
  flattenMultilevelDll,
  designBrowserHistory,
  lruCacheDll,
] as const;
