// This code is a simple implementation of Conway's Game of Life
// Filename: game_of_life.js

// Function to generate a random grid
function generateGrid(rows, cols) {
  const grid = [];
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.random() > 0.5 ? 1 : 0);
    }
    grid.push(row);
  }
  
  return grid;
}

// Function to count the number of live neighbors for a given cell
function countLiveNeighbors(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const neighborRow = (row + i + rows) % rows;
      const neighborCol = (col + j + cols) % cols;
      count += grid[neighborRow][neighborCol];
    }
  }
  
  count -= grid[row][col];
  return count;
}

// Function to simulate one step in the game
function simulate(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = [];
  
  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      const liveNeighbors = countLiveNeighbors(grid, i, j);
      
      if (grid[i][j] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        newRow.push(0); // Cell dies due to underpopulation or overpopulation
      } else if (grid[i][j] === 0 && liveNeighbors === 3) {
        newRow.push(1); // Cell becomes alive due to reproduction
      } else {
        newRow.push(grid[i][j]);
      }
    }
    newGrid.push(newRow);
  }
  
  return newGrid;
}

// Function to display the grid in the console
function displayGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  
  let gridString = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      gridString += grid[i][j] === 1 ? "X " : "- ";
    }
    gridString += "\n";
  }
  
  console.log(gridString);
}

// Main program
const ROWS = 50;
const COLS = 50;

let grid = generateGrid(ROWS, COLS);

for (let step = 1; step <= 10; step++) {
  console.log(`Step ${step}:`);
  displayGrid(grid);
  grid = simulate(grid);
}