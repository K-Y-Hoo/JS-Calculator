import { splitToNumber } from "./string.js";

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
    if (multiply(before, after) >= 2**53 - 1) {
      alert('결과값이 자바스크립트의 숫자값 표현 한계(2^53-1)를 넘었습니다!\n프로그램을 종료합니다.');
      total.innerText = '0';
      return;
    }
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