/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123, a:b}
 * 
 */
function urlParse(url) {
    // let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    console.log(arr);
    if(arr) {
        arr.forEach(item => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let value = decodeURIComponent(tempArr[1]);
            obj[key] = value;
        });
    }
    return obj;
};

function parseUrl(url){
    var query = url.split("?")[1];
    var queryArr = query.split("&");
    var obj = {};
    queryArr.forEach(function(item){
        var value = item.split("=")[1];
        var key = item.split("=")[0];
        obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return obj;
}

// 对象转换为url参数
const objToUrl = obj => {
    let arr = [];
    for(let i in obj){
        if (obj.hasOwnProperty(i)) {
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return '?' + arr.join("&");
}

console.log(objToUrl({id: 123, a: 'b'}))

console.log(urlParse('?id=123&a=b'))

console.log(parseUrl('?id=123&a=b'))

