const formula = document.querySelector(".display-formula");  // 입력한 식 화면
const result = document.querySelector(".display-result");    // 결과 값 화면
const operation = document.querySelectorAll(".operation");   // 사칙연산
const number = document.querySelectorAll(".number");         // 숫자
const allClear = document.querySelector(".all-clear");       // 초기화
const paren = document.querySelectorAll(".paren");           // 괄호
const equal = document.querySelector(".equal");              // 등호

// 연산자 우선순위
const rank = new Map([
    ['*', 1],
    ['/', 1],
    ['+', 2],
    ['-', 2],
    ['(', 3]
]);

let displayFormula = "";
let displayResult = "";

let infix = [];

/* 후위표기법으로 변경 */
function infixToPostfix() {
    const str = displayFormula.trim().split(/ +/);
    let stack = []; 

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
            case '÷':
                token = '/';
            case '+':
            case '-':
                if(rank.get(stack[stack.length - 1]) > rank.get(token)) {
                    stack.push(token);
                }
                else {
                    infix.push(token);
                }
                break;
            default:
                infix.push(token);
        }
    }
    console.log(infix);
}

/* 등호 클릭 */
function onEqualClick() {
    infixToPostfix();
    
}

/* AC 클릭 */
function onAllClearClick() {
    displayFormula = "";
    displayResult = "";
    infix= "";
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