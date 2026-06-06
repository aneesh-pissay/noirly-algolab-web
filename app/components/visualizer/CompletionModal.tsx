'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Map } from 'lucide-react';
import type { CompleteLessonResult } from '@/src/features/progress';
import { getTopic } from '@/app/data/curriculum';

interface Props {
  open: boolean;
  result: CompleteLessonResult | null;
  onClose: () => void;
}

export default function CompletionModal({ open, result, onClose }: Props) {
  if (!result) return null;

  const topic = getTopic(result.lesson.track, result.lesson.level, result.lesson.category);
  const topicName = topic?.name ?? result.topicProgress.topicName;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-cyan-400/25 bg-[linear-gradient(165deg,rgba(15,23,42,0.98),rgba(30,41,59,0.95))] p-8 shadow-[0_0_60px_rgba(34,211,238,0.15)]"
          >
            <div className="mb-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-3xl"
              >
                🎉
              </motion.div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Lesson Complete</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{result.lesson.title}</h2>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Time</p>
                <p className="font-mono text-slate-200">{result.lesson.time}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Space</p>
                <p className="font-mono text-slate-200">{result.lesson.space}</p>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Progress</p>
              <p className="mt-1 text-sm text-slate-200">
                {topicName}{' '}
                <span className="font-mono text-cyan-300">
                  {result.topicProgress.completed} / {result.topicProgress.total}
                </span>{' '}
                completed
              </p>
            </div>

            {result.nextLesson && (
              <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-300/80">Unlocked</p>
                <p className="mt-1 font-semibold text-emerald-100">{result.nextLesson.title}</p>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              {result.nextLesson ? (
                <Link
                  href={`/visualizer/${result.nextLesson.algorithmId}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30"
                >
                  Next Lesson <ArrowRight size={14} />
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-100"
                >
                  Done
                </button>
              )}
              <Link
                href={`/learn-path?track=${result.lesson.track}&level=${result.lesson.level}&topic=${result.lesson.category}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-white/20"
              >
                <Map size={14} /> Back to Roadmap
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
