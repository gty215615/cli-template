/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    const binaryArr = []
    for (let i = 0; i <= num; i++) {
        const binary = Number(i).toString(2)

        const m = binary.length;
        let count = 0
        for (let i = 0; i < m; i++) {
            if (binary[i] == 1) {
                count++
            }
        }
        binaryArr.push(count)
    }
    return binaryArr
};

const demo = 2;
// 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
console.log(countBits(2));
console.log(countBits(5));

var countBits1 = function (num) {
    const binaryArr = []
    let count = 0
    for (let i = 0; i <= num; i++) {
        const binary = Number(i).toString(2)

   
        binaryArr.push(count)
    }
    return binaryArr
};

console.log(countBits1(2));
console.log(countBits1(5));

/**
 *  0   0       0
 *  1   1       1
 *  2   10      1
 *  3   11      2
 *  4   100     1
 *  5   101     2
 *  6   110     2
 *  7   111     3
 *  8   1000    1
 *  9   1001    2
 *  10  1010    2
 *  11  1011    3
 *  12  1100    2
 *  13  1101    3
 *  14  1110    3
 *  15  1111    4
 * 
 * 
 */