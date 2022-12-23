const loginButton = document.querySelector('.login-btn');
const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const viewPasswordButton = document.querySelector('.view-password-btn');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const passwordBox = document.querySelector('.password-box');
const ownerRegister = document.querySelector('.owner-option');
const employeeRegister = document.querySelector('.employee-option');

const userArr = JSON.parse(localStorage.getItem('Owner')) || [];

ownerRegister.addEventListener('click', () => {
  if(userArr.length != 0){
    
  }
  window.location.href = '/HTML/Owner/register-owner.html';
});

employeeRegister.addEventListener('click', () => {
  window.location.href = '/HTML/Owner/register-employee.html';
});

viewPasswordButton.addEventListener('click', () => {
  password.type === 'password' ? password.type = 'text' : password.type = 'password';
});

const validation = () => {

  let emptyId = true;
  let emptyPassword = true;
  let idExist = false;

  if(id.value === ''){
    idErrorBox.style.visibility = 'visible';
    idErrorBox.innerText = 'Required*';
  }else{
    idErrorBox.style.visibility = 'hidden';
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
    for(let i = 0; i < userArr.length; i++){
      if(id.value == userArr[i].id){
        idExist = true;
        break;
      }
    }
    if(idExist === false){
      idErrorBox.style.visibility = 'visible';
      idErrorBox.innerText = 'Id doesn\'t exist';
    } 
  }

  if(!emptyId && !emptyPassword){
    for(let i = 0; i < userArr.length; i++){
      if(id.value == userArr[i].id && password.value == userArr[i].password){
        window.location.href = '/HTML/General/checkout.html';
      }else if(id.value == userArr[i].id && password.value != userArr[i].password){
        passwordErrorBox.style.display = 'block';
        passwordErrorBox.innerText = 'Incorrect Password';
        password.value = '';
      }
    }
  }
}

loginButton.addEventListener('click', validation);