function chunk(input, size) {
  return input.reduce((arr, item, idx) => {
    if (idx % size === 0) {
      // 如果索引值%长度 === 0，则新增一个数组
      return [...arr, [item]];
    } else {
      // 加到二维数组最后一个数组中
      return [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }
  }, []);
}

chunk([1, 2, 3, 4, 5, 6], 3);
