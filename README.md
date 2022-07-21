# Calculator🍭
## Previews
<img src="https://git.acwing.com/ZagY/calculator/-/raw/master/screenshot.png" alt="screenshot">

## Expression Evaluation
**[JS在线编辑器](https://jsrun.net/new)**
```javascript
function evaluate(expression)
    {
        let tokens = expression.split('');

        //操作数
        let values = [];

        //操作符
        let ops = [];

        for (let i = 0; i < tokens.length; i++)
        {
            if (tokens[i] == ' ')
            {
                continue;
            }

            //操作数入操作数栈
            if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                let sbuf = "";
                //操作数不止一位
                while (i < tokens.length &&
                        tokens[i] >= '0' &&
                            tokens[i] <= '9'|| 
                            i < tokens.length && 
                            tokens[i] === '.')
                {
                    sbuf = sbuf + tokens[i++];
                }
                values.push(parseFloat(sbuf, 10));
                
                i--;
            }

            //左括号直接入操作符栈
            else if (tokens[i] == '(')
            {
                ops.push(tokens[i]);
            }

            
            //遇到右括号，对两个栈进行运算
            else if (tokens[i] == ')')
            {
                while (ops[ops.length - 1] != '(')
                {
                values.push(applyOp(ops.pop(),
                                values.pop(),
                                values.pop()));
                }
                ops.pop();
            }

            //操作符
            else if (tokens[i] == '+' ||
                    tokens[i] == '-' ||
                    tokens[i] == '*' ||
                    tokens[i] == '/')
            {

                //当'ops'的栈顶元素的优先级大于等于当前将要入栈操作数
                //对'ops'及'value'栈顶元素进行运算
                while (ops.length > 0 &&
                        hasPrecedence(tokens[i],
                                    ops[ops.length - 1]))
                {
                values.push(applyOp(ops.pop(),
                                values.pop(),
                                values.pop()));
                }

                
                ops.push(tokens[i]);
            }
        }

        // 表达式均已入栈
        // 对'ops'及'value'栈顶元素进行运算
        while (ops.length > 0)
        {
            values.push(applyOp(ops.pop(),
                            values.pop(),
                            values.pop()));
        }

        //运算结果返回
        return values.pop();
    }

    //操作符优先级判定
    //若'op2'优先级大于等于'op1'，返回 true
    //否则，返回 false
    function hasPrecedence(op1, op2)
    {
        if (op2 == '(' || op2 == ')')
        {
            return false;
        }
        if ((op1 == '*' || op1 == '/') &&
            (op2 == '+' || op2 == '-'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    //表达式运算
    function applyOp(op, b, a)
    {
        switch (op)
        {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0)
            {
                document.write("Cannot divide by zero");
            }
            return parseFloat(a / b, 10);
        }
        return 0;
    }

     
    document.write(evaluate("0 - 99 + 7 * 8") + "</br>");
    document.write(evaluate("100 - 8 * 99 + 87 - 95.5") + "</br>");
    document.write(evaluate("100 * ( 2 + 12 )") + "</br>");
    document.write(evaluate("100 * ( 2 + 12 ) / 14") + "</br>");
```
