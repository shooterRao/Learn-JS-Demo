// es6 代理

const data = {};
const p = new Proxy(data, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  }
});


// let target = {};
// let p = new Proxy(target, {});

// p.a = 37;   // 操作转发到目标

// console.log(target.a);    // 37. 操作已经被正确地转发