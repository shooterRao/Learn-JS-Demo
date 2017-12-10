//正则
var test1 = '1234567890';
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
console.log(format);

//非正则
function formatCash(str){
    return str.split('').reverse().reduce((prev,next,index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
console.log(formatCash('1234567890'));

//更秒的
console.log((+test1).toLocaleString('en-US'));

console.log((+test1))