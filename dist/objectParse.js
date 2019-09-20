"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectParse(obj, type) {
    let res = null;
    if (obj == null) {
    }
    else if (Array.isArray(obj)) {
        res = [];
        obj.forEach((val, i) => {
            res[i] = val;
        });
    }
    else if (typeof obj == 'object') {
        res = new type();
        let keys = Reflect.ownKeys(res);
        keys.forEach(key => {
            let val = obj[key];
            if (isPrimitive(res[key]) && isPrimitive(val) && (res[key] == null || typeof res[key] == typeof val)) {
                res[key] = val;
            }
            else {
                let propType = res[key].constructor;
                res[key] = objectParse(val, propType);
            }
        });
    }
    else {
        res = new type(obj);
    }
    return res;
}
function isPrimitive(test) {
    return (test !== Object(test));
}
exports.default = objectParse;
