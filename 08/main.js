const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf8');
};

/**
 *
 * @param {Set} s1
 * @param {Set} s2
 */
const areEqual = (s1, s2) => {
  const r = new Set();
  s1.forEach((value) => {
    if (s2.has(value)) {
      r.add(value);
    }
  });

  return r.size === s1.size && r.size === s2.size;
};

/**
 *
 * @param {Set} s1
 * @param {Set} s2
 */
const isSubset = (s1, s2) => {
  const intermediate = new Set();

  s1.forEach((entry) => {
    if (s2.has(entry)) {
      intermediate.add(entry);
    }
  });

  return intermediate.size === s2.size;
};

/**
 *
 * @param {Set} s1
 * @param {Set} s2
 */
const difference = (s1, s2) => {
  const diff = new Set();
  s1.forEach((v) => {
    if (!s2.has(v)) {
      diff.add(v);
    }
  });

  return diff;
};

const partOne = (input = '') => {
  const lines = input.split('\n').map((line) => {
    const [left, right] = line.split(' | ');
    const input = left.split(' ');
    const output = right.split(' ');
    return { input, output };
  });

  return lines.reduce((acc, line) => {
    return (
      acc +
      line.output.filter((code) => {
        return [7, 4, 3, 2].some((segmentsCount) => code.length === segmentsCount);
      }).length
    );
  }, 0);
};

// Segment counts
//   9: 6,
//   0: 6,
//   6: 6,
//   8: 7,
//   3: 5,
//   5: 5,
//   2: 5,
//   4: 4,
//   7: 3,
//   1: 2,
//

const partTwo = (input = '') => {
  const lines = input.split('\n').map((line) => {
    const [left, right] = line.split(' | ');
    const input = left.split(' ');
    const output = right.split(' ');
    return { input, output, all: [...input, ...output] };
  });

  let sum = 0;
  for (const line of lines) {
    const getSignalMapping = (number, filterFn = () => true) => {
      const mappings = line.input.filter((signal) => {
        return signal.length === number && filterFn(signal);
      });

      const set = new Set(mappings[0].split(''));

      line.input = line.input.filter((line) => {
        return !areEqual(new Set(line.split('')), set);
      });

      return set;
    };

    const mapping = {};
    mapping[1] = getSignalMapping(2);
    mapping[4] = getSignalMapping(4);
    mapping[7] = getSignalMapping(3);
    mapping[8] = getSignalMapping(7);

    // digits with 6 signals, 9 has a 4 in it while others done
    mapping[9] = getSignalMapping(6, (signal) => isSubset(new Set(signal), mapping[4]));

    // 0 has a 7 in it, while 6 doesn't
    mapping[0] = getSignalMapping(6, (signal) => isSubset(new Set(signal), mapping[7]));

    // Only 6 is left
    mapping[6] = getSignalMapping(6);

    // 3 has a 7 in it, and 2 and 5 don't
    mapping[3] = getSignalMapping(5, (signal) => isSubset(new Set(signal), mapping[7]));

    // only 2 and 5 left,
    // 5 is only missing one segment from a 4, while 2 misses 2
    mapping[5] = getSignalMapping(
      5,
      (signal) => difference(mapping[4], new Set(signal)).size === 1
    );

    // only one left
    mapping[2] = getSignalMapping(5);

    const digits = line.output
      .map((digit) => {
        const s = new Set(digit);
        const entry = Object.entries(mapping).find(([key, value]) => {
          return areEqual(value, s);
        });
        return entry[0];
      })
      .join('');

    sum += Number(digits);
  }

  return sum;
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(d));
console.log(partTwo(d));
