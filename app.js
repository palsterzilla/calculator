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
        allClear()
        para.textContent = ""
        return
      }
      displayValue += button.value
      para.textContent = displayValue

      // return if pressed operand first before num
    } else if (/[+\-*/]/.test(button.value) && !para.textContent) {
      console.log("no para")
      return

      // assign firstNum from input
    } else if (/[+\-*/]/.test(button.value) && !operator) {
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

const calculate = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
};
