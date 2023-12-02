
const { readFile } = require("node:fs/promises")

readFile("./input_1.txt").then(solve)

function solve(input) {
    const answer = String(input).split("\n").map(x => x.split("").map(Number).filter(Boolean)).reduce((p, c) => p + c.at(0) * 10 + c.at(-1), 0);
    console.log(answer);
}