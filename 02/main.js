const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  const fileContent = fs.readFileSync(file, 'utf8');

  return fileContent;
};

const parseDirection = (line) => {
  const [dir, value] = line.split(' ');

  return [dir, Number(value)];
};

const partOne = (input = '') => {
  let hor = 0;
  let vertical = 0;

  input
    .split('\n')
    .map((line) => parseDirection(line))
    .forEach((v) => {
      const [dir, value] = v;

      if (dir === 'forward') {
        hor += value;
      }

      if (dir === 'down') {
        vertical += value;
      }

      if (dir === 'up') {
        vertical -= value;
      }
    });

  return hor * vertical;
};

const partTwo = (input = '') => {
  let hor = 0;
  let vertical = 0;
  let aim = 0;

  input
    .split('\n')
    .map((line) => parseDirection(line))
    .forEach((v) => {
      const [dir, value] = v;

      if (dir === 'forward') {
        hor += value;
        vertical += value * aim;
      }

      if (dir === 'down') {
        aim += value;
      }

      if (dir === 'up') {
        aim -= value;
      }
    });

  return hor * vertical;
};

const input = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(input));
console.log(partTwo(input));
