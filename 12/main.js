const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const traversePaths = (graph, start, visited = {}, secondVisitTaken = false, path = '') => {
  path = `${path}, ${start}`;

  if (start === 'end') {
    return [path];
  }

  if (!graph[start]) {
    return [];
  }

  if (start.toLowerCase() === start && visited[start]) {
    if (secondVisitTaken) {
      return [];
    }

    secondVisitTaken = true;
  }

  return (
    graph[start]
      // Start is not a valid traversal
      .filter((node) => node !== 'start')
      .flatMap((node) =>
        traversePaths(graph, node, { ...visited, [start]: true }, secondVisitTaken, path)
      )
  );
};

const createGraph = (input = '') => {
  const edges = input.split('\n').map((line) => line.split('-'));
  const graph = {};
  for (const edge of edges) {
    const [start, end] = edge;
    graph[start] = (graph[start] ?? []).concat(end);
    graph[end] = (graph[end] ?? []).concat(start);
  }

  return graph;
};

const partOne = (input = '') => {
  const paths = traversePaths(createGraph(input), 'start', {}, true);
  return paths.length;
};

const partTwo = (input = '') => {
  const paths = traversePaths(createGraph(input), 'start', {});
  return paths.length;
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
