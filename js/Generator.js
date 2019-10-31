/* 
generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数
是一个状态加，封装了多个内部状态。

执行generator函数有多种理解角度。从语法上，首先可以把它理解成，
generator函数除了状态机，还是一个遍历器对象生成函数。
返回的遍历器对象，可以依次遍历generator函数内部的每一个状态

*/

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
//调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
var hw = helloWorldGenerator();

/* 
必须调用遍历器对象的next方法，使得指针移向下一个状态。
也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
*/
console.log(hw.next()); //{ value: 'hello', done: false }
console.log(hw.next());
console.log(hw.next()); //执行到return时,属性done值变为true
console.log(hw.next());

// next方法的参数表示上一个yield表达式的返回值

function* foo(x) {
  var y = 2 * (yield x + 1); // next(12) -> 2 * 12
  var z = yield y / 3;
  return x + y + z;
}

var a = foo(5);
console.log(a.next());
console.log(a.next(12));
console.log(a.next(13)); // 5 + 24 + 13
