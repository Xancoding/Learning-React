import ACTIONS from "./actions"

const evaluate = state => {
    let {lastOperand, currentOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);
    
    let res = "";
    switch(operation) {
        case '+':
            res = last + current;
            break;
        case '-':
            res = last - current;
            break;
        case '×':
            res = last * current;
            break;
        case '÷':
            res = last / current;
        case 'mod':
            res = last % current;
    }
    return res.toString();
}

const reducer = (state = {
    currentOperand: "0",
    lastOperand: "",
    operation: "",
    expression: "",
    overwrite: false,  /* 是否要覆盖结果（evaluate运行之后为true） */
}, action) => {
    switch(action.type) {

        /* 添加 */
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite)
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false
                }
            /* 当前值为0 & 当前按键为0 */
            if (state.currentOperand === '0' && action.digit === '0')
                return state;
            /* 当前值为0 --> 零后不直接跟数字*/
            if (state.currentOperand === '0' && action.digit !== '.')
                return {
                    ...state,
                    currentOperand: action.digit,
                }
            /* 一个数不包含多个小数点 */
            if (action.digit === '.' && state.currentOperand.includes('.'))
                return state;
            /* 当前按键为. & 当前值为空 */
            if (action.digit === '.' && state.currentOperand === "")
                return {
                    ...state,
                    currentOperand: "0."
                };
            /* 添加元素 */
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }

        /* 删除 */
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite)
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            /* 当前值为0不需再删除 */
            if (state.currentOperand === "0")
                return state;
            /* 删除最后一位元素 */
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }

        /* 操作符 */
        case ACTIONS.CHOOSE_OPERATION:
            /* 界面为空 */
            if (state.lastOperand === "" && state.currentOperand === "")
                return state;
            /* 上一个操作数为空 */
            if (state.lastOperand === "")
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "0",
                }
            /* 当前操作数为0 */
            if (state.currentOperand === "0")
                return {
                    ...state,
                    operation: action.operation,
                }
            return {
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: "",
            }

        /* 清空 */
        case ACTIONS.CLEAR:
            return {
                ...state,
                currentOperand: "0",
                lastOperand: "",
                operation: "",
            }

        /* 计算 */
        case ACTIONS.EVALUATE:
            if (state.currentOperand === "" || 
                state.lastOperand === "" || 
                state.operation === "")
                return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                overwrite: true,
            }

        default:
            return state;
    }
};

export default reducer;
