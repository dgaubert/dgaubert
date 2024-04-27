---
title: Algorithms complexity 
published_at: 2024-04-27T11:00:00.000Z
picture: /algorithm-complexity.jpeg
snippet: A summary of different algorithm complexities and examples, ordered from the most to the least efficient.
private: false
draft: false
type: blog
---

A summary of different algorithm complexities and examples, ordered from the most to the least efficient.

### 1. O(1) - Constant

The algorithm's runtime or space usage remains constant regardless of the size of the input. For example by accessing an element in an object by its key:

```js
const animalsAndSounds = {
  dog: 'bark',
  cat: 'meow',
  pig: 'oink'
};

function animalsAndSounds(animals, animal) {
  return animals[animal];
}

const result = animalSounds(animals, 'cat');
console.log(result); // Output will be 'meow'
```

Regardless of the number of key-value pairs in the object (animals), accessing an element by key using bracket notation `obj[key]` takes the same amount of time.

### 2. O(log n) - Logarithmic

The algorithm's runtime or space usage grows logarithmically with the size of the input. Commonly seen in binary search algorithms.

```js
// Binary search function to find an element in a sorted array
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Find the middle element
    const mid = Math.floor((left + right) / 2);

    // If the middle element is the target, return its index
    if (arr[mid] === target) {
      return mid;
    }

    // If the target is less than the middle element, search the left half
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // If the target is greater than the middle element, search the right half
    else {
      left = mid + 1;
    }
  }

  // If the target is not found, return -1
  return -1;
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17];
const targetElement = 13;
const index = binarySearch(sortedArray, targetElement);
console.log("Index of", targetElement, ":", index); // Output will be: Index of 13 : 6
```

The binary search algorithm works by repeatedly dividing the search interval in half until the target element is found, the time complexity of binary search is **O(log n)**, where `n` is the number of elements in the array.

### 3. O(n) - Linear

The algorithm's runtime or space usage grows linearly with the size of the input. Each additional input element adds a constant amount of time or space.

```js
// Function to find the maximum element in an array
function findMax(arr) {
  // Initialize max variable to store the maximum value
  let max = arr[0]; // Assume the first element is the maximum
  
  // Iterate through the array to find the maximum element
  for (let i = 1; i < arr.length; i++) {
    // Update max if the current element is greater
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  // Return the maximum element found
  return max;
}

// Example usage
const array = [3, 7, 1, 9, 5, 2, 8, 4, 6];
const maxElement = findMax(array);
console.log("Maximum element:", maxElement); // Output will be: Maximum element: 9
```

### 4. O(n log n) - Linearithmic 

The algorithm's runtime or space usage grows in proportion to `n` times the logarithm of `n`. Commonly seen in efficient sorting algorithms like quicksort.

```js
// Merge function to merge two sorted arrays
function merge(leftArr, rightArr) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Merge left and right arrays into result array in sorted order
  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      result.push(leftArr[leftIndex]);
      leftIndex++;
    } else {
      result.push(rightArr[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate remaining elements of left and right arrays
  return result.concat(leftArr.slice(leftIndex), rightArr.slice(rightIndex));
}

// Merge sort function
function mergeSort(arr) {
  // Base case: If the array has 0 or 1 element, it is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Split the array into two halves
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  // Recursively sort the two halves
  const sortedLeft = mergeSort(leftArr);
  const sortedRight = mergeSort(rightArr);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

// Example usage
const unsortedArray = [3, 7, 1, 9, 5, 2, 8, 4, 6];
const sortedArray = mergeSort(unsortedArray);
console.log("Sorted array:", sortedArray);
```

- The `mergeSort` function recursively divides the array into halves until each half has 0 or 1 element (**O(log n)**, where `n` is the total number of elements of the input array). 
- Then, it merges the sorted halves using the `merge` function, which has a time complexity of **O(n)**. 
- The time complexity of `mergeSort` is **O(n log n)**

### 5. O(n^2) Quadratic

The algorithm's runtime or space usage grows quadratically with the size of the input. Commonly seen in algorithms with nested loops over the input.

```js
// Bubble sort function
function bubbleSort(arr) {
  const n = arr.length;
  
  // Iterate through the array elements
  for (let i = 0; i < n; i++) {
    // Last i elements are already in place, so we only need to check the first n-i elements
    for (let j = 0; j < n - i - 1; j++) {
      // Swap adjacent elements if they are in the wrong order
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  
  return arr;
}

// Example usage
const unsortedArray = [3, 7, 1, 9, 5, 2, 8, 4, 6];
const sortedArray = bubbleSort(unsortedArray);
console.log("Sorted array:", sortedArray);
```

- The `bubbleSort` function iterates through the array multiple times, comparing adjacent elements and swapping them if they are in the wrong order. 
- The outer loop runs `n` times, where `n` is the number of elements in the array.
- The inner loop runs `n - i - 1` times in each iteration of the outer loop, where `i` is the current iteration of the outer loop.
- Since both loops iterate over the entire array, the total number of comparisons and swaps is proportional to `n * n = n^2`.

### 6. O(n^k) - Polynomial

The algorithm's runtime or space usage grows as a polynomial function of the input size, where `k` is a constant exponent.

```js
// Function to find the sum of all triplets of elements in an array
function findSumOfTriplets(arr) {
  const n = arr.length;
  let sum = 0;

  // Nested loops to iterate over all triplets of elements in the array
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        sum += arr[i] + arr[j] + arr[k];
      }
    }
  }

  return sum;
}

// Example usage
const array = [1, 2, 3, 4, 5];
const sum = findSumOfTriplets(array);
console.log("Sum of all triplets:", sum);
```

- The `findSumOfTriplets` function iterates through all triplets of elements in the array using nested loops.
- This results in iterating over all possible combinations of triplets of elements in the array.
- Since all three loops iterate over the entire array, the total number of triplets is proportional to `n * (n - 1) * (n - 2) / 6`.
- The time complexity of this algorithm is **O(n^3)** polynomial time complexity, where `k = 3`.

### 7. O(2^n) - Exponential 

The algorithm's runtime or space usage grows exponentially with the size of the input. Commonly seen in brute-force algorithms that explore all possible solutions.

```js
// Function to generate all subsets of a set using recursion
function generateSubsets(set) {
  // Base case: If the set is empty, return an array containing an empty set
  if (set.length === 0) {
    return [[]];
  }
  
  // Remove the first element from the set
  const firstElement = set[0];
  const remainingSet = set.slice(1);
  
  // Recursively generate subsets without the first element
  const subsetsWithoutFirst = generateSubsets(remainingSet);
  
  // Generate subsets including the first element by adding it to each subset
  const subsetsWithFirst = subsetsWithoutFirst.map(subset => [firstElement, ...subset]);
  
  // Concatenate subsets without and with the first element
  return subsetsWithoutFirst.concat(subsetsWithFirst);
}

// Example usage
const set = [1, 2, 3];
const subsets = generateSubsets(set);
console.log("All subsets:", subsets);
```

- The `generateSubsets` function recursively generates all subsets of a given set.
- For each element in the set, the function divides the problem into two subproblems: one that includes the current element and one that does not.
- The number of subsets doubles with each additional element in the set, resulting in an exponential growth in the number of subsets.
- The time complexity of this algorithm is **O(2^n)**, where `n` is the number of elements in the set.

### 8. O(n!) - Factorial

The algorithm's runtime or space usage grows factorialy with the size of the input. Commonly seen in algorithms that generate all permutations or combinations of a set.

```js
// Function to generate all permutations of a set using recursion
function generatePermutations(set) {
  const permutations = [];
  
  // Base case: If the set is empty, return an array containing an empty permutation
  if (set.length === 0) {
    return [[]];
  }
  
  // Iterate through each element in the set
  for (let i = 0; i < set.length; i++) {
    // Create a copy of the set without the current element
    const remainingSet = set.slice(0, i).concat(set.slice(i + 1));
    
    // Recursively generate permutations of the remaining set
    const subPermutations = generatePermutations(remainingSet);
    
    // Append the current element to each permutation of the remaining set
    for (const subPermutation of subPermutations) {
      permutations.push([set[i], ...subPermutation]);
    }
  }
  
  return permutations;
}

// Example usage
const set = [1, 2, 3];
const permutations = generatePermutations(set);
console.log("All permutations:", permutations);
```

- The `generatePermutations` function recursively generates all permutations of a given set, where `n` is the number of elements in the set.
- For each element in the set, the function recursively generates permutations of the remaining elements and appends the current element to each permutation.
- The number of permutations grows factorially with the size of the set, resulting in a factorial growth in the number of permutations **O(n!)**.

### Conclusion

Analyzing algorithm complexity helps in:

- **Comparing algorithms** to solve the same problem and choose the most efficient one.
- **Predicting performance** as the input size increases, enabling better resource allocation and optimization.
- **Scaling considerations** to handle large datasets efficiently, which is crucial in real-world applications.

A handy table wrapping everything up:

| Big O notation | Name | Sample |
|----------------|------|--------|
| O(1) | Constant | Dictionary or object access |
| O(log 1) | Logarithmic | Binary search |
| O(n) | Linear | Loop |
| O(n log n) | Linerithmic | Loop * binary search |
| O(n^2) | Quadratic | Two nested loops |
| O(n^k) | Polinomial | k nested loops |
| O(2^n) | Exponential | Recursion |
| O(n!) | Factorial | Recursion within a loop |