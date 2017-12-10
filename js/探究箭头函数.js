var a = 1;
var age = 10;
var obj = {
    a:3,
    b:2
}
function fn(){
   var a = 2;
   var that = this;
   console.log(this.a);
   setTimeout(()=>console.log(this.a),0);//this指向上一层的函数作用域
   const fo = () => {
      console.log(this.b);
   }
   function foo(){
      console.log(that.b);//不是箭头函数，需要取一变量that来获取fn函数里的this
   }
   fo();
   foo();
}
//箭头函数的好处就是里面的this不会被绑定，它生来局部，只会指向最近的一层作用域的this
//对比不用箭头函数的情况,就要用that来保存this(指向新的实例对象)
function fn1(){
    this.age = 0;
    var that = this;
    setTimeout(function(){
        that.age++;
        console.log(that.age);  
    },0)
}
function fn2(){
    this.age = 0;
    setTimeout(()=>{
        this.age++;
        console.log(this.age);
    })
}
//var ob = new fn1();
//var nb = new fn2();


fn.bind(obj)();//3,obj