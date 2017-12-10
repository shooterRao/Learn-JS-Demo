var  gettype = {
   isFunction:function(type){
       return Object.prototype.toString.call(type) == '[object Function]'
   },
   isArray:function(type){
       return Object.prototype.toString.call(type) == '[object Array]'
   },
   isString:function(type){
       return Object.prototype.toString.call(type) == '[object String]'
   },
   isNull:function(type){
       return Object.prototype.toString.call(type) == '[object Null]'
   },
   isUndefined:function(type){
       return Object.prototype.toString.call(type) == '[object Undefined]'
   },
   isNumber:function(type){
      return Object.prototype.toString.call(type) == '[object Number]'
   },
   isBoolean:function(type){
      return Object.prototype.toString.call(type) == '[object Boolean]'
   },
   isObject:function(type){
      return Object.prototype.toString.call(type) == '[object Object]'
   }
}
console.log(gettype.isString('123'))
console.log(gettype.isFunction(function(){}))
console.log(gettype.isArray([{a:'1'}]))
console.log(gettype.isNumber(123))
console.log(gettype.isObject({a:'1'}))