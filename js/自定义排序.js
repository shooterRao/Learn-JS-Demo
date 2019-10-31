function sort(arr, key, by) {
  let i = -1;
  const len = by.length;
  while(++i < len) {
    const n = by[i];
    const j = arr.findIndex(val => val[key] === n);
    if (j >= 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

const arr = [
  {
    name: '系统一'
  },
  {
    name: '系统二'
  },
  {
    name: '系统三'
  }
]

const by = ['系统三', '系统一', '系统二', '系统五']

sort(arr, 'name', by);

console.log(arr);