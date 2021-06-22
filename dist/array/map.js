"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(arr, handler, count) {
    count = count || arr.length;
    const workersCount = Math.max(Math.floor(Math.min(count, arr.length)), 0);
    const results = [];
    Array.from({ length: workersCount }).forEach((w, workerIndex) => {
        for (let i = workerIndex; i < arr.length; i += workersCount) {
            results[i] = handler(arr[i], i);
        }
    });
    return results;
}
exports.default = map;
//# sourceMappingURL=map.js.map