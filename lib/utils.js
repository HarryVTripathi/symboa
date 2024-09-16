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

function isUnaryFn(string) {
  return isFn(string) && !['hypot', 'imul', 'max', 'min', 'pow'].find(fn => fn === string);
}

function isComma(string) {
  return string === ',';
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
    || isComma(string)
  )
}

function top(array) {
  return array.length && array[array.length-1];
}

function isLeftAssociative(string) {
  return precedenceTable[string].associativity === 'left';
}

function hasHigherPrecedence(stack, operator) {
  const topPrecedence = top(stack) && precedenceTable[top(stack)] && precedenceTable[top(stack)].score;
  const opPresedence = precedenceTable[operator].score;
  const leftAssoc = isLeftAssociative(operator);

  return (topPrecedence > opPresedence) || (leftAssoc && (topPrecedence === opPresedence));
}

module.exports = {
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
  precedenceTable,
  top,
};