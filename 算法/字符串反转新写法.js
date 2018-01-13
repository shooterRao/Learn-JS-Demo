const reverse1  = (str)  => str.split('').reduce((a,b) => b+a, '')

const reverse2 = (str) => str.split('').reverse().join('')

const reverse3 = (str) => {
    function replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }
    const length = str.length >> 1
    for(let index = 0; index < length; index++) {
        const oldValue = str[index]
        const currentIndex = str.length - 1 - index
        str = replaceAt(str, index, str[currentIndex])
        str = replaceAt(str, currentIndex, oldValue)
    }
    return str
}

