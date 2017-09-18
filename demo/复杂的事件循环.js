
        
        console.log('golb1');//1

        setTimeout(function () {
            console.log('timeout1')//8
            process.nextTick(function () {
                console.log('timeout1_nextTick')//10
            })
            new Promise(function (resolve) {
                console.log('timeout1_promise')//9
                resolve();
            }).then(function () {
                console.log('timeout1_then')//11
            })
        })

        setImmediate(function () {
            console.log('immediate1')//16
            process.nextTick(function () {
                console.log('immediate1_nextTick')//18
            })
            new Promise(function (resolve) {
                console.log('immediate1_promise')//17
                resolve();
            }).then(function () {
                console.log('immediate1_then')//19
            })
        })

        process.nextTick(function () {
            console.log('glob1_nextTick')//4
        })

        new Promise(function (resolve) {
            console.log('glob1_promise')//2
            resolve()
        }).then(function () {
            console.log('glob1_then')//6
        })

        setTimeout(function () {
            console.log('timeout2')//12
            process.nextTick(function () {
                console.log('timeout2_nextTick')//14
            })
            new Promise(function (resolve) {
                console.log('timeout2_promise')//13
                resolve();
            }).then(function () {
                console.log('timeout2_then')//15
            })
        })

        process.nextTick(function () {
            console.log('glob2_nextTick')//5
        })

        new Promise(function (resolve) {
            console.log('glob2_promise')//3
            resolve();
        }).then(function () {
            console.log('glob2_then')//7
        })

        setImmediate(function () {
            console.log('immediate2')//20
            process.nextTick(function () {
                console.log('immediate2_nextTick')//22
            })
            new Promise(function (resolve) {
                console.log('immediate2_promise')//21
                resolve();
            }).then(function () {
                console.log('immediate2_then')//23
            })
        })

/*
在chrome浏览器中返回的结果
glob1_then
glob2_then
timeout1
timeout1_promise
timeout1_nextTick
timeout1_then
timeout2
timeout2_promise
timeout2_nextTick
timeout2_then
immediate1
immediate1_promise
immediate1_nextTick
immediate1_then
immediate2
immediate2_promise
immediate2_nextTick
immediate2_then

在node环境下返回的结果
golb1
glob1_promise
glob2_promise
glob1_nextTick
glob2_nextTick
glob1_then
glob2_then
timeout1
timeout1_promise
timeout2
timeout2_promise
timeout1_nextTick
timeout2_nextTick
timeout1_then
timeout2_then
immediate1
immediate1_promise
immediate2
immediate2_promise
immediate1_nextTick
immediate2_nextTick
immediate1_then
immediate2_thenc

*/