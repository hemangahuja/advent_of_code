const { workerData, parentPort } = require('worker_threads');
function better(seed, ranges) {

    for (const [destination, source, length] of ranges) {

        const low = source, high = source + length - 1;
        if (seed <= high && seed >= low) return destination + seed - source;

    };
    return seed;
}
function findMin(seeds, ranges) {

    let soFar = Infinity;
    for (let i = seeds[0]; i < seeds[0] + seeds[1]; i++) {
        soFar = Math.min(soFar, ranges.reduce(better, i));
    }
    console.log(soFar);
    return soFar;
}



parentPort.postMessage(findMin(workerData.seeds, workerData.ranges))