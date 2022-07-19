var _a;
const InitialModulous = 16;
class HashMap {
    constructor() {
        this.valArr = new Array();
        this.keyArr = new Array();
        this.modulous = InitialModulous;
        this.count = 0;
        this[_a] = 'HashMap';
    }
    hashFunc(key) {
        return 0;
    }
    indexCode(hashNum) {
        return hashNum % this.modulous;
    }
    expand() {
        this.keyArr.splice(0, 0, ...(new Array(this.modulous)));
        this.valArr.splice(0, 0, ...(new Array(this.modulous)));
        this.modulous *= 2;
        for (let i = 0; i < this.keyArr.length; i++) {
            let key = this.keyArr[i];
            if (key) {
                let hashNum = this.hashFunc(key);
                let newIdx = this.indexCode(hashNum);
                if (i != newIdx) {
                    let val = this.valArr[i];
                    this.keyArr[i] = null;
                    this.valArr[i] = null;
                    this.keyArr[newIdx] = key;
                    this.valArr[newIdx] = val;
                }
            }
        }
    }
    contract() {
        let compress = true;
        let halfMod = this.modulous / 2;
        for (let i = 0; i < halfMod; i++) {
            if (this.keyArr[i] != null && this.keyArr[i + halfMod] != null) {
                compress = false;
                break;
            }
        }
        if (compress) {
            this.modulous = halfMod;
            for (let i = 0; i < this.keyArr.length; i++) {
                let key = this.keyArr[i];
                if (key) {
                    let hashNum = this.hashFunc(key);
                    let newIdx = this.indexCode(hashNum);
                    if (i != newIdx) {
                        let val = this.valArr[i];
                        this.keyArr[i] = null;
                        this.valArr[i] = null;
                        this.keyArr[newIdx] = key;
                        this.valArr[newIdx] = val;
                    }
                }
            }
            this.keyArr.splice(this.modulous, this.modulous);
            this.valArr.splice(this.modulous, this.modulous);
        }
    }
    balance() { }
    get size() {
        return this.count;
    }
    clear() {
        this.keyArr = new Array();
        this.valArr = new Array();
        this.modulous = InitialModulous;
        this.count = 0;
    }
    delete(key) {
        let idx = this.hashFunc(key);
        if (null == idx)
            return false;
        this.keyArr[idx] = null;
        this.valArr[idx] = null;
        this.count--;
        return true;
    }
    forEach(callbackfn, thisArg) {
        if (!thisArg)
            thisArg = this;
        thisArg.keyArr.forEach((key, idx) => {
            if (key != null) {
                callbackfn(thisArg.valArr[idx], key, thisArg);
            }
        });
    }
    get(key) {
        let idx = this.hashFunc(key);
        if (null == idx)
            return null;
        let val = this.valArr[idx];
        return val;
    }
    has(key) {
        let idx = this.hashFunc(key);
        return idx != null;
    }
    set(key, value) {
        let hashNum = this.hashFunc(key);
        let idx = this.indexCode(hashNum);
        let prevKey = this.keyArr[idx];
        if (prevKey == null || hashNum == this.hashFunc(prevKey)) {
            this.keyArr[idx] = key;
            this.valArr[idx] = value;
        }
        else {
            this.expand();
            this.set(key, value);
        }
        this.count++;
        return this;
    }
    entries() {
    }
    keys() {
        return this.keyArr.values();
    }
    values() {
        return this.valArr.values();
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