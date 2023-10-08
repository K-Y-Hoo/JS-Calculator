const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.operation');
const modifier = document.querySelector('.modifier');
const total = document.querySelector('h1');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", getDigit);
}

for (let i = 0; i < operations.length-1; i++) {
  operations[i].addEventListener("click", getOperation);
}

modifier.addEventListener("click", getModifier);

function getDigit(e) {
  const pattern = /^\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;

  if (total.innerText === '0') {
    total.innerText = `${e.currentTarget.innerText}`;
    return;
  }

  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;
  
  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`;
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

function getModifier(e) {
  total.innerText = "0";
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


  // innerText가 앞자리 숫자만 있거나 정규식대로 끝날 때
  if (pattern.test(total.innerText)) {
    let text = total.innerText;
    console.log(typeof text, text);



  }
}

