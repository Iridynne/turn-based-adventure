export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizeList(list) {
  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function weightedRand(spec, denom = 10) {
  var i,
    j,
    table = [];
  for (i in spec) {
    for (j = 0; j < spec[i] * denom; j++) {
      table.push(i);
    }
  }
  return function () {
    return table[Math.floor(Math.random() * table.length)];
  };
}
