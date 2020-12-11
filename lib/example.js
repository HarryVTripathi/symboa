const { Tree } = require('./expression-tree-class');

const BST = new Tree();

const arr = [1,4,6,9,3,7,2];

for(let node of arr) {
  BST.root = Tree._insert(BST.root, node);
}

Tree._print(BST.root);


