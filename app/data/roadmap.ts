export interface RoadmapLevel {
  id: number;
  title: string;
  subtitle: string;
  phase: number;
  phaseLabel: string;
  status: 'locked' | 'in-progress' | 'completed';
  topics: RoadmapTopic[];
}

export interface RoadmapTopic {
  id: string;
  name: string;
  completed: boolean;
  href?: string;
}

export const learningRoadmap: RoadmapLevel[] = [
  {
    id: 1,
    title: 'Arrays',
    subtitle: 'Master the foundation of data structures',
    phase: 1,
    phaseLabel: 'Phase 1: Foundations',
    status: 'in-progress',
    topics: [
      { id: 'reverse-array', name: 'Reverse Array', completed: true, href: '/visual-lab/reverse-array' },
      { id: 'remove-duplicates', name: 'Remove Duplicates', completed: true, href: '/visual-lab/remove-duplicates' },
      { id: 'move-zeroes', name: 'Move Zeroes', completed: false, href: '/visual-lab/move-zeroes' },
      { id: 'partition-algorithm', name: 'Partition', completed: false, href: '/visual-lab/partition-algorithm' },
    ],
  },
  {
    id: 2,
    title: 'Strings',
    subtitle: 'Text manipulation and pattern matching',
    phase: 1,
    phaseLabel: 'Phase 1: Foundations',
    status: 'locked',
    topics: [
      { id: 'palindrome-check', name: 'Palindrome Check', completed: false, href: '/visual-lab/palindrome-check' },
      { id: 'longest-unique-substring', name: 'Unique Substring', completed: false, href: '/visual-lab/longest-unique-substring' },
      { id: 'character-replacement', name: 'Character Replacement', completed: false, href: '/visual-lab/character-replacement' },
      { id: 'permutation-string', name: 'Permutation String', completed: false, href: '/visual-lab/permutation-string' },
    ],
  },
  {
    id: 3,
    title: 'Sorting',
    subtitle: 'Organize data efficiently',
    phase: 1,
    phaseLabel: 'Phase 1: Foundations',
    status: 'locked',
    topics: [
      { id: 'bubble-sort', name: 'Bubble Sort', completed: false, href: '/visual-lab/bubble-sort' },
      { id: 'selection-sort', name: 'Selection Sort', completed: false, href: '/visual-lab/selection-sort' },
      { id: 'insertion-sort', name: 'Insertion Sort', completed: false, href: '/visual-lab/insertion-sort' },
      { id: 'merge-sort', name: 'Merge Sort', completed: false, href: '/visual-lab/merge-sort' },
      { id: 'quick-sort', name: 'Quick Sort', completed: false, href: '/visual-lab/quick-sort' },
      { id: 'heap-sort', name: 'Heap Sort', completed: false, href: '/visual-lab/heap-sort' },
    ],
  },
  {
    id: 4,
    title: 'Searching',
    subtitle: 'Find elements fast and efficiently',
    phase: 1,
    phaseLabel: 'Phase 1: Foundations',
    status: 'locked',
    topics: [
      { id: 'binary-search', name: 'Binary Search', completed: false, href: '/visual-lab/binary-search' },
      { id: 'jump-search', name: 'Jump Search', completed: false, href: '/visual-lab/jump-search' },
      { id: 'interpolation-search', name: 'Interpolation Search', completed: false, href: '/visual-lab/interpolation-search' },
      { id: 'exponential-search', name: 'Exponential Search', completed: false, href: '/visual-lab/exponential-search' },
      { id: 'ternary-search', name: 'Ternary Search', completed: false, href: '/visual-lab/ternary-search' },
    ],
  },
  {
    id: 5,
    title: 'Two Pointers',
    subtitle: 'Optimize array traversal techniques',
    phase: 2,
    phaseLabel: 'Phase 2: Pattern Skills',
    status: 'locked',
    topics: [
      { id: 'two-sum-sorted', name: 'Two Sum Sorted', completed: false, href: '/visual-lab/two-sum-sorted' },
      { id: 'three-sum', name: 'Three Sum', completed: false, href: '/visual-lab/three-sum' },
      { id: 'container-water', name: 'Container Water', completed: false, href: '/visual-lab/container-water' },
      { id: 'trapping-rain-water', name: 'Trapping Rain Water', completed: false, href: '/visual-lab/trapping-rain-water' },
    ],
  },
  {
    id: 6,
    title: 'Sliding Window',
    subtitle: 'Efficient subarray processing',
    phase: 2,
    phaseLabel: 'Phase 2: Pattern Skills',
    status: 'locked',
    topics: [
      { id: 'fixed-size-window', name: 'Fixed Size Window', completed: false, href: '/visual-lab/fixed-size-window' },
      { id: 'max-sum-size-k', name: 'Maximum Sum Size K', completed: false, href: '/visual-lab/max-sum-size-k' },
      { id: 'average-subarray', name: 'Average Subarray', completed: false, href: '/visual-lab/average-subarray' },
      { id: 'variable-window', name: 'Variable Window', completed: false, href: '/visual-lab/variable-window' },
      { id: 'min-size-subarray', name: 'Min Size Subarray', completed: false, href: '/visual-lab/min-size-subarray' },
      { id: 'min-window-substring', name: 'Min Window Substring', completed: false, href: '/visual-lab/min-window-substring' },
    ],
  },
  {
    id: 7,
    title: 'HashMap',
    subtitle: 'Fast lookups and frequency counting',
    phase: 2,
    phaseLabel: 'Phase 2: Pattern Skills',
    status: 'locked',
    topics: [
      { id: 'hashmap-basics', name: 'HashMap Basics', completed: false },
      { id: 'count-anagrams', name: 'Count Anagrams', completed: false, href: '/visual-lab/count-anagrams' },
      { id: 'k-distinct-chars', name: 'K Distinct Characters', completed: false, href: '/visual-lab/k-distinct-chars' },
      { id: 'fruit-basket', name: 'Fruit Basket', completed: false, href: '/visual-lab/fruit-basket' },
    ],
  },
  {
    id: 8,
    title: 'Stack + Queue',
    subtitle: 'LIFO and FIFO data structures',
    phase: 2,
    phaseLabel: 'Phase 2: Pattern Skills',
    status: 'locked',
    topics: [
      { id: 'stack-basics', name: 'Stack Basics', completed: false, href: '/data-structures/stack' },
      { id: 'queue-basics', name: 'Queue Basics', completed: false, href: '/data-structures/queue' },
      { id: 'first-negative-number', name: 'First Negative', completed: false, href: '/visual-lab/first-negative-number' },
      { id: 'sliding-window-max', name: 'Sliding Window Max', completed: false, href: '/visual-lab/sliding-window-max' },
    ],
  },
  {
    id: 9,
    title: 'Linked List',
    subtitle: 'Dynamic sequential data structures',
    phase: 3,
    phaseLabel: 'Phase 3: Core Structures',
    status: 'locked',
    topics: [
      { id: 'linked-list-basics', name: 'Linked List Basics', completed: false, href: '/data-structures/linked-list' },
      { id: 'middle-linked-list', name: 'Middle of List', completed: false, href: '/visual-lab/middle-linked-list' },
      { id: 'cycle-detection', name: 'Cycle Detection', completed: false, href: '/visual-lab/cycle-detection' },
      { id: 'reverse-linked-list', name: 'Reverse Linked List', completed: false },
    ],
  },
  {
    id: 10,
    title: 'Recursion',
    subtitle: 'Solve problems by breaking them down',
    phase: 3,
    phaseLabel: 'Phase 3: Core Structures',
    status: 'locked',
    topics: [
      { id: 'recursion-basics', name: 'Recursion Basics', completed: false },
      { id: 'factorial', name: 'Factorial', completed: false },
      { id: 'fibonacci', name: 'Fibonacci', completed: false },
      { id: 'tower-of-hanoi', name: 'Tower of Hanoi', completed: false },
    ],
  },
  {
    id: 11,
    title: 'Backtracking',
    subtitle: 'Explore all possible solutions',
    phase: 4,
    phaseLabel: 'Phase 4: Advanced Solving',
    status: 'locked',
    topics: [
      { id: 'backtracking-basics', name: 'Backtracking Basics', completed: false },
      { id: 'n-queens', name: 'N-Queens', completed: false },
      { id: 'sudoku-solver', name: 'Sudoku Solver', completed: false },
      { id: 'permutations', name: 'Permutations', completed: false },
    ],
  },
  {
    id: 12,
    title: 'Trees',
    subtitle: 'Hierarchical data structures',
    phase: 3,
    phaseLabel: 'Phase 3: Core Structures',
    status: 'locked',
    topics: [
      { id: 'binary-tree', name: 'Binary Tree', completed: false, href: '/data-structures/binary-tree' },
      { id: 'bst-search', name: 'BST Search', completed: false, href: '/visual-lab/bst-search' },
      { id: 'avl-search', name: 'AVL Tree', completed: false, href: '/visual-lab/avl-search' },
      { id: 'red-black-search', name: 'Red-Black Tree', completed: false, href: '/visual-lab/red-black-search' },
      { id: 'tree-traversals', name: 'Tree Traversals', completed: false },
    ],
  },
  {
    id: 13,
    title: 'Heap',
    subtitle: 'Priority queue data structure',
    phase: 3,
    phaseLabel: 'Phase 3: Core Structures',
    status: 'locked',
    topics: [
      { id: 'heap-basics', name: 'Heap Basics', completed: false },
      { id: 'heap-sort', name: 'Heap Sort', completed: false, href: '/visual-lab/heap-sort' },
      { id: 'kth-largest', name: 'Kth Largest Element', completed: false },
      { id: 'merge-k-sorted', name: 'Merge K Sorted Lists', completed: false },
    ],
  },
  {
    id: 14,
    title: 'Graph',
    subtitle: 'Model complex relationships',
    phase: 4,
    phaseLabel: 'Phase 4: Advanced Solving',
    status: 'locked',
    topics: [
      { id: 'graph-bfs', name: 'BFS', completed: false, href: '/visual-lab/graph-bfs' },
      { id: 'graph-dfs', name: 'DFS', completed: false, href: '/visual-lab/graph-dfs' },
      { id: 'dijkstra', name: 'Dijkstra', completed: false, href: '/visual-lab/dijkstra' },
      { id: 'a-star', name: 'A* Search', completed: false, href: '/visual-lab/a-star' },
      { id: 'bellman-ford', name: 'Bellman-Ford', completed: false, href: '/visual-lab/bellman-ford' },
    ],
  },
  {
    id: 15,
    title: 'Greedy',
    subtitle: 'Make locally optimal choices',
    phase: 4,
    phaseLabel: 'Phase 4: Advanced Solving',
    status: 'locked',
    topics: [
      { id: 'greedy-basics', name: 'Greedy Basics', completed: false },
      { id: 'activity-selection', name: 'Activity Selection', completed: false },
      { id: 'fractional-knapsack', name: 'Fractional Knapsack', completed: false },
      { id: 'huffman-coding', name: 'Huffman Coding', completed: false },
    ],
  },
  {
    id: 16,
    title: 'Dynamic Programming',
    subtitle: 'Optimize by remembering past solutions',
    phase: 5,
    phaseLabel: 'Phase 5: Mastery',
    status: 'locked',
    topics: [
      { id: 'dp-basics', name: 'DP Basics', completed: false },
      { id: 'fibonacci-dp', name: 'Fibonacci DP', completed: false },
      { id: 'knapsack', name: '0/1 Knapsack', completed: false },
      { id: 'longest-subsequence', name: 'Longest Common Subsequence', completed: false },
      { id: 'edit-distance', name: 'Edit Distance', completed: false },
    ],
  },
  {
    id: 17,
    title: 'Trie + Advanced',
    subtitle: 'Master advanced data structures',
    phase: 5,
    phaseLabel: 'Phase 5: Mastery',
    status: 'locked',
    topics: [
      { id: 'trie-basics', name: 'Trie Basics', completed: false },
      { id: 'word-search', name: 'Word Search', completed: false },
      { id: 'autocomplete', name: 'Autocomplete', completed: false },
      { id: 'segment-tree', name: 'Segment Tree', completed: false },
    ],
  },
];
