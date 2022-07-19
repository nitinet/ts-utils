var _a;
class Node {
    constructor(key, value) {
        this.key = null;
        this.value = null;
        this.height = 0;
        this.left = null;
        this.right = null;
        this.key = key;
        this.value = value;
    }
}
class TreeMapIterator {
    constructor(root, valueFunc) {
        this.stack = [];
        this.stack.push(root);
        this.valueFunc = valueFunc;
    }
    next() {
        let value = null;
        let done = true;
        let node = this.stack.shift();
        if (node != null) {
            if (node.left)
                this.stack.push(node.left);
            if (node.right)
                this.stack.push(node.right);
            value = this.valueFunc(node);
            done = false;
        }
        return { value, done };
    }
    [Symbol.iterator]() {
        return this;
    }
}
class TreeMap {
    constructor(option) {
        this.root = null;
        this.count = 0;
        this.compare = null;
        this[_a] = 'TreeMap';
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
    get size() {
        return this.count;
    }
    height(node) {
        if (node == null)
            return 0;
        return node.height;
    }
    rightRotate(node) {
        let x = node.left;
        let T2 = x.right;
        x.right = node;
        node.left = T2;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x;
    }
    leftRotate(node) {
        let y = node.right;
        let T2 = y.left;
        y.left = node;
        node.right = T2;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y;
    }
    getBalance(node) {
        if (node == null)
            return 0;
        return this.height(node.left) - this.height(node.right);
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
        if (balance > 1 && this.compare(newNode.key, node.left.key) < 0)
            return this.rightRotate(node);
        if (balance < -1 && this.compare(newNode.key, node.right.key) > 0)
            return this.leftRotate(node);
        if (balance > 1 && this.compare(newNode.key, node.left.key) > 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && this.compare(newNode.key, node.right.key) < 0) {
            node.right = this.rightRotate(node.right);
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
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0)
            return this.leftRotate(node);
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotate(node.right);
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
        return node ? node.value : null;
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
    getFirstEntry() {
        let node = this.root;
        if (null != node) {
            while (node.left != null)
                node = node.left;
        }
        let key = node ? node.key : null;
        let value = node ? node.value : null;
        return [key, value];
    }
    getLastEntry() {
        let node = this.root;
        if (null != node) {
            while (node.right != null)
                node = node.right;
        }
        let key = node ? node.key : null;
        let value = node ? node.value : null;
        return [key, value];
    }
    getCeilingKey(key) {
        return this.getCeilingEntry(key)[0];
    }
    getCeilingEntry(key) {
        let node = this.root;
        while (true) {
            let comp = node ? this.compare(key, node.key) : 0;
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
        let resKey = node ? node.key : null;
        let value = node ? node.value : null;
        return [resKey, value];
    }
    getFloorKey(key) {
        return this.getFloorEntry(key)[0];
    }
    getFloorEntry(key) {
        let node = this.root;
        while (true) {
            let comp = node ? this.compare(key, node.key) : 0;
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
        let resKey = node ? node.key : null;
        let value = node ? node.value : null;
        return [resKey, value];
    }
    toJSON() {
        let arr = [];
        this.forEach((value, key) => {
            arr.push({ key, val: value });
        });
        return arr;
    }
}
_a = Symbol.toStringTag;
export default TreeMap;
//# sourceMappingURL=TreeMap.js.map