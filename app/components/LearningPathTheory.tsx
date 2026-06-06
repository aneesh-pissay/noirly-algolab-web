'use client';

import type { ReactNode } from 'react';
import { BookOpen, Lightbulb, Target, Zap } from 'lucide-react';

interface TheoryBlockProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

function TheoryBlock({ title, children, icon }: TheoryBlockProps) {
  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-surface-container p-6">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface TrackTheoryPanelProps {
  overview: string;
  whyItMatters: string[];
  pathOverview: string;
  totalLessons: number;
}

export function TrackTheoryPanel({ overview, whyItMatters, pathOverview, totalLessons }: TrackTheoryPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <TheoryBlock title="About This Curriculum" icon={<BookOpen size={16} className="text-primary" />}>
        <p className="text-sm leading-relaxed text-on-surface-variant">{overview}</p>
        <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{pathOverview}</p>
      </TheoryBlock>
      <div className="space-y-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <p className="text-xs uppercase tracking-widest text-primary/80">Curriculum Size</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">{totalLessons}</p>
          <p className="text-sm text-on-surface-variant">visual lessons across 3 tracks</p>
        </div>
        <TheoryBlock title="Why It Matters" icon={<Zap size={16} className="text-primary" />}>
          <ul className="space-y-2">
            {whyItMatters.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-on-surface-variant">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </TheoryBlock>
      </div>
    </div>
  );
}

interface LevelTheoryPanelProps {
  trackTitle: string;
  overview: string;
  focus: string[];
  tip: string;
  topicCount: number;
}

export function LevelTheoryPanel({ trackTitle, overview, focus, tip, topicCount }: LevelTheoryPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <TheoryBlock title={`${trackTitle} — Level Guide`} icon={<Target size={16} className="text-primary" />}>
        <p className="text-sm leading-relaxed text-on-surface-variant">{overview}</p>
        <ul className="mt-4 space-y-2">
          {focus.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-on-surface-variant">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </TheoryBlock>
      <div className="space-y-4">
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5">
          <p className="text-xs uppercase tracking-widest text-on-surface-variant">Topics at this level</p>
          <p className="mt-2 font-display text-3xl font-bold text-on-surface">{topicCount}</p>
        </div>
        <TheoryBlock title="Study Tip" icon={<Lightbulb size={16} className="text-tertiary" />}>
          <p className="text-sm leading-relaxed text-on-surface-variant">{tip}</p>
        </TheoryBlock>
      </div>
    </div>
  );
}

interface TopicTheoryPanelProps {
  trackTitle: string;
  level: string;
  overview: string;
  keyConcepts: string[];
  realWorld: string[];
  studyTip: string;
  lessonCount: number;
}

export function TopicTheoryPanel({
  trackTitle,
  level,
  overview,
  keyConcepts,
  realWorld,
  studyTip,
  lessonCount,
}: TopicTheoryPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <TheoryBlock title="Theory Overview" icon={<BookOpen size={16} className="text-primary" />}>
          <p className="text-sm leading-relaxed text-on-surface-variant">{overview}</p>
          <p className="mt-3 text-xs text-on-surface-variant/70">
            {trackTitle} · {level} · {lessonCount} lessons
          </p>
        </TheoryBlock>
        <TheoryBlock title="Key Concepts" icon={<Target size={16} className="text-primary" />}>
          <ul className="space-y-2">
            {keyConcepts.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-on-surface-variant">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {c}
              </li>
            ))}
          </ul>
        </TheoryBlock>
        <TheoryBlock title="Real-World Uses" icon={<Zap size={16} className="text-primary" />}>
          <ul className="space-y-2">
            {realWorld.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-on-surface-variant">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary" />
                {r}
              </li>
            ))}
          </ul>
        </TheoryBlock>
      </div>
      <div className="rounded-xl border border-tertiary/30 bg-tertiary/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-tertiary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">How to Study</p>
            <p className="mt-1 text-sm text-on-surface-variant">{studyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
