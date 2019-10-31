function call() {
  Function.prototype.mycall = function(ctx) {
    ctx = ctx || window
    ctx.fn = this
    const args = [...arguments].slice(1)
    const result = ctx.fn(...args)
    delete ctx.fn
    return result
  }
}

function apply() {
  Function.prototype.myapply = function(ctx) {
    ctx = ctx || window
    ctx.fn = this
    let result = null
    if (arguments[1]) {
      result = ctx.fn(...arguments[1])
    } else {
      result = ctx.fn()
    }
    delete ctx.fn
    return result
  }
}

function bind() {
  Function.prototype.mybind = function(ctx) {
    if (typeof this !== 'function') {
      return
    }

    const _this = this
    // bind 函数调用可以传递参数
    const args = [...arguments].slice(1)

    return function F() {
      _this.apply(ctx, [...args, ...arguments])
    }

  }
}

call()
apply()
bind()

function test(n, m) {
  console.log(n)
  console.log(m)
}

test.myapply(this, [666])
test.mycall(this, 666)

const tbind = test.bind(null, 1)

tbind(2)