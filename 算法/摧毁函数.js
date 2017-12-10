function destroyer(arr) {
  // 自己写的
  var array = [];
  var array2 = [];
  if(arguments.length>1 && Array.isArray(arguments[0])) {
    for(let i = 1;i<arguments.length;i++) {
     array.push(arguments[i]);
  } 
 }
    array2 = arguments[0];
    for(let j =0;j<array.length;j++) {
     array2 = array2.filter(function (v) {
           return v !== array[j];
       });
    }
   return array2;
}

console.log(destroyer([1,2,3,4,5],4,5));

// 网上找的
function newdestroyer(arr) {
    var tempArguments = arguments;
    return arr.filter(function(val) {
        for(let i = 1;i < tempArguments.length; i++) {
            if(val === tempArguments[i]) {
                return false
            }
        }
               return true;
    })
} 
console.log(newdestroyer([1,2,3,4,5],4,5));
