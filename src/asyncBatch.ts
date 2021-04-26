async function asyncBatch<T, R>(
	tasks: T[],
	handler: (task: T, index: number) => Promise<R>,
	desiredWorkers: number,
): Promise<R[]> {
	// Cap workers count to task list size, with a min of 1 worker
	const workersCount = Math.max(Math.floor(Math.min(desiredWorkers, tasks.length)), 0);

	const results: R[] = [];
	await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
		for (let i = workerIndex; i < tasks.length; i += workersCount) {
			results[i] = await handler(tasks[i], i);
		}
	}));
	return results;
}

export default asyncBatch;
