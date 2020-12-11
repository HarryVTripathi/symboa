const {
  hasHigherPrecedence,
  isFn,
  isLeftParan,
  isOperand,
  isOperator,
  isRightParan,
  precedenceTable: operators,
  top,
} = require('./shunting-yard');

const Node = function () {
  function Node(data) {
    this.data = data;
    this.right = null;
    this.left = null;
    /**
     * AtomicNode
     * type
     * isOperator
     * isFunction
     */
  }

  return Node;
} ();

function buildExpressionTree(expression) {
  const tokens = expression.split(' ');
  const _opStack = []; // push pop
  const _nodeStack = []; // push pop

  for(let token of tokens) {
    if (isOperand(token)) {
      _nodeStack.push(new Node(token));

    } else if (isFn(token) || isLeftParan(token)) {
      _opStack.push(token);
    } else if (isOperator(token)) {
      while (!isLeftParan(top(_opStack)) && hasHigherPrecedence(_opStack, token)) {
        const node = new Node(_opStack.pop());
        node.right = _nodeStack.pop() || null;
        node.left = _nodeStack.pop() || null;

        _nodeStack.push(node);
      }
      _opStack.push(token);
    } else if (isRightParan(token)) {
      while (top(_opStack) && !isLeftParan(top(_opStack))) {
        const node = new Node(_opStack.pop());
        node.right = _nodeStack.pop() || null;
        node.left = _nodeStack.pop() || null;

        _nodeStack.push(node);
      }

      if (isLeftParan(top(_opStack))) _opStack.pop();
      if (isFn(top(_opStack))) {
        const node = new Node(_opStack.pop());
        node.right = _nodeStack.pop() || null;
        node.left = _nodeStack.pop() || null;

        _nodeStack.push(node);
      }
    }
  }

  while(isOperator(top(_opStack)) || isFn(top(_opStack))) {
    const node = new Node(_opStack.pop());
    node.right = _nodeStack.pop() || null;
    node.left = _nodeStack.pop() || null;

    _nodeStack.push(node);
  }

  return _nodeStack;
}

const Expression = function() {
  function Expression(expression) {
    this.expression = expression;
    [this.tree] = buildExpressionTree(this.expression);
  }

  Expression.prototype._evaluate = function(node = this.tree) {
    if (node) {
      if (isOperand(node.data)) { 
        return parseFloat(node.data);
      } else {
        const left = this._evaluate(node.left);
        const right = this._evaluate(node.right);
        let response;

        if (isOperator(node.data)) {
          response = operators[node.data].operate(left, right);
        } else if (isFn(node.data)) {
          const args = [left, right].filter(data => data !== null && data !== undefined);
          response = Math[node.data](...args);
        }
        console.log('response: ', response);
        return response;
      }
    } else return;
  }

  return Expression;
} ();

const t = new Expression('sin ( max ( 2 , 3 ) ÷ 3 × 3.14 )');
// const t2 = new Expression('3 + 4 × 2 ÷ ( 1 − 5 ) ** 2 ** 3');

console.log(JSON.stringify(t, null, 2));
console.log(t._evaluate());

// const nodeStack = buildExpressionTree('sin ( max ( 2 , 3 ) ÷ 3 × 3.14 )');
// console.log(JSON.stringify(nodeStack[0], null, 2));
