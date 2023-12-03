
const { readFile } = require("node:fs/promises")

readFile("./input_2.txt").then(solve)

function solve(input) {
    const games = String(input).split("\n").map(x => x.trim().split(":"));
    const possible = [
        ["blue", 14],
        ["green", 13],
        ["red", 12]
    ];
    let answer = 0;
    let answer2 = 0;
    games.forEach(game => {
        const id = game[0].split(" ").at(1);
        const sets = game[1].trim().split("; ").map(x => x.split(", ").map(x => x.split(" "))).map(x => Object.fromEntries(x.map(y => y.reverse())));

        if (sets.every(set => possible.every(([color, value]) => !(color in set) || Number(set[color]) <= value))) {
            answer += Number(id);
        }
        const max = new Map();
        sets.forEach(set => Object.entries(set).forEach(([color, value]) => {
            max.set(color, Math.max(max.get(color) ?? 0, value));
        }))
        answer2 += [...max.values()].reduce((p, c) => p * c, 1);
    })
    console.log(answer, answer2);

}

