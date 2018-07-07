// 合并对象（不会覆盖对象已有的属性）
export default function merge(obj = { }, defaults) {
  for (const key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}