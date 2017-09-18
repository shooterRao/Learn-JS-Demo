function unique(arr) {
    var map = {}
    return {
        a:arr.filter(el => map[el] ? false : map[el] = true),
        b:map
    } 
}
console.log(unique([1,2,31,1,1,2]));
//filter只返回函数条件为true的数
//ES6数组去重
function uniqueArr(arr){
    return new Set([...arr]); 
}
console.log(uniqueArr([1,2,31,1,1,2]));