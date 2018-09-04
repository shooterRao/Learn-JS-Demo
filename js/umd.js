(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? 
  module.exports = factory() : 
  typeof define === 'function' && define.amd ? define(factory) : 
  (global.xxx = factory());
})(this, (function () {
    'use strict';
     // doSomething......
    var xxx = 'xxx'; 
    return xxx;
}))