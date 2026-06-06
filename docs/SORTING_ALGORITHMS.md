# Sorting Algorithms - Implementation Guide

Complete implementation of 5 sorting algorithms with step-by-step visualization.

## Implemented Algorithms

### 1. Bubble Sort
**File:** `src/core/algorithms/sorting/bubbleSort.ts`  
**Complexity:** O(n²) time, O(1) space  
**Strategy:** Repeatedly swap adjacent elements if they're in wrong order

**Key Features:**
- Tracks outer and inner loop iterations
- Counts comparisons and swaps
- Shows sorted portion growing from right
- Optimizes with early exit if no swaps occur

**Visualization Steps:**
1. Initial state with unsorted array
2. Outer loop iterations (n passes)
3. Inner loop comparisons
4. Swaps when elements out of order
5. Early exit detection
6. Final sorted state

---

### 2. Selection Sort
**File:** `src/core/algorithms/sorting/selectionSort.ts`  
**Complexity:** O(n²) time, O(1) space  
**Strategy:** Find minimum element and place it at the beginning

**Key Features:**
- Tracks minimum element index
- Shows selection of minimum in each pass
- Visualizes sorted vs unsorted portions
- Counts comparisons and swaps

**Visualization Steps:**
1. Initial state
2. Find minimum in unsorted portion
3. Compare current element with minimum
4. Update minimum index
5. Swap minimum to correct position
6. Sorted portion grows from left

---

### 3. Insertion Sort
**File:** `src/core/algorithms/sorting/insertionSort.ts`  
**Complexity:** O(n²) time, O(1) space  
**Strategy:** Build sorted array one element at a time

**Key Features:**
- Tracks key element being inserted
- Shows shifting of elements
- Visualizes sorted portion
- Counts comparisons and shifts

**Visualization Steps:**
1. Initial state (first element sorted)
2. Pick key element to insert
3. Compare with sorted elements
4. Shift elements right
5. Insert key at correct position
6. Sorted portion grows from left

---

### 4. Merge Sort
**File:** `src/core/algorithms/sorting/mergeSort.ts`  
**Complexity:** O(n log n) time, O(n) space  
**Strategy:** Divide and conquer with merging

**Key Features:**
- Shows recursive division
- Visualizes merge operations
- Tracks left and right subarrays
- Uses module-level state for recursion

**Visualization Steps:**
1. Initial state
2. Divide array into halves
3. Recursive division (left then right)
4. Base case (single elements)
5. Merge subarrays
6. Compare and place elements
7. Copy remaining elements
8. Final merged result

---

### 5. Quick Sort
**File:** `src/core/algorithms/sorting/quickSort.ts`  
**Complexity:** O(n log n) average, O(n²) worst, O(log n) space  
**Strategy:** Partition around pivot element

**Key Features:**
- Shows pivot selection
- Visualizes partitioning
- Tracks recursive calls
- Shows pivot placement

**Visualization Steps:**
1. Initial state
2. Choose pivot (last element)
3. Partition: compare elements with pivot
4. Swap elements smaller than pivot
5. Place pivot at correct position
6. Recursive calls on left and right partitions
7. Final sorted state

---

## Usage Examples

### Register All Sorting Algorithms

```typescript
import { visualizerEngine } from '@/core/engine/VisualizerEngine';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '@/core/algorithms/sorting';

// Register
visualizerEngine.registerAlgorithm('bubble-sort', bubbleSort);
visualizerEngine.registerAlgorithm('selection-sort', selectionSort);
visualizerEngine.registerAlgorithm('insertion-sort', insertionSort);
visualizerEngine.registerAlgorithm('merge-sort', mergeSort);
visualizerEngine.registerAlgorithm('quick-sort', quickSort);
```

### Execute a Sorting Algorithm

```typescript
// Execute bubble sort
const steps = visualizerEngine.execute('bubble-sort', {
  array: [64, 34, 25, 12, 22, 11, 90]
});

console.log(`Total steps: ${steps.length}`);

// Get algorithm metadata
const algorithm = visualizerEngine.getAlgorithm('bubble-sort');
console.log(`Complexity: ${algorithm?.complexity.time}`);
```

### Step Through Visualization

```typescript
// Load algorithm
visualizerEngine.execute('merge-sort', {
  array: [5, 2, 8, 1, 9]
});

// Manual control
visualizerEngine.nextStep();      // Forward one step
visualizerEngine.previousStep();  // Back one step
visualizerEngine.goToStep(10);    // Jump to step 10

// Playback
visualizerEngine.setSpeed(1000);  // 1 second per step
visualizerEngine.play();          // Auto-play
visualizerEngine.pause();         // Pause
visualizerEngine.reset();         // Back to start
```

### Get Current Step Data

```typescript
const step = visualizerEngine.getCurrentStep();

console.log(step?.description);           // Human-readable description
console.log(step?.highlights);            // Elements to highlight
console.log(step?.variables);             // Current variable values
console.log(step?.visualizationData);     // Data for rendering
console.log(step?.complexity);            // Time/space complexity
```

## Common Step Actions

All sorting algorithms use these action types:

- **`visit`** - Visiting/initializing state
- **`move-pointer`** - Moving loop pointer
- **`compare`** - Comparing two elements
- **`swap`** - Swapping two elements
- **`insert`** - Inserting element at position
- **`merge`** - Merging subarrays
- **`partition`** - Partitioning array

## Data Tracked in Steps

Each step captures:

```typescript
{
  id: number,                    // Unique step ID
  category: 'sorting',           // Algorithm category
  action: string,                // What's happening
  description: string,           // Human explanation
  visualizationData: {           // Rendering data
    array: number[],             // Current array state
    comparing?: [number, number], // Elements being compared
    swapping?: [number, number],  // Elements being swapped
    sorted?: boolean[],          // Which elements are sorted
    pivot?: number,              // Pivot index (quick sort)
    merging?: [number, number, number], // Merge range
  },
  highlights: number[],          // Indices to highlight
  variables: {                   // Loop variables
    i, j, n,                     // Loop counters
    swapCount,                   // Number of swaps
    comparisonCount,             // Number of comparisons
  },
  memory: {                      // Memory state
    array: number[],             // Current array
    temp?: any,                  // Temporary variables
  },
  complexity: {
    time: string,                // e.g., 'O(n²)'
    space: string,               // e.g., 'O(1)'
  },
  codeLine: number               // Corresponding code line
}
```

## Testing

Run the demo to test all algorithms:

```typescript
import { runAllSortingDemos } from '@/demo/sortingDemo';

// Test all sorting algorithms
runAllSortingDemos();

// Output:
// ✅ Registered 5 sorting algorithms
// 🔄 Running bubble-sort on [64, 34, 25, 12, 22, 11, 90]
// 📊 Total steps: 127
// ⏱️ Time complexity: O(n²)
// 💾 Space complexity: O(1)
// ... (continues for all algorithms)
```

## Next Steps

1. ✅ All sorting algorithms implemented
2. 🎯 Create React components for visualization
3. 🎯 Add array bar chart renderer
4. 🎯 Add comparison highlighting
5. 🎯 Add playback controls UI
6. 🎯 Add code viewer with line highlighting
7. 🎯 Add variable inspector panel

---

**Status:** ✅ Complete - All 5 sorting algorithms fully implemented with step-by-step tracking
