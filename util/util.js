const pipe = (...fns) => {
  return (...args) => {
    const [first, ...rest] = fns;
    return rest.reduce((acc, fn) => fn(acc), first(...args));
  };
};

const tap = (cb) => {
  return (args) => {
    cb(args);
    return args;
  };
};

const range = (length) => {
  return Array.from({ length }, (_, i) => i);
};

const take = (arr, count) => {
  if (Array.isArray(arr)) {
    return arr.slice(0, count);
  }

  return [];
};

module.exports = { pipe, tap, take, range };
