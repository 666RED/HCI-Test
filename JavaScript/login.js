const loginButton = document.querySelector('.login-btn');
const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const viewPasswordButton = document.querySelector('.view-password-btn');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');

const userArr = JSON.parse(localStorage.getItem('User')) || [];

viewPasswordButton.addEventListener('click', () => {
  password.type === 'password' ? password.type = 'text' : password.type = 'password';
});

const validation = () => {
  let idExist = false;

  if(id.value === '' && password.value === ''){
    idErrorBox.style.visibility = 'visible';
    idErrorBox.innerText = 'Required*';
    passwordErrorBox.style.visibility = 'visible';
    passwordErrorBox.innerText = 'Required*';
    return;
  }else if(id.value === ''){
    idErrorBox.style.visibility = 'visible';
    idErrorBox.innerText = 'Required*';
    return;
  }else if(password.value === ''){
    passwordErrorBox.style.visibility = 'visible';
    passwordErrorBox.innerText = 'Required*';
    return;
  }else if(id.value !== '' && password.value !== ''){
    idErrorBox.style.visibility = 'hidden';
    passwordErrorBox.style.visibility = 'hidden';
  }

  for(let i = 0; i < userArr.length; i++){
    if(id.value == userArr[i].name){
      idExist = true;
      break;
    }
  }

  if(idExist === false){
    idErrorBox.style.visibility = 'visible';
    idErrorBox.innerText = 'Id doesn\'t exist';
  } 

  for(let i = 0; i < userArr.length; i++){
    if(id.value == userArr[i].name && password.value == userArr[i].password){
      window.location.href = 'index.html';
    }else if(id.value == userArr[i].name && password.value != userArr[i].password){
      passwordErrorBox.style.visibility = 'visible';
      passwordErrorBox.innerText = 'Incorrect Password';
      password.value = '';
    }
  }
}

loginButton.addEventListener('click', validation);

localStorage.setItem('User', JSON.stringify([{name:'red', password:'666'}, {name:'cs', password:'1234'}, {name:'edison', password:'0000'}]));