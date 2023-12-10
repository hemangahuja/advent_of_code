
const { readFile } = require("node:fs/promises")

readFile("./input_9.txt").then(solve)

function solve(input) {
    const sequences = String(input).split("\n").map(x => x.trim().split(" ").map(Number));
    let ans = 0;

    for (let sequence of sequences) {
        while (!sequence.every(x => x == 0)) {
            ans += sequence.at(-1);
            sequence = adjacentDifferences(sequence);
        }
    }
    console.log(ans);
    ans = 0;
    for (let sequence of sequences) {
        let differencesSequences = [];
        do {
            differencesSequences.push(sequence);
            sequence = adjacentDifferences(sequence);
        }
        while (!sequence.every(x => x == 0));
        differencesSequences.reverse();

        const finalSequence = differencesSequences.map(x => x[0]);
        let prev = 0;
        for (let i = 0; i < finalSequence.length; i++) {
            prev = finalSequence[i] - prev;
        }
        ans += prev;
    }
    console.log(ans);
}

function adjacentDifferences(array) {
    const differences = [];
    for (let i = 1; i < array.length; i++) {
        differences.push(array[i] - array[i - 1]);
    }
    return differences;
}