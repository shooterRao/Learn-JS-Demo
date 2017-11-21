//关于super关键字，super代表父类的构造函数constructor
//1.super作为函数调用
class A{
    constructor(){
        this.a = 1;
        console.log(this);
        console.log(new.target.name)
    }
};

class B extends A{
    constructor(){
        super();
        console.log(this)//只有调用super()之后，才能使用this, 这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
    }
};
// new A();
new B();//super执行时，super内的this指向B，A.prototype.constructor.call(this), A.call(this)
// Object.prototype.constructor 返回创建实例对象的 Object 构造函数的引用

//2.super用在对象时,在普通方法中，指向父类的原型，在静态方法中，指向父类
class C{
    static method(ele){
        console.log(`static ${ele}`)
    }
    method(ele){
        console.log(`instance ${ele}`)
    }
   p(){
      return 2
   }
}
class D extends C{
    static method(ele){
       super.method(ele)
    }
    constructor(){
      super();
      console.log(super.p());//super为C.prototype
    };
    method(ele){
        super.method(ele)
     }
}
D.method(100);
let d = new D();
d.method(100);
//注意，由于D中的super对象指向的是C.prototype,如果定义在C实例上的属性和方法，是无法通过super对象获取到的
//new实例化的时候，执行constructor()函数

//Object.getPrototypeOf方法可以用来从子类上获取父类
console.log(Object.getPrototypeOf(B))//Function：A

class E{
  getDate(val){
      console.log(val)
  }
}
class F extends E{
    constructor(){
        super();
       
    }
    getD(){
        this.getDate(1);//this指向F，当F没有getDate方法时，会在E里面去找
    }
    getDate(val){
        console.log(1+val);
    }
    
}
var f = new F();
f.getD();
