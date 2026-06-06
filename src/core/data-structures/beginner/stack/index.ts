import type { Algorithm } from '../../../engine/types';

import {
  peekTopElement,
  popElement,
  pushElement,
} from './easy-lessons';
import {
  minStack,
  reverseStringUsingStack,
  decodeString,
  validParentheses,
} from './medium-lessons';
import {
  dailyTemperatures,
  expressionParser,
  largestRectangleHistogram,
  maximalRectangle,
  nextGreaterElementStack,
} from './hard-lessons';

export {
  pushElement,
  popElement,
  peekTopElement,
  reverseStringUsingStack,
  validParentheses,
};

export {
  minStack,
  nextGreaterElementStack,
  dailyTemperatures,
  decodeString,
};

export {
  largestRectangleHistogram,
  maximalRectangle,
  expressionParser,
};

export const stackAlgorithmsByLevel = {
  easyLessons: [pushElement, popElement, peekTopElement, reverseStringUsingStack, validParentheses],
  mediumLessons: [minStack, nextGreaterElementStack, dailyTemperatures, decodeString],
  hardLessons: [largestRectangleHistogram, maximalRectangle, expressionParser],
} as const;

export const stackAlgorithms = [
  ...stackAlgorithmsByLevel.easyLessons,
  ...stackAlgorithmsByLevel.mediumLessons,
  ...stackAlgorithmsByLevel.hardLessons,
] as const;

export const stackAlgorithmRegistry = {
  'stack-push-element': pushElement,
  'stack-pop-element': popElement,
  'stack-peek-top-element': peekTopElement,
  'stack-reverse-string-using-stack': reverseStringUsingStack,
  'stack-valid-parentheses': validParentheses,
  'stack-min-stack': minStack,
  'stack-next-greater-element': nextGreaterElementStack,
  'stack-daily-temperatures': dailyTemperatures,
  'stack-decode-string': decodeString,
  'stack-largest-rectangle-histogram': largestRectangleHistogram,
  'stack-maximal-rectangle': maximalRectangle,
  'stack-expression-parser': expressionParser,
} as const satisfies Record<string, Algorithm>;

export type StackAlgorithmId = keyof typeof stackAlgorithmRegistry;

export function registerStackAlgorithms(engine: { registerAlgorithm(id: string, algorithm: Algorithm): void }): void {
  Object.entries(stackAlgorithmRegistry).forEach(([id, algorithm]) => {
    engine.registerAlgorithm(id, algorithm);
  });
}
