import IEntityType from './IEntityType';
import ValidationError from './ValidationError.js';

function parseStrict<T>(src: any, res: T, prefix?: string): T {
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
								res[idx] = parseStrict(ele, getPrimitiveClone(res[0]), prefixKey)
							});
						} else {
							let subType: IEntityType<any> = res[0].constructor;
							src.forEach((ele, idx) => {
								let prefixKey = prefix ? `${prefix}[${idx}]` : `${idx}`;
								res[idx] = parseStrict(ele, new subType(), prefixKey)
							});
						}
					} else {
						(<any>res) = src;
					}
				} else {
					throw new ValidationError(`Invalid Type for key: ${prefix}`);
				}
			} else {
				Object.entries(res).forEach(([key, val]) => {
					let prefixKey = prefix ? `${prefix}.${key}` : key;
					res[key] = parseStrict(src[key], val, prefixKey);
				});
			}
		} else if (isPrimitive(res)) {
			res = src;
		} else {
			let type: IEntityType<any> = <any>res.constructor;
			res = new type(src);
		}
	} else {
		throw new ValidationError(`Invalid Type for key: ${prefix}`);
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
		} else {
			res = ((typeof src == typeof dest) && Array.isArray(src) == Array.isArray(dest));
		}
	}
	return res;
}

function toPrimitive(val) {
	if (typeof val == 'object') {
		if (val instanceof String) {
			val = String(val);
		} else if (val instanceof Number) {
			val = Number(val);
		} else if (val instanceof Boolean) {
			val = Boolean(val);
		}
	}
	return val;
}

function isPrimitive(val) {
	return (val !== Object(val));
}

function getPrimitiveClone(val) {
	if (typeof val == 'string') return '';
	else if (typeof val == 'number') return 0;
	else if (typeof val == 'boolean') return true;
	else return null;
}

export default parseStrict;
