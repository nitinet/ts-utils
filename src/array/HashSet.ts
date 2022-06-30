class HashSet<T> implements Set<T> {

	size: number = 0;

	add(value: T): this {
		throw new Error("Method not implemented.");
	}
	clear(): void {
		throw new Error("Method not implemented.");
	}
	delete(value: T): boolean {
		throw new Error("Method not implemented.");
	}
	forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
		throw new Error("Method not implemented.");
	}
	has(value: T): boolean {
		throw new Error("Method not implemented.");
	}

	entries(): IterableIterator<[T, T]> {
		throw new Error("Method not implemented.");
	}
	keys(): IterableIterator<T> {
		throw new Error("Method not implemented.");
	}
	values(): IterableIterator<T> {
		throw new Error("Method not implemented.");
	}
	[Symbol.iterator](): IterableIterator<T> {
		throw new Error("Method not implemented.");
	}
	[Symbol.toStringTag]: string;

}

export default HashSet;
