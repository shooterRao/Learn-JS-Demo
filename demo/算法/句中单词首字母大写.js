function titleCase(str) {
    if(typeof str != 'string') {
        return;
    }
    var strArr = str.split(' ');
    var formatArr = [];// 装载格式化的字符串
  
     strArr.forEach(function(val,index) {
      if(typeof val == 'string') {
        // 遍历每一个字符串
        formatArr.push(format(val));
      }
    });
    return formatArr.join(' ');
  }

function format(str) {
    if(typeof str != 'string') {
        return;
    }
    var arr = str.split('');
    var formatArr = [];
     arr.forEach(function(v,i) {
        if(i === 0) {
            formatArr.push(v.toUpperCase());
        }else {
           formatArr.push(v.toLowerCase());
        }
    });
    return formatArr.join('');
}

console.log(titleCase('IAseD aa'));
