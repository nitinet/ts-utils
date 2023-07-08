function toPaths(obj, target, prefix) {
    target = target || [];
    prefix = prefix || '';
    target = getPaths(obj, target, prefix);
    return target;
}
function getPaths(obj, target, prefix) {
    if (obj && typeof obj === 'object') {
        if (Array.isArray(obj)) {
            obj.forEach((val, idx) => {
                target = getPaths(val, target, `${prefix}[${idx}]`);
            });
        }
        else {
            Object.entries(obj).forEach(([objKey, value]) => {
                let key = prefix ? `${prefix}.${objKey}` : objKey;
                target = getPaths(value, target, key);
            });
        }
    }
    else {
        target.push({ key: prefix, value: obj });
    }
    return target;
}
export default toPaths;
//# sourceMappingURL=toPaths.js.map