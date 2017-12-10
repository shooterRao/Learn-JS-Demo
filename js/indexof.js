var indices = [];
var array = ['q', 'b', 'c', 'a', 'v', 'a', 'd', 'a'];
var element = 'a';
var idx = array.indexOf(element);//返回索引值
while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1)
}
console.log(indices.join(';'))
