
const { readFile } = require("node:fs/promises")

readFile("./input_6.txt").then(solve)

function solve(input) {
    const [times, distances] = String(input).split("\n").map(x => x.split(/\s+/).map(Number).filter(Boolean));

    console.log(getWays(times, distances));

    const fixedTime = Number(times.join("")), fixedDistance = Number(distances.join(""));

    console.log(getWays([fixedTime], [fixedDistance]))

}

function getWays(times, distances) {

    let answer = 1;
    for (const [idx, time] of times.entries()) {
        let ways = 0;
        for (let i = 1; i < time; i++) {
            const run = (time - i) * i;
            if (run > distances.at(idx)) ways++;
        }
        answer *= ways;
    }
    return answer;
}