var destination = { a: 0 };
var obj1 = { b: 0, c: 2 };
var obj2 = { d: 3,e: 4 };

//es5
Object.keys(obj1).forEach(function(key){
    destination[key] = obj1[key];
});
Object.keys(obj2).forEach(function(key){
    destination[key] = obj2[key];
});
console.log(destination);

//es6
var dest =  Object.assign({},destination,obj1,obj2)
console.log(dest);

//如果对象中有相同的key，这方法默认后面的key的value值会覆盖前面的key的value值


