/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let transposeMatrix = new Array(n).fill(0).map(() => { return new Array(m).fill(0) });

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            transposeMatrix[j][i] = matrix[i][j]
        }
    }
    return transposeMatrix
};

let matrix = [[1, 2, 3], [4, 5, 6]]
//  output [[1,4,7],[2,5,8],[3,6,9]]

console.log(transpose(matrix)); 