function toPaths(obj: any, target?: { key: string, value: any }[], prefix?: string) {
	target = target || [];
	prefix = prefix || '';

	Object.entries(obj).forEach(([objKey, value]) => {
		let key = prefix ? `${prefix}.${objKey}` : objKey;
		if (value && typeof value === 'object') {
			if (Array.isArray(value)) {
				value.forEach((val, idx) => {
					target = toPaths(val, target, `${key}[${idx}]`);
				});
			} else {
				target = toPaths(value, target, key);
			}
		} else {
			return target.push({ key, value });
		}
	});

	return target;
}

export default toPaths;
