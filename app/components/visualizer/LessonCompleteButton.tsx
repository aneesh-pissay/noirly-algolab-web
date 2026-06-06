'use client';

import { CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: () => void;
  alreadyCompleted: boolean;
}

export default function LessonCompleteButton({ onComplete, alreadyCompleted }: Props) {
  if (alreadyCompleted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        <CheckCircle2 size={16} /> Lesson already completed
      </div>
    );
  }

  return (
    <button
      onClick={onComplete}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 to-blue-500/20 border border-cyan-400/40 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.15)] transition hover:from-cyan-500/35 hover:to-blue-500/30"
    >
      <CheckCircle2 size={16} /> Complete Lesson
    </button>
  );
}
