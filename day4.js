
const { readFile } = require("node:fs/promises")

readFile("./input_4.txt").then(solve)

function solve(input) {
    const mapping = {};
    const answer = String(input).split("\n").reduce((prev, game, i) => {
        const [left, rightGame] = game.trim().split(" | ");
        const leftGame = new Set(left.trim().split(": ").at(1).split(" "));
        const intersection = rightGame.trim().split(/[ ,]+/).filter(x => leftGame.has(x));
        mapping[i] = intersection.length;
        return prev + ((intersection.length > 0) ? Math.pow(2, intersection.length - 1) : 0);
    }, 0)
    console.log(answer);
    const counts = new Map();
    const getOrDefault = (key, def) => counts.has(key) ? counts.get(key) : def;
    let answer2 = 0;
    for (let [i, x] of Object.entries(Object.values(mapping))) {
        const nextIdx = Number(i) + 1;
        for (let idx = 1 + nextIdx; idx <= x + nextIdx; idx++) {

            counts.set(idx, getOrDefault(idx, 1) + getOrDefault(nextIdx, 1));
        }
        answer2 += (getOrDefault(nextIdx, 1));
    }
    console.log(answer2);
}