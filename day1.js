
const { readFile } = require("node:fs/promises")

readFile("./input_1.txt").then(solve)
function replaceBulk(str, findArray, replaceArray) {
    var i, regex = [], map = {};
    for (i = 0; i < findArray.length; i++) {
        regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
        map[findArray[i]] = replaceArray[i];
    }
    regex = regex.join('|');
    str = str.replace(new RegExp(regex, 'g'), function (matched) {
        return map[matched];
    });
    return str;
}
function solve(input) {
    const answer1 = String(input).split("\n").map(x => x.split("").map(Number).filter(Boolean)).reduce((p, c) => p + c.at(0) * 10 + c.at(-1), 0);
    console.log(answer1);
    const mapping = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    };
    const replace = (x) => {

        let min = Infinity;
        let max = -Infinity;
        let minKey, maxKey;

        Object.keys(mapping).forEach(e => {
            const idx = x.indexOf(e);
            const lastIdx = x.lastIndexOf(e);
            if (idx != -1 && idx < min) {
                min = idx;
                minKey = e;
            }
            if (lastIdx != -1 && lastIdx > max) {
                max = lastIdx;
                maxKey = e;
            }
        })
        const p = [], l = [];
        if (min != Infinity) { p.push(minKey); l.push(mapping[minKey]); }
        if (max != -Infinity) { p.push(maxKey); l.push(mapping[maxKey]); }
        return replaceBulk(x, p, l);
    }

    const fixedInput = String(input).split("\n").map(replace);
    const answer2 = fixedInput.map(x => x.split("").map(Number).filter(Boolean)).reduce((p, c) => p + c.at(0) * 10 + c.at(-1), 0);
    console.log(answer2)
}