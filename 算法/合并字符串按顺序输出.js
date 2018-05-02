function sortStr(str1, str2) {
  let str = "";
  let numberArr = [];
  (str1 + str2)
    .toLowerCase()
    .split("")
    .forEach(v => {
      numberArr.push(v.charCodeAt());
    });
  let sortNumberArr = numberArr.sort((a, b) => a - b);
  sortNumberArr.forEach(v => {
    str += String.fromCharCode(v);
  });
  return str;
}

console.log(sortStr("abc", "hjkop"));
