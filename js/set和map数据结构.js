
        //set数据结构
        var set = new Set();
        var array = [1, 2, 3, 4, 5, 5, 5];
        array.map(val => set.add(val))
        console.log(set)
        console.log([...set]) //转成数组

        //set方法可以用来去除数组中的重复成员
        var arr = [...new Set(array)]
        console.log(arr)

        //Array.from方法也可以将 Set 结构转为数组
        function dedupe(array) {
            return Array.from(new Set(array));
        }
        console.log(dedupe([1, 1, 2, 3])) // [1, 2, 3]

        //遍历set结构
        for (let i of set) {
            console.log(i)
        }

        /* Set 结构的实例有四个遍历方法，可以用于遍历成员。
             keys()：返回键名的遍历器
             values()：返回键值的遍历器
             entries()：返回键值对的遍历器
             forEach()：使用回调函数遍历每个成员 */


        //Map数据结构
        //Map数据结构提供了“值—值”的对应     

       //作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
       const map = new Map([ ['name', '张三'],['title', 'Author'] ] );
      
       map.set('a',1);
       map.set('a',2);
       
       console.log(map)

       //遍历
       for (let [key, value] of map) {
            console.log(key, value);
       }
       
       //Map转为数组
       console.log([...map])

       var obj = {a:1,b:2}
       console.log(Object.keys(obj))
       //for ... of用来遍历数组
       for(let i of Object.keys(obj)){
           console.log(i)
       }
       //...扩展运算符，只能遍历拥有Iterator接口的对象
       console.log([...map])
       console.log(...array)
  