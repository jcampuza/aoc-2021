const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const increment = (m, x, y) => {
  if (m[x] && m[x][y]) {
    m[x][y]++;
  }
};

/**
 *
 * @param {number[][]} m
 * @param {Set<string>} s
 * @returns
 */
const flashPass = (m, s) => {
  let flashCount = 0;
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m.length; x++) {
      if (m[x][y] > 9 && !s.has(`${x}${y}`)) {
        s.add(`${x}${y}`);
        flashCount++;
        // Left
        increment(m, x - 1, y - 1);
        increment(m, x - 1, y);
        increment(m, x - 1, y + 1);

        // middle
        increment(m, x, y - 1);
        increment(m, x, y + 1);

        // Right
        increment(m, x + 1, y - 1);
        increment(m, x + 1, y);
        increment(m, x + 1, y + 1);
      }
    }
  }

  return flashCount;
};

const step = (m) => {
  // Increment
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m.length; x++) {
      m[x][y]++;
    }
  }

  let s = new Set();
  let flashes = 0;

  // flash
  while (true) {
    let newFlashes = 0;
    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m.length; x++) {
        if (m[x][y] > 9 && !s.has(`${x}${y}`)) {
          s.add(`${x}${y}`);
          newFlashes++;
          // Left
          increment(m, x - 1, y - 1);
          increment(m, x - 1, y);
          increment(m, x - 1, y + 1);

          // middle
          increment(m, x, y - 1);
          increment(m, x, y + 1);

          // Right
          increment(m, x + 1, y - 1);
          increment(m, x + 1, y);
          increment(m, x + 1, y + 1);
        }
      }
    }

    if (newFlashes === 0) {
      break;
    }

    flashes += newFlashes;
  }

  // Reset
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m.length; x++) {
      if (m[x][y] > 9) {
        m[x][y] = 0;
      }
    }
  }

  return flashes;
};

const partOne = (input = '') => {
  const m = input.split('\n').map((line) => line.split('').map(Number));

  return Array.from({ length: 100 }).reduce((acc) => acc + step(m), 0);
};

const partTwo = (input = '') => {
  const m = input.split('\n').map((line) => line.split('').map(Number));
  const count = m.reduce((acc, line) => acc + line.length, 0);

  let i = 1;
  while (true) {
    if (step(m) === count) {
      return i;
    }
    i++;
  }
};

const t = readInput(path.join(__dirname, 'test.txt'));
console.log('------------TEST-----------');
console.log('Part One:', partOne(t));
console.log('Part Two:', partTwo(t));
console.log('\n');

const d = readInput(path.join(__dirname, 'input.txt'));
console.log('------------REAL-----------');
console.log('Part One:', partOne(d));
console.log('Part Two:', partTwo(d));
