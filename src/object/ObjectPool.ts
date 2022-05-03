import IResetEntity from "./IResetEntity.js";
import IEntityType from "./IEntityType.js";

class ObjectPool<T extends IResetEntity>{
	entityType: IEntityType<T>;
	poolSize: number;

	pool: T[] = new Array<T>();

	constructor(entityType: IEntityType<T>, poolSize?: number) {
		this.entityType = entityType;
		this.setPoolSize(poolSize);
		this.fillPool();
	}

	getPoolSize() {
		return this.poolSize;
	}

	setPoolSize(poolSize: number) {
		this.poolSize = poolSize ?? 100;
	}

	getPoolCount() {
		return this.pool.length;
	}

	private fillPool() {
		for (let i = 0; i < this.poolSize; i++) {
			this.pool.push(new this.entityType());
		}
	}

	alloc() {
		if (this.pool.length == 0) {
			this.poolSize = Math.round(this.poolSize * 1.25);
			this.fillPool();
		}
		let res = this.pool.pop();
		return res;
	}

	free(obj: T) {
		obj.reset();
		this.pool.push(obj);

		if (this.pool.length > this.poolSize) {
			this.poolSize = Math.round(this.poolSize * 0.80);
			this.pool.splice(this.poolSize * 0.80);
		}
	}

}

export default ObjectPool;
