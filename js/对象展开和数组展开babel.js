// 对象展开

const o = { a: 1, b: 2, c: 3 };
console.log({ ...o });

//babel compile

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
console.log(_extends({}, o))

// 数组展开
const array = [1,2,3];
console.log([...array]);
console.log(...array);

//babel compile
var array = [1, 2, 3];
console.log([].concat(array));

var _console;
(_console = console).log.apply(_console, array);


