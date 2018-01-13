function reverseInt( number ) {
    const result = number.toString().split('').reduce((a,b) => b + a,'')
    return parseInt(result) * Math.sign(number)
}

// Math.sign() => 根据类型返回 -1 、1 、0 、-0、NaN


console.log(reverseInt(-500))