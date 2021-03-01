/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    this.arr = Array.prototype.slice.call(nums, 0)
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    let result = 0
    let start = i, end = j;
    let dis =(end - start);
    if (dis % 2 === 0) {
        result += this.arr[start];
        start++
    }
    while (start < end) {
        result += this.arr[start]
        result += this.arr[end]
        start++
        end--
    }

    return result
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */

const NumArrayData = [[-2, 0, 3, -5, 2, -1]]
const sumRange1 = [0, 2]
const sumRange2 = [2, 5]
const sumRange3 = [0, 5]

var obj = new NumArray(NumArrayData)
  var param_1 = obj.sumRange(0,5)