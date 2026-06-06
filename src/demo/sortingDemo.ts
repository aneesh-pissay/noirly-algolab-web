/**
 * Sorting Algorithms Demo
 * Demonstrates registration and execution of all sorting algorithms
 */

import { visualizerEngine } from '../core/engine/VisualizerEngine';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '../core/algorithms/beginner/sorting';

// Register all sorting algorithms
export function registerSortingAlgorithms() {
  visualizerEngine.registerAlgorithm('bubble-sort', bubbleSort);
  visualizerEngine.registerAlgorithm('selection-sort', selectionSort);
  visualizerEngine.registerAlgorithm('insertion-sort', insertionSort);
  visualizerEngine.registerAlgorithm('merge-sort', mergeSort);
  visualizerEngine.registerAlgorithm('quick-sort', quickSort);
  
  console.log('✅ Registered 5 sorting algorithms');
}

// Demo function to test a sorting algorithm
export function demoSortingAlgorithm(algorithmId: string, array: number[]) {
  console.log(`\n🔄 Running ${algorithmId} on [${array.join(', ')}]`);
  
  const steps = visualizerEngine.execute(algorithmId, { array });
  const algorithm = visualizerEngine.getAlgorithm(algorithmId);
  
  console.log(`📊 Total steps: ${steps.length}`);
  console.log(`⏱️ Time complexity: ${algorithm?.complexity.time}`);
  console.log(`💾 Space complexity: ${algorithm?.complexity.space}`);
  
  return steps;
}

// Run function runAllSortingDemos() {
// Run all sorting algorithms on sample data
export function runAllSortingDemos() {
  registerSortingAlgorithms();
  
  const testArray = [64, 34, 25, 12, 22, 11, 90];
  
  const algorithms = [
    'bubble-sort',
    'selection-sort', 
    'insertion-sort',
    'merge-sort',
    'quick-sort'
  ];
  
  console.log('🎯 Testing all sorting algorithms');
  console.log(`📋 Test array: [${testArray.join(', ')}]\n`);
  
  for (const algo of algorithms) {
    demoSortingAlgorithm(algo, [...testArray]);
  }
  
  console.log('\n✅ All sorting algorithms tested successfully!');
}

// Example: Step through an algorithm manually
export function stepThroughBubbleSort(array: number[]) {
  visualizerEngine.registerAlgorithm('bubble-sort', bubbleSort);
  
  // Execute the algorithm
  visualizerEngine.execute('bubble-sort', { array });
  
  // Get initial state
  const initialStep = visualizerEngine.getCurrentStep();
  console.log('Initial:', initialStep?.description);
  
  // Step forward
  visualizerEngine.nextStep();
  const step1 = visualizerEngine.getCurrentStep();
  console.log('Step 1:', step1?.description);
  
  // Step forward again
  visualizerEngine.nextStep();
  const step2 = visualizerEngine.getCurrentStep();
  console.log('Step 2:', step2?.description);
  
  // Get current state
  const state = visualizerEngine.getState();
  console.log(`Currently at step ${state.currentStep} of ${state.totalSteps - 1}`);
  
  return state;
}
