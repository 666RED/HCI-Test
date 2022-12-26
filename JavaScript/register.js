const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const nextButton = document.querySelector('.next-btn');
const viewPasswordButton = document.querySelector('.view-password-btn');

const shopOwnerArr = JSON.parse(localStorage.getItem('Owner'));

viewPasswordButton.addEventListener('click', () => {
  password.type === 'password' ? password.type = 'text' : password.type = 'password';
});

nextButton.addEventListener('click', () => {
  validation();
});

const validation = () => {

  let emptyIdInput = true;
  let emptyPasswordInput = true;

  let validIdInput = false;
  let validPasswordInput = false;

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

  if(!emptyIdInput){
    if(isNaN(Number(id.value))){
      idErrorBox.style.display = 'block';
      idErrorBox.innerText = 'Digit only';
      id.value = '';
    }else if(id.value.length !== 4){
      idErrorBox.style.display = 'block';
      idErrorBox.innerText = 'Must be in 4 digits';
      id.value = '';
    }else if(id.value != shopOwnerArr[0].id){
      idErrorBox.style.display = 'block';
      idErrorBox.innerText = 'Id doesn\'t exist';
    }else {
      validIdInput = true;
    }
  }

  if(!emptyPasswordInput && validIdInput){
    if(password.value != shopOwnerArr[0].password){
      passwordErrorBox.style.display = 'block';
      passwordErrorBox.innerText = 'Incorrect Password';
      password.value = '';
    }else {
      validPasswordInput = true;
    }
  }

  if(validIdInput && validPasswordInput){
    window.location.href = 'register-employee.html';
  }
};