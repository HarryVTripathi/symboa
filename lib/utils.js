const precedenceTable = {
  '+': {
    score: 14,
    associativity: 'left',
    operate: (x, y) => x + y,
  },
  '-': {
    score: 14,
    associativity: 'left',
    operate: (x, y) => x - y,
  },
  '−': {
    score: 14,
    associativity: 'left',
    operate: (x, y) => x - y,
  },
  '*': {
    score: 15,
    associativity: 'left',
    operate: (x, y) => x * y,
  },
  '×': {
    score: 15,
    associativity: 'left',
    operate: (x, y) => x * y,
  },
  '÷': {
    score: 15,
    associativity: 'left',
    operate: (x, y) => x / y,
  },
  '/': {
    score: 15,
    associativity: 'left',
    operate: (x, y) => x / y,
  },
  '%': {
    score: 15,
    associativity: 'left',
    operate: (x, y) => x & y,
  },
  '**': {
    score: 16,
    associativity: 'right',
    operate: (x, y) => x ** y,
  }
};

function isFn(string) {
  return Object.getOwnPropertyNames(Math).includes(string);
}

function isNumber(string) {
  return !isNaN(string);
}

function isVariable(string) {
  return string && !isFn(string) && RegExp('(^[a-zA-Z_$])([0-9a-zA-Z_$]*)').test(string);
}

function isOperand(string) {
  return isVariable(string) || isNumber(string);
}

function isOperator(string) {
  return Object.keys(precedenceTable).includes(string);
}

function isLeftParan(string) {
  return (string === '(');
}

function isRightParan(string) {
  return (string === ')');
}

function isValid(string) {
  return (isFn(string)
    || isNumber(string)
    || isVariable(string)
    || isOperand(string)
    || isOperator(string)
    || isLeftParan(string)
    || isRightParan(string)
  )
}

function top(array) {
  return array.length && array[array.length-1];
}

function isLeftAssociative(string) {
  return precedenceTable[string].associativity === 'left';
}

function hasHigherPrecedence(stack, operator) {
  const topPrecedence = top(stack) && precedenceTable[top(stack)].score;
  const opPresedence = precedenceTable[operator].score;
  const leftAssoc = isLeftAssociative(operator);

  return (topPrecedence > opPresedence) || (leftAssoc && (topPrecedence === opPresedence));
}

function shuntingYardReversePolish(expression) {
  const tokens = expression.split(' ');
  const _outQueue = []; // push shift
  const _opStack = []; // push pop

  for(let token of tokens) {
    if (isOperand(token)) {
      _outQueue.push(token);
    } else if (isFn(token) || isLeftParan(token)) {
      _opStack.push(token);
    } else if (isOperator(token)) {
      while (!isLeftParan(top(_opStack)) && hasHigherPrecedence(_opStack, token)) {
        _outQueue.push(_opStack.pop());
      }
      _opStack.push(token);
    } else if (isRightParan(token)) {
      while (!isLeftParan(top(_opStack))) {
        _outQueue.push(_opStack.pop());
        if (!top(_opStack)) break;
      }

      if (isLeftParan(top(_opStack))) _opStack.pop();
      if (isFn(top(_opStack))) _outQueue.push(_opStack.pop());
    }
  }

  while(isOperator(top(_opStack)) || isFn(top(_opStack))) {
    _outQueue.push(_opStack.pop());
  }

  return _outQueue;
}

// console.log(shuntingYardReversePolish('sin ( max ( 2 , 3 ) ÷ 3 × 3.14 )'));
// console.log(shuntingYardReversePolish('sin ( max ( 2 , 3 ) ÷ xyz × 3.14 )'));
// console.log(shuntingYardReversePolish('3 + 4 × 2 ÷ ( 1 − 5 ) ** 2 ** 3'))

module.exports = {
  hasHigherPrecedence,
  isFn,
  isLeftAssociative,
  isLeftParan,
  isNumber,
  isOperand,
  isOperator,
  isRightParan,
  isValid,
  isVariable,
  precedenceTable,
  top,
};