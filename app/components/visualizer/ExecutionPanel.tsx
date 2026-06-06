'use client';

import { Algorithm, AlgorithmStep } from '@/src/core/engine/types';

interface Props {
  algorithm: Algorithm;
  step: AlgorithmStep | null;
}

function KeyValueBlock({ title, data }: { title: string; data: Record<string, unknown> }) {
  const entries = Object.entries(data ?? {});
  if (!entries.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[rgba(31,41,55,0.6)] p-3">
      <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">{title}</p>
      <div className="space-y-1.5">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-start justify-between gap-2 text-xs">
            <span className="font-mono text-cyan-300/80">{key}</span>
            <span className="font-mono text-slate-200 text-right break-all">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExecutionPanel({ algorithm, step }: Props) {
  if (!step) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        No step loaded
      </div>
    );
  }

  const complexity = step.complexity ?? algorithm.complexity;

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto pr-1">
      <div className="rounded-xl border border-white/10 bg-[rgba(31,41,55,0.6)] p-4">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">Current Action</p>
        <p className="mt-1 font-mono text-sm text-cyan-300">{step.action}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(31,41,55,0.6)] p-4">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">Explanation</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{step.description}</p>
      </div>

      <KeyValueBlock title="Variables" data={step.variables as Record<string, unknown>} />
      <KeyValueBlock title="Memory" data={step.memory as Record<string, unknown>} />

      <div className="rounded-xl border border-white/10 bg-[rgba(31,41,55,0.6)] p-4">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">Complexity</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-500 text-xs">Time</p>
            <p className="font-mono text-cyan-200">{complexity.time}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Space</p>
            <p className="font-mono text-cyan-200">{complexity.space}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
