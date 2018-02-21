/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123, a:b}
 * 
 */
function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
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