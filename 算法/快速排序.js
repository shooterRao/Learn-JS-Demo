function quickSort(arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr;
  }
  // console.log(123);
  let left = [];
  let right = [];
  let pivot = arr[0]; // 基数
  // 数组长度大于1才遍历
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]); // 小的放左边
    } else {
      right.push(arr[i]); // 大的放右边
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
let result = quickSort([4, 2, 1, 6, 9, 11]);
console.log(result);

// demo: [4,2,1,6,9,10,11]
// 第一步, 取 arr[0] 为基数,遍历数组，小于arr[0]放左边，大于arr[0]放右边
// 递归数组left,临界值,当遍历到只剩一个数字时,就是[].concat(this,[])，实际上就是放回this
