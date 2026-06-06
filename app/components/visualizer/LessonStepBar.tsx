'use client';

import { BookOpen, CheckCircle2, Circle, HelpCircle, PlayCircle } from 'lucide-react';

export type LessonStep = 'visualize' | 'theory' | 'quiz';

interface StepState {
  visualize: boolean;
  theory: boolean;
  quiz: boolean;
}

interface Props {
  active: LessonStep;
  completed: StepState;
  onStepClick: (step: LessonStep) => void;
}

const STEPS: { id: LessonStep; label: string; icon: typeof PlayCircle }[] = [
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'visualize', label: 'Visualize', icon: PlayCircle },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
];

export default function LessonStepBar({ active, completed, onStepClick }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container p-2">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = active === step.id;
        const isDone = completed[step.id];
        const canAccess =
          step.id === 'theory' ||
          (step.id === 'visualize' && completed.theory) ||
          (step.id === 'quiz' && completed.theory && completed.visualize);

        return (
          <div key={step.id} className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canAccess}
              onClick={() => canAccess && onStepClick(step.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : isDone
                  ? 'text-emerald-400 border border-emerald-400/20 bg-emerald-500/10'
                  : 'text-on-surface-variant border border-transparent hover:bg-surface-container-high'
              }`}
            >
              {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              {step.label}
              {isDone && !isActive && <span className="text-[10px] text-emerald-400/80">Done</span>}
            </button>
            {index < STEPS.length - 1 && (
              <Circle size={6} className="text-on-surface-variant/30" fill="currentColor" />
            )}
          </div>
        );
      })}
    </div>
  );
}
