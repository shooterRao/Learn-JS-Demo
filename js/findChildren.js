const data = {
  id: 0,
  children: [
    {
      id: 1
    },
    {
      id: 2,
      children: [
        {
          id: 6
        }
      ]
    },
    {
      id: 3,
      children: [
        {
          id: 4
        },
        {
          id: 5
        }
      ]
    }
  ]
};

function findChildren(data, id) {
  const target = Array.isArray(data) ? data : data.children;
  let res = null;
  const find = target => {
    let i = -1;
    while (++i < target.length) {
      if (target[i].id === id) res = target[i].id;
      if (target[i].children && target[i].children.length != 0) {
        find(target[i].children);
      }
    }
  };
  find(target);
  return res;
}

const res = findChildren(data, 6);
console.log(res);
