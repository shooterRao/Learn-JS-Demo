function loop(n) {
  if (n <= 1) {
    return 1;
  }
  return n * loop(n - 1);
}

// loop(10);

const array = [[['aaa'], 'bbb'], 'ccc'];

function consoleArray(data) {
  if (!Array.isArray(data)) {
    console.log(data);
    return;
  }
  data.forEach(val => consoleArray(val));
}

consoleArray(array);