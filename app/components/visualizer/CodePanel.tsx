'use client';

import { useEffect, useRef } from 'react';
import { Algorithm, AlgorithmStep } from '@/src/core/engine/types';
import { useSettings } from '@/app/contexts/SettingsContext';
import { getCodeLines } from './codeSnippets';
import { resolveActiveCodeLine } from './resolveCodeLine';

interface Props {
  algorithmId: string;
  algorithm: Algorithm;
  step: AlgorithmStep;
}

export default function CodePanel({ algorithmId, algorithm, step }: Props) {
  const { codeLanguage } = useSettings();
  const lines = getCodeLines(algorithmId, algorithm.category, codeLanguage);
  const activeLine = resolveActiveCodeLine(algorithmId, algorithm.category, step, lines.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeLineRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeLine, step.id]);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-slate-400">Code</p>
        <span className="rounded-md border border-white/10 bg-slate-800 px-2 py-0.5 text-[10px] uppercase text-primary">
          {codeLanguage}
        </span>
      </div>
      <div
        ref={containerRef}
        className="max-h-[280px] overflow-auto rounded-lg border border-white/5 bg-slate-900/60"
      >
        <pre className="p-3 font-mono text-sm leading-7 text-slate-300">
          {lines.map((line, index) => {
            const lineNo = index + 1;
            const active = lineNo === activeLine;
            return (
              <div
                key={lineNo}
                ref={active ? activeLineRef : undefined}
                className={`flex gap-3 rounded px-2 -mx-2 transition-colors ${
                  active
                    ? 'bg-primary/20 border-l-[3px] border-primary shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]'
                    : 'border-l-[3px] border-transparent'
                }`}
              >
                <span
                  className={`w-6 shrink-0 select-none text-right text-xs ${
                    active ? 'text-primary font-semibold' : 'text-slate-600'
                  }`}
                >
                  {active ? '▶' : lineNo}
                </span>
                <code className={`whitespace-pre ${active ? 'text-primary font-medium' : ''}`}>
                  {line || ' '}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Executing line <span className="font-mono text-primary">{activeLine}</span> of{' '}
        <span className="font-mono">{lines.length}</span>
      </p>
    </div>
  );
}
