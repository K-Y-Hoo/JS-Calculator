export const operatorsArray = ["/", "+", "-", "X"];

export function setTotal (str, operator) {
  if (str.includes(operator) && operator === '+') {
    const [before, after] = str.split(operator).map(Number);
    total.innerText = add(before, after);
    return;
  }
  if (str.includes(operator) && operator === '-') {
    const [before, after] = str.split(operator).map(Number);
    total.innerText = subtract(before, after);
    return;
  }
  if (str.includes(operator) && operator === '/') {
    const [before, after] = str.split(operator).map(Number);
    total.innerText = divide(before, after);
    return;
  }
  if (str.includes(operator) && operator === 'X') {
    const [before, after] = str.split(operator).map(Number);
    total.innerText = multiply(before, after);
    return;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return Math.floor(a / b);
}