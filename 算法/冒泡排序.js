var arr = [7, 4, 6, 2, 8, 5];
console.log(arr);
//var temp;
// 外面控制一共多少次(arr.length次)
for (var i = 0; i < arr.length; i++) {
  // 内部互换次数(arr.length - 1次) --优化减去外层已经遍历的次数
  for (var j = 0; j < arr.length - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      //  temp = arr[j];
      //  arr[j] = arr[j+1];
      //  arr[j+1] = temp;
      //ES6
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
}
console.log([...arr]);

// 更好理解的版本
function bubble(array) {
  const len = array.length;
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
	}
	return array;
}

console.log(bubble([6,5,4,3,2,1]))
