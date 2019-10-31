function merge() {
  const result = {};
  function assignValue(val, key) {
    console.log(key)
    // 先通过 result[key] 判断是否已经存在 
    if (typeof result[key] === 'object' && typeof val === 'object') {
      // 递归 merge 对象
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i< l; i++) {
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

const m = merge(
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
        m: 666
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

console.log(m);