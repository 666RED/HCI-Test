const phoneNumber = document.querySelector('.phone-number-input');
const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const confirmedPassword = document.querySelector('.confirmed-password-input');
const phoneNumberErrorBox = document.querySelector('.phone-number-error-box');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const confirmedPasswordErrorBox = document.querySelector('.confirmed-password-error-box');
const registerButton = document.querySelector('.register-btn');  
const blur = document.querySelector('.whole-screen');
const successfulPopup = document.querySelector('.successful-popup');
const doneButton = document.querySelector('.done-btn');
const returnIcon = document.querySelector('.return-icon');

returnIcon.addEventListener('click', () => {
  window.location.href = 'index.html';  
});

doneButton.addEventListener('click', () => {
  successfulPopup.classList.remove('open-popup');
  blur.classList.remove('active');
  window.location.href = 'index.html';
});

const userArr = [];

const validation = () => {

  let emptyIdInput = true;
  let emptyPasswordInput = true;
  let emptyConfirmedPasswordInput = true;
  let emptyPhoneNumberInput = true;

  let validIdInput = false;
  let validPasswordInput = false;
  let validConfirmedPasswordInput = false;
  let validPhoneNumberInput = false;

  if(phoneNumber.value === ''){
    phoneNumberErrorBox.style.display = 'block';
    phoneNumberErrorBox.innerText = 'Required*';
  }else{
    phoneNumberErrorBox.style.display = 'none';
    emptyPhoneNumberInput = false;
  }

  if(id.value === ''){
    idErrorBox.style.display = 'block';
    idErrorBox.innerText = 'Required*';
  }else{
    idErrorBox.style.display = 'none';
    emptyIdInput = false;
  }

  if(password.value === ''){
    passwordErrorBox.style.display = 'block';
    passwordErrorBox.innerText = 'Required*';
  }else{
    passwordErrorBox.style.display = 'none';
    emptyPasswordInput = false;
  }

  if(confirmedPassword.value === ''){
    confirmedPasswordErrorBox.style.display = 'block';
    confirmedPasswordErrorBox.innerText = 'Required*';
  }else{
    confirmedPasswordErrorBox.style.display = 'none';
    emptyConfirmedPasswordInput = false;
  }

  if(!emptyIdInput){
    if(isNaN(Number(id.value))){
      idErrorBox.style.display = 'block';
      idErrorBox.innerText = 'Digit only';
      id.value = '';
    }else if(id.value.length !== 4){
      idErrorBox.style.display = 'block';
      idErrorBox.innerText = 'Must be in 4 digits';
      id.value = '';
    }else {
      validIdInput = true;
    }
  }

  if(!emptyPasswordInput && !emptyConfirmedPasswordInput){
    if(password.value !== confirmedPassword.value){
      confirmedPasswordErrorBox.style.display = 'block';
      confirmedPasswordErrorBox.innerText = 'Passwords are not the same';
    }else{
      validPasswordInput = true;
      validConfirmedPasswordInput = true;
    }
  }

  if(!emptyPhoneNumberInput){
    if(phoneNumber.value.length == 9 && /\d{9}/ || phoneNumber.value.length == 10 && /\d{10}/ || phoneNumber.value.length == 11 && /\d{11}/){
      validPhoneNumberInput = true;
    }else {
      phoneNumberErrorBox.style.display = 'block';
      phoneNumberErrorBox.innerText = 'Invalid Phone Number';
    }
  }

  if(validIdInput && validPasswordInput && validConfirmedPasswordInput && validPhoneNumberInput){
    registerNewUser(id.value, password.value, phoneNumber.value);
  }
};

const registerNewUser = (id, password, phoneNumber) => {
  userArr.push({
    id,
    password,
    phoneNumber
  });

  localStorage.setItem('Owner', JSON.stringify(userArr));
  blur.classList.add('active');
  successfulPopup.classList.add('open-popup');
};

registerButton.addEventListener('click', validation);