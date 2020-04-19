class Promise {
  // executor是一个执行器(函数)
  constructor(executor) {
    // console.log("被调用了");
    let _this = this; // 缓存实例的this
    _this.status = 'pending'; // 默认状态为等待状态
    _this.value = undefined; // 成功时要传递给成功回调的数据，默认undefined
    _this.reason = undefined; // 失败时要传递给失败回调的原因，默认undefined
    _this.onResolvedCallbacks = []; // 存放then成功的回调
    _this.onRejectedCallbacks = []; // 存放then失败的回调

    const resolve = value => {
      if (_this.status === 'pending') {
        _this.status = 'resolved';
        _this.value = value; // 更新value值
        // 调用缓存的回调
        _this.onResolvedCallbacks.forEach(fn => fn && fn());
      }
    };
    const reject = reason => {
      if (_this.status === 'pending') {
        _this.status = 'rejected';
        _this.reason = reason; // 更新reason值
        _this.onRejectedCallbacks.forEach(fn => fn && fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  // then
  then(onFulfilled, onRjected) {
    // 成功和失败默认不传给一个函数
    onFulfilled =
      typeof onFulfilled === 'function'
        ? onFulfilled
        : function(value) {
            return value;
          };
    onRjected =
      typeof onRjected === 'function'
        ? onRjected
        : function(err) {
            throw err;
          };
    let _this = this;
    let promise2; // 返回的promise
    if (_this.status === 'pending') {
      promise2 = new Promise((resolve, reject) => {
        _this.onResolvedCallbacks.push(function() {
          setTimeout(() => {
            try {
              let x = onFulfilled(_this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        _this.onRejectedCallbacks.push(function() {
          setTimeout(() => {
            try {
              let x = onRjected(_this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      });
      // 每一次then时，如果是等待态，就把回调函数push进数组中，什么时候改变状态什么时候再执行
      // _this.onResolvedCallbacks.push(function() {
      //   onFulfilled(_this.value);
      // });
      // _this.onRejectedCallbacks.push(function() {
      //   onRjected(_this.reason);
      // });
    }
    if (_this.status === 'resolved') {
      // 如果是成功态，执行用户传递的成功回调，传入数据
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(_this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
    if (_this.status === 'rejected') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRjected(_this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
    const resolvePromise = (promise2, x, resolve, reject) => {
      // 接受四个参数，新Promise、返回值、成功和失败的回调
      // 有可能这里返回的x是别人的promise
      // 尽可能允许其他乱写
      if (promise2 === x) {
        return reject(new TypeError('循环引用了'));
      }
      // 看x是不是一个promise，promise应该是一个对象
      let called; // 表示是否调用过成功或者失败
      if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 可能是promise,判断是否有then方法
        try {
          let then = x.then; // 保存一下x的then方法
          if (typeof then === 'function') {
            then.call(
              x,
              function(y) {
                if (called) return;
                called = true;
                resolvePromise(promise2, y, resolve, reject);
              },
              function(err) {
                if (called) return;
                called = true;
                reject(err);
              }
            );
          } else {
            resolve(x);
          }
        } catch (error) {
          if (called) return;
          called = true;
          reject(error);
        }
      } else {
        // 说明是一个普通值
        resolve(x);
      }
    };
    return promise2;
  }

  // catch用then模拟的
  catch(callback) {
    return this.then(null, callback);
  }

  static all(promises) {
    // promises是一个promise的数组
    return new Promise((resolve, reject) => {
      let arr = []; // arr是最终返回值得结果
      let i = 0; //表示成功了多少次
      function processData(index, y) {
        arr[index] = y;
        if (++i === promises.length) {
          resolve(arr);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(function(y) {
          processData(i, y);
        }, reject);
      }
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }
  // Promise.resolve
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  // Promise.reject
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

const P = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('done');
  //   reject('error');
  // }, 0);
  resolve('done');
  reject('error');
});

P.then(
  data => {
    console.log('触发啦');
    console.log(data);
  },
  // error => {
  //   console.log(error);
  // }
).catch(error => {
  console.log(error);
});
