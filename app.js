const container = document.getElementById("container");
const screen = document.getElementById("screen");
const screenResult = document.getElementById("screenResult");
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
let sum;
let result = null;
let selectedOperator = null;
let a = "";
let b = "";
let resultHistory;
let equalOn = false;

function roundNumber(num) {
	let rounded = Math.round(num * 1000) / 1000;
	return rounded;
}

function screenUpdate() {
	screen.innerText += displayValue;
}

function displayNum() {
	numberBtn.forEach(
		(e) =>
			(e.onclick = () => {
				if (equalOn) {
					clearAll();
					equalOn = false;
				}
				displayValue = e.innerText;
				if (displayValue.includes(".")) {
					dotBtn.setAttribute("disabled", "");
				}
				screenUpdate();
				operatorBtnState("enable");
				equalBtnState("enable");
			})
	);
}
displayNum();

equalBtn.onclick = () => {
	equalOn = true;
	b = screen.innerText;
	screenResult.textContent = showCalc(selectedOperator);
	resultHistory = showCalc(selectedOperator);
	a = operate(selectedOperator, a, b);
	// b = "";
	screen.innerText = null;
	dotBtn.removeAttribute("disabled");
	// selectedOperator = null;
	operatorBtnState("enable");
	equalBtnState("enable");
};

function add(a, b) {
	sum = a + b;
	return roundNumber(sum);
}

function subtract(a, b) {
	sum = a - b;
	return roundNumber(sum);
}

function multiply(a, b) {
	sum = a * b;
	return roundNumber(sum);
}

function divide(a, b) {
	if (b === 0) {
		sum = "NO";
		return sum;
	} else {
		sum = a / b;
		return roundNumber(sum);
	}
}

function operate(operator, a, b) {
	switch (operator) {
		case "+":
			return add(+a, +b);
			break;
		case "-":
			return subtract(+a, +b);
			break;
		case "*":
			return multiply(+a, +b);
			break;
		case "/":
			return divide(+a, +b);
			break;
	}
	equalOn = false;
	selectedOperator = null;
	// a = "";
	// b = "";
}

function showCalc(operator) {
	switch (operator) {
		case "+":
			return (result = `${a} + ${b} = ${operate(operator, a, b)}`);
			break;
		case "-":
			return (result = `${a} - ${b} = ${operate(operator, a, b)}`);
			break;
		case "*":
			return (result = `${a} * ${b} = ${operate(operator, a, b)}`);
			break;
		case "/":
			return (result = `${a} / ${b} = ${operate(operator, a, b)}`);
			break;
	}
}

function opBtn() {
	operatorBtn.forEach((btn) => {
		btn.onclick = () => {
			if (a === "") {
				a = screen.innerText;
				selectedOperator = btn.innerText;
			} else if (a !== "" && selectedOperator !== null) {
				b = screen.innerText;
				if (b === "") {
					selectedOperator = btn.innerText;
				} else {
					screenResult.textContent = showCalc(selectedOperator);
					a = operate(selectedOperator, a, b);
					selectedOperator = btn.innerText;
				}
			}
			equalOn = false;
			screen.innerText = "";
			dotBtn.removeAttribute("disabled");
			equalBtnState("disabled");
			operatorBtnState("disable");
		};
	});
}

let erase = function() {
	screen.innerText = screen.innerText.slice(0, -1);
	if (!screen.innerText.includes(".")) {
		dotBtn.removeAttribute("disabled");
	}
};

eraseBtn.addEventListener("click", erase);

let operatorBtnState = function(state) {
	operatorBtn.forEach((btn) => {
		if (state === "disable") {
			btn.setAttribute("disabled", "");
		} else if (state === "enable") {
			btn.removeAttribute("disabled");
		}
	});
};

let equalBtnState = function(state) {
	if (state === "disable") {
		equalBtn.setAttribute("disabled", "");
	} else if (state === "enable") {
		equalBtn.removeAttribute("disabled");
	}
};
let clearAll = function() {
	equalOn = false;
	sum = 0;
	result = null;
	selectedOperator = null;
	screen.innerText = "";
	screenResult.innerText = "";
	resultHistory = "";
	a = "";
	b = "";
	operatorBtnState("enable");
	equalBtnState("enable");
	dotBtn.removeAttribute("disabled");
};

acBtn.onclick = clearAll;

opBtn();

document.addEventListener("keydown", (event) => {
	if(event.key == "Escape"){
		acBtn.click()
	} else if(event.key == "Backspace" || event.key == "Delete"){
		eraseBtn.click()
	}else if(event.key == "Enter" || event.key == "="){
		event.preventDefault()
		equalBtn.click()
	}else if(event.key == "."){
		dotBtn.click()
	}else if(event.key == "+"){
		addBtn.click()
	}else if(event.key == "-"){
		subtractBtn.click()
	}else if(event.key == "*"){
		multiplyBtn.click()
	}else if(event.key == "/"){
		divideBtn.click()
	}else if(!isNaN(event.key)){
		document.getElementById(`num${event.key}`).click()
	}
})
