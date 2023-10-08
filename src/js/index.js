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


function getDigit(e) {
  total.innerText = `${e.currentTarget.innerText}`;
}

function getOperation(e) {
  total.innerText = `${e.currentTarget.innerText}`;
}

function getModifier(e) {
  total.innerText = "0";
}