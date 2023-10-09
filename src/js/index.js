const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.operation');
const clearAllButton = document.getElementById('clearAll');
const clearOneButton = document.getElementById('clearOne');
const total = document.querySelector('h1');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", getDigit);
}

for (let i = 0; i < operations.length-1; i++) {
  operations[i].addEventListener("click", getOperation);
}

clearAllButton.addEventListener("click", getClearAll);

clearOneButton.addEventListener("click", getClearOne);

function getDigit(e) {
  const pattern = /^\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;

  if (total.innerText === '0') {
    total.innerText = `${e.currentTarget.innerText}`;
    return;
  }

  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;
  
  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`;
    return;
  }
  //숫자 세자리까지만 입력 가능하다는 경고창 구현
  if (!pattern.test(temp)) {
    alert("숫자는 세 자리 까지만 입력 가능합니다!");
  }
}

function getOperation(e) {
  const pattern = /^\d{1,3}([\/\X\-\+]{1})?$/;

  if (total.innerText === '0' || total.innerText[total.innerText.length-1] === '/'
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

function getClearAll(e) {
  total.innerText = "0";
}

// 입력값 중 한 칸 지우는 버튼 동작 구현
function getClearOne(e) {
  let tempStr = total.innerText;
  let newStr = tempStr.substring(0, tempStr.length-1);
  total.innerText = newStr;
}

// 정규식대로 total.innerText에 입력된 값에서 = 기호 클릭 시 계산 결과를 total.innerText에 넣기 
const calButton = document.getElementById('calButton');
calButton.addEventListener("click", calculate);

function calculate() {
  const pattern = /^\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;

  // innerText가 연산자 기호로 끝날 때 "완성되지 않은 수식입니다." 경고창 출력
  if (total.innerText[total.innerText.length-1] === '/'
  || total.innerText[total.innerText.length-1] ==='X' 
  || total.innerText[total.innerText.length-1] === '-' 
  || total.innerText[total.innerText.length-1] === '+') {
    alert("완성되지 않은 수식입니다.")
    return;
  }

  // innerText가 앞자리 숫자만 있거나 정규식대로 끝날 때 = 기호 클릭 시 결과 출력
  if (pattern.test(total.innerText)) {
    let text = total.innerText;

    if (text.includes("/")) {
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
    }
  }
}

// 한칸 지우는 버튼 추가 구현해보기

