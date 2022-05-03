class ObjectPool {
    constructor(entityType, poolSize) {
        this.pool = new Array();
        this.entityType = entityType;
        this.setPoolSize(poolSize);
        this.fillPool();
    }
    getPoolSize() {
        return this.poolSize;
    }
    setPoolSize(poolSize) {
        this.poolSize = poolSize ?? 100;
    }
    getPoolCount() {
        return this.pool.length;
    }
    fillPool() {
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
    free(obj) {
        obj.reset();
        this.pool.push(obj);
        if (this.pool.length > this.poolSize) {
            this.poolSize = Math.round(this.poolSize * 0.80);
            this.pool.splice(this.poolSize * 0.80);
        }
    }
}
export default ObjectPool;
//# sourceMappingURL=ObjectPool.js.map