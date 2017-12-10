const fn = function(a,b) {
    return function(x) {
        return a(b(x));
    }
}//合并a,b两个函数
fn(function(a){ console.log(a) },function(b){ return b+1 })(1)

const checkage = age => age > 18;

//函数柯里化（curry）的定义很简单：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
//比如对于加法函数 var add = (x, y) =>　x + y ，我们可以这样进行柯里化
const add = x => (y=> x+y)
console.log(add(1)(2));
//事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法：
//栗子
var match = reg=>str=>str.match(reg);
var filter = f=>arr=>arr.filter(f);
var haveSpace = match(/\s+/g);
console.log(filter(haveSpace)(['abc','hello world!']))
//console.log(haveSpace);
console.log('hello world'.match(/\s+/g))

