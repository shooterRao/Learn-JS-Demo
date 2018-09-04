// 一种写法
const Deferred = function() {
  let resolver = null;
  let rejector = null;
  let promise = null;
  promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  // resolver,rejector均会返回promise
  promise.resolve = res => resolver(res);
  promise.reject = error => rejector(error);
  return promise;
};

const def1 = Deferred();
def1.resolve("done");
def1.then(res => console.log(res));

const def2 = Deferred();
def2.reject("error");
def2.catch(error => console.log(error));

// 另一种写法
const DojoDeferred = function() {
  const def = {};
  def.promise = new Promise((resolve, reject) => {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
};

const dojoDef = DojoDeferred();
dojoDef.resolve('dojo-deferred-done');
dojoDef.promise.then((res) => { console.log(res) });