const INITIAL_MODULOUS = 16;

class Node<K, V> {
	key: K;
	val: V;

	constructor(key: K, val: V) {
		this.key = key;
		this.val = val;
	}
}

class HashMapIterator<R, K, V> implements MapIterator<R> {
	valsItr: ArrayIterator<Node<K, V> | null>;

	valueFunc: (obj: Node<K, V>) => R;

	constructor(
		valsItr: ArrayIterator<Node<K, V> | null>,
		valueFunc: (obj: Node<K, V>) => R
	) {
		this.valsItr = valsItr;
		this.valueFunc = valueFunc;
	}

	next() {
		let itrVal = this.valsItr.next();
		let obj = itrVal?.value;
		if (obj) {
			let value = this.valueFunc(obj);
			return { value };
		} else {
			let done = true as const;
			return { done, value: undefined };
		}
	}

	[Symbol.iterator](): MapIterator<R> {
		return this;
	}
	[Symbol.toStringTag]: string = 'HashMapIterator';

	map<U>(callbackfn: (value: R, index: number) => U): HashMapIterator<U, K, V> {
		let index = 0;
		let valueFunc = this.valueFunc;
		let mapFunc = (node: Node<K, V>) => {
			return callbackfn(valueFunc(node), index++);
		};
		return new HashMapIterator<U, K, V>(this.valsItr, mapFunc);
	}

	filter(predicate: unknown): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	take(limit: number): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	drop(count: number): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	flatMap<U>(
		callback: (
			value: R,
			index: number
		) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>
	): IteratorObject<U, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	reduce(callbackfn: unknown, initialValue?: unknown): R {
		throw new Error('Method not implemented.');
	}
	toArray(): R[] {
		throw new Error('Method not implemented.');
	}
	forEach(callbackfn: (value: R, index: number) => void): void {
		throw new Error('Method not implemented.');
	}
	some(predicate: (value: R, index: number) => unknown): boolean {
		throw new Error('Method not implemented.');
	}
	every(predicate: (value: R, index: number) => unknown): boolean {
		throw new Error('Method not implemented.');
	}
	find(predicate: unknown): R | undefined {
		throw new Error('Method not implemented.');
	}

	return?(value?: undefined): IteratorResult<R, undefined> {
		throw new Error('Method not implemented.');
	}
	throw?(e?: any): IteratorResult<R, undefined> {
		throw new Error('Method not implemented.');
	}
	[Symbol.dispose](): void {
		throw new Error('Method not implemented.');
	}
}

class HashMap<K, V> implements Map<K, V> {
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

	entries(): MapIterator<[K, V]> {
		let iterator = new HashMapIterator<[K, V], K, V>(
			this.valArr.values(),
			(node) => {
				return [node.key, node.val];
			}
		);
		return iterator;
	}

	keys(): MapIterator<K> {
		let iterator = new HashMapIterator<K, K, V>(
			this.valArr.values(),
			(node) => {
				return node.key;
			}
		);
		return iterator;
	}

	values(): MapIterator<V> {
		let iterator = new HashMapIterator<V, K, V>(
			this.valArr.values(),
			(node) => {
				return node.val;
			}
		);
		return iterator;
	}

	[Symbol.iterator](): MapIterator<[K, V]> {
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
