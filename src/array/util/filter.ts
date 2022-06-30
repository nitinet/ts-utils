async function filter<T>(arr: T[], callback: (ele: T) => Promise<boolean>) {
	return (await Promise.all(arr.map(async item => (await callback(item)) ? item : null))).filter(i => i !== null);
}

export default filter;
