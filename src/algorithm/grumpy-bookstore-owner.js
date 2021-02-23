/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */

// [1, 0, 1, 2, 1, 1, 7, 5]
// [0, 1, 0, 1, 0, 1, 0, 1]
var maxSatisfied = function (customers, grumpy, X) {
    let total = 0;
    let m = customers.length;
    for (let i = 0; i < m; i++) {
        //  先算出不使用秘密技巧满意的数量，因为为0的时候为满意，所以方便后面去重。
        if (!grumpy[i]) {
            total += customers[i];
        }
    }
    let maxIncrease = 0
    for (let i = 0; i < m - X + 1; i++) {
        let temp = 0
        for (let j = 0; j < X; j++) {
            temp += customers[i + j] * grumpy[i + j]
        }
        maxIncrease = Math.max(temp, maxIncrease)
    }
    return maxIncrease + total
};

let customers = [1, 0, 1, 2, 1, 1, 7, 5], grumpy = [0, 1, 0, 1, 0, 1, 0, 1], X = 3;

console.log(maxSatisfied(customers, grumpy, X));

