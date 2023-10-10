import { setTotal } from "./utils.js";
import { operatorsArray, 
         TOTAL_PATTERN, OPERATION_PATTERN } from "./const.js";

const total = document.querySelector('h1');

const digits = document.querySelectorAll('.digit');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", getDigit);
}

function getDigit(e) {
  const pattern = TOTAL_PATTERN;

  if (total.innerText === '0') {
    total.innerText = `${e.currentTarget.innerText}`;
    return;
  }

  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;
  
  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`;
    return;
  }
 
  if (!pattern.test(temp)) {
    alert("숫자는 세 자리 까지만 입력 가능합니다.");
  }
}

const operations = document.querySelectorAll('.operation');

for (let i = 0; i < operations.length-1; i++) {
  operations[i].addEventListener("click", getOperation);
}

function getOperation(e) {
  const pattern = OPERATION_PATTERN;
  const LAST_STRING_OF_TOTAL_INNERTEXT = total.innerText[total.innerText.length-1];
  if (total.innerText === '0') {
    alert('먼저 숫자를 눌러주세요.');
    return;
  }
  if (operatorsArray.includes(LAST_STRING_OF_TOTAL_INNERTEXT)) {
    alert('연산자는 두 번 연속으로 사용할 수 없습니다.');
    return;
  }
  

  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;

  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`;
  }
}

const clearAllButton = document.getElementById('clearAll');
clearAllButton.addEventListener("click", getClearAll);

const clearOneButton = document.getElementById('clearOne');
clearOneButton.addEventListener("click", getClearOne);


function getClearAll(e) {
  total.innerText = "0";
}

function getClearOne(e) {
  if (total.innerText === '0') {
    return;
  }
  if (total.innerText.length === 1) {
    total.innerText = '0';
    return;
  }
  let tempStr = total.innerText;
  let newStr = tempStr.substring(0, tempStr.length-1);
  total.innerText = newStr;
}

const calButton = document.getElementById('calButton');
calButton.addEventListener("click", calculate);

function calculate() {
  const pattern = TOTAL_PATTERN;
  const LAST_STRING_OF_TOTAL_INNERTEXT = total.innerText[total.innerText.length-1];
  if (operatorsArray.includes(LAST_STRING_OF_TOTAL_INNERTEXT)) {
    alert("완성되지 않은 수식입니다.")
    return;
  }

  if (pattern.test(total.innerText)) {
    const text = total.innerText;

    if (text[0] !== '-') {
      operatorsArray.forEach(el => setTotal(text, el));
    } else {
      const text = total.innerText.substring(1,total.innerText.length);
      operatorsArray.forEach(el => setTotal(text, el, -1));
    }
  }
}


