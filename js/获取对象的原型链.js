function getPrototypeChains(target) {
  if(target === null || target === undefined ) {
    throw new Error('target must be an Object!')
  }
  var chains = [];
  var getPrototype = function(target) {
      chains.push(Object.getPrototypeOf(target));
  }
  getPrototype(target);
  while(Object.getPrototypeOf(target) !== null) {
    target = target.__proto__;
    getPrototype(target);
  }
    return chains;
}

function Person() {}
var p1 = new Person();
//var p2 = Object.create(Person.prtotype);// 不需要new Person了
