'use client';

import { AlgorithmStep } from '@/src/core/engine/types';

interface Props {
  step: AlgorithmStep;
}

function renderLevelOrder(values: (number | null | string)[]) {
  if (!values.length) return null;

  const levels: (number | null | string)[][] = [];
  let i = 0;
  let levelSize = 1;

  while (i < values.length) {
    levels.push(values.slice(i, i + levelSize));
    i += levelSize;
    levelSize *= 2;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {levels.map((level, li) => (
        <div key={li} className="flex items-center gap-4">
          {level.map((val, vi) => (
            <div
              key={`${li}-${vi}`}
              className={`flex h-16 w-16 items-center justify-center rounded-full border text-base font-mono font-semibold ${
                val == null
                  ? 'border-transparent text-transparent'
                  : 'border-primary/40 bg-primary/10 text-primary'
              }`}
            >
              {val ?? '·'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function TreeRenderer({ step }: Props) {
  const data = step.visualizationData ?? {};
  const tree = data.tree ?? data.levelOrder ?? data.nodes;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto p-4">
      <p className="text-xs uppercase tracking-widest text-cyan-300/70">Tree Visualization</p>
      {Array.isArray(tree) ? (
        renderLevelOrder(tree)
      ) : (
        <pre className="max-w-full overflow-auto rounded-lg border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-300">
          {JSON.stringify(tree ?? data, null, 2)}
        </pre>
      )}
    </div>
  );
}
