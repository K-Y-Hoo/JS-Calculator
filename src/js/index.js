const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.operation');
const modifier = document.querySelector('.modifier');
const total = document.querySelector('h1');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", getDigit);
}

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", getOperation);
}

modifier.addEventListener("click", getModifier);

// /^\d{3}$/

function getDigit(e) {
  //const pattern = /^\d{3}$/;

  const pattern = /^\d{1,3}([\/\X\-\+]{1}\d{1,3})?$/;
  if (total.innerText === '0') {
    total.innerText = `${e.currentTarget.innerText}`;
    return;
  }

  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;
  //console.log(temp);
  
  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`
  }
  
}

function getOperation(e) {
  const pattern = /^\d{1,3}([\/\X\-\+]{1})?$/;
  if (total.innerText === '0' || total.innerText[total.innerText.length-1] === '/'
  || total.innerText[total.innerText.length-1] ==='X' || total.innerText[total.innerText.length-1] === '-' ||
  total.innerText[total.innerText.length-1] === '+' || total.innerText[total.innerText.length-1] === '=') {
    return;
  }
  const temp = `${total.innerText}` + `${e.currentTarget.innerText}`;
  console.log(temp);
  if (pattern.test(temp)) {
    total.innerText += `${e.currentTarget.innerText}`;
  }
}

function getModifier(e) {
  total.innerText = "0";
}