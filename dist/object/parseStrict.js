function parseStrict(src, res, prefix) {
    if (res == null) {
        res = src;
        return res;
    }
    if (src == null) {
        return res;
    }
    src = toPrimitive(src);
    if (checkType(src, res)) {
        if (typeof src == 'object') {
            if (Array.isArray(src)) {
                if (Array.isArray(res)) {
                    if (res[0] != null) {
                        if (isPrimitive(res[0])) {
                            src.forEach((ele, idx) => {
                                let prefixKey = prefix ? `${prefix}[${idx}]` : `${idx}`;
                                res[idx] = parseStrict(ele, getPrimitiveClone(res[0]), prefixKey);
                            });
                        }
                        else {
                            let subType = res[0].constructor;
                            src.forEach((ele, idx) => {
                                let prefixKey = prefix ? `${prefix}[${idx}]` : `${idx}`;
                                res[idx] = parseStrict(ele, new subType(), prefixKey);
                            });
                        }
                    }
                    else {
                        res = src;
                    }
                }
                else {
                    throw new Error(`Invalid Type for key: ${prefix}`);
                }
            }
            else {
                Object.entries(res).forEach(([key, val]) => {
                    let prefixKey = prefix ? `${prefix}.${key}` : key;
                    Reflect.set(res, key, parseStrict(src[key], val, prefixKey));
                });
            }
        }
        else if (isPrimitive(res)) {
            res = src;
        }
        else {
            let type = res.constructor;
            res = new type(src);
        }
    }
    else {
        throw new Error(`Invalid Type for key: ${prefix}`);
    }
    return res;
}
function checkType(src, dest) {
    let res = true;
    if (dest != null) {
        if (typeof dest == 'object' &&
            ((typeof src == 'string' && !(dest instanceof String))
                || (typeof src == 'number' && !(dest instanceof Number))
                || (typeof src == 'boolean' && !(dest instanceof Boolean)))) {
            res = false;
        }
        else {
            res = ((typeof src == typeof dest) && Array.isArray(src) == Array.isArray(dest));
        }
    }
    return res;
}
function toPrimitive(val) {
    if (typeof val == 'object') {
        if (val instanceof String) {
            val = String(val);
        }
        else if (val instanceof Number) {
            val = Number(val);
        }
        else if (val instanceof Boolean) {
            val = Boolean(val);
        }
    }
    return val;
}
function isPrimitive(val) {
    return (val !== Object(val));
}
function getPrimitiveClone(val) {
    if (typeof val == 'string')
        return '';
    else if (typeof val == 'number')
        return 0;
    else if (typeof val == 'boolean')
        return true;
    else
        return null;
}
export default parseStrict;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VTdHJpY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2JqZWN0L3BhcnNlU3RyaWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsV0FBVyxDQUFJLEdBQVEsRUFBRSxHQUFNLEVBQUUsTUFBZTtJQUN4RCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDakIsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBRUQsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN6QixJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN4QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ3BCLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ3hCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0NBQ2hELEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFTLEdBQUksQ0FB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