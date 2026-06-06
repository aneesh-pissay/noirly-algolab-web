import type { Algorithm } from '../../../engine/types';

import { fibonacciDP, climbingStairs, minCostClimbing } from './easy-lessons';

import { houseRobber, coinChange, longestIncreasingSubsequence, knapsack } from './medium-lessons';

import { editDistance, longestCommonSubsequence, matrixChainMultiplication, burstBalloons } from './hard-lessons';



export { fibonacciDP, climbingStairs, minCostClimbing, houseRobber, coinChange, longestIncreasingSubsequence, knapsack, editDistance, longestCommonSubsequence, matrixChainMultiplication, burstBalloons };



export const dynamicProgrammingAlgorithmsByLevel = {

  easyLessons: [fibonacciDP, climbingStairs, minCostClimbing],

  mediumLessons: [houseRobber, coinChange, longestIncreasingSubsequence, knapsack],

  hardLessons: [editDistance, longestCommonSubsequence, matrixChainMultiplication, burstBalloons],

} as const;



export const dynamicProgrammingAlgorithms = [

  ...dynamicProgrammingAlgorithmsByLevel.easyLessons,

  ...dynamicProgrammingAlgorithmsByLevel.mediumLessons,

  ...dynamicProgrammingAlgorithmsByLevel.hardLessons,

] as const;



export const dynamicProgrammingAlgorithmRegistry = {

  'dp-fibonacci': fibonacciDP,

  'dp-climbing-stairs': climbingStairs,

  'dp-min-cost-climbing': minCostClimbing,

  'dp-house-robber': houseRobber,

  'dp-coin-change': coinChange,

  'dp-lis': longestIncreasingSubsequence,

  'dp-knapsack': knapsack,

  'dp-edit-distance': editDistance,

  'dp-lcs': longestCommonSubsequence,

  'dp-matrix-chain': matrixChainMultiplication,

  'dp-burst-balloons': burstBalloons,

} as const satisfies Record<string, Algorithm>;



export function registerDynamicProgrammingAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {

  Object.entries(dynamicProgrammingAlgorithmRegistry).forEach(([id, algorithm]) => engine.registerAlgorithm(id, algorithm));

}


