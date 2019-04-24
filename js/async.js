function a() {
  return new Promise(res => res(123));
}

async function b() {
  const r = await a();
  console.log(r);
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('test error');
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
  } catch (error) {
    // 有三种方式返回
    // throw new Error(error);
    throw error;
    // return Promise.reject(error)
  }
}

(async function () {
  try {
    await c();
  } catch (error) {
    console.log(error);
  }
})()

