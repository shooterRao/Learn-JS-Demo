//Object.create(proto, [ propertiesObject ])
//会使用指定的原型对象及其属性去创建一个新的对象,产生关联
//Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  Shape.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
      console.info("Shape moved.");
  };
  
  // Rectangle - subclass
  function Rectangle() {
    Shape.call(this); //call super constructor.
  }
  
  // subclass extends superclass
  Rectangle.prototype = Object.create(Shape.prototype);
  //创建一个新的Rectangle.prototype对象并把它关联到Shape.prototype，修改Rectangle.prototype的内容不会影响到Shape.prototype的内容
  //ES6 Object.setPrototypeOf(Rectangle.prototype,Shape.prototype)
  Rectangle.prototype.constructor = Rectangle;
  
  var rect = new Rectangle();
  
  console.log('Is rect an instance of Rectangle?',
    rect instanceof Rectangle); // true
  console.log('Is rect an instance of Shape?',
    rect instanceof Shape); // true
  
  rect.move(1, 1); //Outputs, "Shape moved."
  
function Fo(name) {
    this.name = name;
}
Fo.prototype.getName = function (){
    return this.name;
}
console.log(Object.getPrototypeOf(Fo));// Function.prototype

function Bo(name,label) {
  Fo.call(this,name);
  this.label = label;
}

// 把Bo.prototype的__proto__关联到Fo.prototype中
// 原本Bo.prototype.__proto__是关联Object.prototype中的
Bo.prototype = Object.create(Fo.prototype);

console.log(Bo.prototype.__proto__); //Fo { getName: [Function] }
console.log(Bo.prototype.__proto__ === Fo.prototype);// true
var b = new Bo('JJ','YY');
console.log(b.getName());

// 总结，所谓的关联，就是 === 的值为true，A===B，A可以共享B的所有东西
