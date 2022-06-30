class List<T> extends Array<T> {

	/**
		 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
		 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
		 * @param workerCount Cap workers count to task list size, with a min of 1 worker
		 */
	async mapThrottled<U>(callbackfn: (value: T, index: number) => Promise<U>, workerCount?: number): Promise<U[]> {
		workerCount = workerCount || this.length;
		const workersCount = Math.max(Math.floor(Math.min(workerCount, this.length)), 0);

		let res: U[] = new List<U>();
		await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
			for (let i = workerIndex; i < this.length; i += workersCount) {
				res[i] = await callbackfn(this[i], i);
			}
		}));
		return res;
	}

	/**
		 * Returns the elements of an array that meet the condition specified in a callback function.
		 * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
		 */
	async filterAsync(predicate: (value: T, index: number, array: T[]) => Promise<boolean>) {
		let mapItems = await Promise.all(this.map(predicate));
		return new List(...this.filter((ele, idx) => mapItems[idx]));
	}

}

export default List;
