'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Foo = function Foo() {
  // 必须要用 new 调用
  _classCallCheck(this, Foo);

  this.a = 1;
  this.b = 2;
};

var Bar =
  /*#__PURE__*/
  (function(_Foo) {
    // 继承
    _inherits(Bar, _Foo);

    function Bar() {
      var _this;

      // 检查 new 调用
      _classCallCheck(this, Bar);

      // 调用父类构造函数
      // _getPrototypeOf(Bar) => Bar.__proto__
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Bar).call(this));
      _this.c = 1;
      return _this;
    }

    return Bar;
  })(Foo);

/* 
    继承思路：利用 Object.create 实现 Bar.prototype.__proto__ === Foo.prototype 这样原型方法属性可以继承 (继承父类原型方法属性)
            利用 Object.setPrototypeOf 实现 Bar.__proto__ === Foo (继承父类方法属性)
  */

/* 
class Foo {
	constructor() {
      this.a = 1;
      this.b = 2;
    }
}

class Bar extends Foo {
	constructor() {
      super();
      this.c = 1;
    }
}
*/
