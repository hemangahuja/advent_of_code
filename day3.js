

const { readFile } = require("node:fs/promises")

readFile("./input_3.txt").then(solve);

function solve(input) {
    const matrix = String(input).trim().split("\n").map(x => x.trim().split(""));
    const n = matrix.length, m = matrix[0].length;
    let ans = 0;
    let soFar;
    let start, end;
    const mapping = {};
    const condition = (start, end, num) => {
        const isSymbol = (char) => /^[^\w\d\s.]$/.test(char);

        const offsets = [[-1, -1], [-1, 0], [0, -1], [1, 1], [1, 0], [0, 1], [1, -1], [-1, 1]];
        const columnStart = start[1], columnEnd = end[1], row = start[0];

        for (let i = columnStart; i < columnEnd; i++) {
            for (const offset of offsets) {
                const newRow = row + offset[0], newColumn = i + offset[1];
                if (newRow > -1 && newRow < n && isSymbol(matrix[newRow][newColumn])) {

                    const key = [newRow, newColumn].join(" ")
                    if (matrix[newRow][newColumn] == '*') {
                        if (key in mapping) {
                            const res = mapping[key];
                            res.push(num);
                            mapping[key] = res;
                        } else mapping[key] = [num];
                    }
                    return true;
                }
            }
        }
        return false;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {

            if (!isNaN(Number(matrix[i][j]))) {
                if (!soFar) {
                    start = [i, j];
                    soFar = 0;
                }
                soFar = soFar * 10 + Number(matrix[i][j]);
            } else {
                if (soFar) {
                    end = [i, j];
                    if (condition(start, end, soFar)) { ans += soFar; }
                }
                soFar = null;
            }
        }
        if (soFar) {
            end = [i, m];
            if (condition(start, end, soFar)) ans += soFar;
        }
        soFar = null;
    }
    console.log(ans);

    const ans2 = Object.values(mapping).reduce((p, c) => {
        if (c.length == 2) { return p + c.at(0) * c.at(1); }
        return p;
    }, 0);
    console.log(ans2);
}