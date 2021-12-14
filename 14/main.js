const fs = require('fs');
const path = require('path');
const { range } = require('../util/util');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const pairWise = (str) => {
  return str.split('').reduce((acc, v, i, arr) => {
    return arr[i + 1] ? [...acc, [arr[i], arr[i + 1]].join('')] : acc;
  }, []);
};

const parseInput = (input) => {
  let [template, rules] = input.split('\n\n');
  let rulesMap = new Map(rules.split('\n').map((line) => line.split(' -> ')));

  let uniqueCounts = {};
  uniqueCounts[template[0]] = (uniqueCounts[template[0]] ?? 0) + 1;
  uniqueCounts[template[template.length - 1]] =
    (uniqueCounts[template[template.length - 1]] ?? 0) + 1;

  let state = pairWise(template).reduce(
    (acc, pair) => ({ ...acc, [pair]: acc[pair] ? acc[pair] + 1 : 1 }),
    {}
  );

  return { rules: rulesMap, counts: uniqueCounts, state };
};

const generateNextState = (state, rulesMap, counts) => {
  const newState = {};
  for (const key of Object.keys(state)) {
    const [left, right] = key.split('');
    const match = rulesMap.get(key);
    const leftMatch = `${left}${match}`;
    const rightMatch = `${match}${right}`;

    newState[leftMatch] = (newState[leftMatch] ?? 0) + state[key];
    newState[rightMatch] = (newState[rightMatch] ?? 0) + state[key];
    counts[match] = (counts[match] ?? 0) + state[key];
  }

  return { state: newState, rules: rulesMap, counts };
};

const partOne = (input = '') => {
  const res = range(10).reduce(
    (acc) => generateNextState(acc.state, acc.rules, acc.counts),
    parseInput(input)
  );

  const sorted = Object.values(res.counts).sort((a, b) => b - a);

  return sorted[0] - sorted[sorted.length - 1];
};

const partTwo = (input = '') => {
  const res = range(40).reduce(
    (acc) => generateNextState(acc.state, acc.rules, acc.counts),
    parseInput(input)
  );

  const sorted = Object.values(res.counts).sort((a, b) => b - a);

  return sorted[0] - sorted[sorted.length - 1];
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
