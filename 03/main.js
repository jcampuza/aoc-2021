const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  const fileContent = fs.readFileSync(file, 'utf8');

  return fileContent;
};

const partOne = (input = '') => {
  const lines = input.split('\n');
  const len = lines[0].length;

  let res = '';

  for (let i = 0; i < len; i++) {
    let zeros = 0;
    let ones = 0;

    for (const line of lines) {
      line[i] === '1' ? ones++ : zeros++;
    }

    res += zeros > ones ? '0' : '1';
  }

  const gamma = parseInt(res, 2);
  const epsilon = parseInt(
    res
      .split('')
      .map((r) => (r === '0' ? '1' : '0'))
      .join(''),
    2
  );

  return gamma * epsilon;
};

const partTwo = (input = '') => {
  const lines = input.split('\n');
  const len = lines[0].length;

  let oxygenLines = lines.slice();
  for (let i = 0; i < len; i++) {
    let zeros = 0;
    let ones = 0;

    for (const line of oxygenLines) {
      line[i] === '1' ? ones++ : zeros++;
    }

    const mostCommon = ones >= zeros ? '1' : '0';

    oxygenLines = oxygenLines.filter((line) => {
      return line[i] === mostCommon;
    });

    if (oxygenLines.length === 1) {
      break;
    }
  }

  let co2Lines = lines.slice();
  for (let i = 0; i < len; i++) {
    let zeros = 0;
    let ones = 0;

    for (const line of co2Lines) {
      line[i] === '1' ? ones++ : zeros++;
    }

    const leastCommon = ones >= zeros ? '0' : '1';

    co2Lines = co2Lines.filter((line) => {
      return line[i] === leastCommon;
    });

    if (co2Lines.length === 1) {
      break;
    }
  }

  return parseInt(oxygenLines[0], 2) * parseInt(co2Lines[0], 2);
};

const input = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(input));
console.log(partTwo(input));
