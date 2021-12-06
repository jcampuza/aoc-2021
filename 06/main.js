const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf8');
};

const simulate = (input = '', days) => {
  const fishCount = input
    .split(',')
    .map(Number)
    .reduce((acc, value) => {
      acc[value] = (acc[value] ?? 0) + 1;
      return acc;
    }, {});

  for (let i = 0; i < days; i++) {
    const zeros = fishCount[0] ?? 0;

    for (let j = 0; j < 8; j++) {
      fishCount[j] = fishCount[j + 1] ?? 0;
    }

    fishCount[6] += zeros;
    fishCount[8] = zeros;
  }

  return Object.values(fishCount).reduce((acc, c) => acc + c);
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(simulate(d, 80));
console.log(simulate(d, 256));
