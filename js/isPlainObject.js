// 判断是不是纯对象，用 new Object()创建和字面量创建的对象
// 即判断 obj.__proto__ === Object.prototype
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  // proto = null
  return Object.getPrototypeOf(obj) === proto;
}

isPlainObject({
  a: 1
});

const obj = Object.create({});

isPlainObject(obj); // 这样就不是了
