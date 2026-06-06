'use client';

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const SPEEDS = [0.5, 1, 2];

export default function VisualizerControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
}: Props) {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-[rgba(31,41,55,0.8)] p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>
          Step {totalSteps > 0 ? currentStep + 1 : 0} / {totalSteps}
        </span>
        <div className="flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`rounded-md px-2 py-1 text-[11px] transition ${
                speed === s
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-700/70">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onPrevious}
          disabled={currentStep <= 0}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-200 transition hover:border-cyan-400/30 disabled:opacity-40"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 transition hover:bg-cyan-500/30"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-200 transition hover:border-cyan-400/30 disabled:opacity-40"
        >
          <SkipForward size={16} />
        </button>
        <button
          onClick={onReset}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-200 transition hover:border-cyan-400/30"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
