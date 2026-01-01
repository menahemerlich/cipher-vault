Math.floor(Math.random() * 10)
function twoRandomNumbers(length){
    let num1
    let num2
    while (num1 === num2) {
        num1 = Math.floor(Math.random() * length)
        num2 = Math.floor(Math.random() * length)
    }
    return [num1, num2]
}

export function rendomShuffle(str){
    let strToArr = str.split("")
    for (let i = 0; i < 500; i++) {
        let num = twoRandomNumbers(strToArr.length - 1);
        let index1 = num[0];
        let index2 = num[1];
        [strToArr[index1], strToArr[index2]] = [strToArr[index2], strToArr[index1]] ;
    }
    return strToArr.join("");
}
