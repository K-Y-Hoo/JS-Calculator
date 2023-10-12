import { setTotal } from "./utils.js";
import { operatorsArray, 
         TOTAL_PATTERN, OPERATION_PATTERN } from "./const.js";

const total = document.querySelector('h1');

const observer = new MutationObserver((mutationList, observer) => {
  const currentLength = total.innerText.length;
  if (currentLength >= 12) {
    total.classList.add("lowerFontSizeHarder");
    total.classList.remove("lowerFontSize");
  }
  if (currentLength >= 8 && currentLength < 12) {
    total.classList.add("lowerFontSize");
    total.classList.remove("lowerFontSizeHarder");
    return;
  }
  if (currentLength < 8) {
    total.classList.remove("lowerFontSize");
    total.classList.remove("lowerFontSizeHarder");
    return;
  }
});
const config = { CharacterData: true, childList: true, subtree: true };
observer.observe(total, config);


const digits = document.querySelectorAll('.digit');

window.addEventListener("keydown", preventKey);
function preventKey(e) {
  const key = e.key;
  if (key === "Enter" || key === " " || key === "Tab") {
    e.preventDefault();
    return;  
  }
}

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
    alert("숫자는 열 자리 까지만 입력 가능합니다.");
  }
}

window.addEventListener('keydown', getDigitByKey);

function getDigitByKey(e) {
  const key = e.key;
  for (let i = 0; i < 10; i++) {
    if (key === String(i)) {
      const pattern = TOTAL_PATTERN;

      if (total.innerText === '0') {
        total.innerText = String(i);
        return;
      }

      const temp = `${total.innerText}` + String(i);
      
      if (pattern.test(temp)) {
        total.innerText += String(i);
        return;
      }
    
      if (!pattern.test(temp)) {
        alert("숫자는 열 자리 까지만 입력 가능합니다.");
      }
    }
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
//window.addEventListener("keydown", e => console.log(e));


const clearAllButton = document.getElementById('clearAll');
clearAllButton.addEventListener("click", getClearAll);
window.addEventListener("keydown", getClearAllByKey);

const clearOneButton = document.getElementById('clearOne');
clearOneButton.addEventListener("click", getClearOne);
window.addEventListener("keydown", getClearOneByKey);

function getClearAll() {
  total.innerText = "0";
}

function getClearAllByKey(e) {
  const key = e.key;
  if (key === "Escape") getClearAll();
}

function getClearOne() {
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

function getClearOneByKey(e) {
  const key = e.key;
  if (key === "Backspace") getClearOne();
}

const calButton = document.getElementById('calButton');
calButton.addEventListener("click", calculate);
window.addEventListener("keydown", calculateByKey);

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
    if (total.innerText.length > 10) {
      alert('결과값이 너무 커서 추가적인 연산은 불가능합니다!\n프로그램을 종료합니다.');
      total.innerText = '0';
      return;
    }
  }
}

function calculateByKey(e) {
  const key = e.key;
  if (key === "Enter") {
    calculate();
  }
}


