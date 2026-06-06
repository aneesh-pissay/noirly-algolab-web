'use client';

import { motion } from 'framer-motion';
import { AlgorithmStep } from '@/src/core/engine/types';
import { getActionVariants } from './actionVariants';

interface Props {
  step: AlgorithmStep;
}

export default function ArrayRenderer({ step }: Props) {
  const data = step.visualizationData ?? {};
  const array: number[] = Array.isArray(data.array)
    ? data.array
    : Array.isArray(data.nums)
    ? data.nums
    : Array.isArray(data.values)
    ? data.values
    : [];
  const highlights = step.highlights ?? [];
  const variables = step.variables ?? {};
  const variants = getActionVariants(step.action);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="flex items-end justify-center gap-4 flex-wrap px-6">
        {array.map((value, index) => {
          const isHighlighted = highlights.includes(index);
          const showI = variables.i === index;
          const showJ = variables.j === index;
          const showKey = variables.key === value && variables.i === index;

          return (
            <motion.div
              key={`${index}-${value}`}
              layout
              variants={variants}
              initial="initial"
              animate={isHighlighted ? 'animate' : 'initial'}
              className="flex flex-col items-center gap-3"
            >
              {(showI || showJ || showKey) && (
                <div className="flex gap-2 text-sm font-mono font-semibold text-primary">
                  {showI && <span>i</span>}
                  {showJ && <span>j</span>}
                  {showKey && <span>key</span>}
                </div>
              )}
              <motion.div
                layout
                className={`flex h-28 w-24 items-center justify-center rounded-2xl border-2 font-display text-3xl font-bold transition-colors ${
                  isHighlighted
                    ? 'border-primary bg-primary/15 text-primary shadow-[0_0_24px_rgba(56,189,248,0.4)]'
                    : 'border-white/15 bg-[rgba(31,41,55,0.9)] text-slate-100'
                }`}
              >
                {value}
              </motion.div>
              <span className="text-sm font-mono font-medium text-slate-400">{index}</span>
            </motion.div>
          );
        })}
      </div>

      {array.length === 0 && (
        <p className="text-base text-slate-400">No array data in this step.</p>
      )}
    </div>
  );
}
