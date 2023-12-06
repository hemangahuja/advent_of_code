
const { readFile } = require("node:fs/promises")
const { Worker } = require("node:worker_threads")

readFile("./input_5.txt").then(solve)

function solve(input) {
    const lines = String(input).split("\n").map(x => x.trim());
    const seeds = lines.at(0).split(": ").at(1).split(" ").map(Number);
    const soFar = [];
    const maps = [];
    for (let line of lines.slice(2).concat([''])) {
        if (line == '') { maps.push([...soFar.slice(1)]); soFar.length = 0; }
        else soFar.push(line);
    }

    const ranges = maps.map(x => x.map(y => y.split(" ").map(Number)));
    const final = seeds.reduce((soFar, seed) => {
        return Math.min(soFar, ranges.reduce(better, seed));
    }, Infinity);

    console.log(final);


    for (let i = 0; i < seeds.length; i += 2) {
        const worker = new Worker("./day5_worker.js", {
            workerData: {
                seeds: seeds.slice(i, i + 2),
                ranges
            }
        });
        worker.on("message", r => console.log(r));
    }
    // const answer2 = seeds.reduce((soFar, start, idx) => {
    //     if (idx % 2 == 1) return soFar;
    //     for (let i = start; i < start + seeds[idx + 1]; i++) {
    //         soFar = Math.min(soFar, ranges.reduce(better, i));
    //     }
    //     console.log(soFar);
    //     return soFar;
    // }, Infinity)

    // console.log(answer2);
}

function better(seed, ranges) {

    for (const [destination, source, length] of ranges) {

        const low = source, high = source + length - 1;
        if (seed <= high && seed >= low) return destination + seed - source;

    };
    return seed;
}