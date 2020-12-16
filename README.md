# symboa

[ Still in development ] A JavaScript library for symbolic mathematics.

### Define mathematical expression.

Symboa provides super easy `Expression` objects to define mathematical expressions.

```javascript
const Expression = require('symboa');
const exp = new Expression('2 + 3 - ( 4 -8 )');

const result = exp.evaluate();
```

### Evaluate complex algebraic expressions.

Use it to evaluate complex mathematical operations. Pass a dictionary/object in the arguements as values for algebraic variables

```javascript
const exp = new Expression('y * tan ( cos ( sin ( max ( y , 3 ) / 3 * x ) ) ) + 2 * ( 6 + 3 * 2 )');
const res = exp.evaluate({ x: 3.14, y: 2 });
```

### Remember to

 - Provide space to separate tokens. `(3+(sin(2))` is read as single token and is invalid. `3 + ( sin ( 2 ) )` would be correct expression here.
 
 - `xy` gets treated as a single variable; `x y` get treated as two different variables x and y.

 - Provides just about any function in Math.

Have nice day and nicer sym-boeing!