import { AlgorithmAction } from '@/src/core/engine/types';
import { Variants } from 'framer-motion';

export function getActionVariants(action: AlgorithmAction): Variants {
  switch (action) {
    case 'visit':
    case 'traverse':
      return {
        initial: { scale: 1 },
        animate: { scale: 1.08, boxShadow: '0 0 24px rgba(56,189,248,0.45)' },
        exit: { scale: 1 },
      };
    case 'compare':
      return {
        initial: { scale: 1 },
        animate: { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] },
        exit: { scale: 1 },
      };
    case 'swap':
    case 'shift':
    case 'rotate':
      return {
        initial: { y: 0 },
        animate: { y: [0, -12, 0], transition: { duration: 0.45 } },
        exit: { y: 0 },
      };
    case 'insert':
    case 'enqueue':
      return {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0 },
      };
    case 'delete':
    case 'dequeue':
      return {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 0, x: -24 },
        exit: { opacity: 0 },
      };
    case 'push':
      return {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      };
    case 'pop':
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 0, y: -20 },
        exit: { opacity: 0 },
      };
    case 'found':
      return {
        initial: { scale: 1 },
        animate: { scale: [1, 1.1, 1], backgroundColor: 'rgba(16,185,129,0.25)' },
        exit: { scale: 1 },
      };
    case 'not-found':
      return {
        initial: { x: 0 },
        animate: { x: [0, -6, 6, -4, 4, 0] },
        exit: { x: 0 },
      };
    default:
      return {
        initial: { opacity: 0.85 },
        animate: { opacity: 1 },
        exit: { opacity: 0.85 },
      };
  }
}
