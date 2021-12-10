const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const legalPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const closingCharPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

// A corrupted line is one where a chunk closes with the wrong character

const partOne = (input = '') => {
  let lines = input.split('\n').map((line) => line.split(''));
  let score = 0;

  for (const line of lines) {
    const stack = [];

    for (const char of line) {
      if (char in legalPairs) {
        stack.push(legalPairs[char]);
      } else {
        const expectedClosingChar = stack.pop();
        if (char !== expectedClosingChar) {
          score += closingCharPoints[char];
        }
      }
    }
  }

  return score;
};

// Find largest basin
const partTwo = (input = '') => {
  let lines = input.split('\n').map((line) => line.split(''));

  lines = lines.filter((line) => {
    const stack = [];

    for (const char of line) {
      if (char in legalPairs) {
        stack.push(legalPairs[char]);
      } else {
        const expectedClosingChar = stack.pop();
        if (char !== expectedClosingChar) {
          return false;
        }
      }
    }

    return true;
  });

  const completionStrings = lines.map((line) => {
    const stack = [];

    for (const char of line) {
      if (char in legalPairs) {
        stack.push(legalPairs[char]);
      } else {
        stack.pop();
      }
    }

    return stack.reverse();
  });

  const scores = completionStrings
    .map((stack) => {
      return stack.reduce((acc, str) => {
        acc *= 5;
        switch (str) {
          case ')':
            return (acc += 1);
          case ']':
            return (acc += 2);
          case '}':
            return (acc += 3);
          case '>':
            return (acc += 4);
        }
      }, 0);
    })
    .sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(d));
console.log(partTwo(d));
