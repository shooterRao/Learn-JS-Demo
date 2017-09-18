const obj = {
    //调用setter,修改obj.a的值
    set a(val){
       this._a = val * 2;
    },
    //调用getter,设置obj.a的值
    get a(){
        return this._a;
    }
};
obj.a = 2; 
console.log(obj.a);
//obj.a其实是调用getter函数，也就是get a(),当在外部设置obj.a的值无效，因为a已经通过get a()方法调用
console.log(obj.toString())//判断对象类型
console.log(obj.hasOwnProperty('a'))//判断对象是否含有a属性




