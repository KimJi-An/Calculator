const formula = document.querySelector(".display-formula");  // 입력한 식 화면
const result = document.querySelector(".display-result");    // 결과 값 화면
const operation = document.querySelectorAll(".operation");   // 사칙연산, =
const number = document.querySelectorAll(".number");         // 숫자
const allClear = document.querySelector(".all-clear");       // 초기화
const paren = document.querySelectorAll(".paren");           // 괄호

let displayFormula = "";
let displayResult = "";

let stack = [];  // 계산할 숫자와 부호를 저장
let num = ""  // 입력받은 숫자
let op = "";     // 입력받은 연산자

/* AC 클릭 */
function onAllClearClick() {
    displayFormula = "";
    displayResult = "";
    formula.innerText = "0";
    result.innerText = "0";
}

/* () 클릭 */



/* 숫자 클릭 */
number.forEach(element => {
    element.addEventListener("click", e => {
        displayFormula += e.target.innerText;
        formula.innerText = displayFormula;
        num += e.target.innerText;
    });
});

/* 사칙 연산 클릭 */
operation.forEach(element => {
    element.addEventListener("click", e => {
        console.log(e.target.innerText);
    });
});

allClear.addEventListener("click", onAllClearClick);