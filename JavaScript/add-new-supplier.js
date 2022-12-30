const returnIcon = document.querySelector('.return-icon');
const clearAllButton = document.querySelector('.clear-all-btn');
const confirmAndSaveButton = document.querySelector('.confirm-and-save-btn');

const nameInput = document.querySelector('.supplier-name');
const phoneNumberInput = document.querySelector('.phone-number');
const locationInput = document.querySelector('.supplier-location')

const supplierNameError = document.querySelector('.supplier-name-error-box');
const phoneNumberError = document.querySelector('.phone-number-error-box');
const supplierLocationError = document.querySelector('.supplier-location-error-box');
const successfulPopup = document.querySelector('.successful-popup');
const doneButton = document.querySelector('.done-btn');
const wholeScreen = document.querySelector('.whole-screen');

const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];

returnIcon.addEventListener('click', () => {
  window.location.href = 'view-supplier.html';
});

clearAllButton.addEventListener('click', () => {
  nameInput.value = '';
  phoneNumberInput.value = '';
  locationInput.value = '';
});

doneButton.addEventListener('click', () => {
  window.location.href = 'view-supplier.html';
});

confirmAndSaveButton.addEventListener('click', validation);

function validation() {
  let emptySupplierName = true;
  let emptyPhoneNumber = true;

  let validSupplierName = false;
  let validPhoneNumber = false;
  let validLocation = false;

  if(nameInput.value == ''){
    supplierNameError.style.display = 'block';
    supplierNameError.innerText = 'Required';
  }else {
    supplierNameError.style.display = 'none';
    emptySupplierName = false;
  }

  if(phoneNumberInput.value == ''){
    phoneNumberError.style.display = 'block';
    phoneNumberError.innerText = 'Required';
  }else {
    phoneNumberError.style.display = 'none';
    emptyPhoneNumber = false;
  }

  if(locationInput.value == ''){
    supplierLocationError.style.display = 'block';
    supplierLocationError.innerText = 'Required';
  } else {
    supplierLocationError.style.display = 'none';
    validLocation = true;
  }

  if(!emptySupplierName){
    if(supplierArr.length == 0){
      validSupplierName = true;
    }
    for(let i = 0; i < supplierArr.length; i++){
      if(nameInput.value == supplierArr[i].supplierName){
        supplierNameError.style.display = 'block';
        supplierNameError.innerText = 'Already Added';
        break;
      }else if(i == supplierArr.length - 1){
        validSupplierName = true;
      }
    }
  }

  if(!emptyPhoneNumber){
    if(supplierArr.length == 0){
      if(phoneNumberInput.value.length == 9 && /\d{9}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 10 && /\d{10}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 11 && /\d{11}/.test(phoneNumberInput.value)){
        validPhoneNumber = true;
      }else {
        phoneNumberError.style.display = 'block';
        phoneNumberError.innerText = 'Invalid phone number';
      }
    }

    for(let i = 0; i < supplierArr.length; i++){
      if(phoneNumberInput.value == supplierArr[i].phoneNumber){
        phoneNumberError.style.display = 'block';
        phoneNumberError.innerText = 'This phone number already added';
        break;
      }else if(i == supplierArr.length - 1){
        if(phoneNumberInput.value.length == 9 && /\d{9}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 10 && /\d{10}/.test(phoneNumberInput.value) || phoneNumberInput.value.length == 11 && /\d{11}/.test(phoneNumberInput.value)){
          validPhoneNumber = true;
        }else {
          phoneNumberError.style.display = 'block';
          phoneNumberError.innerText = 'Invalid phone number';
        }
      }
    }
  }

  if(validSupplierName && validPhoneNumber && validLocation){
    supplierArr.push({
      supplierName:nameInput.value,
      phoneNumber:phoneNumberInput.value,
      supplierLocation:locationInput.value
    });
    localStorage.setItem('Supplier', JSON.stringify(supplierArr));
    wholeScreen.classList.add('active');
    successfulPopup.classList.add('open-popup');
  }
}