const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  const fileContent = fs.readFileSync(file, 'utf8');

  return fileContent;
};

const partOne = (input = '') => {
  // part one
  return input
    .split('\n')
    .map((i) => Number(i))
    .reduce((acc, curr, i, arr) => {
      return arr[i + 1] > arr[i] ? acc + 1 : acc;
    }, 0);
};

const partTwo = (input = '') => {
  // part two
  return input
    .split('\n')
    .map((i) => Number(i))
    .reduce((acc, curr, i, arr) => {
      const sumA = arr.slice(i, i + 3).reduce((acc, a) => acc + a, 0);
      const sumB = arr.slice(i + 1, i + 4).reduce((acc, a) => acc + a, 0);

      return sumB > sumA ? acc + 1 : acc;
    }, 0);
};

const input = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(input));
console.log(partTwo(input));
