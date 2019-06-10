// 什么是函数重载？
// -- 函数名一样，输入输出不一样，1个参数和2个参数返回的结果互不相同

// 一种比较简单的方法是用 switch 判断 arguments 的长度进行不同的操作

function overLoading(...args) {
  switch (args.length) {
    case 0 :
      // ...
      break;
    case 1 :
      // ...
      break;
  }
}

// 还有一种利用闭包的方式

const people = {
  values: ["Dean Edwards", "Sam Stephenson", "Alex Russell", "Dean Tom"]
};

// 需求
// 写一个方法，不传参数，放回所有人名， 传一个参数，根据 firstName 传回 ，传二个参数， 根据完整人名返回

// 重载包装函数
function addMethod(object, name, fn) {
  // 重装函数之前，拿到上一个函数，缓存下去
  const old = object[name];
  // 重写 object[name] 方法
  object[name] = function() {
    // 这里用到的闭包就是
    // 通过fn的参数长度和实际调用参数长度来匹配
    // old记录着上一个函数，如果匹配不满足，就调用old函数
    // 绑定find1时，old为find0，绑定find2时，old为find1
    // 类推下去...
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
    } else if (typeof old === 'function') {
      return old.apply(this, arguments);
    }
  }
}

function find0() {
  return this;
}

function find1(a) {
  return this.values.filter(_ => _.includes(a));
}

function find2(a, b) {
  return this.values.filter(_ => _ === `${a} ${b}`)
}

addMethod(people, 'find', find0);
addMethod(people, 'find', find1);
addMethod(people, 'find', find2);

const v = people.find('Dean', 'Tom');
console.log(v);
