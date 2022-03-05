import parallel from "./index.js";
import { setTimeout } from "timers/promises";
import { deepEqual } from "assert/strict";

let log = [];
let results = [];
let queue = parallel(3);
for await (let task of [1, 2, 3, 4]) {
    results.push(queue(async () => {
        log.push(`Start:${task}`);
        await setTimeout(20);
        log.push(`Stop:${task}`);
        return task;
    }));
    await setTimeout(10);
}

deepEqual(await Promise.all(results), [1, 2, 3, 4]);

deepEqual(log, [
    'Start:1',
    'Start:2',
    'Stop:1',
    'Start:3',
    'Stop:2',
    'Start:4',
    'Stop:3',
    'Stop:4'
]);

console.log("passed");