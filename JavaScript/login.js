const loginButton = document.querySelector('.login-btn');
const id = document.querySelector('.id-input');
const password = document.querySelector('.password-input');
const viewPasswordButton = document.querySelector('.view-password-btn');
const idErrorBox = document.querySelector('.id-error-box');
const passwordErrorBox = document.querySelector('.password-error-box');
const passwordBox = document.querySelector('.password-box');
const radioButtons = document.getElementsByName('staff')
const errorPopup = document.querySelector('.error-pop-up');
const okBtn = document.querySelector('.error-ok-btn');
const cancelBtn = document.querySelector('.error-cancel-img');
const errorMessage = document.querySelector('.error-message');
const forgetPassword = document.querySelector('.forget-password-text');
const register = document.querySelector('.register');

const shopOwnerArr = [];
shopOwnerArr.push({
  id:'1234',
  password:'qwer',
  phoneNumber:'01110789940'
});
localStorage.setItem('Owner', JSON.stringify(shopOwnerArr));

const supplierArr = [
  {
    supplier:'supplier-1',
    name:'Happy Day Stationery Trading',
    phoneNumber:'014-6253191',
    location:'43, Jalan Flora Utama 3, Taman Flora Utama, 83000 Batu Pahat, Johor'
  },

  {
    supplier:'supplier-2',
    name:'ROTINAS BAKERY & CONFECTIONERY SDN BHD',
    phoneNumber:'07-5114117',
    location:'19, Jalan Wira 8, Taman Tan Sri Yacob, 81300 Skudai, Johor'
  },

  {   
    supplier:'supplier-3',
    name:'Perniagaan Yong Soon Huat',
    phoneNumber:'0111-1977682',
    location:'28, Jalan Dato Muthuthambi (Lorong 3), Tampoi, 80200 Johor Bahru, Johor'
  },

  {
    supplier:'supplier-4',
    name:'SRI DISTA EGG SUPPLY AND TRADING',
    phoneNumber:'07-7717261',
    location:'29(Ground Floor, Jalan Langsat, Kampung Masjid Lama, 86000 Kluang, Johor'
  },

  {
    supplier:'supplier-5',
    name:'Pemborong Barang Barang Runcit Hse',
    phoneNumber:'016-7112786',
    location:'1-31, Jln Datin Halimah, Larkin Indah, 80350 Johor Bahru, Johor'
  },
];

localStorage.setItem('Supplier', JSON.stringify(supplierArr));

const productArr = [
  {
    name:'100 Plus (x24)',
    price:'50.00',
    barcode:'1231231231234',
    unit:'piece',
    supplier:'Happy Day Stationery Trading'
  },

  {
    name:'Coke (x24)',
    price:'60.00',
    barcode:'1231231231235',
    unit:'box',
    supplier:'Happy Day Stationery Trading'
  },

  {
    name:'Orange Juice (x24)',
    price:'30.00',
    barcode:'1231231231236',
    unit:'box',
    supplier:'ROTINAS BAKERY & CONFECTIONERY SDN BHD'
  },

  {
    name:'Sprite (x24)',
    price:'100.00',
    barcode:'1231231231237',
    unit:'box',
    supplier:'ROTINAS BAKERY & CONFECTIONERY SDN BHD'
  }
];

localStorage.setItem('Supplier Product', JSON.stringify(productArr));

const employeeArr = JSON.parse(localStorage.getItem('Employee')) || [];

register.addEventListener('click', () => {
  window.location.href = 'register.html';
});

forgetPassword.addEventListener('click', () => {
  const radioResult = radioSelect();

  if(radioResult == 'employee' && employeeArr.length != 0){
    window.location.href = 'reset-password.html';
  }else if(radioResult == 'shop-owner'){
    window.location.href = 'reset-password.html';
  }else{
    errorPopup.classList.add('open-popup');
    errorMessage.innerText = 'No staff registered';
  }
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

  if(!emptyPassword && validId){
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