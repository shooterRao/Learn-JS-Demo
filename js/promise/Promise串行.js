// 利用reduce处理

function methodThatReturnsAPromise(nextID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Resolve ${new Date().toLocaleTimeString()}`)
      resolve()
    }, 1000)
  })
}

[1,2,3].reduce((accumulatorPromise, nextID) => {
  console.log(`Loop ${new Date().toLocaleTimeString()}`)
  return accumulatorPromise.then(() => {
    return methodThatReturnsAPromise(nextID)
  })
}, Promise.resolve())
