const {
  hasHigherPrecedence,
  isFn,
  isLeftAssociative,
  isLeftParan,
  isNumber,
  isOperand,
  isOperator,
  isRightParan,
  isUnaryFn,
  isValid,
  isVariable,
  precedenceTable: operators,
  top,
} = require('./utils');

function pushExpressionNode(_opStack, _nodeStack) {
  if(isUnaryFn(top(_opStack))) {
    const node = new Node(_opStack.pop());
    node.right = _nodeStack.pop() || null;
    node.left = null;
    _nodeStack.push(node);
    return;
  }
  const node = new Node(_opStack.pop());
  node.right = _nodeStack.pop() || null;
  node.left = _nodeStack.pop() || null;
  _nodeStack.push(node);
}

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
        pushExpressionNode(_opStack, _nodeStack);
      }
      _opStack.push(token);
    } else if (isRightParan(token)) {
      while (top(_opStack) && !isLeftParan(top(_opStack))) {
        pushExpressionNode(_opStack, _nodeStack);
      }

      if (isLeftParan(top(_opStack))) _opStack.pop();
      if (isFn(top(_opStack))) {
        pushExpressionNode(_opStack, _nodeStack);
      }
    }
  }

  while(isOperator(top(_opStack)) || isFn(top(_opStack))) {
    pushExpressionNode(_opStack, _nodeStack);
  }

  return _nodeStack;
}

const Node = function () {
  function Node(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }

  return Node;
} ();

const Expression = function() {
  function Expression(expression) {
    this.expression = expression;
    this.varState = new Set();

    this.validateExpression();
    [this.tree] = buildExpressionTree(this.expression);
  }

  Expression.prototype.validateExpression = function() {
    for (let atom of this.expression.split(' ')) {
      if (!isValid(atom)) {
        throw new Error(`Not a valid Symboa token: ${atom} `);
      }
  
      if (isVariable(atom)) {
        console.log('isVariable', atom);
        this.varState.add(atom)
        console.log('added')
      }
    }
  }

  Expression.prototype.__evaluate__ = function(node = this.tree, values = {}) {
    if (node) {
      const data = node.data;
      if (isNumber(data)) { 
        return parseFloat(data);
      } else if (isVariable(data)) {
        if (this.varState.has(data)) {
          return values[data];
        } else {
          throw new Error(`No ${data} found in state variables`);
        }
      } else {
        const left = this.__evaluate__(node.left, values);
        const right = this.__evaluate__(node.right, values);
        let response;

        if (isOperator(data)) {
          response = operators[data].operate(left, right);
        } else if (isFn(data)) {
          const args = [left, right].filter(d => d !== null && d !== undefined);
          response = Math[data](...args);
        }
        return response;
      }
    } else return;
  }

  Expression.prototype.evaluate = function(values) {
    return this.__evaluate__(this.tree, values);
  }

  return Expression;
} ();

module.exports = Expression;

