'use client';

import { AlgorithmStep } from '@/src/core/engine/types';

interface Props {
  step: AlgorithmStep;
}

export default function GenericRenderer({ step }: Props) {
  const data = step.visualizationData ?? {};

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
      <p className="text-xs uppercase tracking-widest text-cyan-300/70">Visualization Data</p>
      <pre className="max-h-[360px] w-full max-w-xl overflow-auto rounded-xl border border-white/10 bg-[rgba(31,41,55,0.8)] p-4 text-xs leading-relaxed text-slate-300">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
