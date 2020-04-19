Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    // finally总是会返回原来的值
    // resolve
    value => P.resolve(callback()).then(() => value),
    // reject
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

// Test
Promise.resolve("done").finally(() => {
  console.log("done");
});
// Promise.reject("error").finally(() => {
//   console.log("error");
// });