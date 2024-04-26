function solveSudoku() {
    const inputGrid = document.getElementById("inputGrid").value.split("\n").map(row => row.trim().split(/\s+/).map(Number));
  
    if (isValidSudoku(inputGrid)) {
        const solvedGrid = solve(inputGrid);
        displaySudoku(solvedGrid);
    } else {
        alert("Invalid Sudoku puzzle! Please check your input.");
    }
  }
  
  function isValidSudoku(grid) {
    // Check rows and columns
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] !== 0 && rowSet.has(grid[i][j])) return false;
            if (grid[j][i] !== 0 && colSet.has(grid[j][i])) return false;
            rowSet.add(grid[i][j]);
            colSet.add(grid[j][i]);
        }
    }
  
    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const subgridSet = new Set();
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (grid[i][j] !== 0 && subgridSet.has(grid[i][j])) return false;
                    subgridSet.add(grid[i][j]);
                }
            }
        }
    }
  
    return true;
  }
  
  function solve(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return grid; // Solved
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return grid;
            grid[row][col] = 0; // Backtrack
        }
    }
  
    return null; // No solution found
  }
  
  function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
  }
  
  function isValidMove(grid, row, col, num) {
    // Check row
    if (grid[row].includes(num)) return false;
  
    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false;
    }
  
    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) return false;
        }
    }
  
    return true;
  }
  
  function displaySudoku(grid) {
    const outputGrid = document.getElementById("outputGrid");
    outputGrid.innerHTML = "";
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            outputGrid.innerHTML += grid[row][col] + " ";
            if (col === 2 || col === 5) outputGrid.innerHTML += "| ";
        }
        outputGrid.innerHTML += "<br>";
        if (row === 2 || row === 5) {
            outputGrid.innerHTML += "---------------------";
            outputGrid.innerHTML += "<br>";
        }
    }
  }
  
