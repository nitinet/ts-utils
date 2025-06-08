class Node<K, V> {
	key: K;
	value: V;
	height: number = 0;

	left: Node<K, V> | null = null;
	right: Node<K, V> | null = null;

	constructor(key: K, value: V) {
		this.key = key;
		this.value = value;
	}
}

// Options Interface
interface IOption<K> {
	compare?: (key1: K, key2: K) => number;
}

class TreeMapIterator<R, K, V> implements MapIterator<R> {
	stack: Node<K, V>[] = [];

	valueFunc: (obj: Node<K, V>) => R;

	constructor(root: Node<K, V> | null, valueFunc: (obj: Node<K, V>) => R) {
		if (root) this.stack.push(root);
		this.valueFunc = valueFunc;
	}

	next() {
		let node = this.stack.shift();
		if (node != null) {
			if (node.left) this.stack.push(node.left);
			if (node.right) this.stack.push(node.right);

			let value = this.valueFunc(node);
			return { value };
		} else {
			let done = true as const;
			return { done, value: undefined };
		}
	}

	[Symbol.iterator](): MapIterator<R> {
		return this;
	}
	[Symbol.toStringTag]: string = 'TreeMapIterator';

	map<U>(callbackfn: (value: R, index: number) => U): TreeMapIterator<U, K, V> {
		let index = 0;
		let valueFunc = this.valueFunc;
		let mapFunc = (node: Node<K, V>) => {
			return callbackfn(valueFunc(node), index++);
		};
		return new TreeMapIterator<U, K, V>(this.stack[0], mapFunc);
	}

	filter(predicate: unknown): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	take(limit: number): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	drop(count: number): IteratorObject<R, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	flatMap<U>(
		callback: (
			value: R,
			index: number
		) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>
	): IteratorObject<U, undefined, unknown> {
		throw new Error('Method not implemented.');
	}
	reduce(callbackfn: unknown, initialValue?: unknown): R {
		throw new Error('Method not implemented.');
	}
	toArray(): R[] {
		throw new Error('Method not implemented.');
	}
	forEach(callbackfn: (value: R, index: number) => void): void {
		throw new Error('Method not implemented.');
	}
	some(predicate: (value: R, index: number) => unknown): boolean {
		throw new Error('Method not implemented.');
	}
	every(predicate: (value: R, index: number) => unknown): boolean {
		throw new Error('Method not implemented.');
	}
	find(predicate: unknown): R | undefined {
		throw new Error('Method not implemented.');
	}

	return?(value?: undefined): IteratorResult<R, undefined> {
		throw new Error('Method not implemented.');
	}
	throw?(e?: any): IteratorResult<R, undefined> {
		throw new Error('Method not implemented.');
	}
	[Symbol.dispose](): void {
		throw new Error('Method not implemented.');
	}
}

class TreeMap<K, V> implements Map<K, V> {
	private root: Node<K, V> | null = null;
	private count: number = 0;

	private compare: (key1: K, key2: K) => number;

	get size(): number {
		return this.count;
	}

	constructor(option?: IOption<K>) {
		option = option || {};
		this.compare =
			option.compare ??
			function (key1: K, key2: K) {
				let res = 0;
				if (key1 < key2) res = -1;
				else if (key1 > key2) res = 1;
				return res;
			};
	}

	// A utility function to get the height of the tree
	private height(node: Node<K, V> | null) {
		let height = node != null ? node.height : 0;
		return height;
	}

	// A utility function to right rotate subtree rooted with y
	private rightRotate(node: Node<K, V>) {
		let x = node.left;
		if (!x) return node;

		let T2 = x.right;

		// Perform rotation
		x.right = node;
		node.left = T2;

		// Update heights
		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
		x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

		// Return new root
		return x;
	}

	// A utility function to left rotate subtree rooted with x
	private leftRotate(node: Node<K, V>) {
		let y = node.right;
		if (!y) return node;

		let T2 = y.left;

		// Perform rotation
		y.left = node;
		node.right = T2;

		//  Update heights
		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
		y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

		// Return new root
		return y;
	}

	// Get Balance factor of node N
	private getBalance(node: Node<K, V> | null) {
		let bal =
			node != null ? this.height(node.left) - this.height(node.right) : 0;
		return bal;
	}

	private insert(node: Node<K, V> | null, newNode: Node<K, V>) {
		/* 1.  Perform the normal BST insertion */
		if (node == null) {
			this.count++;
			return newNode;
		}

		let comp = this.compare(newNode.key, node.key);
		if (comp < 0) node.left = this.insert(node.left, newNode);
		else if (comp > 0) node.right = this.insert(node.right, newNode);
		// Duplicate keys not allowed
		else return node;

		/* 2. Update height of this ancestor node */
		node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

		/* 3. Get the balance factor of this ancestor node to check whether this node became unbalanced */
		let balance = this.getBalance(node);

		// If this node becomes unbalanced, then there are 4 cases
		// Left Left Case
		if (
			balance > 1 &&
			node.left &&
			this.compare(newNode.key, node.left.key) < 0
		)
			return this.rightRotate(node);

		// Right Right Case
		if (
			balance < -1 &&
			node.right &&
			this.compare(newNode.key, node.right.key) > 0
		)
			return this.leftRotate(node);

		// Left Right Case
		if (
			balance > 1 &&
			node.left &&
			this.compare(newNode.key, node.left.key) > 0
		) {
			node.left = node.left ? this.leftRotate(node.left) : null;
			return this.rightRotate(node);
		}

		// Right Left Case
		if (
			balance < -1 &&
			node.right &&
			this.compare(newNode.key, node.right.key) < 0
		) {
			node.right = node.right ? this.rightRotate(node.right) : null;
			return this.leftRotate(node);
		}

		/* return the (unchanged) node pointer */
		return node;
	}

	// Given a non-empty binary search tree, return the node with minimum key value found in that tree.
	// Note that the entire tree does not need to be searched.
	private minValueNode(node: Node<K, V>) {
		let current = node;

		/* loop down to find the leftmost leaf */
		while (current.left != null) current = current.left;

		return current;
	}

	private deleteNode(node: Node<K, V> | null, key: K) {
		// STEP 1: PERFORM STANDARD BST DELETE
		if (node == null) return node;

		// If the key to be deleted is smaller than the root's key, then it lies in left subtree
		if (key < node.key) node.left = this.deleteNode(node.left, key);
		// If the key to be deleted is greater than the root's key, then it lies in right subtree
		else if (key > node.key) node.right = this.deleteNode(node.right, key);
		// if key is same as root's key, then this is the node to be deleted
		else {
			// node with only one child or no child
			if (node.left == null || node.right == null) {
				let temp: Node<K, V> | null = null;
				if (null == node.left) {
					temp = node.right;
				} else {
					temp = node.left;
				}

				node = temp;
				this.count--;
			} else {
				// node with two children: Get the inorder successor (smallest in the right subtree)
				let temp: Node<K, V> = this.minValueNode(node.right);

				// Copy the inorder successor's data to this node
				node.key = temp.key;
				node.value = temp.value;

				// Delete the inorder successor
				node.right = this.deleteNode(node.right, temp.key);
			}
		}

		// If the tree had only one node then return
		if (node == null) return node;

		// STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

		// STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether
		// this node became unbalanced)
		let balance = this.getBalance(node);

		// If this node becomes unbalanced, then there are 4 cases
		// Left Left Case
		if (balance > 1 && this.getBalance(node.left) >= 0)
			return this.rightRotate(node);

		// Left Right Case
		if (balance > 1 && this.getBalance(node.left) < 0) {
			node.left = node.left ? this.leftRotate(node.left) : null;
			return this.rightRotate(node);
		}

		// Right Right Case
		if (balance < -1 && this.getBalance(node.right) <= 0)
			return this.leftRotate(node);

		// Right Left Case
		if (balance < -1 && this.getBalance(node.right) > 0) {
			node.right = node.right ? this.rightRotate(node.right) : null;
			return this.leftRotate(node);
		}

		return node;
	}

	clear(): void {
		this.root = null;
	}

	private runForEach(
		node: Node<K, V> | null,
		callbackfunc: (value: V, key: K, map: Map<K, V>) => void
	) {
		if (node != null) {
			this.runForEach(node.left, callbackfunc);
			callbackfunc(node.value, node.key, this);
			this.runForEach(node.right, callbackfunc);
		}
	}

	forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void) {
		this.runForEach(this.root, callbackfn);
	}

	get(key: K): V | undefined {
		let node = this.root;
		while (true) {
			if (node == null) break;
			else {
				let comp = this.compare(key, node.key);
				if (comp < 0) node = node.left;
				else if (comp > 0) node = node.right;
				else break;
			}
		}
		return node ? node.value : undefined;
	}

	has(key: K): boolean {
		return this.get(key) != null;
	}

	set(key: K, value: V): this {
		let node = new Node(key, value);
		this.root = this.insert(this.root, node);
		return this;
	}

	delete(key: K): boolean {
		let node = this.deleteNode(this.root, key);
		return node != null;
	}

	entries(): MapIterator<[K, V]> {
		let iterator = new TreeMapIterator<[K, V], K, V>(this.root, (node) => {
			return [node.key, node.value];
		});
		return iterator;
	}

	keys(): MapIterator<K> {
		let iterator = new TreeMapIterator<K, K, V>(this.root, (node) => {
			return node.key;
		});
		return iterator;
	}

	values(): MapIterator<V> {
		let iterator = new TreeMapIterator<V, K, V>(this.root, (node) => {
			return node.value;
		});
		return iterator;
	}

	[Symbol.iterator](): MapIterator<[K, V]> {
		return this.entries();
	}

	[Symbol.toStringTag]: string = 'TreeMap';

	getFirstEntry(): [K, V] | null {
		let node = this.root;
		if (node) {
			while (node.left != null) node = node.left;
		}
		if (node) return [node.key, node.value];
		else return null;
	}

	getLastEntry(): [K, V] | null {
		let node = this.root;
		if (null != node) {
			while (node.right != null) node = node.right;
		}
		if (node) return [node.key, node.value];
		else return null;
	}

	getCeilingKey(key: K) {
		let entry = this.getCeilingEntry(key);
		if (entry) return entry[0];
		else return null;
	}

	getCeilingEntry(key: K): [K, V] | null {
		let node = this.root;
		if (!node) return null;

		while (true) {
			if (node) {
				let comp = this.compare(key, node.key);
				if (comp < 0) {
					let leftComp = node.left ? this.compare(key, node.left.key) : 1;
					if (leftComp > 0) break;
					else node = node.left;
				} else if (comp > 0) {
					node = node.right;
				} else break;
			} else break;
		}
		if (node) return [node.key, node.value];
		else return null;
	}

	getFloorKey(key: K) {
		let entry = this.getFloorEntry(key);
		if (entry) return entry[0];
		else return null;
	}

	getFloorEntry(key: K): [K, V] | null {
		let node = this.root;
		if (!node) return null;

		while (true) {
			if (node) {
				let comp = this.compare(key, node.key);
				if (comp < 0) {
					node = node.left;
				} else if (comp > 0) {
					let rightComp = node.right ? this.compare(key, node.right.key) : -1;
					if (rightComp < 0) break;
					else node = node.right;
				} else break;
			} else break;
		}
		if (node) return [node.key, node.value];
		else return null;
	}

	toJSON() {
		let arr: { key: K; val: V }[] = [];
		this.forEach((value, key) => {
			arr.push({ key, val: value });
		});
		return arr;
	}
}

export default TreeMap;
