var a = 2
function foo() {

    setTimeout(() => {
        console.log(this.a)//箭头函数里的this会继承foo(),此时foo()里的this指向window
    }, 100)

}

foo()
       //总结，箭头函数会继承外层函数调用的this绑定，无论this绑定到什么
