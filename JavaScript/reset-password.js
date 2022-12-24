const popup = document.querySelector('.successful-popup');
const okButton = document.querySelector('.done-btn');
const confirmButton = document.querySelector('.confirm-btn');
const phoneNumberInput = document.querySelector('.phone-number-input');
const phoneNumberError = document.querySelector('.phone-number-error-box');
const message = document.querySelector('.success-message');
const wholeContainer = document.querySelector('.whole-container');

const shopOwnerArr = JSON.parse(localStorage.getItem('Owner')) || [];
const employeeArr = JSON.parse(localStorage.getItem('Employee')) || [];

okButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

confirmButton.addEventListener('click', () => {
  let validPhoneNumber = false;
  if(phoneNumberInput.value == ''){
    phoneNumberError.style.display = 'block';
    phoneNumberError.innerText = 'Required*';
    return;
  }
  if(phoneNumberInput.value.length == 9 && /\d{9}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 10 && /\d{10}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 11 && /\d{11}/.test(phoneNumberInput.value)){
    validPhoneNumber = true;
  }else {
    phoneNumberError.style.display = 'block';
    phoneNumberError.innerText = 'Invalid phone number';
  }
  if(validPhoneNumber){
    for(let i = 0; i < employeeArr.length; i++){
      if(phoneNumberInput.value == employeeArr[i].phoneNumber){
        popup.classList.add('open-popup');
        wholeContainer.classList.add('active');
        message.innerText = 'New password has been sent to this number\n\n' + phoneNumberInput.value;
        return;
      }
    }
    if(phoneNumberInput.value == shopOwnerArr[0].phoneNumber){
      popup.classList.add('open-popup');
      wholeContainer.classList.add('active');
      message.innerText = 'New password has been sent to this number\n\n' + phoneNumberInput.value;
      return;
    }
    phoneNumberError.style.display = 'block';
    phoneNumberError.innerText = 'Phone number not registered';
  }
});