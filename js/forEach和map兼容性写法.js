/** 
 * forEach遍历数组 
 * @param callback [function] 回调函数； 
 * @param context [object] 上下文； 
 */
Array.prototype.myForEach = function myForEach(callback, context) {
    context = context || window;
    if ('forEach' in Array.prototype) {
        this.forEach(callback, context);
        return;
    }

    for (var i = 0, len = this.length; i < len; i++) {
        if (callback && typeof callback === 'function') {
            callback.call(context, this[i], i, this)
        }
    }
}

/** 
 * map遍历数组 
 * @param callback [function] 回调函数； 
 * @param context [object] 上下文； 
 */
Array.prototype.myMap = function myMap(callback, context) {
    context = context || window;
    if ('map' in Array.prototype) {
        this.map(callback, context)
        return;
    }
    var arr = [];
    for (var i = 0, len = this.length; i < len; i++) {
        if (callback && typeof callback === 'function') {
            var val = callback.call(context, this[i], i, this)//callback可以返回值
            arr[arr.length] = val;
        }
    }
    return arr
}
var arr = [2, 5, 6, 8];
arr.myMap(function (val, index, arr) {
    console.log(this)
    console.log(val)
}, arr)
