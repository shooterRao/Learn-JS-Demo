
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

/*  
 *  数组扁平化 
 *  function deepFlatten
 * 
*/

const deepFlatten = arr => arr.reduce((a,v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v) ,[]);  

// console.log(deepFlatten([1,[2,3],[3,[4]]]))

/*  
 *  数组之间的区别
 *  function difference
 * 
*/

const difference = (a,b) => {
    const s = new Set(b);
    // 返回b没有的数
    return a.filter(v => !s.has(v));
}

// console.log(difference([1,2,3],[1,2]))

/*  
 *  两点之间的距离（欧几里得）
 *  function distance
 * 
*/

const distance = (x0,y0,x1,y1) => Math.hypot(x1 - x0, y1 - y0);

// console.log(distance(1,1, 2,3))


/*  
 *  可以按数字整除
 *  function isDivisible
 * 
*/

const isDivisible = (dividend, divisor) => dividend % divisor === 0;

/*  
 *  转译正则表达式
 *  function escapeRegExp
 * 
*/

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)

/*  
 *  偶数或奇数
 *  function isEven
 * 
*/

const isEven = num => num % 2 === 0;

// isEven(3) -> false

/*  
 *  阶乘
 *  function factorial
 * 
*/

const factorial = n => n > 1 ? n*factorial(n-1) : n; 

// console.log(factorial(8));

/*  
 *  斐波那契数组生成器
 *  function fibonacci
 * 
*/

const fibonacci = n =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]

/*  
 *  过滤数组非唯一值
 *  function filterNonUnique
 * 
*/
// 这是过滤重复值
// const filterSameNumber = arr => [...new Set(arr)];
// const filterSameNumber = arr => arr.filter((v,i) => arr.indexOf(v) === i);
const filterNonUnique = arr => arr.filter((v,i) => arr.indexOf(v) === arr.lastIndexOf(v));
// console.log(filterNonUnique([1,2,2,3,3,4,5,5]));

/*  
 *  Flatten数组
 *  function flatten
 * 
*/

const flatten = arr => arr.reduce((a,v) => a.concat(v),[]);
// console.log(flatten([1,[2],3]));

/*  
 *  从数组中获取最大值
 *  function arrayMax
 * 
*/

const arrayMax = arr => Math.max(...arr);

// console.log(arrayMax([1,2,3,4]));

/*  
 *  从数组中获取最小值
 *  function arrayMin
 * 
*/

const arrayMin = arr => Math.min(...arr);
// console.log(arrayMin([1,2,3,6,8,9]));

/*  
 *  获取滚动位置
 *  function getScrollPos
 * 
*/

const getScrollPos = (el=window) => {
    return {
        x : (el.pageXOffset !== undefined) ? el.pageXOffset : el.screenLeft,
        y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.screenTop
    }
}

/*  
 *  来自键值对的对象
 *  function objectFromPairs
 * 
*/

const objectFromPairs = arr => arr.reduce((a,v) => {
    a[v[0]] = v[1];
    return a;
},{})
// console.log(objectFromPairs([['a',1],['b',2]]));

// var tmp = 123;
// function f() {
//     console.log(tmp);
//     if(false) {
//        var tmp = 'adv'
//     }
// }
 

// function fn() {
//     this.a = 123;
//     // var that = this;
//     return () => {
//         console.log(this.a);
//     }
// }
// var f = new fn();
// f()
// console.log(global);

// 管道
// 使用Array.reduce（）通过函数传递值。

const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg);
// pipe(btoa, x => x.toUpperCase())("Test") -> "VGVZDA=="


// Powerset
// 使用reduce（）与map（）结合来遍历元素，并将其组合成包含所有组合的数组。
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]

// 范围内的随机整数
// 使用Math.random（）生成一个随机数并将其映射到所需的范围，使用Math.floor（）使其成为一个整数。
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2

// 范围内的随机数
// 使用Math.random（）生成一个随机值，使用乘法将其映射到所需的范围。
const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005

// 随机化数组的顺序
// 使用sort（）重新排序元素，利用Math.random（）来随机排序。
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]

// 重定向到URL
// 使用window.location.href或window.location.replace（）重定向到url。 传递第二个参数来模拟链接点击（true - default）或HTTP重定向（false）。
const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')

// 反转一个字符串
// 使用数组解构和Array.reverse（）来颠倒字符串中的字符顺序。合并字符以使用join('')获取字符串。
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'

// RGB到十六进制
// 使用按位左移运算符（<<）和toString（16），然后padStart（6，“0”）将给定的RGB参数转换为十六进制字符串以获得6位十六进制值。
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'

// 滚动到顶部
// 使用document.documentElement.scrollTop或document.body.scrollTop获取到顶部的距离。从顶部滚动一小部分距离。
// 使用window.requestAnimationFrame（）来滚动。
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()

// 随机数组值
// 使用Array.map（）和Math.random（）创建一个随机值的数组。使用Array.sort（）根据随机值对原始数组的元素进行排序。
const shuffle = arr => {
    let r = arr.map(Math.random);
    return arr.sort((a,b) => r[a] - r[b]);
}

// 数组之间的相似性
// 使用filter（）移除不是values的一部分值，使用includes（）确定。
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]

// 按字符串排序（按字母顺序排列）
// 使用split（''）分割字符串，sort（）使用localeCompare（），使用join（''）重新组合。
const sortCharactersInString = str =>
  str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'

// 数组总和
// 使用reduce（）将每个值添加到累加器，初始化值为0。
const sum = arr => arr.reduce((acc, val) => acc + val, 0);
// sum([1,2,3,4]) -> 10

// 交换两个变量的值
// 使用数组解构来交换两个变量之间的值。
[varA, varB] = [varB, varA];
// [x, y] = [y, x]

// 列表的tail
// 返回arr.slice（1）
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]

// 数组唯一值
// 使用ES6 Set和... rest操作符去掉所有重复值。
const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]

// URL参数
const getUrlParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}

// UUID生成器
// 使用crypto API生成符合RFC4122版本4的UUID。
const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'

// 验证数字
// 使用！isNaN和parseFloat（）来检查参数是否是一个数字，使用isFinite（）来检查数字是否是有限的。
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// validateNumber('10') -> true