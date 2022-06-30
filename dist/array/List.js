class List extends Array {
    async mapThrottled(callbackfn, workerCount) {
        workerCount = workerCount || this.length;
        const workersCount = Math.max(Math.floor(Math.min(workerCount, this.length)), 0);
        let res = new List();
        await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
            for (let i = workerIndex; i < this.length; i += workersCount) {
                res[i] = await callbackfn(this[i], i);
            }
        }));
        return res;
    }
    async filterAsync(predicate) {
        let mapItems = await Promise.all(this.map(predicate));
        return new List(...this.filter((ele, idx) => mapItems[idx]));
    }
}
export default List;
//# sourceMappingURL=List.js.map