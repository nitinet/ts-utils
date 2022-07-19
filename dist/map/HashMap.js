var _a;
const InitialModulous = 16;
class Node {
    constructor(key, val) {
        this.key = null;
        this.val = null;
        this.key = key;
        this.val = val;
    }
}
class HashMap {
    constructor() {
        this.valArr = new Array();
        this.modulous = InitialModulous;
        this.count = 0;
        this[_a] = 'HashMap';
    }
    hashFunc(key) {
        let res = 0;
        let temp = null;
        switch (typeof key) {
            case 'boolean': {
                res = key ? 1 : 0;
                break;
            }
            case 'number': {
                res = key;
                break;
            }
            case 'function':
            case 'bigint':
            case 'symbol':
            case 'string': {
                temp = key.toString();
                break;
            }
            case 'object': {
                temp = JSON.stringify(key);
                break;
            }
        }
        if (temp)
            res = this.strHashCode(temp);
        return res;
    }
    strHashCode(str) {
        let hash = 0;
        if (str.length == 0)
            return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
    indexCode(hashNum) {
        return hashNum % this.modulous;
    }
    expand() {
        this.valArr.splice(0, 0, ...(new Array(this.modulous)));
        this.modulous *= 2;
        for (let i = 0; i < this.valArr.length; i++) {
            let obj = this.valArr[i];
            if (obj) {
                let hashNum = this.hashFunc(obj.key);
                let newIdx = this.indexCode(hashNum);
                if (i != newIdx) {
                    this.valArr[i] = null;
                    this.valArr[newIdx] = obj;
                }
            }
        }
    }
    contract() {
        let compress = true;
        let halfMod = this.modulous / 2;
        for (let i = 0; i < halfMod; i++) {
            if (this.valArr[i] != null && this.valArr[i + halfMod] != null) {
                compress = false;
                break;
            }
        }
        if (compress) {
            this.modulous = halfMod;
            for (let i = 0; i < this.valArr.length; i++) {
                let obj = this.valArr[i];
                if (obj) {
                    let hashNum = this.hashFunc(obj.key);
                    let newIdx = this.indexCode(hashNum);
                    if (i != newIdx) {
                        this.valArr[i] = null;
                        this.valArr[newIdx] = obj;
                    }
                }
            }
            this.valArr.splice(this.modulous, this.modulous);
        }
    }
    get size() {
        return this.count;
    }
    clear() {
        this.valArr = new Array();
        this.modulous = InitialModulous;
        this.count = 0;
    }
    delete(key) {
        let idx = this.hashFunc(key);
        if (null == idx)
            return false;
        this.valArr[idx] = null;
        this.count--;
        this.contract();
        return true;
    }
    forEach(callbackfn, thisArg) {
        if (!thisArg)
            thisArg = this;
        thisArg.valArr.forEach((obj) => {
            if (obj != null) {
                callbackfn(obj.val, obj.key, thisArg);
            }
        });
    }
    get(key) {
        let hashNum = this.hashFunc(key);
        let idx = this.indexCode(hashNum);
        let obj = this.valArr[idx];
        return obj ? obj.val : null;
    }
    has(key) {
        let hashNum = this.hashFunc(key);
        let idx = this.indexCode(hashNum);
        let obj = this.valArr[idx];
        return obj ? true : false;
    }
    set(key, value) {
        let hashNum = this.hashFunc(key);
        let idx = this.indexCode(hashNum);
        let prevObj = this.valArr[idx];
        if (prevObj == null || hashNum == this.hashFunc(prevObj.key)) {
            this.valArr[idx] = new Node(key, value);
        }
        else {
            this.expand();
            this.set(key, value);
        }
        return this;
    }
    entries() {
        let valsItr = this.valArr.values();
        return {
            next() {
                let itrVal = valsItr.next();
                let obj = itrVal?.value;
                return { value: [obj?.key, obj?.val], done: itrVal.done };
            },
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    keys() {
        let valsItr = this.valArr.values();
        return {
            next() {
                let itrVal = valsItr.next();
                let obj = itrVal?.value;
                return { value: obj?.key, done: itrVal.done };
            },
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    values() {
        let valsItr = this.valArr.values();
        return {
            next() {
                let itrVal = valsItr.next();
                let obj = itrVal?.value;
                return { value: obj?.val, done: itrVal.done };
            },
            [Symbol.iterator]() {
                return this;
            }
        };
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