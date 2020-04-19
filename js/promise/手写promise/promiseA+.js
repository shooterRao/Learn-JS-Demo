// thanks https://github.com/JOE-XIE/MyWheel/tree/master/MyPromise

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(fn) {
    this.value = null;
    this.error = null;
    this.status = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(this.value));
      }
    };

    const reject = error => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.error = error;
        this.onRejectedCallbacks.forEach(callback => callback(this.error));
      }
    };

    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    let bridgePromise;
    // 默认给个函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw error; // 能被外面 catch 到
          };
    if (this.status === FULFILLED) {
      bridgePromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(bridgePromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      return bridgePromise;
    }

    if (this.status === REJECTED) {
      bridgePromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.error);
            resolvePromise(bridgePromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      return bridgePromise;
    }

    if (this.status === PENDING) {
      bridgePromise = new MyPromise((resolve, reject) => {
        // 异步 pending，放入 onFulfilledCallbacks 中
        // 回调函数负责执行 onFulfilled 和 更新 bridgePromise 的状态
        // promise.then().then()
        // 当前 promise 的 onFulfilledCallbacks 里的回调函数
        // 负责执行.then里面的回调函数和更新.then返回的bridgePromise状态
        this.onFulfilledCallbacks.push(value => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              resolvePromise(bridgePromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          })
          
        });

        this.onRejectedCallbacks.push(error => {
          setTimeout(() => {
            try {
              const x = onRejected(error);
              resolvePromise(bridgePromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          })
        });
      });

      return bridgePromise;
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  // 避免循环引用
  if (bridgePromise === x) {
    return reject(new TypeError('Circular reference'));
  }

  let called = false;

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 具有 then 方法的对象或者函数
      let then = x.then;
      if (typeof then === 'function') {
        // 如果 then 是一个函数
        // 以 x 为 this 调用 then 函数
        then.call(
          x,
          y => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(bridgePromise, y, resolve, reject);
          },
          error => {
            if (called) {
              return;
            }
            called = true;
            reject(error);
          }
        );
      } else {
        // 如果 then 不是函数
        resolve(x);
      }
    } catch (error) {
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

MyPromise.resolve = function(value) {
  return new MyPromise(resolve => {
    resolve(value);
  });
};

MyPromise.reject = function(error) {
  return new MyPromise((resolve, reject) => {
    reject(error);
  });
};

MyPromise.all = function(promises) {
  return new MyPromise((resolve, reject) => {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        function(data) {
          result[i] = data;
          count++;
          if (count === promises.length) {
            resolve(data);
          }
        },
        function(error) {
          reject(error);
        }
      );
    }
  });
};

MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        data => {
          resolve(data);
        },
        error => reject(error)
      );
    }
  });
};

MyPromise.promisify = function(fn) {
  return function(...args) {
    return new MyPromise((resolve, reject) => {
      fn.apply(
        null,
        args.concat(err => {
          err ? reject(err) : resolve(args[1]);
        })
      );
    });
  };
};

MyPromise.deferred = function() {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = MyPromise;

// test

function f1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => resolve(123), 1000);
  });
}

const p = new MyPromise((resolve, reject) => {
  resolve(123);
  // reject('error');
});

// promises-aplus-tests promiseA+.js

// 通过
// p.then(res => console.log(res)).catch(error => {
//   console.log(error);
// })

p.then(f1)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// 疑问，为什么.catch可以拿到前面(无论第几个)的error值呢？
// 实际上 .then，.catch 都是同步的，所以链式的关系是同步注册的
// 只要中途有个 promise 的状态置为 rejected，则会通过每个 promise 的 onRejectedCallbacks 进行传递下去，最后触发 .catch 函数
// 其实就是通过reject -> reject -> reject 这样不断传递到最后
