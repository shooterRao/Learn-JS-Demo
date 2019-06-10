// refer https://github.com/yx675258207/wxMiniStore

const TYPE_ARRAY = "[object Array]";
const TYPE_OBJECT = "[object Object]";

const _typeOf = function(val) {
  return Object.prototype.toString.call(val);
};

const addDiff = function addDiff(
  current = {},
  prev = {},
  root = "",
  result = {}
) {
  Object.entries(current).forEach(item => {
    let key = item[0],
      value = item[1],
      path = root === "" ? key : root + "." + key;
    if (_typeOf(current) === TYPE_ARRAY) {
      path = root === "" ? key : root + "[" + key + "]";
    }

    if (!prev.hasOwnProperty(key)) {
      result[path] = value;
    } else if (
      (_typeOf(prev[key]) === TYPE_OBJECT &&
        _typeOf(current[key]) === TYPE_OBJECT) ||
      (_typeOf(prev[key]) === TYPE_ARRAY &&
        _typeOf(current[key]) === TYPE_ARRAY)
    ) {
      addDiff(current[key], prev[key], path, result);
    } else if (prev[key] !== current[key]) {
      result[path] = value;
    }
  });
  return result;
};

const nullDiff = function nullDiff(
  current = {},
  prev = {},
  root = "",
  result = {}
) {
  Object.entries(prev).forEach(item => {
    let key = item[0],
      value = item[1],
      path = root === "" ? key : root + "." + key;
    if (_typeOf(current) === TYPE_ARRAY) {
      path = root === "" ? key : root + "[" + key + "]";
    }

    if (!current.hasOwnProperty(key)) {
      result[path] = null;
    } else if (
      (_typeOf(prev[key]) === TYPE_OBJECT &&
        _typeOf(current[key]) === TYPE_OBJECT) ||
      (_typeOf(prev[key]) === TYPE_ARRAY &&
        _typeOf(current[key]) === TYPE_ARRAY)
    ) {
      nullDiff(current[key], prev[key], path, result);
    }
  });
  return result;
};

const diff = function diff(current = {}, prev = {}) {
  let result = {};
  addDiff(current, prev, "", result);
  nullDiff(current, prev, "", result);
  return result;
};

const pre = {
  a: 1,
  c: [
    1,
    {
      a: 2
    },
    3
  ]
};

const cur = {
  a: 1,
  b: 2,
  c: [
    1,
    {
      a: 1
    }
  ]
};

console.log(diff(cur, pre));
