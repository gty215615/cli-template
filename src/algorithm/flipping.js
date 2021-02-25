/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var flipAndInvertImage = function (A) {
    const m = A.length;
    for (let i = 0; i < m; i++) {
        let row = A[i];
        let n = row.length;
        let newRow = [];
        for (let j = n - 1; j >= 0; j--) {
            newRow.push(!row[j] ? 1 : 0)
        }
        A[i] = newRow
    }
    return A
};

let matrix = [[1, 1, 0], [1, 0, 1], [0, 0, 0]]

let newMatrix = flipAndInvertImage(matrix)
console.log(newMatrix);



