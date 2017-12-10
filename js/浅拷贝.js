var obj1 = {
    a:1,
    b:2,
    c:{ d:3 }
};

// ES5抢拷贝方法
function assign(obj) {
    var dist = {};
    if(typeof obj === 'object') {
        for(var i in obj) {
            if( obj.hasOwnProperty(i) )
            dist[i] = obj[i]
        }
    }
    return dist;
}

var obj2 = assign(obj1);
console.log(obj2);

// obj2.c.d = 5; // 注意，浅拷贝只拷贝外面一层，子对象如果是引用类型的话，改变此对象的值，会影响到原拷贝对象的值
// console.log(obj1); // { a: 1, b: 2, c: { d: 5 } }
// 先注释掉，继续做demo

// ES6浅拷贝对象有2种方法，一种是Object.assign，另一种是使用展开运算符...
// 栗子
var obj3 = Object.assign({},obj1);
console.log(obj3);

// var obj4 = {...obj1}; // 用babel即可支持

// babel的实现方法(可以复制也可以合并)
var _extends = Object.assign || function (target) {
    console.log(arguments); // 参数
    for(var i = 1; i< arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source,key)) {
                target[key] = source[key];
            }
        }
    } 
    return target;
}

var obj5 = _extends({},obj1);
console.log(obj5);