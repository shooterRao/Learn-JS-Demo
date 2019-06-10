// 实现继承主要为
// 1. 静态属性继承 (call)
// 2. 原型属性继承 (Object.create)

function Person(name) {
  this.name = name;
}

Person.prototype.showName = function() {
  console.log(this.name);
}

function Child(name, parentName) {
  Person.call(this, name);
  this.parentName = parentName;
}

// Child.prototype.__proto__ === Person.prototype
Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;

Child.prototype.showParentName = function() {
  console.log(this.parentName);
}

const child = new Child('xiao li', 'lao li');

child.showName();
child.showParentName();