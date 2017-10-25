// Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
/* 

Array.of()和Array构造函数之间的区别在于处理整数参数，Array.of(7)创建一个具有单个元素7的数组，
而Array(7)创建一个包含7个undefined元素的数组

Array.of(element0[, element1[, ...[, elementN]]])

参数
elementN
任意个参数，将按顺序成为返回数组中的元素。

返回值
新的 Array 实例。

*/

Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

// polyfill
if( !Array.of ) {
    Array.of = function() {
        return Array.prototype.slice.call(arguments);
    }
}

// Array.from() :对伪数组或可迭代对象(包括arguments Array,Map,Set,String...)转换成数组对象
const bar = ["a","b","c"];
Array.from(bar);
// ["a", "b", "c"]

Array.from('foo');
// ["f", "o", "o"]

// Array.from(arrayLike, mapFn, thisArg)

/* 

参数

arrayLike
想要转换成数组的伪数组对象或可迭代对象。

mapFn (可选参数)
如果指定了该参数，新数组中的每个元素会执行该回调函数。

thisArg (可选参数)
可选参数，执行回调函数 mapFn 时 this 对象。

返回值
一个新的数组实例

*/

Array.from('foo'); 
// ["f", "o", "o"]

let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

function f() {
    return Array.from(arguments);
  }
  
  f(1, 2, 3);
// [1, 2, 3]

Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
