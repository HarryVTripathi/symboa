class Node {
  constructor(value, right = null, left = null) {
    this.value = value;
    this.right = right;
    this.left = left;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  static _insert(root, value) {
    let newNode = new Node(value);
    console.log(newNode);
    if (!root) {
      root = newNode;
    } else if (value < root.value) {
      root.left = this._insert(root.left, value);
      console.log('_insert.left ->');
    } else if (value > root.value) {
      root.right = this._insert(root.right, value);
      console.log('_insert.right ->');
    }
    return root;
  }

  static _print(root) {
    if (root) {
      this._print(root.left);
      console.log(root.value);
      this._print(root.right);
    }
  }
}

module.exports = {
  Node,
  Tree,
};
