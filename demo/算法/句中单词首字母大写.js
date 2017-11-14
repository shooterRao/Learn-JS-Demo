function titleCase(str) {
    if(typeof str != 'string') {
        return;
    }
    var strArr = str.split(' ');
   // var formatArr = [];// 装载格式化的字符串
  
     strArr.forEach(function(val,index,arr) {
      if(typeof val == 'string') {
        // 遍历每一个字符串
       // formatArr.push(format(val));
       arr[index] = format(val);
      }
    });
    return strArr.join(' ');
  }

function format(str) {
    if(typeof str != 'string') {
        return;
    }
    var arr = str.split('');
    var formatArr = [];
     arr.forEach(function(v,i,a) {
        if(i === 0) {
           // formatArr.push(v.toUpperCase());
           a[i] = v.toUpperCase();
        }else {
          // formatArr.push(v.toLowerCase());
          a[i] = v.toLowerCase();
        }
    });
    return arr.join('');
}

console.log(titleCase('IAseD aa bbb '));
