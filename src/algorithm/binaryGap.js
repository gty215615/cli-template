/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function (n) {
    const binary = Number(n).toString(2)
    let maxDistance = 0;
    let len = binary.length;
    let start = 0
    let count = 1
    while (count < len) {
        if (binary[count] == 1) {
            let distance = count - start
            maxDistance = Math.max(distance, maxDistance)
            start = count
        }
        count++
    }
    return maxDistance
};


const n = 22
const a = 5
const b = 6
const c = 8
const d = 1
//  output 2

console.log(binaryGap(n));
console.log(binaryGap(a));
console.log(binaryGap(b));
console.log(binaryGap(c));
console.log(binaryGap(d));