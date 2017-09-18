var array = ['a','b','c','d','e'];
var arrayWithDups = ['a','b','c','d','e','e','e'];
console.log(array.filter( function(item) { return item === 'e' })[0]);

//es6
console.log(array.find(x => x === 'e'));
console.log(array.findIndex( x => x === 'e'));
console.log(arrayWithDups.findIndex( x=> x === 'e'));//重复的也是返回第一个的索引
