const genTreeData = (layers, count, parent) => {
  return Array.from({ length: count }, (v, i) => {
    const key = (parent ? `${parent.key}-` : "") + (i + 1);
    const node = {
      key,
      label: `节点 ${key}`
    };
    if (layers > 1) {
      node.children = genTreeData(layers - 1, count, node);
    }
    return node;
  });
};

const data = genTreeData(3, 10);
console.log(data);