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

// 生成一套树的映射
const flatTree = data => {
  const childrenKey = "children";
  const tree = [];
  let keyCount = 0;
  function flat(node, parent) {
    node.nodeKey = keyCount++;
    tree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
    if (typeof parent !== "undefined") {
      tree[node.nodeKey].parentKey = parent.nodeKey;
      tree[parent.nodeKey][childrenKey].push(node.nodeKey);
    }

    if (node[childrenKey]) {
      tree[node.nodeKey][childrenKey] = [];
      node[childrenKey].forEach(child => flat(child, node));
    }
  }
  data.forEach(rootNode => {
    flat(rootNode);
  });

  return tree;
};

const flatTreeData = flatTree(data);
console.log(flatTreeData);


// 生成一套添加 key, nodekey 的数组
const mapTree = data => {
  let count = 0;
  function f(data, parent) {
    const res = data.reduce((pre, current)  => {
      const node = {};
      node.title = current.title;
      node.key = count++;
      if (parent) {
        node.parentKey = parent.key;
      }
      if (current.children) {
        node.children = f(current.children, node);
      }
      pre.push(node);
      return pre;
    }, []);
    return res;
  }
  const res = f(data);
  return res;
}

const mdata = mapTree(data);
console.log(mdata);
