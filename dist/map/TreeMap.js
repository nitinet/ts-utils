class Node {
    key;
    value;
    height = 0;
    left = null;
    right = null;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class TreeMapIterator {
    stack = [];
    valueFunc;
    constructor(root, valueFunc) {
        if (root)
            this.stack.push(root);
        this.valueFunc = valueFunc;
    }
    next() {
        let node = this.stack.shift();
        if (node != null) {
            if (node.left)
                this.stack.push(node.left);
            if (node.right)
                this.stack.push(node.right);
            let value = this.valueFunc(node);
            return { value };
        }
        else {
            let done = true;
            return { done, value: null };
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
class TreeMap {
    root = null;
    count = 0;
    compare;
    get size() {
        return this.count;
    }
    constructor(option) {
        option = option || {};
        this.compare = option.compare ?? function (key1, key2) {
            let res = 0;
            if (key1 < key2)
                res = -1;
            else if (key1 > key2)
                res = 1;
            return res;
        };
    }
    height(node) {
        let height = (node != null) ? node.height : 0;
        return height;
    }
    rightRotate(node) {
        let x = node.left;
        if (!x)
            return node;
        let T2 = x.right;
        x.right = node;
        node.left = T2;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x;
    }
    leftRotate(node) {
        let y = node.right;
        if (!y)
            return node;
        let T2 = y.left;
        y.left = node;
        node.right = T2;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y;
    }
    getBalance(node) {
        let bal = (node != null) ? this.height(node.left) - this.height(node.right) : 0;
        return bal;
    }
    insert(node, newNode) {
        if (node == null) {
            this.count++;
            return newNode;
        }
        let comp = this.compare(newNode.key, node.key);
        if (comp < 0)
            node.left = this.insert(node.left, newNode);
        else if (comp > 0)
            node.right = this.insert(node.right, newNode);
        else
            return node;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balance = this.getBalance(node);
        if (balance > 1 && node.left && this.compare(newNode.key, node.left.key) < 0)
            return this.rightRotate(node);
        if (balance < -1 && node.right && this.compare(newNode.key, node.right.key) > 0)
            return this.leftRotate(node);
        if (balance > 1 && node.left && this.compare(newNode.key, node.left.key) > 0) {
            node.left = node.left ? this.leftRotate(node.left) : null;
            return this.rightRotate(node);
        }
        if (balance < -1 && node.right && this.compare(newNode.key, node.right.key) < 0) {
            node.right = node.right ? this.rightRotate(node.right) : null;
            return this.leftRotate(node);
        }
        return node;
    }
    minValueNode(node) {
        let current = node;
        while (current.left != null)
            current = current.left;
        return current;
    }
    deleteNode(node, key) {
        if (node == null)
            return node;
        if (key < node.key)
            node.left = this.deleteNode(node.left, key);
        else if (key > node.key)
            node.right = this.deleteNode(node.right, key);
        else {
            if ((node.left == null) || (node.right == null)) {
                let temp = null;
                if (null == node.left) {
                    temp = node.right;
                }
                else {
                    temp = node.left;
                }
                node = temp;
                this.count--;
            }
            else {
                let temp = this.minValueNode(node.right);
                node.key = temp.key;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.key);
            }
        }
        if (node == null)
            return node;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        let balance = this.getBalance(node);
        if (balance > 1 && this.getBalance(node.left) >= 0)
            return this.rightRotate(node);
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = node.left ? this.leftRotate(node.left) : null;
            return this.rightRotate(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0)
            return this.leftRotate(node);
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = node.right ? this.rightRotate(node.right) : null;
            return this.leftRotate(node);
        }
        return node;
    }
    clear() {
        this.root = null;
    }
    runForEach(node, callbackfunc) {
        if (node != null) {
            this.runForEach(node.left, callbackfunc);
            callbackfunc(node.value, node.key, this);
            this.runForEach(node.right, callbackfunc);
        }
    }
    forEach(callbackfn) {
        this.runForEach(this.root, callbackfn);
    }
    get(key) {
        let node = this.root;
        while (true) {
            if (node == null)
                break;
            else {
                let comp = this.compare(key, node.key);
                if (comp < 0)
                    node = node.left;
                else if (comp > 0)
                    node = node.right;
                else
                    break;
            }
        }
        return node ? node.value : undefined;
    }
    has(key) {
        return this.get(key) != null;
    }
    set(key, value) {
        let node = new Node(key, value);
        this.root = this.insert(this.root, node);
        return this;
    }
    delete(key) {
        let node = this.deleteNode(this.root, key);
        return node != null;
    }
    entries() {
        let iterator = new TreeMapIterator(this.root, (node) => {
            return [node.key, node.value];
        });
        return iterator;
    }
    keys() {
        let iterator = new TreeMapIterator(this.root, (node) => {
            return node.key;
        });
        return iterator;
    }
    values() {
        let iterator = new TreeMapIterator(this.root, (node) => {
            return node.value;
        });
        return iterator;
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    [Symbol.toStringTag] = 'TreeMap';
    getFirstEntry() {
        let node = this.root;
        if (node) {
            while (node.left != null)
                node = node.left;
        }
        if (node)
            return [node.key, node.value];
        else
            return null;
    }
    getLastEntry() {
        let node = this.root;
        if (null != node) {
            while (node.right != null)
                node = node.right;
        }
        if (node)
            return [node.key, node.value];
        else
            return null;
    }
    getCeilingKey(key) {
        let entry = this.getCeilingEntry(key);
        if (entry)
            return entry[0];
        else
            return null;
    }
    getCeilingEntry(key) {
        let node = this.root;
        if (!node)
            return null;
        while (true) {
            if (node) {
                let comp = this.compare(key, node.key);
                if (comp < 0) {
                    let leftComp = node.left ? this.compare(key, node.left.key) : 1;
                    if (leftComp > 0)
                        break;
                    else
                        node = node.left;
                }
                else if (comp > 0) {
                    node = node.right;
                }
                else
                    break;
            }
            else
                break;
        }
        if (node)
            return [node.key, node.value];
        else
            return null;
    }
    getFloorKey(key) {
        let entry = this.getFloorEntry(key);
        if (entry)
            return entry[0];
        else
            return null;
    }
    getFloorEntry(key) {
        let node = this.root;
        if (!node)
            return null;
        while (true) {
            if (node) {
                let comp = this.compare(key, node.key);
                if (comp < 0) {
                    node = node.left;
                }
                else if (comp > 0) {
                    let rightComp = node.right ? this.compare(key, node.right.key) : -1;
                    if (rightComp < 0)
                        break;
                    else
                        node = node.right;
                }
                else
                    break;
            }
            else
                break;
        }
        if (node)
            return [node.key, node.value];
        else
            return null;
    }
    toJSON() {
        let arr = [];
        this.forEach((value, key) => {
            arr.push({ key, val: value });
        });
        return arr;
    }
}
export default TreeMap;
//# sourceMappingURL=TreeMap.js.map