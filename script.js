let runningTotal = 0;
let buffer = "0";
let previousOperator;
let history = [];

let screen;
let historyDiv;

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      updateHistory();
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') return;

  const intBuffer = parseInt(buffer);

  if (previousOperator) {
    flushOperation(intBuffer);
  } else {
    runningTotal = intBuffer; // Set runningTotal if no previous operator
  }
  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  let historyEntry = runningTotal + " " + previousOperator + " " + intBuffer + " = ";
  switch (previousOperator) {
    case '+':
      runningTotal += intBuffer;
      break;
    case '-':
      runningTotal -= intBuffer;
      break;
    case '×':
      runningTotal *= intBuffer;
      break;
    case '÷':
      runningTotal /= intBuffer;
      break;
    default:
      console.error('Operador desconhecido:', previousOperator);
      break;
  }
  historyEntry += runningTotal;
  history.push(historyEntry);
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function updateHistory() {
  const historyEntry = history[history.length - 1];
  const historyElement = document.createElement("div");
  historyElement.innerText = historyEntry;
  historyDiv.appendChild(historyElement);
}

function init() {
  screen = document.querySelector(".screen");
  historyDiv = document.querySelector(".history");

  document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      buttonClick(event.target.innerText);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
