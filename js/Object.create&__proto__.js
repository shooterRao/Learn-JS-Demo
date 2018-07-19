//Object.create polyfill代码
if(!Object.create){
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
}

//或者, 跟上面写法一样
function ObjectCreate(prototype) {
    var f = new Function();
    f.prototype = prototype;
    var o = new f();// o.__proto__ = f.prototype = prototype
    f.prototype = null;// 清除引用
    return o;
}

//这段代码使用一个一次性函数F，通过改写它的.prototype属性使其指向想要关联的对象,
//然后再使用new F()来构造一个新对象进行关联
//对象关联离不开new，new(创建对象,prototype关联,this绑定,返回对象)

var foo = {
    something:function() {
        console.log('show');
    }
};

var bar = Object.create( foo );
bar.something();
console.log(bar.__proto__ === foo);//true
console.log(Object.getPrototypeOf(bar) === foo);//true
console.log(bar.__proto__);

//一些demo
var fn = function(a) {
    this.a = a;
}

var proto = { 
    getKey:function() {
        console.log(this.a)
    }
}

fn.prototype = proto; //prototype可以改写
var p = new fn(1);
p.getKey();
console.log(Object.getPrototypeOf(p));
console.log(p.__proto__);
console.log(p.constructor === fn);//false
console.log(p.constructor);//Object
console.log(p);//{ a: 1 }

/* 

  这里有个小坑要注意下,
  p并没有constructor这一属性，不能是说p是被fn所构造的，
  p.constructor是委托[[prototype]]链上的fn.prototype,
  不过重置后的fn.prototype(默认的fn.prototype对象有constructor属性)也没有这个属性,
  然后它会继续委托，直到委托给委托链顶端的Object.prototypr
  这个对象有constructor属性,指向内置的Object(...)函数
  
*/


//__proto__的实现大致是这样的
Object.defineProperty( Object.prototype,'__proto__',{
    get:function() {
        return Object.getPrototypeOf( this );
    },
    set:function(o) {
         Object.setPrototypeOf( this, o );//ES6
         this.prototype = Object.create(o);//ES5
    }
})

