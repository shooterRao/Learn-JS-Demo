function getData(){
  return new Promise(resolve=>{
      setTimeout(() => {
          console.log('done');
          resolve();
      }, 1000);
  })
}

function print(){
  console.log('print');
}

//async await 函数
function downloading(){
  function * loadingData(){ //Generator 函数
      var x1 = yield getData();
      var x2 = yield print();
      return 1;
  }
  function start(fn){ //自动执行器实现
      return new Promise((resolve,reject)=>{
          var it = fn();
          function run(value){
              var result = it.next(value);
              if(result.done){
                  resolve(result.value);
                  return;
              }
              Promise.resolve(result.value).then(data=>{
                  run(data);
              })
          }
          run();
      })
      
  }
  return start(loadingData);
}
downloading().then(v=>{console.log(v)})