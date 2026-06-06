'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RoadmapTopic {
  id: string;
  name: string;
  completed: boolean;
  href?: string;
  progress?: number;
  timeSpent?: number;
  score?: number;
  lastAttempt?: string;
}

interface RoadmapLevel {
  id: number;
  title: string;
  subtitle: string;
  phase: number;
  phaseLabel: string;
  status: 'locked' | 'in-progress' | 'completed' | 'not-started';
  topics: RoadmapTopic[];
  completedCount: number;
  totalCount: number;
  progressPercentage: number;
}

interface RoadmapStats {
  totalLevels: number;
  completedLevels: number;
  inProgressLevels: number;
  totalTopics: number;
  completedTopics: number;
}

export default function DynamicLearningPath() {
  const [roadmap, setRoadmap] = useState<RoadmapLevel[]>([]);
  const [stats, setStats] = useState<RoadmapStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/user/roadmap', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roadmap');
      }

      const data = await response.json();
      setRoadmap(data.roadmap);
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      setError('Failed to load learning path');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-6xl animate-spin">progress_activity</span>
            <p className="text-on-surface-variant mt-4">Loading your learning path...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 space-y-6">
        <div className="glass-card rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-red-400 text-6xl mb-4">error</span>
          <h2 className="font-display text-title-lg font-bold text-white mb-2">Failed to Load</h2>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <button
            onClick={fetchRoadmap}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8 space-y-6">
      {/* HEADER */}
      <section className="space-y-2">
        <h1 className="font-display text-[48px] leading-[56px] font-extrabold text-white">
          Your <span className="text-primary">Learning Path</span>
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl">
          Master algorithms and data structures step by step. Complete each level to unlock the next.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-semibold">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          Starting with Phase 1: Arrays, Strings, Sorting, Searching
        </div>
      </section>

      {/* Progress Overview */}
      {stats && (
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-title-lg font-bold text-white mb-1">Overall Progress</h3>
              <p className="text-on-surface-variant text-sm">
                {stats.completedTopics} of {stats.totalTopics} algorithms completed • Keep going!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.completedLevels}</div>
                <div className="text-xs text-on-surface-variant">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tertiary">{stats.inProgressLevels}</div>
                <div className="text-xs text-on-surface-variant">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-on-surface-variant">
                  {stats.totalLevels - stats.completedLevels - stats.inProgressLevels}
                </div>
                <div className="text-xs text-on-surface-variant">Locked</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROADMAP LEVELS */}
      <section className="space-y-3 relative">
        {/* Vertical connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-tertiary/20 to-on-surface-variant/10 -z-0"></div>
        
        {roadmap.map((level, index) => {
          const isLocked = level.status === 'locked';
          const isInProgress = level.status === 'in-progress';
          const isCompleted = level.status === 'completed';

          return (
            <div key={level.id} className="relative">
              <div
                className={`glass-card rounded-xl p-6 transition-all ml-14 ${
                  isLocked ? 'opacity-60 grayscale' : 'hover:border-primary/30'
                }`}
              >
                {/* Level Number Badge */}
                <div
                  className={`absolute -left-14 top-6 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold font-display z-10 border-4 border-background ${
                    isCompleted
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : isInProgress
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-surface-dim text-on-surface-variant border-outline-variant/30'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined">check</span>
                  ) : (
                    level.id
                  )}
                </div>

                {/* Level Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 mb-2 rounded-md bg-surface-container-high text-on-surface-variant text-xs border border-outline-variant/20">
                      <span className="material-symbols-outlined text-xs">deployed_code</span>
                      {level.phaseLabel}
                    </div>
                    <h2 className="font-display text-title-lg font-bold text-white mb-1">{level.title}</h2>
                    <p className="text-on-surface-variant text-body-md">{level.subtitle}</p>
                  </div>
                  <div>
                    {isCompleted && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        <span className="font-semibold">Completed</span>
                      </div>
                    )}
                    {isInProgress && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                        <span className="material-symbols-outlined text-sm">pending</span>
                        <span className="font-semibold">In Progress</span>
                      </div>
                    )}
                    {isLocked && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-dim text-on-surface-variant rounded-full text-sm border border-outline-variant/30">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span className="font-semibold">Locked</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {level.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={isLocked || !topic.href ? '#' : topic.href}
                      className={`group p-4 rounded-lg border transition-all ${
                        isLocked
                          ? 'bg-surface-dim border-outline-variant/20 cursor-not-allowed'
                          : topic.completed
                          ? 'bg-green-500/5 border-green-500/30 hover:border-green-500/50'
                          : !topic.href
                          ? 'bg-surface-container border-outline-variant/30 opacity-80 cursor-not-allowed'
                          : 'bg-surface-container border-outline-variant/30 hover:border-primary/50'
                      }`}
                      onClick={(e) => {
                        if (isLocked || !topic.href) e.preventDefault();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              topic.completed
                                ? 'bg-green-500 text-white'
                                : 'bg-surface-container-highest text-on-surface-variant'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {topic.completed ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-on-surface text-sm group-hover:text-primary transition-colors">
                              {topic.name}
                            </h3>
                            {!topic.href && !topic.completed && (
                              <p className="text-xs text-on-surface-variant mt-0.5">Lab coming soon</p>
                            )}
                            {topic.score !== undefined && topic.score !== null && (
                              <p className="text-xs text-on-surface-variant mt-0.5">
                                Score: {topic.score}%
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_forward
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Level Progress */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">
                    {level.completedCount} / {level.totalCount} completed
                  </span>
                  <span className="font-semibold text-primary">{level.progressPercentage}%</span>
                </div>
                <div className="mt-2 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-tertiary transition-all duration-500"
                    style={{ width: `${level.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
