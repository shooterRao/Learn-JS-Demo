/* 
  在ES6中，strict模式下，满足以下条件，尾调用优化会开启，此时引擎不会创建一个新的栈帧，而是清除当前栈帧的数据并复用：
　（1、尾调用函数不需要访问当前栈帧中的变量
　（2、尾调用返回后，函数没有语句需要继续执行
　（3、尾调用的结果就是函数的返回值
*/

// 下面例子中的函数就可以使用尾调用优化：

"use strict";
function doSomething() {
    return doSomethingElse();
}

// 然而下面例子中的函数不能使用尾调用优化，因为尾调用的结果不是函数的返回值：

"use strict";
function doSomething() {
    doSomethingElse();
}

// 尾调用返回后，如果函数仍然有语句要执行，也是不能使用尾调用优化的：

"use strict";
function doSomething() {
    return 1 + doSomethingElse();
}

// 尾调用函数如果是闭包函数，也不能使用尾调用优化：

"use strict";
function doSomething() {
    var num = 1;
    var func = () => num;
    return func();
}

// 如何优化？

// 比如一个递归计算阶乘的函数：

// 新写法
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);  
}

// 旧写法
function oldFactorial(n) {
  if (n <= 1) {
    　　return 1;
    } else {
    　　return n * oldFactorial(n - 1);
    }
}

// 上面的代码并不能使用尾调用优化
// 因为factorial(n-1)返回后，仍然有语句要继续执行。

// 但是我们可以改写这个函数，使其能够利用尾调用优化特性：

function factorial(n, p = 1) {
  if(n <= 1) {
    return 1 * p;
  }else {
    let result = n * p;
    return factorial(n - 1, result);
  }
}