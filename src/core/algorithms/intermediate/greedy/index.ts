import type { Algorithm } from '../../../engine/types';

import { activitySelection, assignCookies, lemonadeChange } from './easy-lessons';

import { jumpGame, gasStation, jobScheduling, fractionalKnapsack } from './medium-lessons';

import { huffmanCoding, minimumPlatforms, candyProblem } from './hard-lessons';



export { activitySelection, assignCookies, lemonadeChange, jumpGame, gasStation, jobScheduling, fractionalKnapsack, huffmanCoding, minimumPlatforms, candyProblem };



export const greedyAlgorithmsByLevel = {

  easyLessons: [activitySelection, assignCookies, lemonadeChange],

  mediumLessons: [jumpGame, gasStation, jobScheduling, fractionalKnapsack],

  hardLessons: [huffmanCoding, minimumPlatforms, candyProblem],

} as const;



export const greedyAlgorithms = [

  ...greedyAlgorithmsByLevel.easyLessons,

  ...greedyAlgorithmsByLevel.mediumLessons,

  ...greedyAlgorithmsByLevel.hardLessons,

] as const;



export const greedyAlgorithmRegistry = {

  'greedy-activity-selection': activitySelection,

  'greedy-assign-cookies': assignCookies,

  'greedy-lemonade-change': lemonadeChange,

  'greedy-jump-game': jumpGame,

  'greedy-gas-station': gasStation,

  'greedy-job-scheduling': jobScheduling,

  'greedy-fractional-knapsack': fractionalKnapsack,

  'greedy-huffman-coding': huffmanCoding,

  'greedy-minimum-platforms': minimumPlatforms,

  'greedy-candy-problem': candyProblem,

} as const satisfies Record<string, Algorithm>;



export function registerGreedyAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(greedyAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


