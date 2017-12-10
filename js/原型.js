function Foo(){
    console.log('函数')
};
Foo.prototype = {};
var a = new Foo();
console.log(a.__proto__===Foo.prototype)//true
console.log(a.constructor)
console.log(a.constructor === Foo)//false
console.log(Foo.prototype.constructor === Foo);//false,因为上文中把Foo.prototype = {};
//a.constructor === Foo,并不是a对象由Foo构造，a并没有constructor属性,而是a.constructor只是通过默认[[prototype]]委托指向Foo
//如果不重设Foo.prototype的值，Foo.prototype.constructor 默认指向 Foo
//constructor 并不是被构造 