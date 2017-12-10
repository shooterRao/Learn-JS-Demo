'use strict';
var myObject = {
    a:2
};
console.log('====================================');
console.log(Object.getOwnPropertyDescriptor(myObject,'a'));//返回一个对象
console.log('===================================='); 
//writable(可写),enumerable(可枚举),configurable(可配置)
//可以使用Object.defineProperty(..)来添加一个新属性或者修改一个已有属性

//举例
var obj = {};
Object.defineProperty(obj,'a',{
    value:2,
    writable:true,
    configurable:true,
    enumerable:true
});
console.log('====================================');
console.log(obj.a);
console.log('====================================');

//1.writable决定是否可以修改属性的值
//栗子
var cannotWriteObj = {};
Object.defineProperty(cannotWriteObj,'a',{
    value:2,
    writable:false,
    configurable:true,
    enumerable:true
})
//cannotWriteObj.a = 3 error

//2.configurable
//一旦configurable设置为false,属性描述符将无法再进行配置，delete无法删除属性

//3.enumerable
//enumerable这个描述符控制的是属性是否会出现在对象的属性枚举中，比如说for..in循环。如果把enumerable设置成false,这个属性就不会出现在枚举中，虽然仍然可以正常访问它。
