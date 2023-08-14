const buttons = document.querySelectorAll(".btn");
const para = document.createElement("p")
let numbers = [];
let firstNum = "";
let secondNum = "";
let operator = "";
let displayValue = ""

buttons.forEach(button => {
  button.addEventListener("click", () => {
    numbers.push(button.value)
    
    if (/\w/.test(button.value)) {
      if (button.value === "ac") {
        allClear()
        return
      }
      displayValue += button.value
      para.textContent = displayValue
      document.body.appendChild(para)

    } else if (/\W/.test(button.value)) {
      displayValue = "";
    }

    if (numbers.filter(x => x == "+").length > 1) {
      firstNum = numbers.slice(0, numbers.indexOf("+")).join("");
      secondNum = numbers.slice((numbers.indexOf("+") + 1), -1).join("");
      
      firstNum = calculate["+"](+firstNum, +secondNum);
      secondNum = "";
      para.textContent = firstNum;
      numbers = numbers.slice(-1);
      numbers.unshift(firstNum);

    } else if (button.value === "=") {
      firstNum = numbers.slice(0, numbers.indexOf("+")).join("");
      secondNum = numbers.slice((numbers.indexOf("+") + 1), -1).join("");
      firstNum = calculate["+"](+firstNum, +secondNum);
      secondNum = "";
      para.textContent = firstNum;

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
