function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}


// test
const fn = cached(function (str) {
  let i = 10000;
  while(i--) {};
  return str;
})


console.time("test1");
fn(1); // 2.9ms
console.timeEnd("test1");

console.time("test2");
fn(1); // 0.005ms
console.timeEnd("test2");