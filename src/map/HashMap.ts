class HashMap<K, V> implements Map<K, V>{

	size: number = 0;

	clear(): void {
		throw new Error("Method not implemented.");
	}

	delete(key: K): boolean {
		throw new Error("Method not implemented.");
	}

	forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
		throw new Error("Method not implemented.");
	}

	get(key: K): V {
		throw new Error("Method not implemented.");
	}

	has(key: K): boolean {
		throw new Error("Method not implemented.");
	}
	
	set(key: K, value: V): this {
		throw new Error("Method not implemented.");
	}

	entries(): IterableIterator<[K, V]> {
		throw new Error("Method not implemented.");
	}

	keys(): IterableIterator<K> {
		throw new Error("Method not implemented.");
	}

	values(): IterableIterator<V> {
		throw new Error("Method not implemented.");
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	[Symbol.toStringTag]: string = 'HashMap';

	toJSON() {
		let arr = [];
		this.forEach((value, key) => {
			arr.push({ key, val: value });
		});
		return arr;
	}

}

export default HashMap;
