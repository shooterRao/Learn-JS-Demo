const data = [
  {
    title: "1",
    children: [
      {
        title: "1-1"
      },
      {
        title: "1-2",
        children: [
          {
            title: "1-2-1"
          }
        ]
      }
    ]
  },
  {
    title: "2",
    children: [
      {
        title: "2-1"
      },
      {
        title: "2-2"
      }
    ]
  }
];

// 提取目录树所有子节点
function deep(data) {
  const isObj = (n) => Object.prototype.toString.call(n) === '[object Object]';
  const res = [];
  if (!data) return [];
  while (data && data.length) {
    const node = data.shift();
    // 这里只是示例，可以按需提取更多信息
    const { title } = node;
    res.push({
      title
    });
    while (isObj(node) && node.children && node.children.length) {
      data.unshift(node.children.pop())
    }
  }
  return res;
}

const res = deep(data);
console.log(res);