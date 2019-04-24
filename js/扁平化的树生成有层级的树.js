const tree = [
  {
    name: "1",
    parentId: -1,
    id: 1
  },
  {
    name: "2",
    parentId: -1,
    id: 2
  },
  {
    name: "3",
    parentId: 1,
    id: 3
  },
  {
    name: "4",
    parentId: 3,
    id: 4
  },
  {
    name: "5",
    parentId: 4,
    id: 5
  },
  {
    name: "6",
    parentId: 5,
    id: 6
  }
]

console.time('1')
const n = []
tree.forEach(type => {
  if(type.parentId === -1) {
    n.push(type)
  }
  type.children = [];
  tree.forEach(typeChildren => {
    if(typeChildren.parentId === type.id) {
      type.children.push(typeChildren)
    }
  })
})
console.timeEnd('1')

console.time('1');
const n = [];
const treeMap = {};
tree.forEach(node => treeMap[node.id] = node);
tree.forEach(node => {
  if (node.parentId === -1) {
    n.push(node);
  }
  const parent = treeMap[node.parentId];
  if (parent) {
    const children = parent.children || [];
    children.push(node);
    parent.children = children;
  }
})
console.timeEnd('1')


console.time('1');
const n = [];
tree.forEach((node, idx, tree) => {
  if (node.parentId === -1) {
    n.push(node);
  }
  const parent = tree.find(v => v.id === node.parentId);
    if (parent) {
    const children = parent.children || [];
    children.push(node);
    parent.children = children;
  }
})
console.timeEnd('1');

console.log(JSON.stringify(n))