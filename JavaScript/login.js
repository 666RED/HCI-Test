const loginButton = document.querySelector('.login-btn');
const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const viewPasswordButton = document.querySelector('.view-password-btn');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const passwordBox = document.querySelector('.password-box');
const ownerRegister = document.querySelector('.owner-option');
const employeeRegister = document.querySelector('.employee-option');
const radioButtons = document.getElementsByName('staff')
const errorPopup = document.querySelector('.error-pop-up');
const okBtn = document.querySelector('.error-ok-btn');
const cancelBtn = document.querySelector('.error-cancel-img');
const errorMessage = document.querySelector('.error-message');
const forgetPassword = document.querySelector('.forget-password-text');

const shopOwnerArr = JSON.parse(localStorage.getItem('Owner')) || [];
const employeeArr = JSON.parse(localStorage.getItem('Employee')) || [];

forgetPassword.addEventListener('click', () => {
  window.location.href = 'reset-password.html';
});

const radioSelect = () => {
  let radioResult;
  for(let i = 0; i < radioButtons.length; i++){
    if(radioButtons[i].checked){
      radioResult = radioButtons[i].value;
    }
  }
  return radioResult;
}

okBtn.addEventListener('click', () => {
  errorPopup.classList.remove('open-popup');
});

cancelBtn.addEventListener('click', () => {
  errorPopup.classList.remove('open-popup');
});

ownerRegister.addEventListener('click', () => {
  const radioResult = radioSelect();
  if(radioResult == 'employee'){
    errorPopup.classList.add('open-popup');
    errorMessage.textContent = 'You don\'t have permission to do this';
  }else if(shopOwnerArr.length != 0){
    errorPopup.classList.add('open-popup');
    errorMessage.textContent = 'Already registered';
  }else {
    window.location.href = 'register-owner.html';
  }
});

employeeRegister.addEventListener('click', () => {
  const radioResult = radioSelect();
  if(radioResult == 'employee'){
    errorPopup.classList.add('open-popup');
    errorMessage.textContent = 'You don\'t have permission to do this';
  }else if(shopOwnerArr.length == 0){
    errorPopup.classList.add('open-popup');
    errorMessage.textContent = 'Register a shop owner first';
  }
  else{
    window.location.href = 'register-employee.html';
  }
});

viewPasswordButton.addEventListener('click', () => {
  password.type === 'password' ? password.type = 'text' : password.type = 'password';
});

const validation = () => {
  const radioResult = radioSelect();

  let emptyId = true;
  let emptyPassword = true;

  let validId = false;
  let validPassword = false;

  if(id.value === ''){
    idErrorBox.style.display = 'block';
    idErrorBox.innerText = 'Required*';
  }else{
    idErrorBox.style.display = 'none';
    emptyId = false;
  }

  if(password.value === ''){
    passwordErrorBox.style.display = 'block';
    passwordErrorBox.innerText = 'Required*';
  }else{
    passwordErrorBox.style.display = 'none';
    emptyPassword = false;
  }

  if(!emptyId){
    if(radioResult == 'shop-owner'){
      if(id.value == shopOwnerArr[0].id){
        validId = true;
      }else {
        idErrorBox.style.display = 'block';
        idErrorBox.innerText = 'Id doesn\'t exist';
      }
    }else if(radioResult == 'employee'){
      for(let i = 0; i < employeeArr.length; i++){
        if(employeeArr[i].id == id.value){
          validId = true;
          break;
        }
      }
      if(!validId){
        idErrorBox.style.display = 'block';
        idErrorBox.innerText = 'Id doesn\'t exist';
      }
    }
  }

  if(!emptyPassword){
    if(radioResult == 'shop-owner'){
      if(password.value == shopOwnerArr[0].password){
        validPassword = true;
      }else {
        passwordErrorBox.style.display = 'block';
        passwordErrorBox.innerText = 'Incorrect Password';
      }
    }else if(radioResult == 'employee'){
      for(let i = 0; i < employeeArr.length; i++){
        if(employeeArr[i].password == password.value){
          validPassword = true;
          break;
        }
      }
      if(!validPassword){
        passwordErrorBox.style.display = 'block';
        passwordErrorBox.innerText = 'Incorrect Password';
      }
    }
  }

  if(validId && validPassword){
    window.location.href = 'checkout.html';
  }
}

loginButton.addEventListener('click', validation);