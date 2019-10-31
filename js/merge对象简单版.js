// 合并对象（不会覆盖对象已有的属性）
// 这种只能合并一层
function merge(obj = { }, defaults) {
  const has = Object.prototype.hasOwnProperty;
  for (const key in defaults) {
    // 确保不会合并default原型链上的属性
    if(has.call(defaults, key)) {
      if (typeof obj[key] === 'undefined') {
          obj[key] = defaults[key];
        }
      }
  }
  return obj;
}