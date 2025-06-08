const INITIAL_MODULOUS = 16;

class Node<K, V> {
	key: K;
	val: V;

	constructor(key: K, val: V) {
		this.key = key;
		this.val = val;
	}
}

class HashMap<K, V> extends Map<K, V> {
	private valArr: (Node<K, V> | null)[] = new Array<Node<K, V>>();
	private modulous: number = INITIAL_MODULOUS;
	private count: number = 0;

	private hashFunc(key: K): number {
		let res = 0;
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
				res = this.strHashCode(key.toString());
				break;
			}
			case 'object': {
				res = this.strHashCode(JSON.stringify(key));
				break;
			}
		}
		return res;
	}

	// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	private strHashCode(str: string) {
		let hash = 0;
		if (str.length == 0) return hash;
		for (let i = 0; i < str.length; i++) {
			let char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}

	private indexCode(hashNum: number): number {
		return hashNum % this.modulous;
	}

	private expand() {
		this.valArr.splice(0, 0, ...new Array<Node<K, V>>(this.modulous));

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

	private contract() {
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

	get size(): number {
		return this.count;
	}

	clear(): void {
		this.valArr = new Array();
		this.modulous = INITIAL_MODULOUS;
		this.count = 0;
	}

	delete(key: K): boolean {
		let idx = this.hashFunc(key);
		if (null == idx) return false;

		this.valArr[idx] = null;
		this.count--;

		this.contract();
		return true;
	}

	forEach(
		callbackfn: (value: V, key: K, map: Map<K, V>) => void,
		thisArg?: HashMap<K, V>
	): void {
		let that = thisArg ?? this;
		that.valArr.forEach((obj) => {
			if (obj != null) {
				callbackfn(obj.val, obj.key, that);
			}
		});
	}

	get(key: K): V | undefined {
		let hashNum = this.hashFunc(key);
		let idx = this.indexCode(hashNum);
		let obj = this.valArr[idx];

		return obj ? obj.val : undefined;
	}

	has(key: K): boolean {
		let hashNum = this.hashFunc(key);
		let idx = this.indexCode(hashNum);
		let obj = this.valArr[idx];

		return obj ? true : false;
	}

	set(key: K, value: V): this {
		let hashNum = this.hashFunc(key);
		let idx = this.indexCode(hashNum);

		let prevObj = this.valArr[idx];

		if (prevObj == null || hashNum == this.hashFunc(prevObj.key)) {
			this.valArr[idx] = new Node(key, value);
			// this.count++;
		} else {
			this.expand();
			this.set(key, value);
		}
		return this;
	}

	entries(): IterableIterator<[K, V]> {
		let valsItr = this.valArr.values();

		return {
			next() {
				let itrVal = valsItr.next();
				let obj = itrVal?.value;
				if (obj) {
					return { value: [obj.key, obj.val], done: itrVal.done };
				} else {
					return { value: null, done: true };
				}
			},

			[Symbol.iterator](): IterableIterator<[K, V]> {
				return this;
			},
		};
	}

	keys(): IterableIterator<K> {
		let valsItr = this.valArr.values();

		return {
			next(): IteratorResult<K> {
				let itrVal = valsItr.next();
				let obj = itrVal.value;
				if (obj) {
					return { value: obj.key, done: itrVal.done };
				} else {
					return { value: null, done: true };
				}
			},

			[Symbol.iterator](): IterableIterator<K> {
				return this;
			},
		};
	}

	values(): IterableIterator<V> {
		let valsItr = this.valArr.values();

		return {
			next() {
				let itrVal = valsItr.next();
				let obj = itrVal?.value;
				if (obj) {
					return { value: obj.val, done: itrVal.done };
				} else {
					return { value: null, done: true };
				}
			},

			[Symbol.iterator](): IterableIterator<V> {
				return this;
			},
		};
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	[Symbol.toStringTag]: string = 'HashMap';

	toJSON() {
		let arr: { key: K; val: V }[] = [];
		this.forEach((value, key) => {
			arr.push({ key, val: value });
		});
		return arr;
	}
}

export default HashMap;
