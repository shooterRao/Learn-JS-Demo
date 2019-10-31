// compose(funcA, funcB, funcC) 形象为 compose(funcA(funcB(funcC())))

function f1(next) {
  console.log('f1');
  console.log(next);
  next();
}

function f2(next) {
  console.log(next);
  console.log('f2');
  next();
}

function compose() {
  // arg => fn1(() => fn2(() => fn3(arg)))
  return [f1, f2].reduce((a, b) => arg => a(() => b(arg)))(() => {
    console.log(123);
  });
}

// compose();

function reduce() {
  function f1(next) {
    console.log('f1');
    next();
  }

  function f2(next) {
    console.log('f2');
    next();
  }

  function f3(next) {
    console.log('f3');
    // 最后一个next就是最外层传入的函数
    next();
  }

  // 实际就是执行 f1(() => fn2(() => f3(() => {})))
  [f1, f2, f3].reduce((a, b) => {
    return arg => {
      return a(() => b(arg));
    };
  })(() => {});
  // const re = [f1, f2].reduce((a, b) => arg => a(() => b(arg)))
}

reduce();
