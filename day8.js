
const { readFile } = require("node:fs/promises")

readFile("./input_8.txt").then(solve)

function solve(input) {
    const [rl, _, ...edges] = String(input).split("\n").map(x => x.trim());
    const adjacency = {};
    for (const e of edges) {
        const [start, left, right] = [e.slice(0, 3), e.slice(7, 10), e.slice(12, 15)];
        adjacency[start] = { left, right };
    }
    let current = "AAA", last = "ZZZ", i = 0;

    while (current !== last) {

        current = rl.charAt(i % rl.length) == "L" ? adjacency[current].left : adjacency[current].right;

        i += 1;
    }
    console.log(i);

    let start = Object.keys(adjacency).filter(x => x.charAt(x.length - 1) == "A");


    const options = new Map();
    const appendOrDefault = (x, y) => options.has(x) ? options.set(x, [...options.get(x), y]) : options.set(x, [y]);
    for (let s of start) {
        const set = new Set();
        let i = 0;
        const orig = s;
        while (true) {
            if (set.has(`${s},${i % rl.length}`)) break;
            set.add(`${s},${i % rl.length}`);
            if (s.endsWith("Z")) appendOrDefault(orig, i);
            s = rl.charAt(i % rl.length) == "L" ? adjacency[s].left : adjacency[s].right;
            i += 1;
        }
    }
    console.log(minLCM([...options.values()]));

}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function minLCM(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;


    const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0));


    for (let j = 0; j < cols; j++) {
        dp[0][j] = matrix[0][j];
    }


    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            dp[i][j] = lcm(matrix[i][j], dp[i - 1][(j + 1) % cols]);
        }
    }

    const minLCMValue = Math.min(...dp[rows - 1]);

    return minLCMValue;
}