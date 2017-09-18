
function memoizeFunction(func)
{
var cache = {};
return function()
{
var key = arguments[0];
if (cache[key])
{
return cache[key];
}
else
{
var val = func.apply(this, arguments);
cache[key] = val;
return val;
}
};
}
 
 
var fibonacci = memoizeFunction(function(n)
{
return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
console.log(fibonacci(100)); 
console.log(fibonacci(100));