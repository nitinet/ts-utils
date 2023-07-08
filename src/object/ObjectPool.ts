import IResetEntity from './IResetEntity.js';
import IEntityType from './IEntityType.js';

class ObjectPool<T extends IResetEntity>{
	private entityType: IEntityType<T>;
	poolSize: number = 0;
	private lowerLimitCount: number = 0;
	private idx: number = 0;

	pool = new Array<T | null>();

	constructor(entityType: IEntityType<T>, poolSize?: number) {
		this.entityType = entityType;
		this.setPoolSize(poolSize);
		this.fillPool();
	}

	getPoolSize() {
		return this.poolSize;
	}

	setPoolSize(poolSize?: number) {
		this.poolSize = poolSize ?? 64;
		this.lowerLimitCount = Math.round(this.poolSize / 8);
	}

	getPoolCount() {
		return this.poolSize - this.idx;
	}

	private fillPool() {
		let count = this.poolSize - this.pool.length;
		let temp = new Array<T>(count);
		for (let i = 0; i < count; i++) {
			temp[i] = new this.entityType();
		}
		this.pool.splice(0, 0, ...temp);
		this.setPoolSize(this.pool.length);
	}

	alloc() {
		let res = this.pool[this.idx];
		this.pool[this.idx] = null;
		this.idx++;

		if (this.idx >= this.poolSize) {
			this.poolSize = Math.round(this.poolSize * 2);
			this.fillPool();
		}
		return res;
	}

	free(obj: T) {
		obj.reset();
		this.idx--;
		this.pool[this.idx] = obj;

		if (this.idx <= this.lowerLimitCount) {
			if (this.idx <= 0) {
				this.poolSize = 64;
				this.fillPool();
				let halfSize = this.poolSize / 2;
				while (this.idx < halfSize) {
					this.pool[this.idx] = null;
					this.idx++;
				}
			} else {
				let temp = Math.round(this.poolSize / 2);
				this.pool.splice(temp);
				this.setPoolSize(this.pool.length);
			}
		}
	}

}

export default ObjectPool;
