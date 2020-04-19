function merge() {
  const result = {};
  function assignValue(val, key) {
    // 先通过 result[key] 判断是否已经存在
    if (typeof result[key] === 'object' && typeof val === 'object') {
      // 递归 merge 对象
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  console.log(result);

  return result;
}

function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

// const m = merge(
//   {
//     foo: 1,
//     pe: {
//       n: 'abc',
//       obj: {
//         m: 123
//       }
//     }
//   },
//   {
//     foo: 2,
//     pe: {
//       n: 'efg',
//       obj: {
//         m: 666,
//         n: 666
//       }
//     },
//     bar: {
//       b1: 456
//     }
//   },
//   {
//     foo: 3
//   }
// );

// console.log(m);

// 另一种写法

const isObject = val => {
  return (
    typeof val === 'function' ||
    (typeof val === 'object' && val !== null && !Array.isArray(val))
  );
};

const isValidKey = key => {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

const mixinDeep = (target, ...rest) => {
  for (let obj of rest) {
    if (isObject(obj)) {
      for (let key in obj) {
        if (isValidKey(key)) {
          mixin(target, obj[key], key);
        }
      }
    }
  }
  return target;
};

function mixin(target, val, key) {
  // 这里需要取值来进行递归
  // 同一级有值，需要递归，无则赋值
  let obj = target[key];
  if (isObject(val) && isObject(obj)) {
    // 同级继续合并
    mixinDeep(obj, val);
  } else {
    target[key] = val;
  }
}

const a = mixinDeep(
  {
    foo: 1,
    pe: {
      n: 'abc',
      obj: {
        m: 123
      }
    }
  },
  {
    foo: 2,
    pe: {
      n: 'efg',
      obj: {
        n: 666
      }
    },
    bar: {
      b1: 456
    }
  },
  {
    foo: 3
  }
);

console.log(a);
