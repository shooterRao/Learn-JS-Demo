/**
 * @description 设置cookie
 * @param name cookie名称
 * @param value 值
 * @param iDay 有效时间（天数）
 */
function setCookie(name, value, iDay) {
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
}
/**
* @description 获取cookie
* @param name cookie名称
*/
function getCookie(name) {
  let arr = document.cookie.split('; '),arr2;
  for (let i = 0; i < arr.length; i++) {
      arr2 = arr[i].split('=');
      if (arr2[0] == name) {
          return arr2[1];
      }
  }
  return '';
}
/**
* @description 删除cookie
* @param name cookie名称
*/
function removeCookie(name) {
  this.setCookie(name, 1, -1);
}

/**
 * @description 操作cookie
 * @param name cookie名称
 * @param value 值
 * @param iDay 有效时间（天数）
 */
function cookie(name, value, iDay){
  if(arguments.length===1){
      return this.getCookie(name);
  }
  else{
      this.setCookie(name, value, iDay);
  }
}