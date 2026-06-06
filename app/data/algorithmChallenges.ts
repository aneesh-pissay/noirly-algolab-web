export interface ChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const algorithmChallenges: Record<string, ChallengeQuestion[]> = {
  'reverse-array': [
    {
      id: 'rev-1',
      question: 'What is the key idea behind reversing an array with two pointers?',
      options: [
        'Use extra array and copy values in reverse order',
        'Swap elements from both ends while moving inward',
        'Sort the array in descending order',
        'Rotate the array by one position repeatedly',
      ],
      correctAnswer: 1,
      explanation:
        'Two pointers start at left and right ends, swap values, then move inward until they cross.',
    },
    {
      id: 'rev-2',
      question: 'What is the time complexity of in-place reverse array?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctAnswer: 2,
      explanation: 'Each element is visited at most once through roughly n/2 swaps, so it is O(n).',
    },
    {
      id: 'rev-3',
      question: 'What is the space complexity of this two-pointer approach?',
      options: ['O(n)', 'O(n log n)', 'O(1)', 'O(2n)'],
      correctAnswer: 2,
      explanation: 'It swaps in place and uses only a temporary variable, so auxiliary space is O(1).',
    },
  ],
};

export function getChallengeForAlgorithm(algorithmId: string): ChallengeQuestion[] {
  return (
    algorithmChallenges[algorithmId] || [
      {
        id: `${algorithmId}-fallback-1`,
        question: 'What proves you understand this algorithm best?',
        options: [
          'Memorizing syntax only',
          'Understanding logic and complexity trade-offs',
          'Running it once',
          'Copy-pasting code',
        ],
        correctAnswer: 1,
        explanation:
          'Conceptual understanding and complexity analysis are required to solve new problems reliably.',
      },
      {
        id: `${algorithmId}-fallback-2`,
        question: 'When should an algorithm be marked complete in this lab?',
        options: [
          'After opening the page',
          'After reading theory only',
          'After passing the challenge',
          'After clicking play once',
        ],
        correctAnswer: 2,
        explanation: 'Completion is gated by challenge pass criteria so progress reflects mastery.',
      },
      {
        id: `${algorithmId}-fallback-3`,
        question: 'What is a good final step after solving an algorithm challenge?',
        options: [
          'Skip all review',
          'Confirm correctness, edge cases, and complexity',
          'Delete the solution',
          'Ignore test results',
        ],
        correctAnswer: 1,
        explanation: 'Reviewing edge cases and complexity ensures robust understanding before moving ahead.',
      },
    ]
  );
}
