
// 最基本的函数防抖
function debounce(method, context) {
    // 清除上次的定时器
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context);
    },1000)
}

/* 
 * 函数去抖(连续事件触发结束后只触发一次)
 * 整体思路 
 * 用timeout去控制函数的执行过程
 * 先去判断是否为立即执行，是的话直接执行，在later函数中会阻止再次执行
 * 用前后滚动事件触发时的时间戳差，去判断是否要执行func,如果时间戳的差等于wait或大于wait，如果是，就执行函数
    
 */
var _debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later  = function () {
        // 定时器设置回调later方法触发的时间，和连续事件触发的最后一次时间戳的间隔
        // 如果间隔为wait，或者大于wait，则触发事件
        var last  = new Date().getTime() - timestamp;
        console.log(last);
        // 时间间隔last在[0,wait)中
        // 还没到触发的点，继续设置定时器
        if(last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);// wait - last可以少执行很多次
        }else {
            // 到了触发的时间点
            // 重置timeout
            timeout = null;

            // 判断是否立即触发
            if(!immediate) {
                // 非立即触发
                // 执行回调函数
                result = func.apply(context, args);

                if(!timeout) {
                    context = args = null;
                }
            }
        }
    }
    
    // 闭包返回函数
    return function () {
        
        context = this;
        args = arguments;
      
        // 每次触发函数，更新时间戳
        timestamp = new Date().getTime();
        
        // timeout判断很重要，它是判断是否首次触发的重要字段
        
        var callNow = immediate && !timeout;

        // 首次timeout为肯定为null
        if(!timeout) {
            // 此分支只执行一次
            timeout = setTimeout(later, wait);
        }
        
        // 立即触发
        if(callNow) {
            
            result = func.apply(context, args);
            // 解除引用
            context = args = null;
        }
        return result;
    }
}

function print() {
    console.log(1)
}

window.onscroll = _debounce(print,1000);