const productName = document.querySelector('.product-name');
const productCost = document.querySelector('.product-cost');
const productPrice = document.querySelector('.product-price');
const productBarcode = document.querySelector('.product-barcode');
const productQuantity = document.querySelector('.quantity');
const supplierName = document.querySelector('.supplier-name');
const supplierPhoneNumber = document.querySelector('.supplier-phone-number');
const supplierLocation = document.querySelector('.supplier-location');
const productCategory = document.querySelector('.category-box');
const productUnit = document.querySelector('.unit-box');
const productNotification = document.querySelector('.notification');
const wholeScreen = document.querySelector('.whole-screen');
const saveBtn = document.querySelector('.save-btn');
const productUpdatedPopup = document.querySelector('.product-updated-popup');
const productUpdatedDoneBtn = document.querySelector('.product-updated-done-btn');

const outsideScreen = document.querySelector('.item-detail');

const nameError = document.querySelector('.name-error-box');
const costError = document.querySelector('.cost-error-box');
const priceError = document.querySelector('.price-error-box');
const barcodeError = document.querySelector('.barcode-error-box');
const quantityError = document.querySelector('.quantity-error-box');
const supplierNameError = document.querySelector('.supplier-name-error-box');
const supplierPhoneNumberError = document.querySelector('.supplier-phone-number-error-box');
const supplierLocationError = document.querySelector('.supplier-location-error-box');
const notificationError = document.querySelector('.notification-error-box');

const singleProductArr = JSON.parse(sessionStorage.getItem('Product'));
const productArr = JSON.parse(localStorage.getItem('Inventory'));
const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];

supplierName.addEventListener('change', () => {
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierName.value == supplierArr[i].supplierName){
      supplierPhoneNumber.value = supplierArr[i].phoneNumber;
      supplierLocation.value = supplierArr[i].supplierLocation;
    }
  }
});

outsideScreen.addEventListener('click', (e) => {
  if(!productUpdatedPopup.contains(e.target) && productUpdatedPopup.classList.contains('open-popup')){
    window.location.href = 'inventory.html';  
    productUpdatedPopup.classList.remove('open-popup');
    wholeScreen.classList.remove('active');
    sessionStorage.clear();
  }
});

const displayProductDetail = () => {
  productName.value = singleProductArr[0].name;
  productCost.value = singleProductArr[0].cost.replace('RM ', '');
  productPrice.value = singleProductArr[0].price.replace('RM ', '');
  productBarcode.value = singleProductArr[0].barcode;
  productQuantity.value = singleProductArr[0].quantity;

  for(let i = 0; i < supplierArr.length; i++){
    const supplierOption = document.createElement('option');
    supplierOption.setAttribute('value', supplierArr[i].supplierName);
    supplierOption.innerText = supplierArr[i].supplierName;
    supplierName.append(supplierOption);
  }
  supplierName.value = singleProductArr[0].supplierName;
  supplierPhoneNumber.value = singleProductArr[0].supplierPhoneNumber;
  supplierLocation.value = singleProductArr[0].supplierLocation;
  productCategory.value = singleProductArr[0].category;
  productUnit.value = singleProductArr[0].unit;
  productNotification.value = singleProductArr[0].notification;
}

window.onload = displayProductDetail();

productUpdatedDoneBtn.addEventListener('click', () => {
  wholeScreen.classList.remove('active');
  productUpdatedPopup.classList.remove('open-popup');
  sessionStorage.clear();
  window.location.href = 'inventory.html';
});

saveBtn.addEventListener('click', validation);

const updateProductDetail = (name, cost, price, barcode, quantity, category, unit, supplierName, supplierPhoneNumber, supplierLocation, notification) => {
  for(let i = 0; i < productArr.length; i++){
    if(productArr[i].name === singleProductArr[0].name){
      productArr[i].name = name + ` (${unit})`;
      productArr[i].cost = cost;
      productArr[i].price = price;
      productArr[i].barcode = barcode;
      productArr[i].quantity = quantity;
      productArr[i].category = category;
      productArr[i].unit = unit;
      productArr[i].supplierName = supplierName;
      productArr[i].supplierPhoneNumber = supplierPhoneNumber;
      productArr[i].supplierLocation = supplierLocation;
      productArr[i].notification = notification;
      break;
    }
  }
  localStorage.setItem('Inventory', JSON.stringify(productArr));
  wholeScreen.classList.add('active');
  productUpdatedPopup.classList.add('open-popup');
}

function validation() {
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
    let name;
    if(productName.value.includes('(')){
      name = productName.value.slice(0, productName.value.indexOf('('));
    }else {
      name = productName.value;
    }
    const arr = name.split(' ');
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    name = arr.join(' ').trim();

    for(let i = 0; i < productArr.length; i++){
      if(name + ` (${productUnit.value})` == productArr[i].name && name + ` (${productUnit.value})` !== singleProductArr[0].name){
        nameError.style.display = 'block';
        nameError.innerText = 'This item had already in the inventory';
        validName = false;
        break;
      }
      if(i == productArr.length - 1){
        productName.value = name;
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

  if(!emptyCost && !emptyPrice && Number(productCost.value) >= Number(productPrice.value)){
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
      if(productBarcode.value == productArr[i].barcode && productBarcode.value !== singleProductArr[0].barcode){
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
    updateProductDetail(productName.value, productCost.value, productPrice.value, productBarcode.value, productQuantity.value, productCategory.value, productUnit.value, supplierName.value, supplierPhoneNumber.value, supplierLocation.value, productNotification.value);
  }
}