const { workerData, parentPort } = require('worker_threads');
function better(seed, ranges) {

    for (const [destination, source, length] of ranges) {

        const low = source, high = source + length - 1;
        if (seed <= high && seed >= low) return destination + seed - source;

    };
    return seed;
}
function findMin(seeds, ranges) {
    console.log(seeds);
    const answer2 = seeds.reduce((soFar, start, idx) => {
        if (idx % 2 == 1) return soFar;
        for (let i = start; i < start + seeds[idx + 1]; i++) {
            soFar = Math.min(soFar, ranges.reduce(better, i));
        }
        console.log(soFar);
        return soFar;
    }, Infinity)

    return answer2;
}


parentPort.postMessage(findMin(workerData.seeds, workerData.ranges))