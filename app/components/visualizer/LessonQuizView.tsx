'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Map, XCircle } from 'lucide-react';
import type { QuizQuestion } from '@/app/data/lessonContent';
import type { LessonMeta } from '@/src/features/progress';

const PASS_SCORE = 70;

interface Props {
  lessonName: string;
  questions: QuizQuestion[];
  alreadyCompleted: boolean;
  nextLesson: LessonMeta | null;
  learnPathHref: string | null;
  onPass: () => void;
  onComplete: (quizScore: number) => void | Promise<void>;
  isCompleting: boolean;
}

export default function LessonQuizView({
  lessonName,
  questions,
  alreadyCompleted,
  nextLesson,
  learnPathHref,
  onPass,
  onComplete,
  isCompleting,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [completedThisSession, setCompletedThisSession] = useState(false);

  const current = questions[currentIndex];
  const selected = answers[currentIndex];
  const isAnswered = selected !== undefined;
  const isCorrect = isAnswered && selected === current.correctAnswer;

  const correctCount = Object.entries(answers).filter(
    ([i, a]) => a === questions[Number(i)].correctAnswer
  ).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= PASS_SCORE;
  const lessonDone = alreadyCompleted || completedThisSession;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const handleSubmit = () => setSubmitted(true);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSubmitted(false);
    } else {
      setShowResults(true);
      if (passed && !hasPassed) {
        setHasPassed(true);
        onPass();
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
    setHasPassed(false);
  };

  const handleCompleteClick = async () => {
    await onComplete(score);
    setCompletedThisSession(true);
  };

  if (showResults) {
    return (
      <div className="flex h-full flex-col gap-6 overflow-auto rounded-xl border border-outline-variant/30 bg-surface-container p-6">
        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 ${
              passed ? 'border-emerald-400 bg-emerald-500/15' : 'border-red-400 bg-red-500/15'
            }`}
          >
            {passed ? <CheckCircle2 size={40} className="text-emerald-400" /> : <XCircle size={40} className="text-red-400" />}
          </div>
          <h2 className="text-2xl font-bold text-on-surface">{passed ? 'Quiz Passed!' : 'Keep Practicing'}</h2>
          <p className="mt-1 text-on-surface-variant">
            {correctCount} / {questions.length} correct
          </p>
          <p className="mt-2 text-4xl font-bold text-primary">{score}%</p>
          <p className="mt-1 text-sm text-on-surface-variant">
            {passed
              ? lessonDone
                ? 'Lesson complete — continue to the next lesson or return to the roadmap.'
                : 'You passed! Tap Complete Lesson to save your progress.'
              : `You need ${PASS_SCORE}% to pass. Try again.`}
          </p>
        </div>

        <div className="space-y-2">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const correct = userAnswer === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`rounded-lg border px-4 py-3 text-sm ${
                  correct ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-red-400/30 bg-red-500/10'
                }`}
              >
                <p className="font-medium text-on-surface">Q{i + 1}: {q.question}</p>
                {!correct && (
                  <p className="mt-1 text-xs text-on-surface-variant">Correct: {q.options[q.correctAnswer]}</p>
                )}
                <p className="mt-1 text-xs text-on-surface-variant/80">{q.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {!passed && (
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 cursor-pointer rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container-highest"
            >
              Try Again
            </button>
          )}
          {passed && !lessonDone && (
            <>
              <button
                type="button"
                onClick={handleRetry}
                className="flex-1 cursor-pointer rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container-highest"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={handleCompleteClick}
                disabled={isCompleting}
                className="flex-1 cursor-pointer rounded-lg border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary/90 disabled:opacity-50"
              >
                {isCompleting ? 'Saving...' : 'Complete Lesson'}
              </button>
            </>
          )}
          {passed && lessonDone && nextLesson && (
            <Link
              href={`/visualizer/${nextLesson.algorithmId}`}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary/90"
            >
              Next Lesson: {nextLesson.title} <ArrowRight size={14} />
            </Link>
          )}
          {passed && lessonDone && learnPathHref && (
            <Link
              href={learnPathHref}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container-highest"
            >
              <Map size={14} /> Back to Roadmap
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto rounded-xl border border-outline-variant/30 bg-surface-container p-6">
      <div>
        <h2 className="text-lg font-bold text-on-surface">{lessonName} — Quiz</h2>
        <p className="text-sm text-on-surface-variant">
          Question {currentIndex + 1} of {questions.length} · Pass with {PASS_SCORE}%+
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-base font-semibold text-on-surface">{current.question}</h3>

      <div className="space-y-2">
        {current.options.map((option, index) => {
          const isSelected = selected === index;
          const showCorrect = submitted && index === current.correctAnswer;
          const showWrong = submitted && isSelected && !showCorrect;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={submitted}
              className={`w-full cursor-pointer rounded-lg border-2 px-4 py-3 text-left text-sm transition ${
                showCorrect
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                  : showWrong
                  ? 'border-red-400 bg-red-500/10 text-red-300'
                  : isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-outline-variant/30 bg-surface-container-high text-on-surface hover:border-primary/40'
              } ${submitted ? 'cursor-default' : ''}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`rounded-lg border px-4 py-3 text-sm ${isCorrect ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-tertiary/30 bg-tertiary/5'}`}>
          <p className="font-medium text-on-surface">{isCorrect ? 'Correct!' : 'Explanation'}</p>
          <p className="mt-1 text-on-surface-variant">{current.explanation}</p>
        </div>
      )}

      <div className="mt-auto flex gap-3">
        <button
          type="button"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="cursor-pointer rounded-lg border border-outline-variant/30 px-4 py-2 text-sm text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <div className="flex-1" />
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isAnswered}
            className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-on-primary disabled:opacity-40"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-on-primary"
          >
            {currentIndex < questions.length - 1 ? 'Next' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
