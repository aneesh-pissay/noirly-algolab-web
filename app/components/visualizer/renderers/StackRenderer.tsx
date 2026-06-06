'use client';

import { motion } from 'framer-motion';
import { AlgorithmStep } from '@/src/core/engine/types';
import { getActionVariants } from './actionVariants';

interface Props {
  step: AlgorithmStep;
}

export default function StackRenderer({ step }: Props) {
  const data = step.visualizationData ?? {};
  const stack: (number | string)[] = Array.isArray(data.stack) ? [...data.stack] : [];
  const display = [...stack].reverse();
  const variants = getActionVariants(step.action);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <p className="text-xs uppercase tracking-widest text-cyan-300/70">Stack (LIFO)</p>
      <div className="flex min-h-[320px] w-52 flex-col-reverse items-stretch gap-3 rounded-xl border border-white/10 bg-slate-900/50 p-4">
        {display.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-500">Empty</div>
        ) : (
          display.map((value, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={`${index}-${value}`}
                layout
                variants={variants}
                initial="initial"
                animate={isTop ? 'animate' : 'initial'}
                className={`flex h-16 items-center justify-center rounded-lg border font-mono text-xl font-semibold ${
                  isTop
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-white/10 bg-[rgba(31,41,55,0.8)] text-slate-200'
                }`}
              >
                {value}
              </motion.div>
            );
          })
        )}
      </div>
      {data.top != null && (
        <p className="text-sm text-slate-300">
          Top: <span className="font-mono text-primary">{String(data.top)}</span>
        </p>
      )}
    </div>
  );
}
