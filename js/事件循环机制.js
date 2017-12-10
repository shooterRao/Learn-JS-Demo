
         /*macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。 
           micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver 
           执行顺序：函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task。当所有可执行的micro-task执行完毕之后。
           循环再次执行macro-task中的一个任务队列，执行完之后再执行所有的micro-task，就这样一直循环。*/
           
         

          setTimeout(function(){
              console.log(5);
              new Promise(function foo(resolve){
                  console.log(6);
                  resolve();
              }).then(function(){
                  console.log(7)
              })
          })

          setTimeout(function(){
              console.log(8);
              new Promise(function(resolve){
                  console.log(9);
                  resolve();
              }).then(function(){
                  console.log(10)
              })
          })

          new Promise(function executor(resolve){
              console.log(1);
              for(var i=0;i<100000000;i++){
                  i == 99999999 && resolve();//这里一般是写异步事件，需要时间来处理，不会阻塞下面代码运行，resolve（）是成功后的回调
              }
              console.log(2);
          }).then(function(){
              console.log(4)
          });
          console.log(3)  

          /* 在浏览器中显示的是12345678910，但是在node环境下显示的是12345689710，不同环境下机制不同 */
          //
   
 