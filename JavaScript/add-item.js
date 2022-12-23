const saveButton = document.querySelector('.save-btn');
const clearAllButton = document.querySelector('.clear-btn');

const productName = document.querySelector('.product-name');
const productCost = document.querySelector('.product-cost');
const productPrice = document.querySelector('.product-price');
const productBarcode = document.querySelector('.product-barcode');
const productQuantity = document.querySelector('.quantity');
const productSupplierName = document.querySelector('.item-supplier-name-textarea');
const productSupplierPhoneNumber = document.querySelector('.item-supplier-phone-number-text');
const productSupplierLocation = document.querySelector('.item-supplier-location-textarea');
const productCategory = document.querySelector('.category-box');
const productUnit = document.querySelector('.unit-box');
const productNotification = document.querySelector('.notification');

const nameError = document.querySelector('.name-error-box');
const costError = document.querySelector('.cost-error-box');
const priceError = document.querySelector('.price-error-box');
const barcodeError = document.querySelector('.barcode-error-box');
const quantityError = document.querySelector('.quantity-error-box');
const supplierNameError = document.querySelector('.supplier-name-error-box');
const supplierPhoneNumberError = document.querySelector('.supplier-phone-number-error-box');
const supplierLocationError = document.querySelector('.supplier-location-error-box'); 
const notificationError = document.querySelector('.notification-error-box');

const wholeScreen = document.querySelector('.whole-screen');
const outsideScreen = document.querySelector('.item-detail');
const addedItem = document.querySelector('.added-item-popup');
const doneButton = document.querySelector('.done-btn');

const productArr = JSON.parse(localStorage.getItem('Inventory')) || [];

outsideScreen.addEventListener('click', (e) => {
  if(!addedItem.contains(e.target) && addedItem.classList.contains('open-popup')){
    window.location.href = '/HTML/General/inventory.html';  
    addedItem.classList.remove('open-popup');
    wholeScreen.classList.remove('active');
  }
});

const addNewItem = (name, cost, price, barcode, quantity, category, unit, supplierName, supplierPhoneNumber, supplierLocation, notification) => {
  productArr.push({
    name,
    cost, 
    price,
    barcode,
    quantity,
    category,
    unit,
    supplierName,
    supplierPhoneNumber,
    supplierLocation,
    notification
  });

  localStorage.setItem('Inventory', JSON.stringify(productArr));
  addedItem.classList.add('open-popup');
  wholeScreen.classList.add('active');
}

const validation = () => {

  let emptyName = true;
  let emptyCost = true;
  let emptyPrice = true;
  let emptyBarcode = true;
  let emptyQuantity = true;
  let emptyNotification = true;

  let validName = true;
  let validCost = true;
  let validPrice = true;
  let validBarcode = true;
  let validQuantity = true;
  let validNotification = true;

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

  if(productNotification.value === ''){
    notificationError.style.display = 'block';
    notificationError.innerText = 'Required*';
    validNotification = false;
  }else {
    notificationError.style.display = 'none';
    emptyNotification = false;
  }

  if(!emptyName && !emptyNotification){
    for(let i = 0; i < productArr.length; i++){
      if(`${productName.value.toLowerCase()} (${productUnit.value})` == productArr[i].name.toLowerCase()){
        nameError.style.display = 'block';
        nameError.innerText = 'This item had already in the inventory';
        validName = false;
        break;
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
          break; 
      }
    }
  }

  if(!emptyQuantity && Number(productQuantity.value) < 0){
    quantityError.style.display = 'block';
    quantityError.innerText = 'Must be greater than or equal to 0';
    validQuantity = false;
  }

  if(validName && validCost && validPrice && validBarcode && validQuantity && validNotification){
    const arr = productName.value.split(' ');
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    productName.value = arr.join(' ') + ` (${productUnit.value})`;
    addNewItem(productName.value, productCost.value, productPrice.value, productBarcode.value, productQuantity.value, productCategory.value, productUnit.value, productSupplierName.value, productSupplierPhoneNumber.value, productSupplierLocation.value, productNotification.value);
  }
}

saveButton.addEventListener('click', validation);

clearAllButton.addEventListener('click', () => {
  nameError.style.display = 'none';
  costError.style.display = 'none';
  priceError.style.display = 'none';
  barcodeError.style.display = 'none';
  quantityError.style.display = 'none';
  notificationError.style.display = 'none';
});

doneButton.addEventListener('click', () => {
  addedItem.classList.remove('open-popup');
  wholeScreen.classList.remove('active');
  window.location.href = '/HTML/General/inventory.html';
});  