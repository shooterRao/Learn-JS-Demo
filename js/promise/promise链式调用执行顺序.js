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
// .then 执行是同步的，比如这里的 p.then 和 const p = new Promise 都是同步执行的，后面的回调才是进入微队列
// 你理解了 .then 是同步的就能理解为啥return Promise外面的.then里的回调是需要等待return 的那个Promise执行完才执行了
// .then 的执行是同步的，内部是再开启一个 new Promise ，但是由于上一个状态未流转，该 then 并不会此时注册到微任务队列中，而是会等待上一个的执行完成
// 上一个 .then 执行完，下一个 .then 再注册
// 只有执行 resolve() 之后，.then 后面的函数才被注册到微队列中，不管 resolve() 是同步调用还是异步调用