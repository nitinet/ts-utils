class AdvArray<T> implements Array<T> {
	[n: number]: T;
	length: number;
	toString(): string {
		throw new Error("Method not implemented.");
	}
	toLocaleString(): string {
		throw new Error("Method not implemented.");
	}
	pop(): T {
		throw new Error("Method not implemented.");
	}
	push(...items: T[]): number {
		throw new Error("Method not implemented.");
	}
	concat(...items: ConcatArray<T>[]): T[];
	concat(...items: (T | ConcatArray<T>)[]): T[];
	concat(...items: any[]): T[] {
		throw new Error("Method not implemented.");
	}
	join(separator?: string): string {
		throw new Error("Method not implemented.");
	}
	reverse(): T[] {
		throw new Error("Method not implemented.");
	}
	shift(): T {
		throw new Error("Method not implemented.");
	}
	slice(start?: number, end?: number): T[] {
		throw new Error("Method not implemented.");
	}
	sort(compareFn?: (a: T, b: T) => number): this {
		throw new Error("Method not implemented.");
	}
	splice(start: number, deleteCount?: number): T[];
	splice(start: number, deleteCount: number, ...items: T[]): T[];
	splice(start: any, deleteCount?: any, ...rest: any[]): T[] {
		throw new Error("Method not implemented.");
	}
	unshift(...items: T[]): number {
		throw new Error("Method not implemented.");
	}
	indexOf(searchElement: T, fromIndex?: number): number {
		throw new Error("Method not implemented.");
	}
	lastIndexOf(searchElement: T, fromIndex?: number): number {
		throw new Error("Method not implemented.");
	}
	every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
	every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
	every(predicate: any, thisArg?: any): boolean {
		throw new Error("Method not implemented.");
	}
	some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
		throw new Error("Method not implemented.");
	}
	forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
		throw new Error("Method not implemented.");
	}
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
		throw new Error("Method not implemented.");
	}
	filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
	filter(predicate: any, thisArg?: any): T[] {
		throw new Error("Method not implemented.");
	}
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
	reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
	reduce(callbackfn: any, initialValue?: any): T {
		throw new Error("Method not implemented.");
	}
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
	reduceRight(callbackfn: any, initialValue?: any): T {
		throw new Error("Method not implemented.");
	}
	find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S;
	find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T;
	find(predicate: any, thisArg?: any): T {
		throw new Error("Method not implemented.");
	}
	findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
		throw new Error("Method not implemented.");
	}
	fill(value: T, start?: number, end?: number): this {
		throw new Error("Method not implemented.");
	}
	copyWithin(target: number, start: number, end?: number): this {
		throw new Error("Method not implemented.");
	}
	entries(): IterableIterator<[number, T]> {
		throw new Error("Method not implemented.");
	}
	keys(): IterableIterator<number> {
		throw new Error("Method not implemented.");
	}
	values(): IterableIterator<T> {
		throw new Error("Method not implemented.");
	}
	includes(searchElement: T, fromIndex?: number): boolean {
		throw new Error("Method not implemented.");
	}
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This): U[] {
		throw new Error("Method not implemented.");
	}
	flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[] {
		throw new Error("Method not implemented.");
	}
	at(index: number): T {
		throw new Error("Method not implemented.");
	}
	[Symbol.iterator](): IterableIterator<T> {
		throw new Error("Method not implemented.");
	}
	[Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
		throw new Error("Method not implemented.");
	}

}

export default AdvArray;
