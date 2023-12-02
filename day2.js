
const { readFile } = require("node:fs/promises")

readFile("./input_2.txt").then(solve)

function solve(input) {
    const games = String(input).split("\n").map(x => x.trim().split(":"));
    const possible = [
        ["blue", 14],
        ["green", 13],
        ["red", 12]
    ]
    let answer = 0;
    games.forEach(game => {
        const id = game[0].split(" ").at(1);
        const sets = game[1].trim().split("; ").map(x => x.split(", ").map(x => x.split(" "))).map(x => Object.fromEntries(x.map(y => y.reverse())));

        if (sets.every(set => possible.every(([color, value]) => !(color in set) || Number(set[color]) <= value))) {
            answer += Number(id);
        }
    })
    console.log(answer);
}