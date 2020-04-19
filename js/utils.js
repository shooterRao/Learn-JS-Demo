/**
 *  查找函数
 *  @returns Array
 */
export const findByMethod = (data, method) => data.find(method);

/**
 *  查找索引函数
 *  @returns Array
 */
export const findIndexByMethod = (data, method) => data.findIndex(method);

/**
 *  数组中删除函数
 *  @returns Array
 */
export const removeByArr = (arr, func) => {
  if (Array.isArray(arr)) {
    const idx = findIndexByMethod(arr, func);
    idx !== -1 && arr.splice(idx, 1);
  }
  return arr;
};