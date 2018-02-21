class Cart {
    constructor(total) {
        this._total = total;
    }
    // 取值时拦截
    get total() {
        return this._total;
    }
    // 赋值时拦截
    set total(v) {
        this._total = Number(v)
    }
    get totalPrice() {
        return  parseInt(this._total * 1.5)
    }
} 

let cart = new Cart(100)
cart.total = 200
console.log(cart.totalPrice)

function fn( ) {
    var ff = function() {
        return foo
    }
    var foo = '123'
    return ff()
}
// fn实际上是...
function fn1( ) {
    var ff;
    var foo;
    ff = function() {
        console.log(foo)
        return foo
    }
    foo = '123'
    ff()
}

fn1()
