const formula = document.querySelector(".display-formula");  // 입력한 식 화면
const result = document.querySelector(".display-result");    // 결과 값 화면
const operation = document.querySelectorAll(".operation");   // 사칙연산
const number = document.querySelectorAll(".number");         // 숫자
const allClear = document.querySelector(".all-clear");       // 초기화
const paren = document.querySelectorAll(".paren");           // 괄호
const equal = document.querySelector(".equal");              // 등호

let displayFormula = "";
let displayResult = "";

/* 연산자 우선순위 */
function rank(op) {
    if(op == '*' || op == '/') return 1;
    else if(op == '+' || op == '-') return 2;
    else return 3;
}

/* 후위표기법으로 변경 */
function infixToPostfix() {
    const str = ("( " + displayFormula + " )").trim().split(/ +/);
    
    let stack = []; 
    let infix = [];

    for(token of str) {
        switch(token) {
            case '(':
                stack.push(token);
                break;
            case ')':
                let top = stack.pop();

                while(top != '(') {
                    infix.push(top);
                    top = stack.pop();
                }
                break;
            case '×':
                token = '*';
                if(rank(stack[stack.length - 1]) <= rank(token)) 
                    infix.push(stack.pop());                
                stack.push(token);
                break;
            case '÷':
                token = '/';
                if(rank(stack[stack.length - 1]) <= rank(token)) 
                    infix.push(stack.pop());
                stack.push(token);
                break;
            case '+':
                if(rank(stack[stack.length - 1]) <= rank(token)) 
                    infix.push(stack.pop());
                stack.push(token);
                break;
            case '−':
                token = '-';
                if(rank(stack[stack.length - 1]) <= rank(token)) 
                    infix.push(stack.pop());
                stack.push(token);
                break;
            default:
                infix.push(token);
        }
    }

    return infix;
}

/* 문자열을 정수 또는 실수로 변환 */
function stringToNum(str) {
    if(str.includes('.')) return parseFloat(str);
    else return parseInt(str); 
}

/* 후위표기법 계산 */
function calculation(infix) {
    let stack = [];
    let num1, num2;

    for(token of infix) {
        switch(token) {
            case '*':
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 * num2);
                break;
            case '/':
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 / num2);
                break;
            case '+':
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 + num2);
                break;
            case '-':
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 - num2);
                break;
            default:
                stack.push(stringToNum(token));
        }
    }

    return Math.round(stack.pop() * 100) / 100;
}

/* 등호 클릭 */
function onEqualClick() {
    const infix = infixToPostfix();
    displayResult = calculation(infix);
    result.innerText = displayResult;
}

/* AC 클릭 */
function onAllClearClick() {
    displayFormula = "";
    displayResult = "";
    formula.innerText = "0";
    result.innerText = "0";
}

/* () 클릭 */
paren.forEach(element => {
    element.addEventListener("click", e => {
        const parenthesis = e.target.innerText;

        displayFormula += " " + parenthesis + " ";
        formula.innerText = displayFormula;
    });
});

/* 숫자 클릭 */
number.forEach(element => {
    element.addEventListener("click", e => {
        const figure = e.target.innerText;

        displayFormula += figure;
        formula.innerText = displayFormula;
    });
});

/* 사칙 연산 클릭 */
operation.forEach(element => {
    element.addEventListener("click", e => {
        let operator = e.target.innerText;
        
        displayFormula += " " + operator + " ";
        formula.innerText = displayFormula;
    });
});

allClear.addEventListener("click", onAllClearClick);
equal.addEventListener("click", onEqualClick);