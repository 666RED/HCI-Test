const returnIcon = document.querySelector('.return-icon');
const restockHistory = document.querySelector('.restock-history');
const contentContainer = document.querySelector('.content-container');
const supplierNameInput = document.querySelector('.supplier-name');
const supplierPhoneNumber = document.querySelector('.supplier-phone-number');
const supplierLocation = document.querySelector('.supplier-location');
const errorPopupMenu = document.querySelector('.error-pop-up');
const errorOkButton = document.querySelector('.error-ok-btn');
const errorCancelButton = document.querySelector('.error-cancel-img');
const errorMessage = document.querySelector('.error-message');
const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');
const totalPrice = document.querySelector('.total-price');
const successfulPopup = document.querySelector('.successful-popup');
const wholeScreen = document.querySelector('.whole-screen');
const doneButton = document.querySelector('.done-btn');
const viewSupplierButton = document.querySelector('.view-supplier-btn');
const plusIcon = document.querySelector('.plus-icon');
const removeIcon = document.querySelector('.remove-icon');
const increaseIcon = document.querySelector('.increase-icon');
const decreaseIcon = document.querySelector('.decrease-icon');
const productPrice = document.querySelector('.product-price');
const productQuantity = document.querySelector('.product-quantity');

const clearAllButton = document.querySelector('.clear-all-btn');
const confirmAndSaveButton = document.querySelector('.confirm-and-save-btn');

const invoiceNo = document.querySelector('.invoice-no');
const restockFee = document.querySelector('.restock-fee');
const placedDate = document.querySelector('.placed-date');
const receivedDate = document.querySelector('.received-date');

const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];
const restockArr = JSON.parse(localStorage.getItem('Restock Product')) || [];

viewSupplierButton.addEventListener('click', () => {
  window.location.href = 'view-supplier.html';
});

restockFee.addEventListener('change', () => {
  if(restockFee.value <= 0){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = "Restock Fee must greater than 0";
    restockFee.value = '';
  }
});

clearAllButton.addEventListener('click', () => {
  window.location.reload();
});

confirmAndSaveButton.addEventListener('click', () => {
  const contentRows = document.querySelectorAll('.content-row');
  contentRows.forEach(row => {
    const productName = row.querySelector('.product-name');
    const productUnit = row.querySelector('.product-unit');
    const productPrice = row.querySelector('.product-price');
    if(productName.value == '' || productUnit.value == '' || productPrice.value == ''){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "Restock Products haven't finished inserting yet";
      return;
    }
  });
    if(invoiceNo.value == '' || restockFee.value == '' || placedDate.value == '' || receivedDate.value == ''){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "Please enter all the restock information";
    }else if(contentContainer.childElementCount == 0){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "Please insert the restocked products";
    }else if(Number(restockFee.value).toFixed(2) != totalPrice.innerText.replace('RM ', '')){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "The Restock Fee and Total Price are not the same";
    }else{
      saveData();
    }
});

placedDate.addEventListener('change', () => {
  receivedDate.setAttribute('min', placedDate.value);
});

removeNoBtn.addEventListener('click', (e) => {  
  removePopupMenu.classList.remove('open-popup');
});

removeCancel.addEventListener('click', () => {
  removePopupMenu.classList.remove('open-popup');
});

errorOkButton.addEventListener('click', () => {
  errorPopupMenu.classList.remove('open-popup');
});

errorCancelButton.addEventListener('click', () => {
  errorPopupMenu.classList.remove('open-popup');
});

plusIcon.addEventListener('click', appendProductRow);

function appendProductRow() {

  const container = document.createElement('div');
  const productNo = document.createElement('div');
  const productNameRow = document.createElement('div');
  const productName = document.createElement('input');
  const removeIcon = document.createElement('img');
  const productQuantityRow = document.createElement('div');
  const decreaseIcon = document.createElement('img');
  const productQuantity = document.createElement('input');
  const increaseIcon = document.createElement('img');
  const productUnit = document.createElement('input');
  const productPrice = document.createElement('input');

  container.classList.add('content-row');
  productNo.classList.add('product-no');
  productNameRow.classList.add('product-name-row');
  productName.classList.add('product-name');
  removeIcon.classList.add('remove-icon');
  productQuantityRow.classList.add('product-quantity-row');
  decreaseIcon.classList.add('icon');
  productQuantity.classList.add('product-quantity');
  increaseIcon.classList.add('icon');
  productUnit.classList.add('product-unit');
  productPrice.classList.add('product-price');

  productName.setAttribute('placeHolder', 'Enter product name');
  productUnit.setAttribute('placeHolder', 'e.g. box');
  productPrice.setAttribute('placeHolder', 'RM');
  productPrice.setAttribute('type', 'number');

  productNo.innerText = (contentContainer.querySelectorAll('.content-row').length + 1) + '.';
  removeIcon.src = '/image/dustbin.png';
  decreaseIcon.src = '/image/minus.png';
  increaseIcon.src = '/image/plus.png';
  productQuantity.setAttribute('type', 'number');
  productQuantity.value = 1;
  productNameRow.append(productName, removeIcon);
  productQuantityRow.append(decreaseIcon, productQuantity, increaseIcon);

  container.append(productNo, productNameRow, productQuantityRow, productUnit, productPrice);
  contentContainer.appendChild(container);

  decreaseIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const productQuantityRow = buttonClicked.parentElement;

    const productRow = buttonClicked.parentElement.parentElement;
    const productQuantity = productQuantityRow.querySelector('.product-quantity');
    if(productQuantity.value === '1'){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "The product quantity must be greater than 0";
    }else {
      productQuantity.value--;
    }
  });

  increaseIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const productQuantityRow = buttonClicked.parentElement;

    const productRow = buttonClicked.parentElement.parentElement;
    const productQuantity = productQuantityRow.querySelector('.product-quantity');
    productQuantity.value++;
  });

  removeIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const productQuantityRow = buttonClicked.parentElement;

    removePopupMenu.classList.add('open-popup');
    removeYesBtn.addEventListener('click', () => {
      removePopupMenu.classList.remove('open-popup');
      const productRow = productQuantityRow.parentElement;
      productRow.remove();
      updateProductRow();
      updateTotalPrice();
      if(contentContainer.childElementCount == 0){
        totalPrice.innerText = 'RM 0.00';
      }
    }, {once:true});
  });

  productQuantity.addEventListener('change', (e) => {
    const inputChanged = e.target;
    const container = inputChanged.parentElement.parentElement;
    if(inputChanged.value <= 0){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "The product quantity must be greater than 0";
      inputChanged.value = 1;
    }
  });

  productPrice.addEventListener('change', (e) => {
    const priceChanged = e.target;
    priceChanged.value = Number(priceChanged.value).toFixed(2);
    updateTotalPrice();
  });

  if(contentContainer.offsetHeight >= 256){
    const productPrices = contentContainer.querySelectorAll('.product-price');
    productPrices.forEach(price => {  
      price.style.width = '111px';
      price.style.paddingLeft = '18px';
    });
  }
}

function updateTotalPrice() {
  let total = 0;
  const productTotals = contentContainer.querySelectorAll('.product-price');
  for(let i = 0; i < productTotals.length; i++){
    total += Number(productTotals[i].value);
  }
  totalPrice.innerText = 'RM ' + total.toFixed(2);
}

function updateProductRow() {
  const productElements = contentContainer.querySelectorAll('.content-row');
  for(let i = 0; i < productElements.length; i++){
    productElements[i].querySelector('.product-no').innerText = i + 1 + '.';
  }
  if(contentContainer.offsetHeight >= 256){
    const productPrices = contentContainer.querySelectorAll('.product-price');
    productPrices.forEach(price => {  
      price.style.width = '111px';
      price.style.paddingLeft = '18px';
    });
  }else {
    const productPrices = contentContainer.querySelectorAll('.product-price');
    productPrices.forEach(price => {  
      price.style.width = '128px';
      price.style.paddingLeft = '3px';
    });
  }
}

restockHistory.addEventListener('click', ()=> {
  window.location.href = 'restock-history.html';
});

supplierNameInput.addEventListener('change', () => {
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierNameInput.value == supplierArr[i].supplierName){
      supplierPhoneNumber.value = supplierArr[i].phoneNumber;
      supplierLocation.value = supplierArr[i].supplierLocation;
    }
  }
});

returnIcon.addEventListener('click', () => {
  window.location.href = 'inventory.html';
});

window.onload = updateData();

function updateData() {
  for(let i = 0; i < supplierArr.length; i++){
    const supplierOption = document.createElement('option');
    supplierOption.setAttribute('value', supplierArr[i].supplierName);
    supplierOption.innerText = supplierArr[i].supplierName;
    supplierNameInput.append(supplierOption);
  }

  for(let i = 0; i < supplierArr.length; i++){
    if(supplierNameInput.value == supplierArr[i].supplierName){
      supplierPhoneNumber.value = supplierArr[i].phoneNumber;
      supplierLocation.value = supplierArr[i].supplierLocation;
    }
  }
}

function saveData() {
  const contentRows = document.querySelectorAll('.content-row');
  const invoiceArr = [];
  for(let i = 0; i < contentRows.length; i++){
    invoiceArr.push({
      name:contentRows[i].querySelector('.product-name').value,
      quantity:contentRows[i].querySelector('.product-quantity').value,
      unit:contentRows[i].querySelector('.product-unit').value,
      price:contentRows[i].querySelector('.product-price').value
    });
  }
  invoiceArr.push({
    invoiceNo:invoiceNo.value,
    supplierName:supplierNameInput.value,
    supplierLocation:supplierLocation.value,
    placedDate:placedDate.value,
    receivedDate:receivedDate.value,
    restockFee:restockFee.value
  });
  restockArr.push({invoiceArr});
  localStorage.setItem('Restock Product', JSON.stringify(restockArr));
  wholeScreen.classList.add('active');
  successfulPopup.classList.add('open-popup');
}

doneButton.addEventListener('click', () => {
  window.location.href = 'restock-history.html';
});

decreaseIcon.addEventListener('click', (e) => {
  const buttonClicked = e.target;
  const productQuantityRow = buttonClicked.parentElement;

  const productQuantity = productQuantityRow.querySelector('.product-quantity');
  if(productQuantity.value === '1'){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = "The product quantity must be greater than 0";
  }else {
    productQuantity.value--;
  }
});

increaseIcon.addEventListener('click', (e) => {
  const buttonClicked = e.target;
  const productQuantityRow = buttonClicked.parentElement;

  const productQuantity = productQuantityRow.querySelector('.product-quantity');
  productQuantity.value++;
});

removeIcon.addEventListener('click', (e) => {
  const buttonClicked = e.target;
  const productQuantityRow = buttonClicked.parentElement;

  removePopupMenu.classList.add('open-popup');
  removeYesBtn.addEventListener('click', (e) => {
    removePopupMenu.classList.remove('open-popup');
    const productRow = productQuantityRow.parentElement;
    productRow.remove();
    updateProductRow();
    updateTotalPrice();
    if(contentContainer.childElementCount == 0){
      totalPrice.innerText = 'RM 0.00';
    }
  }, {once:true});
});

productQuantity.addEventListener('change', (e) => {
  const inputChanged = e.target;
  const container = inputChanged.parentElement.parentElement;
  if(inputChanged.value <= 0){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = "The product quantity must be greater than 0";
    inputChanged.value = 1;
  }
});

productPrice.addEventListener('change', (e) => {
  const priceChanged = e.target;
  priceChanged.value = Number(priceChanged.value).toFixed(2);
  updateTotalPrice();
});