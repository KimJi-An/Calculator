const formula = document.querySelector(".display-formula");  // 입력한 식 화면
const result = document.querySelector(".display-result");    // 결과 값 화면
const operation = document.querySelectorAll(".operation");   // 사칙연산, =
const number = document.querySelectorAll(".number");         // 숫자
const allClear = document.querySelector(".all-clear");       // 초기화
const sign = document.querySelector(".sign");                // +, - 부호
const percent = document.querySelector(".percent");          // 퍼센트

let displayFormula = "";
let displayResult = "";

let stack = [];  // 계산할 숫자와 부호

/* AC 클릭 */
function onAllClearClick() {
    displayFormula = "";
    displayResult = "";
    formula.innerText = "0";
    result.innerText = "0";
}

/* +- 클릭 */
function onSignClick() {
    displayFormula = displayFormula.padStart(displayFormula.length + 2, '-(');
    displayFormula = displayFormula.padEnd(displayFormula.length + 1, ')');
    formula.innerText = displayFormula;
}

/* 숫자 클릭 */
number.forEach(num => {
    num.addEventListener("click", element => {
        displayFormula += element.target.innerText;
        formula.innerText = displayFormula;
    });
});

/* 사칙 연산 클릭 */
operation.forEach(op => {
    op.addEventListener("click", element => {
        displayFormula += element.target.innerText;
        formula.innerText = displayFormula;
    });
});

allClear.addEventListener("click", onAllClearClick);
sign.addEventListener("click", onSignClick);