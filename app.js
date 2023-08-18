const buttons = document.querySelectorAll(".btn");
const para = document.createElement("p")
let numbers = [];
let firstNum = "";
let secondNum = "";
let operator = "";
let displayValue = ""

buttons.forEach(button => {
  button.addEventListener("click", () => {
    
    // display input value to page
    if (/\w/.test(button.value)) {
      if (button.value === "ac") {
        allClear()
        return
      }
      numbers.push(button.value)
      displayValue += button.value
      para.textContent = displayValue
      document.body.appendChild(para)

      // assign firstNum from input
    } else if (/[+\-*/]/.test(button.value) && !operator) {
      if (!firstNum) {
        firstNum = numbers.join("");
      }
      displayValue = "";
      operator = button.value;
      numbers = [];
      
      // calculate both operand and display result to page
    } else if (
        (button.value === "=" && firstNum) ||
        (/[+\-*/]/.test(button.value) && operator)) {
      secondNum = numbers.join("");
      firstNum = calculate[operator](+firstNum, +secondNum);
      displayValue = "";
      para.textContent = firstNum;

      secondNum = "";
      numbers = [];

    }
  })
})

function allClear() {
  numbers = [];
  firstNum = "";
  secondNum = ""; 
  operator = "";
  displayValue = "";
  para.textContent = ""
}

const calculate = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
};
