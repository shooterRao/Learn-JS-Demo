var packageFn = (function () {
    return function fn(a, b, c){
       console.log(a+b+c); 
    } 
})();
//加成闭包会比较好
//

packageFn(1,2,3);
var a = 1;
var b = 2;
console.log(!!a&&b);//a?b:c
console.log(a?b:null)