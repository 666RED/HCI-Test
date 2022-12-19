const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const confirmedPassword = document.querySelector('.confirmed-password-input');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const confirmedPasswordErrorBox = document.querySelector('.confirmed-password-error-box');
const registerButton = document.querySelector('.register-btn'); 

const userArr = JSON.parse(localStorage.getItem('User')) || [];

const validation = () => {

  let emptyIdInput = true;
  let emptyPasswordInput = true;
  let emptyConfirmedPasswordInput = true;

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
    }
  }

  if(!emptyPasswordInput && !emptyConfirmedPasswordInput){
    if(password.value !== confirmedPassword.value){
      confirmedPasswordErrorBox.style.display = 'block';
      confirmedPasswordErrorBox.innerText = 'Passwords are not the same';
    }else if(!emptyIdInput){
      registerNewUser(id.value, password.value);
    }
  }
};

const registerNewUser = (id, password) => {
  userArr.push({
    id,
    password
  });

  localStorage.setItem('User', JSON.stringify(userArr));
};

registerButton.addEventListener('click', validation);