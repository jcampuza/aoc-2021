const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  const fileContent = fs.readFileSync(file, 'utf8');

  return fileContent;
};

const parseLine = (line) => {
  const [p1, p2] = line.split(' -> ');

  const [x1, y1] = p1.split(',');
  const [x2, y2] = p2.split(',');

  return {
    p1: { x: Number(x1), y: Number(y1) },
    p2: { x: Number(x2), y: Number(y2) },
  };
};

const partOne = (input = '') => {
  const lines = input.split('\n');

  // console.log(lines.length);
  const horzAndVerticals = lines.map(parseLine).filter((parsed) => {
    const hor = parsed.p1.y === parsed.p2.y;
    const ver = parsed.p1.x === parsed.p2.x;
    const diag = Math.abs((parsed.p2.x - parsed.p1.x) / (parsed.p2.y - parsed.p2.y)) === 1;

    return hor || ver || diag;
  });

  const grid = new Map();

  for (const line of horzAndVerticals) {
    if (line.p1.x === line.p2.x) {
      // vertical
      const x = line.p1.x;

      const min = Math.min(line.p1.y, line.p2.y);
      const max = Math.max(line.p1.y, line.p2.y);

      for (let y = min; y <= max; y++) {
        grid.set(`${x},${y}`, grid.get(`${x},${y}`) ? 2 : 1);
      }
    } else if (line.p1.y === line.p2.y) {
      // horizontal
      const y = line.p1.y;
      const min = Math.min(line.p1.x, line.p2.x);
      const max = Math.max(line.p1.x, line.p2.x);

      for (let x = min; x <= max; x++) {
        grid.set(`${x},${y}`, grid.get(`${x},${y}`) ? 2 : 1);
      }
    }
  }

  let count = 0;
  for (const value of grid.values()) {
    if (value > 1) {
      count++;
    }
  }

  return count;
};

const partTwo = (input = '') => {
  const lines = input.split('\n');

  const horzAndVerticals = lines.map(parseLine).filter((parsed) => {
    const hor = parsed.p1.y === parsed.p2.y;
    const ver = parsed.p1.x === parsed.p2.x;
    const diag = Math.abs((parsed.p2.y - parsed.p1.y) / (parsed.p2.x - parsed.p1.x)) === 1;

    return hor || ver || diag;
  });

  const grid = new Map();

  for (const line of horzAndVerticals) {
    if (line.p1.x === line.p2.x) {
      // vertical
      const x = line.p1.x;
      const min = Math.min(line.p1.y, line.p2.y);
      const max = Math.max(line.p1.y, line.p2.y);

      for (let y = min; y <= max; y++) {
        grid.set(`${x},${y}`, grid.get(`${x},${y}`) ? 2 : 1);
      }
    } else if (line.p1.y === line.p2.y) {
      // horizontal
      const y = line.p1.y;
      const min = Math.min(line.p1.x, line.p2.x);
      const max = Math.max(line.p1.x, line.p2.x);

      for (let x = min; x <= max; x++) {
        grid.set(`${x},${y}`, grid.get(`${x},${y}`) ? 2 : 1);
      }
    } else {
      // diag
      let dx = line.p1.x < line.p2.x ? 1 : -1;
      let dy = line.p1.y < line.p2.y ? 1 : -1;

      for (let i = 0; i <= Math.abs(line.p1.x - line.p2.x); i++) {
        const key = `${line.p1.x + i * dx},${line.p1.y + i * dy}`;
        grid.set(key, grid.get(key) ? 2 : 1);
      }
    }
  }

  let count = 0;
  for (const value of grid.values()) {
    if (value > 1) {
      count++;
    }
  }

  return count;
};

const d = readInput(path.join(__dirname, 'input.txt'));
console.log(partOne(d));
console.log(partTwo(d));
