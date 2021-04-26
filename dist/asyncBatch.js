"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function asyncBatch(tasks, handler, desiredWorkers) {
    const workersCount = Math.max(Math.floor(Math.min(desiredWorkers, tasks.length)), 0);
    const results = [];
    await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
        for (let i = workerIndex; i < tasks.length; i += workersCount) {
            results[i] = await handler(tasks[i], i);
        }
    }));
    return results;
}
exports.default = asyncBatch;
