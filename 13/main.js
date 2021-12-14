const fs = require('fs');
const path = require('path');
const { pipe, tap, take } = require('../util/util');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const logPlot = (plot) => {
  plot.forEach((line) => console.log(line.join('')));
};

const iterateMatrix = (matrix, cb) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      cb({ x, y, value }, matrix);
    }
  }
};

const foldPlot = (plot, fold) => {
  if (fold.axis === 'y') {
    iterateMatrix(plot, (point) => {
      if (point.y > fold.value && point.value === '#') {
        plot[point.y - (point.y - fold.value) * 2][point.x] = point.value;
      }
    });

    return plot.slice(0, fold.value);
  }

  if (fold.axis === 'x') {
    iterateMatrix(plot, (point) => {
      if (point.x > fold.value && point.value === '#') {
        plot[point.y][point.x - (point.x - fold.value) * 2] = point.value;
      }
    });

    return plot.map((line) => line.slice(0, fold.value));
  }
};

const parseFoldsAndPlot = (input) => {
  const [dotsRaw, foldsRaw] = input.split('\n\n');

  const dots = dotsRaw
    .split('\n')
    .map((line) => line.split(',').map(Number))
    .map(([x, y]) => ({ x, y }));
  const maxX = Math.max(...dots.map((dot) => dot.x));
  const maxY = Math.max(...dots.map((dot) => dot.y));

  const folds = foldsRaw
    .split('\n')
    .map((fold) => fold.split('fold along ')[1])
    .map((fold) => fold.split('='))
    .map(([axis, value]) => ({ axis, value: Number(value) }));

  const plot = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => '.'));
  dots.forEach((dot) => (plot[dot.y][dot.x] = '#'));

  return { plot, folds };
};

const applyFolds = ({ plot, folds }) => folds.reduce((acc, fold) => foldPlot(acc, fold), plot);

const takeFirstFold = (folds) => take(folds, 1);

const getPlotAndFirstFold = ({ plot, folds }) => ({ plot, folds: takeFirstFold(folds) });

/**
 * Count
 */
const countHashesInPlot = (plot) => {
  let count = 0;
  iterateMatrix(plot, (point) => point.value === '#' && count++);
  return count;
};

const partOne = pipe(parseFoldsAndPlot, getPlotAndFirstFold, applyFolds, countHashesInPlot);

const partTwo = pipe(parseFoldsAndPlot, applyFolds, tap(logPlot), () => 'Look up and read');

const t = readInput(path.join(__dirname, 'test.txt'));
console.log('------------TEST-----------');
console.log('Part One:', partOne(t));
console.log('Part Two:', partTwo(t));
console.log('\n');

const d = readInput(path.join(__dirname, 'input.txt'));
console.log('------------REAL-----------');
console.log('Part One:', partOne(d));
console.log('Part Two:', partTwo(d));
