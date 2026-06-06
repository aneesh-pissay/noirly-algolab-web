import type { Algorithm } from '@/src/core/engine/types';
import { findLessonByAlgorithmId } from './curriculum';
import { getTopicTheory } from './curriculumTheory';
import { algorithmTheory, type AlgorithmTheory } from './algorithmTheory';
import { algorithmChallenges, type ChallengeQuestion } from './algorithmChallenges';

export type { AlgorithmTheory as LessonTheory, ChallengeQuestion as QuizQuestion };

const THEORY_ALIASES: Record<string, string> = {
  'sorting-bubble': 'bubble-sort',
  'array-reverse': 'reverse-array',
  'array-two-sum': 'two-sum',
  'queue-sliding-window-maximum': 'sliding-window-max',
  'string-palindrome-check': 'palindrome-check',
};

function resolveTheoryKey(algorithmId: string): string {
  return THEORY_ALIASES[algorithmId] ?? algorithmId;
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .filter((p) => !['array', 'string', 'stack', 'queue', 'hashmap', 'hashset', 'sorting', 'searching', 'recursion', 'graph', 'linked', 'list', 'binary', 'tree'].includes(p))
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || slug;
}

function buildTheoryFromAlgorithm(
  algorithmId: string,
  algorithm: Algorithm,
  lessonName?: string
): AlgorithmTheory {
  const ctx = findLessonByAlgorithmId(algorithmId);
  const topicTheory = ctx
    ? getTopicTheory(ctx.topic.id, ctx.topic.name, ctx.topic.description)
    : null;
  const displayName = lessonName ?? algorithm.name;

  return {
    id: algorithmId,
    overview: `${displayName}: ${algorithm.description} ${topicTheory?.overview ?? ''}`.trim(),
    howItWorks: [
      `Initialize the input and set up any pointers, indices, or auxiliary structures needed for ${displayName}.`,
      `Process each step shown in the visualizer — watch how data changes at every operation.`,
      `Apply the core logic: ${algorithm.description.toLowerCase()}`,
      `Track time complexity ${algorithm.complexity.time} and space complexity ${algorithm.complexity.space} as you follow along.`,
      `Verify the final state matches the expected output before moving to the quiz.`,
    ],
    keyPoints: [
      `Time complexity: ${algorithm.complexity.time}`,
      `Space complexity: ${algorithm.complexity.space}`,
      `Category: ${algorithm.category}`,
      ...(topicTheory?.keyConcepts.slice(0, 2) ?? []),
    ],
    useCases: topicTheory?.realWorld ?? [
      'Technical interviews and coding assessments',
      'Competitive programming problems',
      'Production systems requiring efficient data processing',
      'Building foundational DSA intuition',
    ],
    pros: [
      'Builds step-by-step understanding through visualization',
      `Efficient approach with ${algorithm.complexity.time} time complexity`,
      'Reusable pattern for similar problems in the same category',
    ],
    cons: [
      'Edge cases require careful boundary checking',
      'Performance depends on input size and data distribution',
      'May need adaptation for variations of the core problem',
    ],
  };
}

export function getLessonTheory(
  algorithmId: string,
  algorithm?: Algorithm | null,
  lessonName?: string
): AlgorithmTheory {
  const key = resolveTheoryKey(algorithmId);
  if (algorithmTheory[key]) return { ...algorithmTheory[key], id: algorithmId };
  if (algorithmTheory[algorithmId]) return algorithmTheory[algorithmId];

  if (algorithm) return buildTheoryFromAlgorithm(algorithmId, algorithm, lessonName);

  const ctx = findLessonByAlgorithmId(algorithmId);
  const topicTheory = ctx
    ? getTopicTheory(ctx.topic.id, ctx.topic.name, ctx.topic.description)
    : null;

  return {
    id: algorithmId,
    overview: topicTheory?.overview ?? `Learn ${lessonName ?? titleCase(algorithmId)} through interactive visualization and assessment.`,
    howItWorks: [
      'Study the theory overview to understand the problem and approach.',
      'Watch the step-by-step visualizer to see each operation in action.',
      'Follow the code panel to connect logic with execution.',
      'Pass the quiz to confirm your understanding before marking complete.',
    ],
    keyPoints: topicTheory?.keyConcepts ?? ['Core operations', 'Complexity analysis', 'Edge cases', 'Pattern recognition'],
    useCases: topicTheory?.realWorld ?? ['Interview preparation', 'Algorithm study', 'Problem-solving practice'],
    pros: ['Visual learning reinforces memory', 'Self-paced progression', 'Immediate feedback via quiz'],
    cons: ['Requires active engagement', 'Practice needed for mastery', 'Variations may need extra study'],
  };
}

function shuffleWithSeed<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const j = hash % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuizQuestions(
  algorithmId: string,
  algorithm?: Algorithm | null,
  lessonName?: string
): ChallengeQuestion[] {
  const ctx = findLessonByAlgorithmId(algorithmId);
  const name = lessonName ?? algorithm?.name ?? titleCase(algorithmId);
  const time = ctx?.lesson.time ?? algorithm?.complexity.time ?? 'O(n)';
  const space = ctx?.lesson.space ?? algorithm?.complexity.space ?? 'O(1)';
  const category = algorithm?.category ?? ctx?.track.id ?? 'data-structure';
  const description = algorithm?.description ?? ctx?.topic.description ?? 'process data efficiently';

  const wrongTimes = shuffleWithSeed(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'].filter((t) => t !== time), algorithmId + 't');
  const wrongSpaces = shuffleWithSeed(['O(1)', 'O(n)', 'O(n²)', 'O(log n)'].filter((s) => s !== space), algorithmId + 's');

  const correctDesc = description.charAt(0).toUpperCase() + description.slice(1);
  const categoryLabel = category.replace('-', ' ');

  const q1Options = shuffleWithSeed([time, wrongTimes[0], wrongTimes[1], wrongTimes[2]], algorithmId + '1');
  const q1: ChallengeQuestion = {
    id: `${algorithmId}-q-time`,
    question: `What is the time complexity of ${name}?`,
    options: q1Options,
    correctAnswer: q1Options.indexOf(time),
    explanation: `${name} runs in ${time} time based on the algorithm's design and input size.`,
  };

  const q2Options = shuffleWithSeed([space, wrongSpaces[0], wrongSpaces[1], wrongSpaces[2]], algorithmId + '2');
  const q2: ChallengeQuestion = {
    id: `${algorithmId}-q-space`,
    question: `What is the space complexity of ${name}?`,
    options: q2Options,
    correctAnswer: q2Options.indexOf(space),
    explanation: `${name} requires ${space} auxiliary space.`,
  };

  const q3Options = shuffleWithSeed(
    [
      correctDesc,
      `Sort elements using only ${categoryLabel} brute-force comparisons`,
      'Allocate maximum memory for caching',
      'Skip input validation entirely',
    ],
    algorithmId + '3'
  );
  const q3: ChallengeQuestion = {
    id: `${algorithmId}-q-concept`,
    question: `What best describes the main goal of ${name}?`,
    options: q3Options,
    correctAnswer: q3Options.indexOf(correctDesc),
    explanation: `The core purpose is: ${description}`,
  };

  return [q1, q2, q3];
}

export function getLessonQuiz(
  algorithmId: string,
  algorithm?: Algorithm | null,
  lessonName?: string
): ChallengeQuestion[] {
  const key = resolveTheoryKey(algorithmId);
  const explicit = algorithmChallenges[key] ?? algorithmChallenges[algorithmId];
  if (explicit && explicit.length >= 3) return explicit;

  return generateQuizQuestions(algorithmId, algorithm, lessonName);
}
