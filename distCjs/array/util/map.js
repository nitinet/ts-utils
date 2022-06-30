"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function map(arr, handler, count) {
    count = count || arr.length;
    const workersCount = Math.max(Math.floor(Math.min(count, arr.length)), 0);
    let results = [];
    await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
        for (let i = workerIndex; i < arr.length; i += workersCount) {
            results[i] = await handler(arr[i], i);
        }
    }));
    return results;
}
exports.default = map;
//# sourceMappingURL=map.js.map