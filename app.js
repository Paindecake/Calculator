const container = document.getElementById("container");
const screen = document.getElementById("screen");
const operatorBtn = document.querySelectorAll(".operatorBtn");
const numberBtn = document.querySelectorAll(".numberBtn");
const num0Btn = document.getElementById("num0");
const num1Btn = document.getElementById("num1");
const num2Btn = document.getElementById("num2");
const num3Btn = document.getElementById("num3");
const num4Btn = document.getElementById("num4");
const num5Btn = document.getElementById("num5");
const num6Btn = document.getElementById("num6");
const num7Btn = document.getElementById("num7");
const num8Btn = document.getElementById("num8");
const num9Btn = document.getElementById("num9");
const acBtn = document.getElementById("ac");
const divideBtn = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const eraseBtn = document.getElementById("erase");
const equalBtn = document.getElementById("equal");
const subtractBtn = document.getElementById("subtract");
const addBtn = document.getElementById("add");
const dotBtn = document.getElementById("dot");

let displayValue = 0;

function screenUpdate() {
	screen.innerText += displayValue;
}

function displayNum() {
	numberBtn.forEach(
		(e) =>
			(e.onclick = () => {
				displayValue = e.innerText;
				screenUpdate();
			})
	);
}
displayNum();

let sum;
let savedValue;
let selectedOperator;

operatorBtn.forEach((btn) => {
	btn.onclick = () => {
		savedValue = screen.innerText;
		selectedOperator = btn.innerText;
		screen.innerText = "";
	};
});

equalBtn.onclick = () => {
	let a = parseInt(savedValue);
	let b = parseInt(screen.innerText);
	screen.innerText = operate(selectedOperator, a, b);
};

function add(a, b) {
	sum = a + b;
	return sum;
}

function subtract(a, b) {
	sum = a - b;
	return sum;
}

function multiply(a, b) {
	sum = a * b;
	return sum;
}

function divide(a, b) {
	sum = a / b;
	return sum;
}

function operate(operator, a, b) {
	switch (operator) {
		case "+":
			return add(a, b);
			break;
		case "-":
			return subtract(a, b);
			break;
		case "*":
			return multiply(a, b);
			break;
		case "/":
			return divide(a, b);
			break;
	}
}

acBtn.onclick = function() {
	sum = 0;
	savedValue = "";
	selectedOperator = "";
	screen.innerText = "";
};
