const fs = require('fs');
const path = require('path');

const readInput = (file = '') => {
  return fs.readFileSync(file, 'utf-8');
};

const coord = (y, x) => `${x},${y}`;

class Graph {
  nodes = [];
  adjacencyList = {};

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(from, to, weight) {
    this.adjacencyList[from].push({ node: to, weight });
  }
}

class PriorityQueue {
  queue = [];

  add(el, priority) {
    const pqItem = { item: el, priority };

    for (let i = 0; i < this.queue.length; i++) {
      if (pqItem.priority < this.queue[i].priority) {
        this.queue.splice(i, 0, pqItem);
        return;
      }
    }

    this.queue.push(pqItem);
  }

  remove() {
    return this.queue.shift();
  }

  empty() {
    return this.queue.length === 0;
  }
}

const createFullMap = (input = '') => {
  const original = input.split('\n').map((line) => line.split(''));
  const full = [];

  // Expand vertically
  for (let i = 0; i < 5; i++) {
    const maxY = original[original.length - 1].length;

    for (let y = 0; y < original.length; y++) {
      for (let x = 0; x < original[y].length; x++) {
        const newY = y + maxY * i;
        const newX = x;

        if (!full[newY]) {
          full[newY] = [];
        }

        full[newY][newX] = Number(original[y][x]) + i;
        if (full[newY][newX] > 9) {
          full[newY][newX] -= 9;
        }
      }
    }
  }

  // Expand Horizontally
  const maxX = original[0].length;

  for (let i = 0; i < 5; i++) {
    for (let y = 0; y < full.length; y++) {
      for (let x = 0; x < maxX; x++) {
        const newX = x + maxX * i;

        full[y][newX] = Number(full[y][x]) + i;
        if (full[y][newX] > 9) {
          full[y][newX] -= 9;
        }
      }
    }
  }

  return full;
};

const parseInput = (m) => {
  const graph = new Graph();

  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      graph.addNode(coord(y, x));
    }
  }

  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y - 1]?.[x]) {
        graph.addEdge(coord(y, x), coord(y - 1, x), Number(m[y - 1][x]));
      }
      if (m[y + 1]?.[x]) {
        graph.addEdge(coord(y, x), coord(y + 1, x), Number(m[y + 1][x]));
      }
      if (m[y][x - 1]) {
        graph.addEdge(coord(y, x), coord(y, x - 1), Number(m[y][x - 1]));
      }
      if (m[y][x + 1]) {
        graph.addEdge(coord(y, x), coord(y, x + 1), Number(m[y][x + 1]));
      }
    }
  }

  const start = coord(0, 0);
  const maxY = m.length - 1;
  const maxX = m[maxY].length - 1;
  const end = coord(maxY, maxX);

  return { graph, start, end };
};

/**
 *
 * @param {Graph} graph
 * @param {*} start
 */
const shortestPath = (graph, start, end) => {
  let visited = {};
  let pq = new PriorityQueue();

  let realDistances = {};

  for (const node of graph.nodes) {
    realDistances[node] = Number.POSITIVE_INFINITY;
  }
  realDistances[start] = 0;

  pq.add(start, 0);

  while (!pq.empty()) {
    const pqItem = pq.remove();

    const list = graph.adjacencyList[pqItem.item];

    for (const adjacentNode of list) {
      // Actual distance
      let distance = realDistances[pqItem.item] + adjacentNode.weight;
      if (distance < realDistances[adjacentNode.node]) {
        realDistances[adjacentNode.node] = distance;
        visited[adjacentNode.node] = pqItem.item;
        pq.add(adjacentNode.node, distance);
      }
    }

    if (realDistances[end] !== Number.POSITIVE_INFINITY) {
      return realDistances;
    }
  }

  return realDistances;
};

const partOne = (input = '') => {
  const m = input.split('\n').map((line) => line.split(''));
  const { graph, start, end } = parseInput(m);

  return shortestPath(graph, start, end)[end];
};

const partTwo = (input = '') => {
  const m = createFullMap(input);
  const { graph, start, end } = parseInput(m);

  return shortestPath(graph, start, end)[end];
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
