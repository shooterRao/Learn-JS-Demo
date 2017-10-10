'use strict';

var _loop = function _loop (i) {
        console.log(i);
};

for (var i = 0;i < 10; i++) {
    _loop(i);
};
// 把循环部分封装起来，最优雅的写法 

//ES6中
for (let i = 0;i < 10 ; i++) {
    console.log(i)
};