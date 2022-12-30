const returnIcon = document.querySelector('.return-icon');
const editAndSaveButton = document.querySelector('.edit-and-save-btn');

const nameInput = document.querySelector('.supplier-name');
const phoneNumberInput = document.querySelector('.phone-number');
const locationInput = document.querySelector('.supplier-location');

const supplierNameError = document.querySelector('.supplier-name-error-box');
const phoneNumberError = document.querySelector('.phone-number-error-box');
const supplierLocationError = document.querySelector('.supplier-location-error-box');
const successfulPopup = document.querySelector('.successful-popup');
const doneButton = document.querySelector('.done-btn');
const wholeScreen = document.querySelector('.whole-screen');

const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];
const tempArr = JSON.parse(sessionStorage.getItem('Supplier')) || [];

returnIcon.addEventListener('click', () => {
  window.location.href = 'view-supplier.html';
});

doneButton.addEventListener('click', () => {
  window.location.href = 'view-supplier.html';
});

editAndSaveButton.addEventListener('click', validation);

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
    for(let i = 0; i < supplierArr.length; i++){
      if(nameInput.value == supplierArr[i].supplierName && nameInput.value != tempArr[0].supplierName){
        supplierNameError.style.display = 'block';
        supplierNameError.innerText = 'Already Added';
        break;
      }else if(i == supplierArr.length - 1){
        validSupplierName = true;
      }
    }
  }

  if(!emptyPhoneNumber){
    for(let i = 0; i < supplierArr.length; i++){
      if(phoneNumberInput.value == supplierArr[i].phoneNumber && phoneNumberInput.value != tempArr[0].phoneNumber){
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
    for(let i = 0; i < supplierArr.length; i++){
      if(tempArr[0].supplierName == supplierArr[i].supplierName){
        supplierArr[i].supplierName = nameInput.value;
        supplierArr[i].phoneNumber = phoneNumberInput.value;
        supplierArr[i].supplierLocation = locationInput.value;

        localStorage.setItem('Supplier', JSON.stringify(supplierArr));
        break;
      }
    }
    wholeScreen.classList.add('active');
    successfulPopup.classList.add('open-popup');
  }
}

window.onload = displaySupplier();

function displaySupplier() {
  nameInput.value = tempArr[0].supplierName;
  phoneNumberInput.value = tempArr[0].phoneNumber;
  locationInput.value = tempArr[0].supplierLocation;
}