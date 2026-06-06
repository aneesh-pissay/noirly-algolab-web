import type { AggregatedUserProgress } from '@/lib/curriculum-progress';
import type { CompleteLessonResult, UserProgress } from '@/src/features/progress/progress.types';

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export type ProgressApiResponse = AggregatedUserProgress;

export interface CompleteLessonApiResponse {
  progress: ProgressApiResponse;
  result: CompleteLessonResult;
}

export async function getUserProgress(): Promise<ProgressApiResponse> {
  const response = await fetch('/api/progress', {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to load progress');
  }

  return response.json();
}

export async function completeLesson(
  lessonIdOrAlgorithmId: string,
  quizScore = 100
): Promise<CompleteLessonApiResponse> {
  const response = await fetch('/api/progress/complete', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ lessonId: lessonIdOrAlgorithmId, quizScore }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to complete lesson');
  }

  return response.json();
}

export async function updateCurrentLesson(lessonId: string): Promise<ProgressApiResponse> {
  const response = await fetch('/api/progress', {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentLesson: lessonId }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to update current lesson');
  }

  return response.json();
}

export async function updateXP(amount: number): Promise<never> {
  throw new Error('updateXP is handled server-side via completeLesson');
}

export async function unlockLesson(lessonId: string): Promise<never> {
  throw new Error('unlockLesson is handled server-side via completeLesson');
}

export type { UserProgress };
