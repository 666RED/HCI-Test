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

const userArr = JSON.parse(localStorage.getItem('Owner')) || [];

returnIcon.addEventListener('click', () => {
  window.location.href = '/HTML/General/index.html';
});

doneButton.addEventListener('click', () => {
  successfulPopup.classList.remove('open-popup');
  blur.classList.remove('active');
  window.location.href = '/HTML/General/index.html';
});

const validation = () => {

  let emptyPhoneNumberInput = true;
  let emptyIdInput = true;
  let emptyPasswordInput = true;
  let emptyConfirmedPasswordInput = true;

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
      for(let i = 0; i < userArr.length; i++){
        if(id.value === userArr[i].id){
          idErrorBox.style.display = 'block';
          idErrorBox.innerText = 'User already existed';
          id.value = '';
          return;
        }
      }
    }
  }

  if(!emptyPasswordInput && !emptyConfirmedPasswordInput){
    if(password.value !== confirmedPassword.value){
      confirmedPasswordErrorBox.style.display = 'block';
      confirmedPasswordErrorBox.innerText = 'Passwords are not the same';
    }else if(!emptyIdInput && !emptyPhoneNumberInput){
      registerNewUser(phoneNumber.value, id.value, password.value);
    }
  }
};

const registerNewUser = (phoneNumber, id, password) => {
  userArr.push({
    phoneNumber,
    id,
    password
  });

  localStorage.setItem('Owner', JSON.stringify(userArr));
  blur.classList.add('active');
  successfulPopup.classList.add('open-popup');
};

registerButton.addEventListener('click', validation);