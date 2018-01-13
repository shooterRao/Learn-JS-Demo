const mirror = (str) => str.split('').every((value, index) => value === str[str.length - 1 - index])

console.log(mirror('abcba'))