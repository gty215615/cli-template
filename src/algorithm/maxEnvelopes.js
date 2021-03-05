/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    const m = envelopes.length;
    for (let j = 1; j < m; j++) {
        for (let i = 0; i < m - j; i++) {
            if (envelopes[i][0] > envelopes[i + 1][0]) {
                let temp = envelopes[i]
                envelopes[i] = envelopes[i + 1]
                envelopes[i + 1] = temp
            }
        }
    }

    let temp = envelopes[0];
    let arr = []
    arr.push(temp)
    for (let i = 0; i < m - 1; i++) {
        if (temp[0] === envelopes[i + 1][0]) {
            if (temp[1] > envelopes[i + 1][1]) {
                do {
                    arr.pop()
                } while (arr[arr.length - 1][1] >= envelopes[i + 1][1])
                temp = envelopes[i + 1]
                arr.push(temp)
            }
            continue;
        }

        if (temp[1] < envelopes[i + 1][1]) {
            temp = envelopes[i + 1]
            arr.push(temp)
        }
    }
    return arr
};

const envelopes = [[1,2],[2,3],[3,4],[4,5],[5,6],[5,5],[6,7],[7,8]]

console.log(maxEnvelopes(envelopes));