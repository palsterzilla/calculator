const buttons = document.querySelectorAll(".btn");
const para = document.querySelector(".display");
let firstNum = "";
let secondNum = "";
let operator = "";
let displayValue = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    
    // display input value to page
    if (/\w/.test(button.value)) {
      if (button.value === "ac") {
        allClear();
        para.textContent = "0";
        return
      }
      displayValue += button.value;
      para.textContent = displayValue;

      // return if pressed operand first before num
    } else if (/[+\-*/]/.test(button.value) && para.textContent == "0") {
      console.log("no para")
      return

      // assign firstNum from input
    } else if (/[+\-*/]/.test(button.value) && !firstNum) {
      console.log("no op")
      firstNum = para.textContent;
      displayValue = "";
      operator = button.value;
      
      // calculate both operand and display result to page
    } else if (button.value === "=" && firstNum) {
      console.log("equal")
      secondNum = para.textContent;
      displayValue = calculate[operator](+firstNum, +secondNum);
      para.textContent = displayValue;

      allClear();

      // show result first and use clicked operator for next calculation
    } else if (/[+\-*/]/.test(button.value) && firstNum) {
      console.log("with op")
      secondNum = para.textContent;
      firstNum = calculate[operator](+firstNum, +secondNum);
      para.textContent = firstNum;

      operator = button.value;
      displayValue = "";
      secondNum = "";
    }
  })
})

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
  '/': (x, y) => { return roundNum(x / y) },
};
