
const AtomicNode = function () {
  function AtomicNode(data) {
    this.data = data;
    this.right = null;
    this.left = null;
    this.isFn = false;
    this.isOperator = false;
    this.isOperand = false;
    this.isNumber = false;
    this.isVariable = false;
  }

  return AtomicNode;
} ();

const FuncNode = function(_AtomicNode) {
  function FuncNode(data) {
    const _this = _AtomicNode.apply(this, [data]);
    _this.isFn = true;
    return _this;
  }

  return FuncNode;
} (AtomicNode);

const ConstNode = function(_AtomicNode) {
  function ConstNode(data) {
    const _this = _AtomicNode.apply(this, [data]);
    _this.isNumber = true;
    _this.isOperand = true;
    return _this;
  }

  return ConstNode;
} (AtomicNode);

const VarNode = function(_AtomicNode) {
  function VarNode(data) {
    const _this = _AtomicNode.apply(this, [data]);
    _this.isVariable = true;
    _this.isOperand = true;
    return _this;
  }

  return VarNode;
} (AtomicNode);

module.exports = {
  ConstNode,
  FuncNode,
  VarNode,
};
