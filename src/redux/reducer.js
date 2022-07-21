import ACTIONS from "./actions"

const aescend = expression => {  /* 升序 */
    let a = expression.split("+").map(str => {
        let x = parseInt(str.slice(0, str.indexOf('x')));
        let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
        return [x, y];
    });
    a.sort(array_aescend);
    let n = a.length;
    let size = a[n - 1][1];
    let sum = [];
    for (let i = 0; i <= size; i++) sum[i] = 0;
    for (let i = 0; i < n; i++) sum[a[i][1]] += a[i][0];

    return convert(sum, size, true);
}

const descend = expression => {  /* 降序 */
    let a = expression.split("+").map(str => {
        let x = parseInt(str.slice(0, str.indexOf('x')));
        let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
        return [x, y];
    });
    a.sort(array_descend);
    let n = a.length;
    let size = a[0][1];
    let sum = [];
    for (let i = 0; i <= size; i++) sum[i] = 0;
    for (let i = 0; i < n; i++) sum[a[i][1]] += a[i][0];

    // console.log("descend");
    return convert(sum, size, false);
}

const array_aescend = (a, b) => {  /* 将二维数组根据指数作升序 */
    return a[1] - b[1];
}

const array_descend = (a, b) => {  /* 将二维数组根据指数作降序 */
    return b[1] - a[1];
}

const convert = (arr, size, flag) => {  /* 将一维数组转化为字符串 */
    let res = "";
    if (flag === true) {  /* 升序 */
        for (let i = 0; i <= size; i++) 
            if (arr[i] !== 0) {
                if (arr[i] < 0 && res[res.length - 1] === "+")
                    res = res.slice(0, -1);
                res += `${arr[i]}x${i}`;

                if (i !== size)
                    res += '+';
            }
    } else {  /* 降序 */
        for (let i = size; i >= 0; i--) {
            if (arr[i] !== 0) {
                if (arr[i] < 0 && res[res.length - 1] === "+") {
                    res = res.slice(0, -1);
                }
                res += `${arr[i]}x${i}`;

                if (i !== 0) {
                    res += '+';
                } 
            } 

            if (i === 0) {
                while (res[res.length - 1] === "+") {
                    res = res.slice(0, -1);
                }
            }
        }
    }
    return res;
}

const add = (a, b) => {
    let n = a.length;
    let m = b.length;
    a.sort(array_aescend);
    b.sort(array_aescend);
    let size = Math.max(a[n - 1][1], b[m - 1][1]);  /* 最大指数值 */
    let sum = [];
    for (let i = 0; i <= size; i++) sum[i] = 0;
    for (let i = 0; i < n; i++) sum[a[i][1]] += a[i][0];
    for (let i = 0; i < m; i++) sum[b[i][1]] += b[i][0];

    return convert(sum, size, true);
}

const sub = (a, b) => {
    let n = a.length;
    let m = b.length;
    a.sort(array_aescend);
    b.sort(array_aescend);
    let size = Math.max(a[n - 1][1], b[m - 1][1]);  /* 最大指数值 */
    let sum = [];
    for (let i = 0; i <= size; i++) sum[i] = 0;
    for (let i = 0; i < n; i++) sum[a[i][1]] += a[i][0];
    for (let i = 0; i < m; i++) sum[b[i][1]] -= b[i][0];

    return convert(sum, size, true);
}

const mul = (a, b) => {
    // console.log("mul");
    let n = a.length;
    let m = b.length;
    a.sort(array_aescend);
    b.sort(array_aescend);
    let size = a[n - 1][1] + b[m - 1][1];
    let sum = [];
    for (let i = 0; i <= size; i++) sum[i] = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++)
            sum[a[i][1] + b[j][1]] += a[i][0] * b[j][0];
    }

    return convert(sum, size, true);
}

const evaluate = expression => {  /* 一元二项式的运算 */

    if (expression.indexOf(")*(") !== -1) {  /* 乘法 */
        console.log("*");
        let A = expression.slice(1, expression.indexOf(')*('));
        let B = expression.slice(expression.indexOf(')*(') + 3, expression.length - 1);
        // console.log(A);
        // console.log(B);
        let a = A.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        let b = B.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        // console.log(a);
        // console.log(b);
        return mul(a, b);
    } else if (expression.indexOf(")-(") !== -1) {  /* 减法 */
        let A = expression.slice(1, expression.indexOf(')-('));
        let B = expression.slice(expression.indexOf(')-(') + 3, expression.length - 1);
        // console.log(A);
        // console.log(B);
        let a = A.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        let b = B.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        // console.log(a);
        // console.log(b);
        return sub(a, b);
    } else {  /* 加法 */
        // console.log("+");
        let A = expression.slice(1, expression.indexOf(')+('));
        let B = expression.slice(expression.indexOf(')+(') + 3, expression.length - 1);
        // console.log(A);
        // console.log(B);
        let a = A.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        let b = B.split("+").map(str => {
            let x = parseInt(str.slice(0, str.indexOf('x')));
            let y = parseInt(str.slice(str.indexOf('x') + 1, str.length));
            return [x, y];
        });
        // console.log(a);
        // console.log(b);
        return add(a, b);
    }
    
}

const is_operator = data => {  /* 判断是否为运算符 */
    if (data === "+" || 
    data === "-" || 
    data === "*" || 
    data === "/" || 
    data === "%"
    ) return true;
    else return false
}
const is_digit = data => {  /* 判定是否为操作数 */
    if (data === '0' ||
    data === '1'  ||
    data === '2'  ||
    data === '3'  ||
    data === '4'  ||
    data === '5'  ||
    data === '6'  ||
    data === '7'  ||
    data === '8'  ||
    data === '9'
    ) return true;
    else return false;
}

const judge = (expression) => {  /* 评判表达式 */
    let tips = [];
    console.log(expression);

    let size = 0;  /* 括号判定 */
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            size++;
        } else if (expression[i] === ')') {
            size--;
            if (size < 0) {
                tips.push('括号不匹配\n');
                break;
            }
        }
    }
    if (size !== 0) {
        tips.push('括号不匹配\n');
    }

    /* 操作数与运算符判定 */
    if (is_operator(expression[expression.length - 1])) {  /* 表达式末尾为运算符，需要操作数 */
        tips.push('请输入操作数\n');
    }

    /* 一元多项式判定 */
    if (expression[expression.length - 1] === 'x') {
        if (!is_digit(expression[expression.length - 2])) {
            tips.push('请输入x的系数\n');
        }
        tips.push('请输入x的指数\n');
    }

    if (expression.indexOf('x') !== -1 && expression.indexOf('(') === -1) {
        tips.push('请用括号将A(x)orB(x)括起来\n');
    }

    return tips;
}

const reducer = (state = {
    expression: "",
    history: [],
    tips: [],  /* 提示 */
    overwrite: false, /* 是否覆盖 */
    is_polynomial: false, /* 是否为多项式 */
    is_ascend: true,  /* 是否为升序排列 */
}, action) => {
    switch(action.type) {

        case ACTIONS.ADD:
            /* 刚刚计算结束，下一次输入直接覆盖 */
            if (state.overwrite)
                return {
                    ...state,
                    tips: judge(is_operator(action.data) ? "" : action.data) === [] ? [] : judge(is_operator(action.data) ? "" : action.data),
                    expression: is_operator(action.data) ? "" : action.data,
                    overwrite: false,
                }
            /* 运算符 || "00" 不能在算式开头 */
            if (state.expression === "" && (is_operator(action.data) || action.data === "00"))
                return state;
            /* 当前值为0 & 输入为"00" --> 保持不变*/
            if (state.expression[0] === "0" && action.data === '00') 
                return state;
            /* 运算符不能连续出现 */
            if (state.expression !== "" && is_operator(state.expression[state.expression.length - 1]) && is_operator(action.data))
                return {  
                    ...state,
                    expression: state.expression.slice(0, state.expression.length - 1) + action.data,
                }
            /* 当前值为0 --> 零后不直接跟数字*/
            if (state.expression[0] === "0" && action.data !== '.') 
                return {
                    ...state,
                    expression: action.data,
                    is_polynomial: action.data === "x" ? true : false,
                }      
            /* 当前按键为. & 当前表达式为空 */
            if (action.data === '.' && state.expression === "")
                return {
                    ...state,
                    expression: "0.",
                };
            return {
                ...state,
                tips: judge(state.expression + action.data) === [] ? [] : judge(state.expression + action.data),
                expression: state.expression + action.data,
                is_polynomial: action.data === "x" ? true : state.is_polynomial,
            }

        case ACTIONS.DELETE:
            if (state.expression === "")
                return state;
            if (state.overwrite)
                return {
                    ...state,
                    expression: "",
                    overwrite: false,
                    is_polynomial: false,
                }
            if (state.expression[state.expression.length - 1] === 'x'  && state.expression.slice(0, -1).indexOf("x") === -1)
                return { /* 当前元素为x & 删除当前元素后不再有x */
                    ...state,
                    tips: judge(state.expression.slice(0, -1)) === state.tips ? state.tips : judge(state.expression.slice(0, -1)),
                    expression: state.expression.slice(0, -1),
                    is_polynomial: false,
                }
            return {
                ...state,
                tips: judge(state.expression.slice(0, -1)) === state.tips ? state.tips : judge(state.expression.slice(0, -1)),
                expression: state.expression.slice(0, -1),
            }

        case ACTIONS.CLEAR:
            return {
                ...state,
                expression: "",
                is_polynomial: false,
            }

        case ACTIONS.EVALUATE:
            if (state.expression === "")
                return state;
                
            if (state.is_polynomial === true) /* 计算一元多项式 */
                return {
                    ...state,
                    tips: [],
                    history: state.history + `\n${state.expression}=${evaluate(state.expression)}`,
                    expression: evaluate(state.expression),
                    overwrite: true,
                    is_polynomial: false,
                    is_ascend: true,
                }

            return {
                ...state,
                tips: [],
                history: state.history + `\n${state.expression}=${eval(state.expression)}`,
                expression: eval(state.expression),
                overwrite: true,
            }

        case ACTIONS.PERMUTATION:
            if (state.overwrite == true && state.expression.indexOf('x') !== -1)
                if (state.is_ascend === true)
                    return {  /* 降序 */
                        ...state,
                        expression: descend(state.expression),
                        is_ascend: false,
                    }
                else 
                    return {  /* 升序 */
                        ...state,
                        expression: aescend(state.expression),
                        is_ascend: true,
                    }
        default:
            return state;
    }
};

export default reducer;
