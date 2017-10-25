function biggest(arr) {
    var max = arr[0];
    for (var k of arr) {
        if(max < k) {
            max = k;
        }
    }
    return max;
}

// 找出最大的数
function largestOfFour(arr) {
    
    var newArr = [];
    for (var v of arr ) {
      if (Array.isArray(v)) {
        newArr.push(Math.max.apply(null,v)); // call和apply第一个参数为null,this指向window
      }
    }
    return newArr;
  }
// 多维数组转为一维数组的方法，join(',').split(',')
var a=[1,2,3,[5,6],[1,4,8]];
var ta=a.join(",").split(",");

console.log(biggest([1,3,7]));
console.log(Math.max.apply(null,[1,3,7])) // 最简便的方法
