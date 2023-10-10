import { splitToNumber } from "./string.js";

export const operatorsArray = ["/", "+", "-", "X"];

export function setTotal (str, operator, sign = 1) {
  const [before, after] = splitToNumber(str, operator);
  if (str.includes(operator) && operator === '+') {
    total.innerText = add(sign * before, after);
    return;
  }
  if (str.includes(operator) && operator === '-') {
    total.innerText = subtract(sign * before, after);
    return;
  }
  if (str.includes(operator) && operator === '/') {
    total.innerText = divide(sign * before, after);
    return;
  }
  if (str.includes(operator) && operator === 'X') {
    total.innerText = multiply(sign * before, after);
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