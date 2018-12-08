/**
 * 数组（根据对象字段）排序
 * @private
 * @param {Array} originData
 * @param {String} key
 * @param {String} type
 * @return {Array} data
 */
const sortData = (originData, key, type = 'up') => {
  // 深拷贝一份数据
  // 不改变原数据
  const data = JSON.parse(JSON.stringify(originData))
  const sort = n => k => (objN, objM) => {
    const valN = objN[k]
    const valM = objM[k]
    if (valN < valM) {
      return 1 * n
    } else if (valN > valM) {
      return -1 * n
    }
    return 0
  }
  if (type === 'down') {
    data.sort(sort(1)(key))
    return data
  }
  data.sort(sort(-1)(key))
  return data
}

// 测试
const data = [
  {
    a: 1
  },
  {
    a: 10
  },
  {
    a: 100
  },
  {
    a: 20
  },
  {
    a: 1000
  }
];

const array = sortData(data, "a", "up");
console.log(array);

const sortArray = (originArray, type = 'up', key) => {
  // 深拷贝一份数据
  // 不改变原数据
  if (!Array.isArray(originArray)) {
    throw new Error('排序数据必须为数组类型!')
  }
  const array = JSON.parse(JSON.stringify(originArray))
  const compare = n => (a, b) => {
    if (a < b) {
      return 1 * n
    } else if (a > b) {
      return -1 * n
    }
    return 0
  }
  const sort = n => k => (objN, objM) => {
    const valN = objN[k]
    const valM = objM[k]
    return compare(n)(valN, valM)
  }
  // 不传key，默认执行[1, 2, 3]这种排序
  if (!key) {
    if (type === 'down') {
      array.sort(compare(1))
      return array
    }
    array.sort(compare(-1))
    return array
  }
  if (type === 'down') {
    array.sort(sort(1)(key))
    return array
  }
  array.sort(sort(-1)(key))
  return array
}
