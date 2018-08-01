function once(fn) {
  var f = function() {
    if (f.called) return f.value;
    f.called = true;
    return (f.value = fn.apply(this, arguments));
  };
  f.called = false;
  return f;
}

var test = once(function() {console.log(666)});
test();
test();

// 调用两次会抛出错误
function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}

var testStrict = onceStrict(function() {console.log(666)});
testStrict();
testStrict();// 会抛出异常