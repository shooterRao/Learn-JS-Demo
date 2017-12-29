function formateDate(date, fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o) {
        if(new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            // 根据模板来替换
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)? str : padLeftZero(str));
        }
    }
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length) // 001, 0012 返回01 12
}

// 另一种格式化方法
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

console.log(formateDate(new Date(),'yyyy-MM-dd hh:mm'))