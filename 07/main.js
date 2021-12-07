const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf8');
};

const partOne = (input = '') => {
  input = input.split(',').map(Number);

  let min = Number.POSITIVE_INFINITY;

  for (let i = Math.min(...input); i < Math.max(...input); i++) {
    const distance = input.reduce((acc, v) => acc + Math.abs(v - i), 0);
    min = distance < min ? distance : min;
  }

  return min;
};

const summation = (v = 0) => {
  let res = 0;
  for (let i = v; i > 0; i--) {
    res += i;
  }

  return res;
};

const partTwo = (input = '') => {
  input = input.split(',').map(Number);

  let min = Number.POSITIVE_INFINITY;

  for (let i = Math.min(...input); i < Math.max(...input); i++) {
    const distance = input.reduce((acc, v) => acc + summation(Math.abs(v - i)), 0);
    min = distance < min ? distance : min;
  }

  return min;
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(d));
console.log(partTwo(d));
