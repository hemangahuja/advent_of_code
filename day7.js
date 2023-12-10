
const { readFile } = require("node:fs/promises")

readFile("./input_7.txt").then(solve)

function solve(input) {

    const games = String(input).split("\n").map(x => x.trim().split(" "));

    games.sort(camelCards);

    let answer = 0;
    for (const [i, game] of games.entries()) {
        answer += (i + 1) * Number(game.at(1));
    }

    // console.log(games.reverse());
    console.log(answer);

}

function camelCards(a, b) {

    const typeA = bestType(a), typeB = bestType(b);
    // console.log({ a, typeA }, { b, typeB })
    if (typeA > typeB) return 1;
    if (typeB > typeA) return -1;
    const values = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

    for (let i = 0; i < 5; i++) {
        const ai = values.indexOf(a.at(0).charAt(i));
        const bi = values.indexOf(b.at(0).charAt(i));

        if (ai > bi) return -1;
        if (bi > ai) return 1;
    }
}
function bestType(game) {
    return Math.max(type(game.at(0), true), type(game.at(0), false));
}

function type(game, replace) {

    let counter = game.getCounter();
    if (replace && game !== "JJJJJ") {
        counter = game.replaceAll("J", getMaxEntryExcept(counter, "J").at(0)).getCounter();
    }
    // console.log(game, counter);
    const sortedValues = [...counter.values()].sort((a, b) => b - a);
    const ranks = ['1,1,1,1,1', '2,1,1,1', '2,2,1', '3,1,1', '3,2', '4,1', '5']
    return ranks.indexOf(sortedValues.join(','))
}

function getCounter() {
    const counter = new Map();
    const increment = x => counter.has(x) ? counter.set(x, counter.get(x) + 1) : counter.set(x, 1);
    this.split('').forEach(increment);
    return counter;
}

function getMaxEntryExcept(map, except) {
    return [...map.entries()].filter(x => x[0] != except).reduce((p, c) => p[1] > c[1] ? p : c, [null, -Infinity]);
}
String.prototype.getCounter = getCounter;