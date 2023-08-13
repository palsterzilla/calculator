const buttons = document.querySelectorAll(".btn");
let numbers = [];
let firstNum = "";
let secondNum = "";
let operator = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    numbers.push(button.value)

    if (button.value === "+") {
      firstNum = Number(numbers.slice(0, numbers.indexOf("+")).join(""))
      operator = "+"

    } else if (button.value === "=") {
      secondNum = Number(numbers.slice((numbers.indexOf("+") + 1), -1).join(""))
      console.log(math_it_up[operator](firstNum, secondNum))
      
    } else if (button.value === "ac") {
      numbers = []
      firstNum = ""
      secondNum = "" 
      operator = ""
    }

  })
})

const math_it_up = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y }
};
