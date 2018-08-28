// promise并发请求，单个请求完毕后立即处理
(()=>{
  Promise.allInOrder = (promises, thenForEach)=>{
      let callBackQueue = new Array(promises.length);
      let thenCallbackQueue = new Array(promises.length);

      let queueExecutor = ()=>{
          for(let i=0,l=callBackQueue.length;i<l;i++){
              if(callBackQueue[i] == void(0)){
                  // undefined means this task is not done yet
                  return;
              }else{
                  // execute callback
                  callBackQueue[i]();

                  // set this callback to null since it has been executed
                  callBackQueue[i] = ()=>{};
              }
          }
          // when reach here, it means all callbacks been executed
          Promise.all(thenCallbackQueue).then(ds=>{
              allPromiseResolver(ds);
          });
      };

      let allPromiseResolver = null, 
          allPromiseRejector = null;

      for(let i=0,l=promises.length;i<l;i++){

          promises[i].then(d=>{
              callBackQueue[i] = function(){
                  thenCallbackQueue[i] = new Promise((resolve, reject)=>{
                      let result = thenForEach(d);
                      resolve(result);
                  });
              };

              queueExecutor();
          });
      }

      return {
          all: callback=>{
              return new Promise((resolve, reject)=>{
                  allPromiseResolver = resolve;
                  allPromiseRejector = reject;
              }).then(ds=>{
                  callback(ds);
              });
          }
      }
  };
})();

// test
(()=>{
  let timeConsumingFunc = param=>new Promise(
          (resolve)=>{
              let timeout = Math.random() * 5000;
              console.log(`task ${param} will be resolved in ${timeout}ms`);
              setTimeout(()=>{
                  console.log(`${param} resolved`);
                  resolve(param+10);
              }, timeout);
          }
      );
  Promise
      .allInOrder(
          [timeConsumingFunc(1), timeConsumingFunc(2), timeConsumingFunc(3)],
          d=>{
              console.log(d);
              return d+20;
          }
      )
      .all((ds)=>{console.log(`all method called`);console.log(ds);})
})();