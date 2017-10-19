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
  
