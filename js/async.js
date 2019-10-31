function a() {
  return new Promise(res => res(123));
}

async function b() {
  console.log('b');
  const r = await a();
  console.log(r);
  return new Promise((res, rej) => {
    setTimeout(() => {
      // rej('test error');
      res(456)
  }, 1000);
  });
}

async function c() {
  // 假如 b 函数报错，想返回一个异常
  try {
    const r = await b();
    console.log(r);
    console.log(789);
    if (r) {
      throw r;
    }
    return 'c';
  } catch (error) {
    console.log(error);
    // 有三种方式返回
    // throw new Error(error);
    throw error;
    // return Promise.reject(error)
  }
}

(async function () {
  try {
    const res = await c();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})()

console.log(1);
b();
console.log(2);

// async + promise 测试
function pro() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
      resolve('done')
    }, 2000)
  })
}

async function asy() {
  try {
    const res = await pro()
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

(async function() {
  try {
    const res = await asy()
    console.log(res) // 不能这么写，上面 asy 返回的 ‘error’， 这里 res 就是 'error' 了
    console.log(666)
  } catch (error) {
    console.log(error);
  }
  
})()

// 所以，async 函数返回什么，await 就捕获什么，error 也不能被 catch 到