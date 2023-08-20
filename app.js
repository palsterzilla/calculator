const buttons = document.querySelectorAll(".btn");
const para = document.querySelector(".display");
const decimal = document.querySelector(".decimal");
let firstNum = "";
let secondNum = "";
let operator = "";
let displayValue = "";

buttons.forEach(button => {
  button.addEventListener("click", operate)
})

function operate() {
  // display input value to page
  if (/[\w]/.test(this.value)) {
    if (this.value === "ac") {
      allClear();
      para.textContent = "0";
      return
    } 
    displayValue += this.value;
    para.textContent = +displayValue;

    // if pressed decimal
  } else if (/\./.test(this.value)) {
    if (!displayValue) {
      displayValue = "0"
    }
    decimal.disabled = true
    displayValue += this.value;
    para.textContent = displayValue;
    
    // return if pressed operand first before num
  } else if (/[+\-*/]/.test(this.value) && para.textContent == "0") {
    console.log("no para")
    return

    // assign firstNum from input
  } else if (/[+\-*/]/.test(this.value) && !firstNum) {
    console.log("no op")
    firstNum = para.textContent;
    displayValue = "";
    operator = this.value;
    decimal.disabled = false;
    
    // calculate both operand and display result to page
  } else if (this.value === "=" && firstNum) {
    console.log("equal")
    secondNum = para.textContent;
    displayValue = calculate[operator](+firstNum, +secondNum);
    para.textContent = displayValue;
    decimal.disabled = false;

    allClear();

    // show result first and use clicked operator for next calculation
  } else if (/[+\-*/]/.test(this.value) && firstNum) {
    console.log("with op")
    secondNum = para.textContent;
    firstNum = calculate[operator](+firstNum, +secondNum);
    para.textContent = firstNum;
    decimal.disabled = false;

    operator = this.value;
    displayValue = "";
    secondNum = "";
  }
}

function allClear() {
  firstNum = "";
  secondNum = ""; 
  operator = "";
  displayValue = "";
}

function roundNum(num) {
  return Math.round((num + Number.EPSILON) * 10000000) / 10000000
}

const calculate = {
  '+': (x, y) => { return roundNum(x + y) },
  '-': (x, y) => { return roundNum(x - y) },
  '*': (x, y) => { return roundNum(x * y) },
  '/': (x, y) => { return y != 0 ? roundNum(x / y) : "lol!" },
};
