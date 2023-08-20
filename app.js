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
  //  return if 0 already present in display value
  if (this.value === "0" && para.textContent == "0") {
    console.log('zero')
    return

    // return if pressing operand first before any numbers
  } else if (/[+\-*/]/.test(this.value) && para.textContent == "0") {
    console.log("no para")
    return

    // display input value to page
  } else if (/[\w]/.test(this.value)) {
    if (this.value === "ac") {
      allClear();
      para.textContent = "0";
      return
    } 
    displayValue += this.value;
    para.textContent = +displayValue.substring(0,9);

    // if pressing decimal
  } else if (/\./.test(this.value)) {
    if (para.textContent == "0") {
      displayValue = "0"
    }
    decimal.disabled = true
    displayValue += this.value;
    para.textContent = displayValue;
    
    // assign firstNum from input
  } else if (/[+\-*/]/.test(this.value) && !operator) {
    console.log("no op")
    firstNum = para.textContent;
    displayValue = "";
    operator = this.value;
    decimal.disabled = false;
    
    // calculate both operand and display result to page
  } else if (this.value === "=" && firstNum && operator) {
    console.log("equal")
    secondNum = para.textContent;
    displayValue = calculate[operator](firstNum, secondNum);
    para.textContent = displayValue;
    decimal.disabled = false;

    allClear();

    // show result first and use clicked operator for next calculation
  } else if (/[+\-*/]/.test(this.value) && firstNum && operator) {
    console.log("with op")
    secondNum = para.textContent;
    firstNum = calculate[operator](firstNum, secondNum);
    para.textContent = firstNum;
    decimal.disabled = false;

    operator = this.value;
    displayValue = "";
    secondNum = "";

    // if pressing percent
  } else if (this.value === "%" && para.textContent != "0") {
    console.log("percent")
    displayValue = calculate[this.value](para.textContent);
    para.textContent = displayValue.substring(0,9);
    
    if (para.textContent.includes(".")) {
      decimal.disabled = true;
    }
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
  '+': (x, y) => { return roundNum(+x + +y).toString() },
  '-': (x, y) => { return roundNum(+x - +y).toString() },
  '*': (x, y) => { return roundNum(+x * +y).toString() },
  '%': (x)    => { return (+x / 100).toString() },
  '/': (x, y) => { return y != "0" ? roundNum(+x / +y).toString() : "lol!" },
};
