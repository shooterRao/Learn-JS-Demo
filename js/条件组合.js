const c1 = 1; // 0000 0001
const c2 = 1 << 1; // 0000 0010
const c3 = 1 << 2; // 0000 0100
const c4 = 1 << 3; // 0000 1000

// 运用按位或 | 组合，满足c1、c2条件的值
const c1c2 = c1 | c2;

console.log(c1c2); // 0000 0101

// 同时满足c1,c2,c3
const c1c2c3 = c1 | c2 | c3; // 0000 1101

// 判断是否存在于 c1c2里面
// 使用按位与 & 判断，里面存在哪些条件，或者判断某个条件是否在组合中

if (c1 & c1c2c3) {
  console.log('c1 存在');
}

if (c2 & c1c2c3) {
  console.log('c2 存在');
}

if (c3 & c1c2c3) {
  console.log('c3 存在');
}

if (c4 & c1c2c3) {
  console.log('c4 存在');
}
