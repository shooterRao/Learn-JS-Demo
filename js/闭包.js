
     
     var name = "The Window";   
　　 var object = {   
　　　　name : "My Object",   
　　　　getNameFunc : function(){   
　　　　　　return function(){   
	            console.log(this);
　　　　　　　　return this.name;   
　　　　　};   
　　　　}   
};   
alert(object.getNameFunc()()); 
  
function a() {  
	 var i = 0;
	return function b() 
	{ alert(++i); }  
	
}
	var c = a();
	c();//1
	c();//2
	//执行完后内存不会被释放
	/*这样在执行完var c=a()后，变量c实际上是指向了函数b，再执行c()后就会弹出一个窗口显示i的值(第一次为1)。这段代码其实就创建了一个闭包，为什么？因为函数a外的变量c引用了函数a内的函数b，就是说：当函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包。
    当内部函数在定义它的作用域的外部被引用时,就创建了该内部函数的闭包 ,如果内部函数引用了位于外部函数的变量,当外部函数调用完毕后,这些变量在内存不会被释放,因为闭包需要它们. 
    由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。 
*/



	