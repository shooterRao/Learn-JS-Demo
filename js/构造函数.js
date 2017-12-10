function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }else{
        console.log('true');
    }
  }

var Person = (function() {
    function Person(name, age, sex) {
      console.log(this)//Person
      _classCallCheck(this, Person);
      
      this.c = function() {};
  
      this.name = name;

      console.log('run')
    }
  
    // _createClass(Person, [
    //   {
    //     key: "d",
    //     value: function d(a) {
    //       this.c();
    //     }
    //   }
    // ]);
  
    return Person;
  })();

  var a = new Person()

   
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }else{
        console.log('true');
    }
  }

  function aClass(){
     _classCallCheck(this,aClass)
     this.a = 1;
     console.log(this.a)//1
     console.log(this)//aClass { a:1 }
  }
  
 var bar =  new aClass;
  //  
  console.log(aClass);
  console.log(bar) 
 
  
var foo = (function () {
     function foo(key,value){
        this.key = key;
        this.value = value; 
     }
     return foo
})()
//

class foo {
  constructor(key,value){
    this.key = key;
    this.value = value;
  }
}
//



var bar = new foo('a',1)
console.log(bar)//foo { key:'a', value: 1 }