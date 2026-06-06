'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Braces, CheckCircle2, Clock3, Lock, PlayCircle, Sparkles, Workflow } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import { dataStructures } from '../data/dataStructures';
import { algorithms } from '../data/algorithms';

type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type TrackId = 'data-structures' | 'algorithms' | 'patterns';
type NodeStatus = 'completed' | 'current' | 'locked';
type LessonStepStatus = 'completed' | 'current' | 'locked';

interface ConceptGroups {
  Basics: string[];
  Patterns: string[];
  Algorithms: string[];
}

interface ModuleNode {
  id: string;
  title: string;
  summary: string;
  lessons: number;
  progress: number;
  xp: number;
  conceptGroups: ConceptGroups;
  learnHref: string;
  visualizerHref?: string;
  codeHref: string;
  previewBars?: number[];
  topicType: 'Data Structure' | 'Algorithm' | 'Pattern';
  topicSlugs?: string[];
}

interface LessonStep {
  title: string;
  status: LessonStepStatus;
}

interface Track {
  id: TrackId;
  title: string;
  description: string;
  modules: Record<Level, ModuleNode[]>;
}

interface UserProgressRecord {
  topicSlug: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  timeSpent?: number;
  score?: number;
}

const levelOrder: Level[] = ['Beginner', 'Intermediate', 'Advanced'];
const dataStructureIds = new Set(dataStructures.map((item) => item.id));
const algorithmIds = new Set(algorithms.map((item) => item.id));
const topLevelRouteFallbacks = new Set(['/data-structures', '/algorithms', '/patterns', '/learn-path']);
const lessonRouteMap: Record<string, string> = {
  traversal: '/visual-lab/traversal',
  insert: '/visual-lab/insert',
  delete: '/visual-lab/delete',
  searching: '/visual-lab/searching',
  sorting: '/visual-lab/sorting',
  'two pointer': '/visual-lab/two-pointer',
  'prefix sum': '/visual-lab/prefix-sum',
  'sliding window': '/visual-lab/sliding-window',
};

const tracks: Track[] = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Master ways to organize and store data',
    modules: {
      Beginner: [
        {
          id: 'arrays',
          title: 'Arrays',
          summary: 'Master indexed data collections.',
          lessons: 12,
          progress: 100,
          xp: 120,
          conceptGroups: {
            Basics: ['Traversal', 'Insert', 'Delete'],
            Patterns: ['Two Pointer', 'Prefix Sum', 'Sliding Window'],
            Algorithms: ['Searching', 'Sorting'],
          },
          learnHref: '/data-structures/array',
          visualizerHref: '/visual-lab/reverse-array',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
          topicSlugs: ['reverse-array', 'remove-duplicates', 'move-zeroes', 'partition-algorithm'],
        },
        {
          id: 'strings',
          title: 'Strings',
          summary: 'Work with immutable text operations.',
          lessons: 10,
          progress: 45,
          xp: 110,
          conceptGroups: {
            Basics: ['Character Access', 'Slicing', 'Mutation Patterns'],
            Patterns: ['Two Pointer', 'Frequency Count', 'Window'],
            Algorithms: ['Matching', 'Validation'],
          },
          learnHref: '/algorithms',
          visualizerHref: '/visual-lab/palindrome-check',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
          topicSlugs: ['palindrome-check', 'longest-unique-substring', 'character-replacement', 'permutation-string'],
        },
        {
          id: 'hashmap',
          title: 'HashMap',
          summary: 'Build fast key-value lookups.',
          lessons: 9,
          progress: 0,
          xp: 100,
          conceptGroups: {
            Basics: ['Key Lookup', 'Insert', 'Delete'],
            Patterns: ['Frequency Map', 'Caching'],
            Algorithms: ['Pair Sum', 'Anagrams'],
          },
          learnHref: '/data-structures/hash-table',
          visualizerHref: '/visual-lab/two-sum-sorted',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
          topicSlugs: ['count-anagrams', 'k-distinct-chars', 'fruit-basket'],
        },
        {
          id: 'hashset',
          title: 'HashSet',
          summary: 'Track unique values efficiently.',
          lessons: 7,
          progress: 0,
          xp: 80,
          conceptGroups: {
            Basics: ['Add', 'Remove', 'Contains'],
            Patterns: ['Distinct Count', 'Set Difference'],
            Algorithms: ['Duplicate Removal'],
          },
          learnHref: '/data-structures/hash-table',
          visualizerHref: '/visual-lab/remove-duplicates',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
        {
          id: 'stack',
          title: 'Stack',
          summary: 'Use LIFO flows for parsing and undo.',
          lessons: 8,
          progress: 0,
          xp: 90,
          conceptGroups: {
            Basics: ['Push', 'Pop', 'Peek'],
            Patterns: ['Monotonic Stack', 'Undo/Redo'],
            Algorithms: ['Expression Eval'],
          },
          learnHref: '/data-structures/stack',
          visualizerHref: '/visual-lab/sliding-window-max',
          codeHref: '/data-structures/stack',
          topicType: 'Data Structure',
        },
        {
          id: 'queue',
          title: 'Queue',
          summary: 'Process FIFO sequences and BFS.',
          lessons: 6,
          progress: 0,
          xp: 70,
          conceptGroups: {
            Basics: ['Enqueue', 'Dequeue', 'Front'],
            Patterns: ['Circular Queue', 'Task Scheduling'],
            Algorithms: ['BFS'],
          },
          learnHref: '/algorithms',
          visualizerHref: '/visual-lab/graph-bfs',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
      ],
      Intermediate: [
        {
          id: 'linked-list',
          title: 'Linked List',
          summary: 'Pointer-based sequence operations.',
          lessons: 10,
          progress: 0,
          xp: 140,
          conceptGroups: {
            Basics: ['Node Structure', 'Traversal', 'Insert/Delete'],
            Patterns: ['Fast/Slow Pointer', 'Reversal'],
            Algorithms: ['Cycle Detection'],
          },
          learnHref: '/data-structures/linked-list',
          visualizerHref: '/visual-lab/middle-linked-list',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
        {
          id: 'binary-tree',
          title: 'Binary Tree',
          summary: 'Hierarchical data traversal and recursion.',
          lessons: 11,
          progress: 0,
          xp: 150,
          conceptGroups: {
            Basics: ['Node/Edge', 'Depth', 'Height'],
            Patterns: ['DFS', 'BFS'],
            Algorithms: ['Tree Traversal'],
          },
          learnHref: '/data-structures/binary-tree',
          visualizerHref: '/visual-lab/graph-dfs',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
        {
          id: 'bst',
          title: 'Binary Search Tree',
          summary: 'Ordered tree operations.',
          lessons: 11,
          progress: 0,
          xp: 150,
          conceptGroups: {
            Basics: ['Ordering', 'Insert', 'Delete'],
            Patterns: ['Inorder Sorted Flow'],
            Algorithms: ['BST Search'],
          },
          learnHref: '/data-structures/bst',
          visualizerHref: '/visual-lab/bst-search',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
      ],
      Advanced: [
        {
          id: 'graph',
          title: 'Graph',
          summary: 'Represent and traverse networked data.',
          lessons: 12,
          progress: 0,
          xp: 180,
          conceptGroups: {
            Basics: ['Vertices', 'Edges', 'Representations'],
            Patterns: ['Connected Components'],
            Algorithms: ['BFS', 'DFS'],
          },
          learnHref: '/data-structures/graph',
          visualizerHref: '/visual-lab/dijkstra',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
        {
          id: 'segment-tree',
          title: 'Segment Tree',
          summary: 'Range query and update structure.',
          lessons: 9,
          progress: 0,
          xp: 170,
          conceptGroups: {
            Basics: ['Build', 'Query', 'Update'],
            Patterns: ['Range Aggregation'],
            Algorithms: ['Lazy Propagation'],
          },
          learnHref: '/algorithms',
          codeHref: '/algorithms',
          topicType: 'Data Structure',
        },
      ],
    },
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Master searching, sorting and optimization',
    modules: {
      Beginner: [
        {
          id: 'sorting-basics',
          title: 'Sorting Basics',
          summary: 'Bubble, Selection, and Insertion sort.',
          lessons: 12,
          progress: 100,
          xp: 130,
          conceptGroups: {
            Basics: ['Bubble Sort', 'Selection Sort', 'Insertion Sort'],
            Patterns: ['Comparison Sorting'],
            Algorithms: ['In-place Sorting'],
          },
          learnHref: '/algorithms',
          visualizerHref: '/visual-lab/bubble-sort',
          codeHref: '/algorithms',
          previewBars: [5, 3, 8, 1, 2],
          topicType: 'Algorithm',
          topicSlugs: ['bubble-sort', 'selection-sort', 'insertion-sort'],
        },
        {
          id: 'searching-basics',
          title: 'Searching Basics',
          summary: 'Linear and Binary Search fundamentals.',
          lessons: 9,
          progress: 45,
          xp: 100,
          conceptGroups: {
            Basics: ['Linear Search', 'Binary Search'],
            Patterns: ['Search Space Reduction'],
            Algorithms: ['Boundary Checks'],
          },
          learnHref: '/algorithms',
          visualizerHref: '/visual-lab/binary-search',
          codeHref: '/algorithms',
          topicType: 'Algorithm',
          topicSlugs: ['binary-search', 'jump-search', 'interpolation-search', 'exponential-search', 'ternary-search'],
        },
      ],
      Intermediate: [
        {
          id: 'merge-sort',
          title: 'Merge Sort',
          summary: 'Stable divide-and-conquer sorting.',
          lessons: 7,
          progress: 0,
          xp: 140,
          conceptGroups: {
            Basics: ['Split', 'Merge'],
            Patterns: ['Divide and Conquer'],
            Algorithms: ['Stable Sort'],
          },
          learnHref: '/algorithms',
          visualizerHref: '/visual-lab/merge-sort',
          codeHref: '/algorithms',
          topicType: 'Algorithm',
        },
      ],
      Advanced: [
        {
          id: 'dynamic-programming',
          title: 'Dynamic Programming',
          summary: 'Optimize overlapping subproblems.',
          lessons: 12,
          progress: 0,
          xp: 200,
          conceptGroups: {
            Basics: ['State', 'Transition'],
            Patterns: ['Memoization', 'Tabulation'],
            Algorithms: ['Knapsack', 'LCS'],
          },
          learnHref: '/algorithms',
          codeHref: '/algorithms',
          topicType: 'Algorithm',
        },
      ],
    },
  },
  {
    id: 'patterns',
    title: 'DSA Patterns',
    description: 'Apply reusable templates to new problems',
    modules: {
      Beginner: [
        {
          id: 'two-pointers',
          title: 'Two Pointers',
          summary: 'Solve pair and symmetry problems.',
          lessons: 9,
          progress: 100,
          xp: 110,
          conceptGroups: {
            Basics: ['Left/Right Pointer'],
            Patterns: ['Converging Pointers'],
            Algorithms: ['Reverse Array', 'Palindrome', 'Two Sum'],
          },
          learnHref: '/patterns',
          visualizerHref: '/visual-lab/two-sum-sorted',
          codeHref: '/algorithms',
          topicType: 'Pattern',
          topicSlugs: ['reverse-array', 'palindrome-check', 'two-sum-sorted', 'three-sum', 'container-water', 'trapping-rain-water'],
        },
        {
          id: 'prefix-sum',
          title: 'Prefix Sum',
          summary: 'Compute range totals quickly.',
          lessons: 7,
          progress: 40,
          xp: 90,
          conceptGroups: {
            Basics: ['Prefix Build'],
            Patterns: ['Range Difference'],
            Algorithms: ['Range Query', 'Subarray Sum'],
          },
          learnHref: '/patterns',
          visualizerHref: '/visual-lab/max-sum-size-k',
          codeHref: '/algorithms',
          topicType: 'Pattern',
          topicSlugs: ['max-sum-size-k', 'fixed-size-window', 'average-subarray'],
        },
      ],
      Intermediate: [
        {
          id: 'sliding-window',
          title: 'Sliding Window',
          summary: 'Use moving windows for subarrays.',
          lessons: 10,
          progress: 0,
          xp: 150,
          conceptGroups: {
            Basics: ['Window Bounds'],
            Patterns: ['Fixed', 'Variable'],
            Algorithms: ['Longest Substring'],
          },
          learnHref: '/patterns',
          visualizerHref: '/visual-lab/sliding-window',
          codeHref: '/algorithms',
          topicType: 'Pattern',
        },
      ],
      Advanced: [
        {
          id: 'binary-search-patterns',
          title: 'Binary Search Patterns',
          summary: 'Generalize decision search templates.',
          lessons: 8,
          progress: 0,
          xp: 160,
          conceptGroups: {
            Basics: ['Bounds'],
            Patterns: ['Predicate Search'],
            Algorithms: ['Rotated Search', 'Peak'],
          },
          learnHref: '/patterns',
          visualizerHref: '/visual-lab/ternary-search',
          codeHref: '/algorithms',
          topicType: 'Pattern',
        },
      ],
    },
  },
];

export default function LearningPathDashboard() {
  const [activeTrack, setActiveTrack] = useState<TrackId>('data-structures');
  const [activeLevel, setActiveLevel] = useState<Level>('Beginner');
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [progressBySlug, setProgressBySlug] = useState<Record<string, UserProgressRecord>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsLoadingProgress(false);
          return;
        }

        const response = await fetch('/api/user/progress', {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load progress data');
        }

        const data = await response.json();
        const records: UserProgressRecord[] = Array.isArray(data.progress) ? data.progress : [];

        const bySlug = records.reduce<Record<string, UserProgressRecord>>((acc, record) => {
          acc[record.topicSlug] = record;
          return acc;
        }, {});

        setProgressBySlug(bySlug);
      } catch (error) {
        console.error('Learning path progress fetch failed:', error);
        setProgressError('Using offline curriculum progress.');
      } finally {
        setIsLoadingProgress(false);
      }
    };

    fetchProgress();
  }, []);

  const hydratedTracks = useMemo(() => {
    const hydrateNode = (node: ModuleNode): ModuleNode => {
      const candidateSlugs = Array.from(new Set([node.id, ...(node.topicSlugs || [])]));
      const matchedRecords = candidateSlugs
        .map((slug) => progressBySlug[slug])
        .filter((record): record is UserProgressRecord => Boolean(record));

      // DB-first behavior: unknown progress should render as zero, not seeded mock values.
      if (matchedRecords.length === 0) {
        return {
          ...node,
          progress: 0,
        };
      }

      const normalizedValues = matchedRecords.map((record) =>
        record.status === 'completed'
          ? 100
          : Math.max(0, Math.min(100, typeof record.progress === 'number' ? record.progress : 0)),
      );

      const normalizedProgress = Math.round(
        normalizedValues.reduce((sum, value) => sum + value, 0) / normalizedValues.length,
      );

      return {
        ...node,
        progress: normalizedProgress,
      };
    };

    return tracks.map((track) => ({
      ...track,
      modules: {
        Beginner: track.modules.Beginner.map(hydrateNode),
        Intermediate: track.modules.Intermediate.map(hydrateNode),
        Advanced: track.modules.Advanced.map(hydrateNode),
      },
    }));
  }, [progressBySlug]);

  const activeTrackData = useMemo(
    () => hydratedTracks.find((track) => track.id === activeTrack) || hydratedTracks[0],
    [activeTrack, hydratedTracks],
  );

  const beginnerProgress = useMemo(() => avgProgress(activeTrackData.modules.Beginner), [activeTrackData]);
  const intermediateProgress = useMemo(() => avgProgress(activeTrackData.modules.Intermediate), [activeTrackData]);

  const intermediateUnlocked = beginnerProgress >= 70;
  const advancedUnlocked = intermediateUnlocked && intermediateProgress >= 70;

  const levelUnlocked =
    activeLevel === 'Beginner' ? true : activeLevel === 'Intermediate' ? intermediateUnlocked : advancedUnlocked;

  const modules = activeTrackData.modules[activeLevel];

  useEffect(() => {
    if (!modules.length) {
      setSelectedNodeId('');
      return;
    }

    setSelectedNodeId(modules[0].id);
  }, [activeTrack, activeLevel, modules]);

  const selectedNode = modules.find((module) => module.id === selectedNodeId) || modules[0];

  const selectedLessonFlow = useMemo(() => {
    if (!selectedNode) return [];

    const sequence = [
      ...selectedNode.conceptGroups.Basics,
      ...selectedNode.conceptGroups.Patterns,
      ...selectedNode.conceptGroups.Algorithms,
    ];

    const total = sequence.length;
    if (total === 0) return [];

    const completedCount = Math.floor((selectedNode.progress / 100) * total);

    return sequence.map((title, index): LessonStep => {
      if (index < completedCount) return { title, status: 'completed' };
      if (index === completedCount && selectedNode.progress < 100) return { title, status: 'current' };
      return { title, status: 'locked' };
    });
  }, [selectedNode]);

  const nextUnlockNode = useMemo(() => {
    const firstLockedIndex = modules.findIndex((module, index) => getNodeStatus(modules, index, levelUnlocked) === 'locked');
    if (firstLockedIndex <= 0) return null;

    const prerequisite = modules[firstLockedIndex - 1];
    const target = modules[firstLockedIndex];

    return {
      prerequisiteTitle: prerequisite.title,
      prerequisiteProgress: prerequisite.progress,
      targetTitle: target.title,
    };
  }, [modules, levelUnlocked]);

  const allModules = useMemo(
    () => hydratedTracks.flatMap((track) => levelOrder.flatMap((level) => track.modules[level])),
    [hydratedTracks],
  );
  const completedLessons = Math.round(allModules.reduce((acc, module) => acc + module.lessons * (module.progress / 100), 0));
  const allLessons = allModules.reduce((acc, module) => acc + module.lessons, 0);
  const overallProgress = allLessons > 0 ? Math.round((completedLessons / allLessons) * 100) : 0;

  const unlockHint =
    activeLevel === 'Intermediate' && !intermediateUnlocked
      ? `Complete ${lessonsRemaining(activeTrackData.modules.Beginner, 70)} more lessons to unlock`
      : activeLevel === 'Advanced' && !advancedUnlocked
      ? `Complete ${lessonsRemaining(activeTrackData.modules.Intermediate, 70)} more lessons to unlock`
      : '';

  const whyLearnPoints = useMemo(() => {
    if (!selectedNode) return [];

    const mapped = [
      ...selectedNode.conceptGroups.Algorithms,
      ...selectedNode.conceptGroups.Patterns,
      ...selectedNode.conceptGroups.Basics,
    ];

    return mapped.slice(0, 4);
  }, [selectedNode]);

  const activeLessonStep = useMemo(() => {
    if (!selectedLessonFlow.length) return null;
    return (
      selectedLessonFlow.find((step) => step.status === 'current') ||
      selectedLessonFlow.find((step) => step.status === 'locked') ||
      selectedLessonFlow[selectedLessonFlow.length - 1]
    );
  }, [selectedLessonFlow]);

  const activeLessonHref = useMemo(() => resolveLessonHref(activeLessonStep?.title, selectedNode), [activeLessonStep, selectedNode]);

  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-[240px] pt-16 h-screen overflow-y-auto bg-background">
        <div className="max-w-[1400px] mx-auto p-6 space-y-5">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Learning Path' }]} />

          <section className="rounded-2xl border border-white/10 bg-[rgba(31,41,55,0.8)] p-4">
            <h2 className="text-2xl font-bold">Your DSA Journey</h2>

            {isLoadingProgress && (
              <p className="mt-2 text-xs text-slate-400">Syncing roadmap progress from database...</p>
            )}

            {progressError && <p className="mt-2 text-xs text-amber-200">{progressError}</p>}

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                <span>Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${overallProgress}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{completedLessons} Lessons Completed</p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {hydratedTracks.map((track) => {
              const selected = track.id === activeTrack;
              const modulesCount = levelOrder.reduce((acc, level) => acc + track.modules[level].length, 0);
              const completion = Math.round(avgProgress(levelOrder.flatMap((level) => track.modules[level])));

              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    selected
                      ? 'border-cyan-300/50 bg-[linear-gradient(145deg,rgba(6,182,212,0.18),rgba(30,64,175,0.22))] shadow-[0_0_30px_rgba(34,211,238,0.22)]'
                      : 'border-white/10 bg-[rgba(31,41,55,0.8)] hover:border-white/20'
                  }`}
                >
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${selected ? 'bg-cyan-500/20 text-cyan-100' : 'bg-white/5 text-cyan-300'}`}>
                    {track.id === 'data-structures' ? <Workflow size={selected ? 30 : 24} /> : track.id === 'algorithms' ? <Braces size={selected ? 30 : 24} /> : <Sparkles size={selected ? 30 : 24} />}
                  </div>
                  <h3 className="text-lg font-semibold">{track.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{track.description}</p>
                  <div className="mt-3 text-xs text-slate-300">{modulesCount} Modules</div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700/70">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${completion}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                    <span>{completion}%</span>
                    <span className="inline-flex items-center gap-1 text-cyan-200">
                      Continue <ArrowRight size={12} />
                    </span>
                  </div>
                </button>
              );
            })}
          </section>

          <section className="flex flex-wrap items-center gap-2">
            {levelOrder.map((level) => {
              const selected = level === activeLevel;
              const locked = (level === 'Intermediate' && !intermediateUnlocked) || (level === 'Advanced' && !advancedUnlocked);

              return (
                <button
                  key={level}
                  disabled={locked}
                  onClick={() => setActiveLevel(level)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selected
                      ? 'border-cyan-300/50 bg-cyan-500/20 text-cyan-100'
                      : locked
                      ? 'cursor-not-allowed border-white/10 bg-slate-800/60 text-slate-500'
                      : 'border-white/10 bg-[rgba(31,41,55,0.8)] text-slate-200 hover:border-cyan-300/40'
                  }`}
                >
                  {level}
                </button>
              );
            })}
            {!levelUnlocked && <span className="text-xs text-amber-200">{unlockHint}</span>}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_1.2fr] pb-8">
            <article className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(15,23,42,0.95),rgba(30,41,59,0.9))] p-5 shadow-[0_20px_45px_rgba(2,8,23,0.35)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Roadmap Tree</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-100">{activeLevel} Modules</h3>
                </div>
                <div className="rounded-lg border border-cyan-300/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-100">
                  {modules.length} nodes
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-2 py-1">
                  <CheckCircle2 size={12} className="text-emerald-300" /> Completed
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-2 py-1">
                  <PlayCircle size={12} className="text-cyan-300" /> Current
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-slate-800/70 px-2 py-1">
                  <Lock size={11} className="text-slate-400" /> Locked
                </span>
              </div>

              <div className={`mt-5 space-y-2 ${!levelUnlocked ? 'opacity-70 blur-[1px]' : ''}`}>
                {modules.map((module, index) => {
                  const status = getNodeStatus(modules, index, levelUnlocked);
                  const isSelected = selectedNodeId === module.id;
                  const message =
                    status === 'locked'
                      ? index === 0 && !levelUnlocked
                        ? unlockHint
                        : `Complete ${modules[index - 1]?.title || 'previous lesson'} first`
                      : `${module.progress}% completed`;

                  return (
                    <div key={module.id} className="relative">
                      <button
                        disabled={status === 'locked'}
                        onClick={() => setSelectedNodeId(module.id)}
                        className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                          status === 'completed'
                            ? 'border-emerald-300/30 bg-emerald-500/10 hover:bg-emerald-500/15'
                            : status === 'current'
                            ? 'border-cyan-300/55 bg-cyan-500/15 shadow-[0_0_26px_rgba(34,211,238,0.2)] hover:bg-cyan-500/20'
                            : 'cursor-not-allowed border-white/10 bg-slate-800/65 text-slate-400'
                        } ${isSelected ? 'ring-1 ring-cyan-300/60' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-900/80">
                            {status === 'completed' ? <CheckCircle2 size={14} className="text-emerald-300" /> : status === 'current' ? <PlayCircle size={14} className="text-cyan-300" /> : <Lock size={12} />}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate font-semibold text-slate-100">{module.title}</p>
                            </div>
                            <p className="mt-1 text-xs text-slate-300">{message}</p>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700/70">
                              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${module.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      </button>

                      {index < modules.length - 1 && (
                        <div className="my-1 flex items-center justify-center text-cyan-300/60">
                          <div className="h-4 w-px bg-cyan-300/45" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(15,23,42,0.98),rgba(30,41,59,0.9))] p-5 shadow-[0_20px_45px_rgba(2,8,23,0.35)]">
              {selectedNode ? (
                <>
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Module Details</p>
                      <h3 className="mt-1 text-3xl font-bold text-slate-100">{selectedNode.title}</h3>
                    </div>

                    <span className={`rounded-full border px-3 py-1 text-xs ${
                      selectedNode.progress >= 100
                        ? 'border-emerald-300/30 bg-emerald-500/10 text-emerald-200'
                        : selectedNode.progress > 0
                        ? 'border-cyan-300/30 bg-cyan-500/10 text-cyan-200'
                        : 'border-white/15 bg-slate-800/70 text-slate-300'
                    }`}>
                      {selectedNode.progress >= 100 ? 'Completed' : selectedNode.progress > 0 ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      activeLevel === 'Beginner'
                        ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-300/30'
                        : activeLevel === 'Intermediate'
                        ? 'bg-amber-500/15 text-amber-200 border border-amber-300/30'
                        : 'bg-rose-500/15 text-rose-200 border border-rose-300/30'
                    }`}>
                      {activeLevel}
                    </span>
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                      {selectedNode.topicType}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300">{selectedNode.summary}</p>

                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/55 p-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                      <span className="uppercase tracking-wide">Progress</span>
                      <span className="font-semibold text-cyan-200">{selectedNode.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${selectedNode.progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-3 text-slate-200">
                      <Clock3 size={14} className="text-cyan-300" />
                      {Math.max(1, Math.round((selectedNode.lessons * 10) / 60))} hours
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-3 text-slate-200">
                      <BookOpen size={14} className="text-cyan-300" />
                      {selectedNode.lessons} Lessons
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-400">Current Lesson Flow</p>
                    <div className="space-y-2">
                      {selectedLessonFlow.slice(0, 6).map((step, index) => (
                        <div key={step.title} className="flex flex-col items-start">
                          <div className={`inline-flex min-w-[220px] items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                            step.status === 'completed'
                              ? 'border-emerald-300/30 bg-emerald-500/10 text-emerald-100'
                              : step.status === 'current'
                              ? 'border-cyan-300/35 bg-cyan-500/10 text-cyan-100'
                              : 'border-white/10 bg-slate-900/70 text-slate-400'
                          }`}>
                            {step.status === 'completed' ? (
                              <CheckCircle2 size={14} className="text-emerald-300" />
                            ) : step.status === 'current' ? (
                              <PlayCircle size={14} className="text-cyan-300" />
                            ) : (
                              <Lock size={13} className="text-slate-400" />
                            )}
                            <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                            <span className={step.status === 'locked' ? 'text-slate-400' : 'text-slate-200'}>{step.title}</span>
                          </div>
                          {index < Math.min(selectedLessonFlow.length, 6) - 1 && <div className="ml-4 h-3 w-px bg-cyan-300/30" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeTrack === 'algorithms' && selectedNode.previewBars && (
                    <div className="mt-5 rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Visualizer Preview</p>
                      <div className="flex h-20 items-end gap-2">
                        {selectedNode.previewBars.map((value, index) => (
                          <div
                            key={`${selectedNode.id}-${index}`}
                            className="w-6 rounded-sm bg-gradient-to-t from-cyan-600 to-blue-400"
                            style={{ height: `${value * 8}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {nextUnlockNode && (
                    <div className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-3">
                      <p className="text-xs uppercase tracking-wide text-cyan-200">Next Unlock</p>
                      <p className="mt-1 text-sm text-slate-100">
                        Complete {nextUnlockNode.prerequisiteTitle} to unlock {nextUnlockNode.targetTitle}
                      </p>
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                          <span>{nextUnlockNode.prerequisiteTitle}</span>
                          <span>{nextUnlockNode.prerequisiteProgress}% complete</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${nextUnlockNode.prerequisiteProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Why learn this?</p>
                    <div className="mt-2 space-y-1">
                      {whyLearnPoints.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-sm text-slate-200">
                          <CheckCircle2 size={14} className="text-emerald-300" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <ActionLink
                      href={activeLessonHref}
                      label={activeLessonStep ? `Continue: ${activeLessonStep.title}` : 'Continue Learning'}
                      icon={<ArrowRight size={14} />}
                      primary
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-300">Select a roadmap node to view details.</p>
              )}
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

function ActionLink({
  href,
  label,
  icon,
  disabled,
  primary,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  primary?: boolean;
}) {
  if (!href || disabled) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-slate-400">
        <Lock size={13} />
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
          primary
            ? 'border border-cyan-300/35 bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30'
            : 'border border-white/10 bg-white/[0.04] text-slate-100 hover:border-cyan-300/40 hover:text-cyan-100 hover:bg-white/[0.08]'
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function avgProgress(modules: ModuleNode[]) {
  if (!modules.length) return 0;
  return modules.reduce((acc, module) => acc + module.progress, 0) / modules.length;
}

function lessonsRemaining(modules: ModuleNode[], thresholdPercent: number) {
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0);
  const required = totalLessons * (thresholdPercent / 100);
  const earned = modules.reduce((acc, module) => acc + module.lessons * (module.progress / 100), 0);
  return Math.max(0, Math.ceil(required - earned));
}

function getNodeStatus(modules: ModuleNode[], index: number, levelUnlocked: boolean): NodeStatus {
  if (!levelUnlocked) return 'locked';

  const module = modules[index];
  if (module.progress >= 100) return 'completed';

  const firstIncompleteIndex = modules.findIndex((item) => item.progress < 100);
  if (firstIncompleteIndex === index) return 'current';

  if (index > firstIncompleteIndex) return 'locked';

  return 'completed';
}

function resolveLessonHref(lessonTitle: string | undefined, node?: ModuleNode) {
  if (!node) return '/learn-path';

  const normalizedTitle = normalizeLessonKey(lessonTitle);
  if (normalizedTitle && lessonRouteMap[normalizedTitle] && isKnownRoute(lessonRouteMap[normalizedTitle])) {
    return lessonRouteMap[normalizedTitle];
  }

  if (node.visualizerHref && isKnownRoute(node.visualizerHref)) {
    return node.visualizerHref;
  }

  if (isKnownRoute(node.learnHref)) {
    return node.learnHref;
  }

  if (node.topicType === 'Data Structure') {
    const slug = [node.id, ...(node.topicSlugs || [])].find((item) => dataStructureIds.has(item));
    return slug ? `/data-structures/${slug}` : '/data-structures';
  }

  if (node.topicType === 'Algorithm') {
    const slug = [node.id, ...(node.topicSlugs || [])].find((item) => algorithmIds.has(item));
    return slug ? `/algorithms/${slug}` : '/algorithms';
  }

  return '/patterns';
}

function normalizeLessonKey(value?: string) {
  return value?.trim().toLowerCase();
}

function isKnownRoute(href?: string) {
  if (!href || !href.startsWith('/')) return false;
  if (topLevelRouteFallbacks.has(href)) return true;

  if (href.startsWith('/data-structures/')) {
    const slug = href.replace('/data-structures/', '').split('/')[0];
    return dataStructureIds.has(slug);
  }

  if (href.startsWith('/algorithms/')) {
    const slug = href.replace('/algorithms/', '').split('/')[0];
    return algorithmIds.has(slug);
  }

  if (href.startsWith('/visual-lab/')) {
    const slug = href.replace('/visual-lab/', '').split('/')[0];
    return Boolean(slug);
  }

  return false;
}
