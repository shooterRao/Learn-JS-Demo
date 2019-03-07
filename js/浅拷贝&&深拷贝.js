var obj1 = {
    a:1,
    b:2,
    c:{ d:3 }
};

// ES5浅拷贝方法
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

// 深拷贝
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

function deepClone(values) {
    var copy;

    if(values == null || typeof values != "object") {
        return values;
    }

    if(values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    if(values instanceof Array) {
        copy = [];
        for(var i = 0; i < values.length; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    if(values instanceof Object) {
        copy = {};
        for(var attr in values) {
            if(values.hasOwnProperty(attr)) {
                copy[attr] = deepClone(values[attr]);
            }
        }
        return copy;
    }

    throw new Error('Unable to copy.This type is not supported')
}

//对象深复制，不考虑循环引用的情况
function cloneObj(from) {
    return Object.keys(from)
        .reduce((obj, key) => (obj[key] = clone(from[key]), obj), {});
}
//数组深复制，不考虑循环引用的情况
function cloneArr(from) {
    return from.map((n) => clone(n));
}
// 复制输入值
function clone(from) {
    if (from instanceof Array) {
        return cloneArr(from);
    } else if (from instanceof Object) {
        return cloneObj(from);
    } else {
        return (from);
    }
}