const promisify = require('util').promisify

const path = require('path');
const fs = require('fs');
const readFile = promisify(fs.readFile);

const gen = function* () {
  const res1 = yield readFile(path.join(__dirname, './a.json'), { encoding: 'utf8' })
  console.log(res1); // 这里会在 g.next(res1) 执行时调用

  const res2 = yield readFile(path.join(__dirname, './b.json'), { encoding: 'utf8' })
  console.log(res2);

}

const g = gen()

const g1 = g.next()

console.log(g1);

g1.value.then(res1 => {
  console.log('res1', res1)

  const g2 = g.next(res1) // 参数就会被当作上一个 yield 表达式的返回值

  console.log(g2)

  g2.value.then(res2 => {
    console.log('res2', res2);

    g.next(res2)

  }).catch(e => console.log(e))

}).catch(e => console.log(e))

// 自动执行器

function run (gen) {
  const g = gen()

  function next(data) {
    const res = g.next(data);

    if (res.done) return res.vale

    res.value.then(function(data) {
      // 递归执行 P.then(P.then(P.then...))
      next(data)
    })
  }

  next()
}

const gen2 = function* () {
  const res1 = yield readFile(path.join(__dirname, './a.json'), { encoding: 'utf8' })
  console.log(res1); // 这里会在 g.next(res1) 执行时调用

  const res2 = yield readFile(path.join(__dirname, './b.json'), { encoding: 'utf8' })
  console.log(res2);

}

run(gen2)

// async 
const read = async function () {
  const res1 = await readFile(path.join(__dirname, './a.json'), { encoding: 'utf8' })
  console.log(res1);

  const res2 = await readFile(path.join(__dirname, './b.json'), { encoding: 'utf8' })
  console.log(res2);
}

read()