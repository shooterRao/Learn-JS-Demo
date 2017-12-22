
/* 
 * 生成重复项
 * function anagrams 
*/
  const anagrams = str => {
      if(str.length <= 2) 
      return str.length === 2 ? [str,str[1] + str[0]] : [str];
      return str.split('').reduce((acc, letter, i) => {
          return acc.concat(anagrams(str.slice(0,i) + str.slice(i + 1)).map(val => {
              console.log(val);
              return letter + val
          }))
      },[])
  }

// console.log(anagrams('abc'))

/* 
 *  数组平均数
 *  function average
*/

const average = arr => arr.reduce((acc,cur,i) => acc + cur, 0) / arr.length

// console.log(average([2,3,4]))

/* 
 *  首字母大写
 *  function capitalize
 *  LowerRest : false 
*/

const capitalize = (str, lowerRest = false) => 
        str.slice(0,1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))

// console.log(capitalize('myName',true))
// console.log(capitalize('myName'))

/* 
 *  检查回文
 *  function palindrome
 * 
*/

const palindrome = str => {
    const s = str.toLowerCase().replace(/[\W_]/g,'');
    return s === s.split('').reverse().join('')
}

// console.log(palindrome('abc _ba'))

/* 
 * 检查数组中值的出现次数
 * function countOccurrences
 * 
*/

const countOccurrences = (arr, value) => arr.reduce((a,v) => v === value? a + 1 : a + 0, 0)

// console.log(countOccurrences([1,2,2,3,4,5,6,2],2))

/* 
 * 当前 URL
 * function currentUrl
 * 
*/

const currentUrl = () => window.location.href

/*  
 *  函数柯里化 
 *  function Curry
 * 
*/

const curry = (fn,arity=fn.length,...args) => 
   // console.log(arity)
   // console.log(...args)
    arity <= args.length ? fn(...args) : curry.bind(null,fn,arity,...args)

// console.log(curry(Math.max,3)(2)(10))