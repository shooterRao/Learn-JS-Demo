// refer: https://github.com/lukeed/clsx/blob/master/src/index.js

function toVal(mix) {
  var k,
    y,
    str = "";
  if (mix) {
    if (typeof mix === "object") {
      for (k in mix) {
        if (mix[k] && (y = toVal(!!mix.push ? mix[k] : k))) {
          str && (str += " ");
          str += y;
        }
      }
    } else if (typeof mix !== "boolean") {
      str && (str += " ");
      str += mix;
    }
  }
  return str;
}

function clsx() {
  var i = 0,
    x,
    str = "";
  while (i < arguments.length) {
    if ((x = toVal(arguments[i++]))) {
      str && (str += " ");
      str += x;
    }
  }
  return str;
}

// test

console.log(clsx({ foo: true }, { bar: false }, null, "baz"));

console.log(
  clsx({
    foo: true,
    bar: false
  })
);

console.log(clsx(["foo", 1 ? "bar" : null]));

console.log(clsx(["foo", 1 && "bar"]));

console.log(
  clsx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])
);

console.log(
  clsx(
    "foo",
    [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
    "cya"
  )
);
