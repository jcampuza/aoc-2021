const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  const fileContent = fs.readFileSync(file, 'utf8');

  return fileContent;
};

const checkForBoardCompleted = (board) => {
  for (let i = 0; i < board.length; i++) {
    let completeRow = true;
    let completeColumn = true;

    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 'x') {
        completeRow = false;
      }

      if (board[j][i] !== 'x') {
        completeColumn = false;
      }
    }

    if (completeRow || completeColumn) {
      return true;
    }
  }
};

const partOne = (input = '') => {
  let [drawings, _, ...rows] = input.split('\n');
  drawings = drawings.split(',');

  let boards = [];
  let currBoard = [];
  for (const row of rows) {
    if (row === '') {
      boards.push(currBoard);
      currBoard = [];
    } else {
      currBoard.push(row.split(/\s+/).filter(Boolean));
    }
  }

  boards.push(currBoard);

  let { winningBoard, lastDraw } = (() => {
    for (const drawing of drawings) {
      for (const board of boards) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === drawing) {
              board[i][j] = 'x';
            }
          }
        }
      }

      for (const board of boards) {
        if (checkForBoardCompleted(board)) {
          return { winningBoard: board, lastDraw: drawing };
        }
      }
    }
  })();

  let sum = 0;
  for (let i = 0; i < winningBoard.length; i++) {
    for (let j = 0; j < winningBoard[i].length; j++) {
      if (winningBoard[i][j] !== 'x') {
        sum += Number(winningBoard[i][j]);
      }
    }
  }

  return sum * lastDraw;
};

const partTwo = (input = '') => {
  let [drawings, _, ...rows] = input.split('\n');
  drawings = drawings.split(',');

  let boards = [];
  let currBoard = [];
  for (const row of rows) {
    if (row === '') {
      boards.push(currBoard);
      currBoard = [];
    } else {
      currBoard.push(row.split(/\s+/).filter(Boolean));
    }
  }

  boards.push(currBoard);

  let { winningBoard, lastDraw } = (() => {
    for (const drawing of drawings) {
      for (const board of boards) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === drawing) {
              board[i][j] = 'x';
            }
          }
        }
      }

      for (const board of boards) {
        if (checkForBoardCompleted(board)) {
          boards = boards.filter((item) => item !== board);
          if (boards.length === 0) {
            return { winningBoard: board, lastDraw: drawing };
          }
        }
      }
    }
  })();

  let sum = 0;
  for (let i = 0; i < winningBoard.length; i++) {
    for (let j = 0; j < winningBoard[i].length; j++) {
      if (winningBoard[i][j] !== 'x') {
        sum += Number(winningBoard[i][j]);
      }
    }
  }

  return sum * lastDraw;
};

const input = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(input));
console.log(partTwo(input));
