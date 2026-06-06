# Noirly AlgoLab Visualization Architecture

Complete implementation of the step-by-step algorithm visualization engine.

## Architecture Overview

### Core Engine Components

1. **Types** (`src/core/engine/types.ts`)
   - `AlgorithmStep`: Contract for every operation step
   - `AlgorithmInput`: Input configuration
   - `VisualizerState`: Playback state
   - `Algorithm`: Algorithm metadata interface

2. **Store** (`src/core/engine/store.ts`)
   - Observer pattern implementation
   - State management for playback controls
   - Methods: `loadSteps()`, `nextStep()`, `previousStep()`, `play()`, `pause()`, `reset()`

3. **Engine** (`src/core/engine/VisualizerEngine.ts`)
   - Main orchestrator
   - Algorithm registration and execution
   - Playback timer management
   - Singleton instance exported as `visualizerEngine`

## Algorithm Implementations

All algorithms follow the standardized contract:
```typescript
export function generateSteps(input: AlgorithmInput): AlgorithmStep[]
```

### Sorting (5 algorithms)
- **Bubble Sort** - O(n²) comparison-based sorting
- **Selection Sort** - O(n²) minimum selection
- **Insertion Sort** - O(n²) element insertion
- **Merge Sort** - O(n log n) divide-and-conquer
- **Quick Sort** - O(n log n) pivot partitioning

### Searching (2 algorithms)
- **Linear Search** - O(n) sequential search
- **Binary Search** - O(log n) divide-and-conquer on sorted array

### Patterns (2 algorithms)
- **Two Pointer** - O(n) pointer movement pattern
- **Sliding Window** - O(n) subarray operations

### Recursion (2 algorithms)
- **Factorial** - O(n) call stack visualization
- **Fibonacci** - O(2^n) exponential recursion tree

### Trees (3 algorithms)
- **DFS** - O(n) depth-first traversal
- **BFS** - O(n) breadth-first level-order
- **Traversals** - Inorder, Preorder, Postorder

### Graphs (3 algorithms)
- **Graph DFS** - O(V + E) vertex exploration
- **Graph BFS** - O(V + E) level-by-level traversal
- **Dijkstra** - O(V²) shortest path algorithm

### Dynamic Programming (2 algorithms)
- **Fibonacci DP** - O(n) with memoization
- **0/1 Knapsack** - O(n*W) optimization problem

### Data Structures (3 implementations)
- **Linked List** - Insert, delete, search operations
- **Stack** - LIFO push/pop/peek
- **Queue** - FIFO enqueue/dequeue/peek

## Step Structure

Every `AlgorithmStep` captures:
- `id`: Unique step identifier
- `category`: Algorithm category
- `action`: Operation type (visit, compare, swap, etc.)
- `description`: Human-readable explanation
- `visualizationData`: Data for visual rendering
- `highlights`: Elements to highlight in UI
- `variables`: Current variable state
- `memory`: Memory/stack state
- `complexity`: Time and space complexity
- `codeLine`: Corresponding line of code

## Usage

### Register and Execute Algorithm

```typescript
import { visualizerEngine, bubbleSort } from '@/core';

// Register algorithm
visualizerEngine.registerAlgorithm('bubble-sort', bubbleSort);

// Execute with input
const result = await visualizerEngine.execute('bubble-sort', {
  array: [5, 2, 8, 1, 9]
});

// Control playback
visualizerEngine.play();
visualizerEngine.pause();
visualizerEngine.nextStep();
visualizerEngine.previousStep();
```

### Subscribe to State Changes

```typescript
import { visualizerStore } from '@/core';

const unsubscribe = visualizerStore.subscribe((state) => {
  console.log('Current step:', state.currentStepIndex);
  console.log('Step data:', visualizerStore.getCurrentStep());
});
```

## Features

✅ **Step-by-step execution** - Every operation captured  
✅ **Playback controls** - Play, pause, step forward/back  
✅ **Variable tracking** - See all variables at each step  
✅ **Memory visualization** - Stack, heap, data structure states  
✅ **Complexity annotations** - Time and space complexity per step  
✅ **Code correlation** - Links to actual code lines  
✅ **Observer pattern** - React to state changes  
✅ **Standardized interface** - Consistent API across all algorithms  

## Files Created

### Engine (3 files)
- `src/core/engine/types.ts`
- `src/core/engine/store.ts`
- `src/core/engine/VisualizerEngine.ts`

### Algorithms (17 files)
- Sorting: 5 files
- Searching: 2 files
- Patterns: 2 files
- Recursion: 2 files
- Trees: 3 files
- Graphs: 3 files

### Dynamic Programming (2 files)
- `fibonacciDP.ts`
- `knapsack.ts`

### Data Structures (3 files)
- `linked-list/LinkedList.ts`
- `stack/Stack.ts`
- `queue/Queue.ts`

### Registry
- `src/core/index.ts` - Central exports

**Total: 26 files** implementing complete visualization architecture

## Next Steps

1. Create React components to render visualizations
2. Build UI controls for playback (play/pause/step buttons)
3. Design visual representations for each data structure
4. Add code editor panel with syntax highlighting
5. Implement variable inspector panel
6. Add complexity analysis panel
7. Create learning content explaining each algorithm
