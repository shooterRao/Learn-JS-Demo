// 方法一
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list1() {
  return slice(arguments);
}

var list1 = list1(1, 2, 3); // [1, 2, 3]

// 方法二
function list2() {
  return Array.prototype.slice.call(arguments);
}

var list2 = list2(1, 2, 3); // [1, 2, 3]

// 方法三
function list3() {
  return Array.from(arguments);
}

var list3 = list3(1, 2, 3); // [1, 2, 3]

console.log(list1,list2,list3)