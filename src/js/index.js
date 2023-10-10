import { setTotal, operatorsArray } from "./utils.js";

const digits = document.querySelectorAll('.digit');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", getDigit);
}

function getDigit(e) {
  const pattern = /^-?\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;

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
    alert("숫자는 세 자리 까지만 입력 가능합니다!");
  }
}

const operations = document.querySelectorAll('.operation');

for (let i = 0; i < operations.length-1; i++) {
  operations[i].addEventListener("click", getOperation);
}

function getOperation(e) {
  const pattern = /^-?\d{1,3}([\/\X\-\+]{1})?$/;

  if (total.innerText === '0' 
  || total.innerText[total.innerText.length-1] === '/'
  || total.innerText[total.innerText.length-1] ==='X' 
  || total.innerText[total.innerText.length-1] === '-' 
  || total.innerText[total.innerText.length-1] === '+' 
  || total.innerText[total.innerText.length-1] === '=') {
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

const total = document.querySelector('h1');

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
  const pattern = /^-?\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;
  if (total.innerText[total.innerText.length-1] === '/'
  || total.innerText[total.innerText.length-1] ==='X' 
  || total.innerText[total.innerText.length-1] === '-' 
  || total.innerText[total.innerText.length-1] === '+') {
    alert("완성되지 않은 수식입니다.")
    return;
  }

  if (pattern.test(total.innerText)) {
    let text = total.innerText;
    if (text[0] !== '-') {
      operatorsArray.forEach(el => setTotal(text, el));

      /*setTotal(text, "/");
      setTotal(text, "+");
      setTotal(text, "-");
      setTotal(text, "X");*/

      /*if (text.includes("/")) {
        const [before, after] = text.split("/").map(Number);
        total.innerText = Math.floor(before/after);
        return;
      }
      if (text.includes("+")) {
        const [before, after] = text.split("+").map(Number);
        total.innerText = before + after;
        return;
      }
      if (text.includes("-")) {
        const [before, after] = text.split("-").map(Number);
        total.innerText = before - after;
        return;
      }
      if (text.includes("X")) {
        const [before, after] = text.split("X").map(Number);
        total.innerText = before * after;
        return;
      }*/

    } else {
      let text = total.innerText.substring(1,total.innerText.length);
      if (text.includes("/")) {
        const [before, after] = text.split("/").map(Number);
        total.innerText =  -1 * before / after;
        return; 
      }
      if (text.includes("+")) {
        const [before, after] = text.split("+").map(Number);
        total.innerText =  (-1 * before + after);
        return; 
      }
      if (text.includes("-")) {
        const [before, after] = text.split("-").map(Number);
        total.innerText =  (-1 * before - after);
        return; 
      }
      if (text.includes("X")) {
        const [before, after] = text.split("X").map(Number);
        total.innerText =  -1 * before * after;
        return; 
      }
    }
  }
}


// 코드 리팩토링하기


// 1. 연산 결과값이 네자리 수 이상일 때 추가적인 연산 가능하게 하기. 
//    새로운 함수 만들어서 total.innerText 값이 네자리 이상이면...

// 2. 연산 결과값이 8자리 수 이상일 때 출력되는 결과값의 폰트 사이즈를 동적으로 줄이기
// total.innerText의 길이/8의 몫을 변수에 할당하고 그 변수보다 작게 for문 돌려서 innerHTML에 </br> 태그 추가..? 
