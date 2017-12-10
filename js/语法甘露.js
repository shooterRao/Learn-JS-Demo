function New(aClass, aParams) //通用创建函数
{
  function new_() //定义临时的中转函数壳
  {
    aClass.Create.apply(this, aParams);//调用原型中定义的构造函数，中转构造逻辑及构造参数 
  };
  new_.prototype = aClass;
  return new new_();//返回最终建立的对象
}

var Person = //定义的类
  {
    Create: function (name, age)//构造函数
    {
      this.name = name;
      this.age = age;
    },
    SayHello: function () {
      alert("Hello,I am " + this.name)
    },
    HowOld: function () {
      alert(this.name + "is" + this.age + "years old.");
    }
  };

var BillGates = New(Person, ['Bill Gates', 53])
BillGates.SayHello()
BillGates.HowOld()
console.log(BillGates.__proto__ == Person)//true
console.log(BillGates.constructor)
//BillGates.__proto__ == new_.prototype == Person
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a)
  }
}
obj.foo();
