const resultArray = [
  ['A','B','C','D'],
  ['A','B','F'],
  ['A','B','Z','H'],
  ['R','G','K']
];

const Tree = [];

for(let v of resultArray) {
  var topicItem = {};// 保存每个专题的父级节点
  let topic = v[v.length - 1];// 子专题
  let child = {
    name: topic
  };
  // 从倒数第二个开始遍历
  for(let i= v.length-2;i >= 0;i--) {
    // 判断是否已有存在的父节点
    let parentName = v[i];
    let targetNode;
    if(Tree.length > 0){
      targetNode = checkTree(parentName, Tree);
    }
    if(targetNode) {
      targetNode.children.push(child);
      break;
    }else {
      let parent = {
        name: v[i],
        folder: true,
        children: [child]
      };
      child = parent;
      if(i == 0) {
        Tree.push(child);
      }
    }
  }
  
}

console.log(Tree);

// 遍历整个Tree判断有没有改节点
function checkTree(name, arr) {
  let result;
  let check = function(name, arr) {
    for(let i = 0;i < arr.length; i++) {
      if(name == arr[i].name) {
       result = arr[i];
       break;
      }
      if(arr[i].children && arr[i].children.length != 0) {
        check(name, arr[i].children);
      }
    }
  };
  check(name, arr);
  return result;
}


