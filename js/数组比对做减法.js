const by = [
  {
    path: "/YZT",
    name: "YZT"
  },
  {
    path: "/FZBZ",
    name: "FZBZ"
  }
];

const arr = [
  {
    path: "/YZT",
    name: "YZT"
  },
  {
    path: "/FZBZ",
    name: "FZBZ"
  },
  {
    path: "/FZSC",
    name: "FZSC"
  },
  {
    path: "/JCYJ",
    name: "JCYJ"
  }
]

const filterBy = (arr, ...args) => {
  const { length } = args;
  let fn = length > 1 && args[length - 1 ];
  fn = typeof fn === 'function' ? (args.pop(), fn) : () => {};
  const argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
  return arr.filter(v => argState.includes(fn(v)));
}

const res = filterBy(arr, by, v => v.name);
console.log(res);