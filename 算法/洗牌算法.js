/*
  随机排序算法 function shuffle() {}
  总共迭代 len - 1 次
  每一次迭代从前 (len - i) 个元素里随机一个位置，将这个元素和第 (len - i) 个元素进行交换
  第 (len - i)个，也就是索引值为 len - i -1 的元素
  迭代直到 i = len - 1为止
*/
function shuffle(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        var temp  = arr[idx];
        arr[idx] = arr[len - i -1];
        arr[len - i -1] = temp
    }
    return arr
}

console.log(shuffle([1,2,3,4,5]))