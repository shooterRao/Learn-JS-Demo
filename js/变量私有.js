function Fn() {}
Fn.prototype.data = {
  pageQueue: [1,2,3] //数组是引用类型, 实例会共享 
}

const fn1 = new Fn();
const fn2 = new Fn();

fn1.data.pageQueue.push(4);

console.log(fn2.data.pageQueue);// [1,2,3,4]

// 解决，加层闭包，变量即可私有
function newFn() { this.data = this.data() }

newFn.prototype.data = function() {
  return { pageQueue: [1,2,3] }
}

const newF1 = new newFn();
const newF2 = new newFn();

newF1.data.pageQueue.push(4)

console.log(newF2.data.pageQueue);// 123
