// 考虑其他类型
// 考虑循环引用

// 只考虑数组类型的
function deepClone(target) {
  // 非 target 或者为 null，直接返回
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  let copy = {};

  if (Array.isArray(target)) {
    copy = [];
  }

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      // 递归
      copy[key] = deepClone(target[key]);
    }
  }

  return copy;
}

// 循环引用问题
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};

target.target = target; // 产生循环引用

// 如果用deepClone直接调用
// deepClone(target); // maximum call 递归爆栈溢出，没有正确跳出递归

// 解决循环引用问题，需要额外开辟储存空间，建立当前对象和拷贝对象的对应关系

function deepClone2(target, map = new Map()) {
  // 非 target 或者为 null，直接返回
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  if (map.get(target)) {
    return map.get(target);
  }

  const copy = Array.isArray(target) ? [] : {};

  map.set(target, copy); // 创建对应关系

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      // 递归
      copy[key] = deepClone2(target[key], map);
    }
  }

  return copy;
}

// test
// deepClone2(target); // 测试没问题

// 解决各种类型
// 参考文章 https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 需要深拷贝集合
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// while 循环提高效率
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  // 函数也需要深拷贝
  return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

// 正则拷贝
function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(); // eval(funcString) 报错
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

const obj = {
  ob: {
    a: 1
  },
  fn() {},
  reg: new RegExp(/\w/)
};

clone(obj);
