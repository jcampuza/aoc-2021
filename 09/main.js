const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const isLowPoint = (matrix, y, x) => {
  const top = matrix[y - 1]?.[x];
  const bottom = matrix[y + 1]?.[x];
  const left = matrix[y]?.[x - 1];
  const right = matrix[y]?.[x + 1];
  const self = matrix[y]?.[x];

  if ([top, bottom, left, right].filter((x) => x != null).every((point) => point > self)) {
    return true;
  }
  return false;
};

const findLowPoints = (matrix) => {
  let lowPoints = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isLowPoint(matrix, y, x)) {
        lowPoints.push({ x, y });
      }
    }
  }
  return lowPoints;
};

const partOne = (input = '') => {
  const lines = input.split('\n');
  const matrix = lines.map((line) => line.split('').map(Number));

  return findLowPoints(matrix)
    .map((point) => matrix[point.y][point.x] + 1)
    .reduce((acc, v) => acc + v);
};

// Find largest basin
const partTwo = (input = '') => {
  const lines = input.split('\n');
  const matrix = lines.map((line) => line.split('').map(Number));

  const fillBasin = (matrix, point, basin = new Set()) => {
    if (matrix[point.y][point.x] === 9 || basin.has(`${point.y}${point.x}`)) {
      return basin;
    }

    basin.add(`${point.y}${point.x}`);

    const top = { y: point.y - 1, x: point.x };
    const bottom = { y: point.y + 1, x: point.x };
    const left = { y: point.y, x: point.x - 1 };
    const right = { y: point.y, x: point.x + 1 };

    for (const adjacentPoint of [top, bottom, left, right]) {
      let adjacentValue = matrix?.[adjacentPoint.y]?.[adjacentPoint.x];

      if (adjacentValue && adjacentValue > matrix[point.y][point.x]) {
        basin = fillBasin(matrix, adjacentPoint, basin);
      }
    }

    return basin;
  };

  return findLowPoints(matrix)
    .map((point) => fillBasin(matrix, point))
    .sort((a, b) => (a.size > b.size ? -1 : 1))
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr.size, 1);
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(d));
console.log('p2', partTwo(d));
