
/* 函数节流
 * 函数节流是指，使得连续的函数执行，变为固定时间段间断地执行 
 * options.leading === false, 首次不触发回调,就是事件发生的那瞬间，如滚动事件
 * options.trailing === false, 事件结束后，是否立即结束(还在等待中的回调)
 * 整体思路：
 * 1.用前后2次滚动事件触发的时间差remain, 来判断是否 <= wait，来触发回调函数
 *   当 trailing === false 是通过这种方法
 * 2.用 timeout = setTimout 来判断执行当滚动事件停止后，触发回调函数
 *   当 leading === false 是通过这种方法    
 */

var _throttle = function (func, wait, options) {
    var context, args, result;

    // setTimeout 的 handler
    var timeout = null;

    // 上一次执行回调的时间戳
    var previous = 0;

    // 如果没有传入 options 参数
    // 则将 options 参数设置为空对象

    if (!options)
        options = {};

    var later = function () {
        // 如果 options.leading === false
        // 则每次触发回调后将 previous 设置为0
        // 否则设置为当前时间戳
        // console.log('到了没')
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;


        result = func.apply(context, args);

        if (!timeout)
            context = args = null;
    }

    return function () {

        // 记录当前时间戳
        var now = Date.now();

        // 第一次执行回调 ( 此时 previous 为 0, 之后 previous 的值为上一次时间戳)
        // 并且如果程序设定第一个回调不是立即执行的 ( options.leading === false )
        // 则将 previous 值，设为 now 的时间戳 ( 第一次触发 )
        if (!previous && options.leading === false) {
            previous = now;
        }
        // 距离下次触发 func 还需要等待的时间
        // now 和 previous 的差值如果 大于或者等于wait，则触发
        var remaining = wait - (now - previous);
        //  console.log(remaining);
        context = this;
        args = arguments;

        // 如果间隔时间到了(remaining <= 0),即触发方法
        // 如果没有传入{leading:false}, 且第一次触发回调，立即触发
        // 此时 previous 为0, wait - (now - previous) 也满足 <= 0
        // {trailing: false}情况下 通过计算前后时间间隔的值来判断是否执行回调

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            // 修改为当前的时间
            previous = now;

            // 触发方法
            // 包含首次触发
            // console.log('执行了啊')
            result = func.apply(context, args);

            if (!timeout)
                context = args = null;

        } else if (!timeout && options.trailing !== false) {
            // 最后一次需要触发的情况
            // 如果存在一个定时器，则不会进入该if分支
            // console.log('有没有执行?')
            timeout = setTimeout(later, remaining);
        }

        // 回调返回值
        return result;
    }


}

function print() {
    console.log('hey')
}

window.onscroll = _throttle(print, 1000)
