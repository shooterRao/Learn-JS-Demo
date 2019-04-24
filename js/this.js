const a = {
  a: 'a'
};
const obj = {
  getThis: () => this,
  getThis2 () {
    return this;
  }
};
obj.getThis3 = obj.getThis.bind(obj);
obj.getThis4 = obj.getThis2.bind(obj);
const answers = [
  obj.getThis(), // {}
  obj.getThis.call(a), // {}
  obj.getThis2(), // obj
  obj.getThis2.call(a), // a
  obj.getThis3(), // {}
  obj.getThis3.call(a), // {}
  obj.getThis4(), // obj
  obj.getThis4.call(a) // obj 此时 this 已被绑定到 obj
];

console.log(answers);
