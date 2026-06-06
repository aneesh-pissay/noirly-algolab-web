'use client';

import { motion } from 'framer-motion';
import { AlgorithmStep } from '@/src/core/engine/types';
import { getActionVariants } from './actionVariants';

interface Props {
  step: AlgorithmStep;
}

export default function QueueRenderer({ step }: Props) {
  const data = step.visualizationData ?? {};
  const queue: (number | string)[] = Array.isArray(data.queue) ? data.queue : [];
  const variants = getActionVariants(step.action);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <div className="flex w-full max-w-2xl items-center justify-between text-xs uppercase tracking-widest text-cyan-300/70">
        <span>Front</span>
        <span>Rear</span>
      </div>
      <div className="flex w-full max-w-2xl items-center gap-2 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/50 p-4">
        {queue.length === 0 ? (
          <span className="w-full text-center text-sm text-slate-500">Empty queue</span>
        ) : (
          queue.map((value, index) => {
            const isFront = index === 0;
            const isRear = index === queue.length - 1;
            return (
              <motion.div
                key={`${index}-${value}`}
                layout
                variants={variants}
                initial="initial"
                animate={isFront || isRear ? 'animate' : 'initial'}
                className={`flex h-20 min-w-[5.5rem] shrink-0 items-center justify-center rounded-lg border font-mono text-xl font-semibold ${
                  isFront || isRear
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
      <div className="flex gap-6 text-sm text-slate-400">
        {data.front != null && (
          <span>
            Front: <span className="font-mono text-primary">{String(data.front)}</span>
          </span>
        )}
        {data.rear != null && (
          <span>
            Rear: <span className="font-mono text-primary">{String(data.rear)}</span>
          </span>
        )}
      </div>
    </div>
  );
}
