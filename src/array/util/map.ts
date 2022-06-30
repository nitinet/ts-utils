async function map<T, R>(arr: T[], handler: (ele: T, index: number) => Promise<R>, count?: number): Promise<R[]> {
	// Cap workers count to task list size, with a min of 1 worker
	count = count || arr.length;
	const workersCount = Math.max(Math.floor(Math.min(count, arr.length)), 0);

	let results: R[] = [];
	await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
		for (let i = workerIndex; i < arr.length; i += workersCount) {
			results[i] = await handler(arr[i], i);
		}
	}));
	return results;
}

export default map;
