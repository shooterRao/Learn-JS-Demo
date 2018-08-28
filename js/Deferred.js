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
def1.resolve('done');
def1.then(res => console.log(res));

const def2 = Deferred();
def2.reject('error');
def2.catch(error => console.log(error));