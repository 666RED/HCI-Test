// function delay(URL){
//   setTimeout( function() {
//     window.location = URL }, 1000);
// }

const saveButton = document.querySelector('.save-btn');
const clearAllButton = document.querySelector('.clear-btn');

const productName = document.querySelector('.product-name');
const productCost = document.querySelector('.product-cost');
const productPrice = document.querySelector('.product-price');
const productBarcode = document.querySelector('.product-barcode');
const productQuantity = document.querySelector('.product-quantity');

const nameError = document.querySelector('.name-error-box');
const costError = document.querySelector('.cost-error-box');
const priceError = document.querySelector('.price-error-box');
const barcodeError = document.querySelector('.barcode-error-box');
const quantityError = document.querySelector('.quantity-error-box');

const wholeScreen = document.querySelector('.whole-screen');
const outsideScreen = document.querySelector('.item-detail');
const addedItemfulPopup = document.querySelector('.added-item-popup');
const doneButton = document.querySelector('.done-btn');

const productArr = JSON.parse(localStorage.getItem('Inventory')) || [];

outsideScreen.addEventListener('click', (e) => {
  if(!addedItemfulPopup.contains(e.target) && addedItemfulPopup.classList.contains('open-popup')){
    window.location.href = 'inventory.html';  
    addedItemfulPopup.classList.remove('open-popup');
    wholeScreen.classList.remove('active');
  }
});

const addNewItem = (name, cost, price, barcode, quantity) => {
  productArr.push({
    name,
    cost, 
    price,
    barcode,
    quantity
  });

  localStorage.setItem('Inventory', JSON.stringify(productArr));
  addedItemfulPopup.classList.add('open-popup');
  wholeScreen.classList.add('active');
}

const validation = () => {

  let emptyName = true;
  let emptyCost = true;
  let emptyPrice = true;
  let emptyBarcode = true;
  let emptyQuantity = true;

  let validName = true;
  let validCost = true;
  let validPrice = true;
  let validBarcode = true;
  let validQuantity = true;

  if(productName.value === ''){
    nameError.style.display = 'block';
    nameError.innerText = 'Required*';
    validName = false;
  }else {
    nameError.style.display = 'none';
    emptyName = false;
  }

  if(productCost.value === ''){
    costError.style.display = 'block';
    costError.innerText = 'Required*';
    validCost = false;
  }else {
    costError.style.display = 'none';
    emptyCost = false;
  }

  if(productPrice.value === ''){
    priceError.style.display = 'block';
    priceError.innerText = 'Required*';
    validPrice = false;
  }else {
    priceError.style.display = 'none';
    emptyPrice = false;
  }

  if(productBarcode.value === ''){
    barcodeError.style.display = 'block';
    barcodeError.innerText = 'Required*';
    validBarcode = false;
  }else {
    barcodeError.style.display = 'none';
    emptyBarcode = false;
  }

  if(productQuantity.value === ''){
    quantityError.style.display = 'block';
    quantityError.innerText = 'Required*';
    validQuantity = false;
  }else {
    quantityError.style.display = 'none';
    emptyQuantity = false;
  }

  if(!emptyName){
    for(let i = 0; i < productArr.length; i++){
      if(productName.value == productArr[i].name){
        nameError.style.display = 'block';
        nameError.innerText = 'This item had already in the inventory';
        validName = false;
      }
    }
  }

  if(!emptyCost && Number(productCost.value) <= 0){
    costError.style.display = 'block';
    costError.innerText = 'Must be greater than RM 0.00';
    validCost = false;
  }

  if(!emptyPrice && Number(productPrice.value) <= 0){
    priceError.style.display = 'block';
    priceError.innerText = 'Must be greater than RM 0.00';
    validPrice = false;
  }

  if(!emptyCost && !emptyPrice && Number(productCost.value) == Number(productPrice.value)){
    priceError.style.display = 'block';
    priceError.innerText = 'Price should be greater than Cost';
    validPrice = false;
    validCost = false;
  }

  if(!emptyBarcode && productBarcode.value.length !== 13){
    barcodeError.style.display = 'block';
    barcodeError.innerText = 'Barcode must be in 13 digits';
    validBarcode = false;
  }else if(!emptyBarcode){
    for(let i = 0; i < productArr.length; i++){
      if(productBarcode.value == productArr[i].barcode){
        barcodeError.style.display = 'block';
        barcodeError.innerText = 'This barcode belongs to another product in the inventory';
          validBarcode = false;  
      }
    }
  }

  if(!emptyQuantity && Number(productQuantity.value) < 0){
    quantityError.style.display = 'block';
    quantityError.innerText = 'Must be greater than or equal to 0';
    validQuantity = false;
  }

  if(validName && validCost && validPrice && validBarcode && validQuantity){
    addNewItem(productName.value, productCost.value, productPrice.value, productBarcode.value, productQuantity.value);
  }
}

saveButton.addEventListener('click', validation);

clearAllButton.addEventListener('click', () => {
  nameError.style.display = 'none';
  costError.style.display = 'none';
  priceError.style.display = 'none';
  barcodeError.style.display = 'none';
  quantityError.style.display = 'none';
});

doneButton.addEventListener('click', () => {
  addedItemfulPopup.classList.remove('open-popup');
  wholeScreen.classList.remove('active');
  window.location.href = 'inventory.html';
});  