var _a;
class HashMap {
    constructor() {
        this.size = 0;
        this[_a] = 'HashMap';
    }
    clear() {
        throw new Error("Method not implemented.");
    }
    delete(key) {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn, thisArg) {
        throw new Error("Method not implemented.");
    }
    get(key) {
        throw new Error("Method not implemented.");
    }
    has(key) {
        throw new Error("Method not implemented.");
    }
    set(key, value) {
        throw new Error("Method not implemented.");
    }
    entries() {
        throw new Error("Method not implemented.");
    }
    keys() {
        throw new Error("Method not implemented.");
    }
    values() {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    toJSON() {
        let arr = [];
        this.forEach((value, key) => {
            arr.push({ key, val: value });
        });
        return arr;
    }
}
_a = Symbol.toStringTag;
export default HashMap;
//# sourceMappingURL=HashMap.js.map