class List extends Array {
    async mapThrottled(callbackfn, workerCount) {
        workerCount = workerCount || this.length;
        const workersCount = Math.max(Math.floor(Math.min(workerCount, this.length)), 0);
        let res = new List();
        await Promise.all(Array.from({ length: workersCount }).map(async (w, workerIndex) => {
            for (let i = workerIndex; i < this.length; i += workersCount) {
                res[i] = await callbackfn(this[i], i);
            }
        }));
        return res;
    }
    async filterAsync(predicate) {
        let mapItems = await Promise.all(this.map(predicate));
        return new List(...this.filter((ele, idx) => mapItems[idx]));
    }
}
export default List;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcnJheS9MaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sSUFBUSxTQUFRLEtBQVE7SUFPN0IsS0FBSyxDQUFDLFlBQVksQ0FBSSxVQUFtRCxFQUFFLFdBQW9CO1FBQzlGLFdBQVcsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFakYsSUFBSSxHQUFHLEdBQVEsSUFBSSxJQUFJLEVBQUssQ0FBQztRQUM3QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ25GLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDOUQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQU1ELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBb0U7UUFDckYsSUFBSSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUVEO0FBRUQsZUFBZSxJQUFJLENBQUMifQ==