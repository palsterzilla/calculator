const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");
const decimal = document.querySelector(".decimal");
let firstNum = "";
let secondNum = "";
let operator = "";
let displayValue = "";

buttons.forEach(button => {
  button.addEventListener("click", operate)
})

window.addEventListener("keydown", operate);

function operate(e) {
  const patternOperand = /\d/;
  const patternDecimal = /\./;
  const patternOperator = /[+\-*/]/;
  const key = document.querySelector(`.btn[data-key="${e.key}"]`);

  // return if input multiple 0 or operator first before any number
  if ((this.value === "0" && display.textContent === "0") ||
      (e.key === "0" && display.textContent === "0") ||
      (patternOperator.test(this.value) && display.textContent === "0")
  ) return

  if (this.value === "ac" || e.key === "Escape") {
    allClear();
    display.textContent = "0";
    return 

    // display input value to page, only operand
  } else if (patternOperand.test(this.value) || patternOperand.test(e.key)) {
    displayValue += (this.value || key.value);
    display.textContent = displayValue.substring(0,9);

    // if pressing decimal
  } else if (patternDecimal.test(this.value) || patternDecimal.test(e.key)) {
    if (display.textContent == "0" || displayValue == "") {
      displayValue = "0"

    } else if (display.textContent.includes(".")) {
      e.preventDefault()
      return false
    }
    decimal.disabled = true
    displayValue += (this.value || key.value);
    display.textContent = displayValue;
    
    // assign firstNum after pressing operator
  } else if ( (patternOperator.test(this.value) && !operator) ||
              (patternOperator.test(e.key) && !operator)) {
    firstNum = display.textContent;
    displayValue = "";
    operator = (this.value || key.value);
    decimal.disabled = false;
    
    // calculate both operand and display result to page
  } else if ( (this.value === "=" && firstNum && operator) ||
              (e.key === "=" && firstNum && operator) ||
              (e.key === "Enter" && firstNum && operator)) {
    secondNum = display.textContent;
    displayValue = calculate[operator](firstNum, secondNum);
    display.textContent = displayValue;
    decimal.disabled = false;

    allClear();

    // show result first and use clicked operator for next calculation
  } else if ( (patternOperator.test(this.value) && firstNum && operator) ||
              (patternOperator.test(e.key) && firstNum && operator)) {
    secondNum = display.textContent;
    firstNum = calculate[operator](firstNum, secondNum);
    display.textContent = firstNum;
    decimal.disabled = false;

    operator = (this.value || key.value);
    displayValue = "";
    secondNum = "";

    // if pressing percent
  } else if ( (this.value === "%" && display.textContent != "0") ||
              (e.key === "%" && display.textContent != "0")) {
    displayValue = calculate[(this.value || key.value)](display.textContent);
    display.textContent = displayValue.substring(0,9);
    
    if (display.textContent.includes(".")) {
      decimal.disabled = true;
    }
    
    // if pressing sign
  } else if ( (this.value === "sign" && display.textContent !== "0") ||
              (e.key === "`" && display.textContent !== "0")) {
    displayValue = calculate[(this.value || key.value)](display.textContent);
    display.textContent = displayValue.substring(0,9);

    // if pressing delete
  } else if ( (this.value === "delete" && display.textContent !== "0") ||
              (e.key === "Backspace" && display.textContent !== "0")) {
    if (displayValue.length == 1) {
      displayValue = displayValue.slice(0, -1);
      display.textContent = "0";

    } else if (displayValue == "") {
      display.textContent = "0";

    } else {
      displayValue = displayValue.slice(0, -1);
      display.textContent = displayValue.substring(0,9);
    }
  }
}

function allClear() {
  firstNum = "";
  secondNum = ""; 
  operator = "";
  displayValue = "";
  decimal.disabled = false;
}

function roundNum(num) {
  return Math.round((num + Number.EPSILON) * 10000000) / 10000000
}

const calculate = {
  '+':    (x, y) => { return roundNum(+x + +y).toString() },
  '-':    (x, y) => { return roundNum(+x - +y).toString() },
  '*':    (x, y) => { return roundNum(+x * +y).toString() },
  '%':    (x)    => { return (+x / 100).toString() },
  'sign': (x)    => { return (+x * -1).toString() },
  '/':    (x, y) => { return y != "0" ? roundNum(+x / +y).toString() : "lol!" },
};
