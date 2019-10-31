new Promise((resolve, reject) => {
  console.log('外部promise'); // 1
  resolve();
})
  .then(() => {
    console.log('外部第一个then'); // 2
    new Promise((resolve, reject) => {
      console.log('内部promise'); // 3
      resolve();
    })
      .then(() => {
        console.log('内部第一个then'); // 5
      })
      .then(() => {
        console.log('内部第二个then'); // 7
      });
    return new Promise((resolve, reject) => {
      console.log('内部promise2'); // 4
      resolve();
    })
      .then(() => {
        console.log('内部第一个then2'); // 6
      })
      .then(() => {
        console.log('内部第二个then2'); // 8
      });
  })
  .then(() => {
    console.log('外部第二个then'); // 9
  });

// 外部promise
// 外部第一个then
// 内部promise
// 内部promise2
// 内部第一个then
// 内部第一个then2
// 内部第二个then
// 内部第二个then2
// 外部第二个then

// 谨记
// 链式调用的注册是前后依赖的，比如上面的外部的第二个then的注册，是需要外部的第一个的then的执行，就是先执行前面的then，再注册后面then的回调
// 如果第一个 then 函数是有 return Promise 的，外部的第二个 then 的执行需要等待 return 之后的结果
// 注册都是同步的，比如这里的 p.then 和 const p = new Promise 都是同步执行的，后面的回调才是进入微队列
// 你理解了.then是同步注册就能理解为啥return Promise外面的.then里的回调是需要等待return 的那个Promise执行完才执行了