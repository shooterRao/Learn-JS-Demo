class Event {
  constructor() {
    this._cache = {};
  }
  // 绑定
  on(type, callback) {
    // 将同一类型事件放到一个数组中
    // 数组是队列，遵循先进先出
    let fns = (this._cache[type] = this._cache[type] || []);
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
    return this;
  }

  // 触发
  trigger(type, data) {
    let fns = this._cache[type];
    // console.log(fns);
    if (Array.isArray(fns)) {
      // 先进先出，依次触发
      fns.forEach(fn => {
        fn(data);
      });
    }
    return this;
  }
  // 解绑
  off(type, callback) {
    let fns = this._cache[type];
    console.log(fns);
    if (Array.isArray(fns)) {
      if (callback) {
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        // 全部清空
        fns.length = 0;
      }
    }
    return this;
  }
}

const demo = new Event();
demo.on("hh", () => {
  console.log("hh");
});
demo.on("hh", () => {
  console.log("hh");
});
var handle = () => {
  console.log('xx');
}
demo.on("hh",handle);
demo.on("hh",handle);// 只会装入一次
demo.trigger("hh");
// demo.off("hh").trigger("hh");
// 往事件队列添加匿名函数或者函数声明，通过indexof检测匿名函数为-1
// 函数表达式则会被indexof检测到
