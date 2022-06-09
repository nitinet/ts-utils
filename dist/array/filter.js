async function filter(arr, callback) {
    return (await Promise.all(arr.map(async (item) => (await callback(item)) ? item : null))).filter(i => i !== null);
}
export default filter;
//# sourceMappingURL=filter.js.map