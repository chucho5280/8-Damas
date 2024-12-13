const N = 8; 
let solutions = []; 


function solveAllNQueens() {
  solutions = [];
  const board = new Array(N).fill(-1);

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i] === col || Math.abs(board[i] - col) === row - i) return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === N) {
      solutions.push([...board]);
      return;
    }
    for (let col = 0; col < N; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1;
      }
    }
  }

  backtrack(0);
}



function displaySolutions() {
  const container = document.getElementById("solutions-container");
  container.innerHTML = ""; 

  solutions.forEach((solution) => {
    const boardDiv = document.createElement("div");
    boardDiv.className = "board";

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        if ((i + j) % 2 === 1) cell.classList.add("black");
        if (solution[i] === j) {
          cell.textContent = "♛";
          cell.classList.add("queen");
        }
        boardDiv.appendChild(cell);
      }
    }
    container.appendChild(boardDiv);
  });
}

function displaySpecificSolution() {
  const index = parseInt(prompt(`Ingresa el índice de la solución (0 a ${solutions.length - 1}):`), 10);
  if (isNaN(index) || index < 0 || index >= solutions.length) {
    alert("Índice inválido. Intenta de nuevo.");
    return;
  }

  const container = document.getElementById("solutions-container");
  container.innerHTML = ""; 
  const solution = solutions[index];
  const boardDiv = document.createElement("div");
  boardDiv.className = "board";

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if ((i + j) % 2 === 1) cell.classList.add("black");
      if (solution[i] === j) {
        cell.textContent = "♛";
        cell.classList.add("queen");
      }
      boardDiv.appendChild(cell);
    }
  }
  container.appendChild(boardDiv);
}


solveAllNQueens();

document.getElementById("show-all-btn").addEventListener("click", displaySolutions);
document.getElementById("show-one-btn").addEventListener("click", displaySpecificSolution);
