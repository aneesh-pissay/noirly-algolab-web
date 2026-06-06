'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers,
  Lock,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import {
  tracks,
  levels,
  difficulties,
  type TrackId,
  type Level,
  type Difficulty,
  type Lesson,
  type Topic,
} from '../data/curriculum';
import {
  getTrackTheory,
  getLevelTheory,
  getTopicTheory,
  countCurriculumLessons,
  countTrackTopics,
} from '../data/curriculumTheory';
import { TrackTheoryPanel, LevelTheoryPanel, TopicTheoryPanel } from './LearningPathTheory';
import {
  useProgressHydrated,
  useProgressData,
  getLessonStatus,
  isDifficultyUnlocked,
  isLevelUnlocked,
  isTopicUnlocked,
  getTopicProgress,
  type LessonStatusType,
} from '@/src/features/progress';

type View = 'tracks' | 'levels' | 'topics' | 'topic-detail';

function statusIcon(status: LessonStatusType) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={14} className="text-emerald-300" />;
    case 'current':
      return <PlayCircle size={14} className="text-primary" />;
    case 'locked':
      return <Lock size={12} className="text-on-surface-variant/60" />;
    default:
      return <div className="h-2 w-2 rounded-full bg-slate-400" />;
  }
}

function LessonCard({ lesson, status }: { lesson: Lesson; status: LessonStatusType }) {
  const locked = status === 'locked';

  const cardClass = `rounded-xl border p-4 transition ${
    status === 'completed'
      ? 'border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
      : status === 'current'
      ? 'border-primary/50 bg-primary/10 glow-primary'
      : locked
      ? 'border-outline-variant/30 bg-surface-container-high/50 opacity-60 cursor-not-allowed'
      : 'border-outline-variant/30 bg-surface-container hover:border-primary/30 cursor-pointer'
  }`;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-on-surface">{lesson.name}</h4>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-outline-variant/30 px-2 py-0.5 text-on-surface-variant">{lesson.difficulty}</span>
            <span className="rounded-full border border-outline-variant/30 px-2 py-0.5 font-mono text-on-surface-variant">T {lesson.time}</span>
            <span className="rounded-full border border-outline-variant/30 px-2 py-0.5 font-mono text-on-surface-variant">S {lesson.space}</span>
          </div>
        </div>
        {statusIcon(status)}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs capitalize text-on-surface-variant">{status}</span>
        {locked ? (
          <span className="text-xs text-on-surface-variant/60">Locked</span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary/20 border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary">
            {status === 'completed' ? 'Review' : 'Start'} <ArrowRight size={12} />
          </span>
        )}
      </div>
    </>
  );

  if (locked) {
    return <div className={cardClass}>{inner}</div>;
  }

  return (
    <Link href={`/visualizer/${lesson.algorithmId}`} className={`block ${cardClass} hover:scale-[1.01]`}>
      {inner}
    </Link>
  );
}

function LessonRoadmap({ topic, trackId, level }: { topic: Topic; trackId: TrackId; level: Level }) {
  const progress = useProgressData();
  const flatLessons = difficulties.flatMap((d) => topic.lessons[d] ?? []);

  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface-container/50 p-4">
      <p className="mb-4 text-xs uppercase tracking-widest text-on-surface-variant">Lesson Flow</p>
      <div className="space-y-1">
        {flatLessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, progress);
          return (
            <div key={lesson.id} className="flex flex-col items-center">
              <div
                className={`flex w-full max-w-xs items-center gap-3 rounded-lg border px-3 py-2.5 text-sm ${
                  status === 'completed'
                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                    : status === 'current'
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : status === 'locked'
                    ? 'border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant/60'
                    : 'border-outline-variant/30 bg-surface-container/70 text-slate-200'
                }`}
              >
                {statusIcon(status)}
                <span className="font-mono text-xs text-on-surface-variant/60">{String(index + 1).padStart(2, '0')}</span>
                <span className="flex-1">{lesson.name}</span>
              </div>
              {index < flatLessons.length - 1 && <div className="h-4 w-px bg-primary/25" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LearningPathExplorer() {
  const searchParams = useSearchParams();
  const hydrated = useProgressHydrated();
  const progress = useProgressData();
  const [view, setView] = useState<View>('tracks');
  const [activeTrack, setActiveTrack] = useState<TrackId | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const track = searchParams.get('track') as TrackId | null;
    const level = searchParams.get('level') as Level | null;
    const topicId = searchParams.get('topic');

    if (track && levels.includes(level as Level) && topicId) {
      const t = tracks.find((x) => x.id === track);
      const topic = t?.topics[level as Level]?.find((x) => x.id === topicId);
      if (t && topic) {
        setActiveTrack(track);
        setActiveLevel(level as Level);
        setActiveTopic(topic);
        setView('topic-detail');
        return;
      }
    }

    if (track && levels.includes(level as Level)) {
      setActiveTrack(track);
      setActiveLevel(level as Level);
      setView('topics');
      return;
    }

    if (track) {
      setActiveTrack(track);
      setView('levels');
    }
  }, [searchParams]);

  const track = tracks.find((t) => t.id === activeTrack);
  const topics = track && activeLevel ? track.topics[activeLevel] ?? [] : [];

  const breadcrumbItems = useMemo(() => {
    const items = [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Learning Path' }];
    if (track) items.push({ label: track.title });
    if (activeLevel) items.push({ label: activeLevel });
    if (activeTopic) items.push({ label: activeTopic.name });
    return items;
  }, [track, activeLevel, activeTopic]);

  const goBack = () => {
    if (view === 'topic-detail') {
      setView('topics');
      setActiveTopic(null);
    } else if (view === 'topics') {
      setView('levels');
      setActiveLevel(null);
    } else if (view === 'levels') {
      setView('tracks');
      setActiveTrack(null);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Header />
      <main className="app-main">
        <div className="mx-auto max-w-[1300px] space-y-6 p-4 sm:p-6 lg:p-8">
          <Breadcrumbs items={breadcrumbItems} />

          <section className="space-y-2">
            <div className="flex items-center gap-3">
              {view !== 'tracks' && (
                <button
                  onClick={goBack}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-outline-variant/30 bg-surface-container-high text-on-surface-variant hover:border-primary/30"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <div>
                <h1 className="font-display text-2xl font-extrabold text-on-surface sm:text-3xl lg:text-4xl">
                  Learning <span className="text-primary">Path</span>
                </h1>
                <p className="text-sm text-on-surface-variant">
                  Structured DSA curriculum — pick a track, topic, and lesson to visualize.
                </p>
              </div>
            </div>
          </section>

          {view === 'tracks' && (
            <>
              <TrackTheoryPanel
                overview="Noirly AlgoLab organizes DSA into three visual learning tracks. Each lesson includes step-by-step animations, live code tracing, and complexity analysis — so you understand why an algorithm works, not just how to write it."
                whyItMatters={[
                  'Structured progression from basics to advanced topics',
                  'Every lesson pairs theory with an interactive visualizer',
                  'Progress tracking saves your place and unlocks the next lessons',
                ]}
                pathOverview="Pick a track below to begin. Complete lessons in order to unlock harder tiers and new topics."
                totalLessons={countCurriculumLessons()}
              />
              <section className="grid gap-5 md:grid-cols-3">
              {tracks.map((t) => {
                const theory = getTrackTheory(t.id);
                return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTrack(t.id);
                    setView('levels');
                  }}
                  className="group cursor-pointer rounded-2xl border border-outline-variant/30 bg-surface-container p-6 text-left transition hover:border-primary/40 hover:glow-primary"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <span className="material-symbols-outlined">{t.icon}</span>
                  </div>
                  <h2 className="text-xl font-bold text-on-surface group-hover:text-primary">{t.title}</h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{t.description}</p>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-on-surface-variant/80">{theory.overview}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{countTrackTopics(t.id)} topics</span>
                    <span className="inline-flex items-center gap-1 text-xs text-primary">
                      Explore track <ArrowRight size={12} />
                    </span>
                  </div>
                </button>
              );
              })}
            </section>
            </>
          )}

          {view === 'levels' && track && (
            <section className="space-y-4">
              <TrackTheoryPanel
                overview={getTrackTheory(track.id).overview}
                whyItMatters={getTrackTheory(track.id).whyItMatters}
                pathOverview={getTrackTheory(track.id).pathOverview}
                totalLessons={countCurriculumLessons()}
              />
              <div className="grid gap-4 md:grid-cols-3">
                {levels.map((level) => {
                  const count = track.topics[level]?.length ?? 0;
                  const unlocked = isLevelUnlocked(track.id, level, progress);
                  const levelInfo = getLevelTheory(level);
                  return (
                    <button
                      key={level}
                      disabled={!unlocked}
                      onClick={() => {
                        setActiveLevel(level);
                        setView('topics');
                      }}
                      className={`rounded-2xl border p-5 text-left transition ${
                        unlocked
                          ? 'cursor-pointer border-outline-variant/30 bg-surface-container hover:border-primary/40'
                          : 'cursor-not-allowed border-outline-variant/30 bg-surface-container-high/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-on-surface">{level}</h3>
                        {unlocked ? <Layers size={16} className="text-primary" /> : <Lock size={14} className="text-on-surface-variant/60" />}
                      </div>
                      <p className="mt-2 text-sm text-on-surface-variant">{count} topics</p>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-on-surface-variant/80">{levelInfo.overview}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {view === 'topics' && track && activeLevel && (
            <section className="space-y-4">
              <LevelTheoryPanel
                trackTitle={track.title}
                overview={getLevelTheory(activeLevel).overview}
                focus={getLevelTheory(activeLevel).focus}
                tip={getLevelTheory(activeLevel).tip}
                topicCount={topics.length}
              />
              <p className="text-xs uppercase tracking-widest text-primary/70">
                {track.title} · {activeLevel} — Select a topic
              </p>
              <div className="space-y-2">
                {topics.map((topic, index) => {
                  const topicProg = getTopicProgress(track.id, activeLevel, topic.id, progress.completedLessons);
                  const topicUnlocked = index === 0 || isTopicUnlocked(track.id, activeLevel, topic.id, progress);

                  return (
                    <div key={topic.id}>
                      <button
                        disabled={!topicUnlocked && index > 0}
                        onClick={() => {
                          setActiveTopic(topic);
                          setView('topic-detail');
                        }}
                        className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                          topicUnlocked
                            ? 'cursor-pointer border-outline-variant/30 bg-surface-container hover:border-primary/40'
                            : 'cursor-not-allowed border-outline-variant/30 bg-surface-container-high/50 opacity-60'
                        }`}
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-on-surface">{topic.name}</h3>
                          <p className="mt-1 text-sm text-on-surface-variant">{topic.description}</p>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-on-surface-variant/70">
                            {getTopicTheory(topic.id, topic.name, topic.description).overview}
                          </p>
                          <p className="mt-2 text-xs font-mono text-primary/70">
                            {topicProg.completed}/{topicProg.total} lessons
                          </p>
                        </div>
                        {topicUnlocked ? <ArrowRight size={16} className="text-primary" /> : <Lock size={14} className="text-on-surface-variant/60" />}
                      </button>
                      {index < topics.length - 1 && (
                        <div className="flex justify-center py-1 text-primary/40">↓</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {view === 'topic-detail' && activeTopic && track && activeLevel && (() => {
            const topicTheory = getTopicTheory(activeTopic.id, activeTopic.name, activeTopic.description);
            const lessonCount = difficulties.reduce((n, d) => n + (activeTopic.lessons[d]?.length ?? 0), 0);
            return (
            <section className="space-y-6">
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary/70">
                      {track.title} · {activeLevel}
                    </p>
                    <h2 className="mt-1 text-3xl font-bold text-on-surface">{activeTopic.name}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">{activeTopic.description}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/30 px-3 py-2 text-on-surface-variant">
                      <BookOpen size={14} /> {lessonCount} Lessons
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/30 px-3 py-2 text-on-surface-variant">
                      <Clock3 size={14} /> Self-paced
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-primary">
                      <Sparkles size={14} /> Visualizer
                    </span>
                  </div>
                </div>
              </div>

              <TopicTheoryPanel
                trackTitle={track.title}
                level={activeLevel}
                overview={topicTheory.overview}
                keyConcepts={topicTheory.keyConcepts}
                realWorld={topicTheory.realWorld}
                studyTip={topicTheory.studyTip}
                lessonCount={lessonCount}
              />

              <LessonRoadmap topic={activeTopic} trackId={track.id} level={activeLevel} />

              {difficulties.map((difficulty: Difficulty) => {
                const lessons = activeTopic.lessons[difficulty] ?? [];
                if (!lessons.length) return null;
                const tierUnlocked = isDifficultyUnlocked(track.id, activeLevel, activeTopic.id, difficulty, progress);

                return (
                  <div key={difficulty} className={`space-y-3 ${!tierUnlocked ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">{difficulty}</h3>
                      {!tierUnlocked && <Lock size={12} className="text-on-surface-variant/60" />}
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {lessons.map((lesson) => {
                        const status = getLessonStatus(lesson.id, progress);
                        const displayStatus = !tierUnlocked && status !== 'completed' ? 'locked' : status;
                        return <LessonCard key={lesson.id} lesson={lesson} status={displayStatus} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
            );
          })()}
        </div>
      </main>
    </>
  );
}
