const arr = [1, 2, 3, [4, 5, [6, 7], 8], 9];

// 方法1 es6
const unfold = (arr, pre = []) =>
  arr.reduce(function(prev, curr) {
    return Array.isArray(curr) ? unfold(curr, prev) : prev.concat(curr);
  }, pre);

// 方法2 es5
var arr = [1, 2, 3, [4, 5, [6, 7], 8], 9];
var result = [];
function unfold(arr) {
  arr.forEach(function(item) {
    if (Array.isArray(item)) {
      unfold(item);
    } else {
      result.push(item);
    }
  });
}
unfold(arr);


