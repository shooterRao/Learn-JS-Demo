/**
 * 数组（根据对象字段）排序
 * @private
 * @param {Array} data
 * @param {String} key
 * @param {String} type
 */
var sortData = function(data, key, type) {
  var sortDown = function(key) {
    return function(objectN, objectM) {
      var valueN = objectN[key];
      var valueM = objectM[key];
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    };
  };
  var sortUp = function(key) {
    return function(objectN, objectM) {
      var valueN = objectN[key];
      var valueM = objectM[key];
      if (valueN < valueM) return -1;
      else if (valueN > valueM) return 1;
      else return 0;
    };
  };
  type == "up" ? data.sort(sortUp(key)) : data.sort(sortDown(key));
};
