const returnIcon = document.querySelector('.return-icon');
const restockHistory = document.querySelector('.restock-history');
const contentContainer = document.querySelector('.content-container');
const productPrices = document.querySelectorAll('.product-price');
const supplierNameInput = document.querySelector('.supplier-name');
const supplierPhoneNumber = document.querySelector('.supplier-phone-number');
const supplierLocation = document.querySelector('.supplier-location');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
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

const clearAllButton = document.querySelector('.clear-all-btn');
const confirmAndSaveButton = document.querySelector('.confirm-and-save-btn');

const invoiceNo = document.querySelector('.invoice-no');
const restockFee = document.querySelector('.restock-fee');
const placedDate = document.querySelector('.placed-date');
const receivedDate = document.querySelector('.received-date');

const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];
const contentArr = JSON.parse(localStorage.getItem('Supplier Product')) || [];
const tempArr = JSON.parse(localStorage.getItem('Supplier Product')) || [];
const restockArr = JSON.parse(localStorage.getItem('Restock Product')) || [];

supplierLocation.defaultValue = '43, Jalan Flora Utama 3, Taman Flora Utama, 83000 Batu Pahat, Johor';

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

searchBar.addEventListener('keyup', (e) => {
  searchProduct(e);
});

searchBar.addEventListener('click', (e) => {
  searchProduct(e);
});

function searchProduct(e) {
  let text = e.target;
  suggestedProductBox.innerHTML = '';
  for(let i = 0; i < tempArr.length; i++){
    const suggestedProduct = document.createElement('div');
    if(tempArr[i].name.toLowerCase().includes(text.value.toLowerCase()) && tempArr[i].name[0].toLowerCase() == text.value[0].toLowerCase() && tempArr[i].supplier == supplierNameInput.value){
      suggestedProductBox.style.display = 'block';
      suggestedProduct.classList.add('suggested-product');
      suggestedProduct.innerText = tempArr[i].name;
      suggestedProductBox.appendChild(suggestedProduct);
      suggestedProduct.addEventListener('click', appendProduct);
    }else if(!suggestedProductBox.querySelector('.suggested-product') && i == tempArr.length - 1){
  suggestedProductBox.style.display = 'none';
    }
  }
  for(let i = 0; i < tempArr.length; i++){
    let repeated = false;
    const suggestedProduct = document.createElement('div'); 
    if(tempArr[i].barcode.includes(text.value) && tempArr[i].barcode[0] == text.value[0] && tempArr[i].supplier == supplierNameInput.value){
      const suggestedNames = suggestedProductBox.querySelectorAll('.suggested-product');
      for(let j = 0; j < suggestedNames.length; j++){
        if(suggestedNames[j].innerText == tempArr[i].name){
          repeated = true;
          break;
        }
      }
      if(!repeated){
        suggestedProductBox.style.display = 'block';
        suggestedProduct.classList.add('suggested-product');
        suggestedProduct.innerText = tempArr[i].name;
        suggestedProductBox.appendChild(suggestedProduct);

        suggestedProduct.addEventListener('click', appendProduct);
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == productArr[supplierIndex].length - 1){
        suggestedProductBox.style.display = 'none';
      }
    }
  }
}

function appendProduct(e) {
  const productClicked = e.target;

  const container = document.createElement('div');
  const productNo = document.createElement('div');
  const productNameRow = document.createElement('div');
  const productName = document.createElement('div');
  const removeIcon = document.createElement('img');
  const productQuantityRow = document.createElement('div');
  const decreaseIcon = document.createElement('img');
  const productQuantity = document.createElement('input');
  const increaseIcon = document.createElement('img');
  const productUnit = document.createElement('div');
  const productPrice = document.createElement('div');

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

  removeIcon.src = '/image/dustbin.png';
  decreaseIcon.src = '/image/minus.png';
  increaseIcon.src = '/image/plus.png';
  productQuantity.setAttribute('type', 'number');
  productQuantity.value = 1;
  productQuantityRow.append(decreaseIcon, productQuantity, increaseIcon);

  for(let i = 0; i < tempArr.length; i++){
    if(productClicked.innerText == tempArr[i].name){
      productNo.innerText = contentContainer.childElementCount + 1 + '.';
      productName.innerText = tempArr[i].name;
      productNameRow.append(productName, removeIcon);
      productUnit.innerText = tempArr[i].unit;
      productPrice.innerText = 'RM ' + Number(tempArr[i].price).toFixed(2);
      container.append(productNo, productNameRow, productPrice, productQuantityRow, productUnit, productPrice);
      contentContainer.appendChild(container);
      updateTotalPrice();
      searchBar.value = '';
      suggestedProductBox.innerHTML = '';
      break;
    }
  }
  for(let i = 0; i < tempArr.length; i++){
    if(tempArr[i].name == productClicked.innerText){
      tempArr.splice(i, 1);
    }
  }

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
      updateSinglePrice(productRow);
      updateTotalPrice();
    }
  });

  increaseIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const productQuantityRow = buttonClicked.parentElement;

    const productRow = buttonClicked.parentElement.parentElement;
    const productQuantity = productQuantityRow.querySelector('.product-quantity');
    productQuantity.value++;
    updateSinglePrice(productRow);
    updateTotalPrice();
  });

  removeIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const productQuantityRow = buttonClicked.parentElement;
    const restoredProductName = buttonClicked.parentElement.querySelector('.product-name');

    removePopupMenu.classList.add('open-popup');
    removeYesBtn.addEventListener('click', (e) => {
      removePopupMenu.classList.remove('open-popup');
      const productRow = productQuantityRow.parentElement;
      productRow.remove();
      contentArr.forEach(product => {
        if(product.name == restoredProductName.innerText){
          tempArr.push(product);
        }
      });
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
    updateSinglePrice(container);
    updateTotalPrice();
  });

  if(contentContainer.offsetHeight >= 256){
    productPrices.forEach(price => {
      price.style.width = '110px';
      price.style.paddingLeft = '18px';
    });
  }
}

function updateTotalPrice() {
  let total = 0;
  const productTotals = contentContainer.querySelectorAll('.product-price');
  for(let i = 0; i < productTotals.length; i++){
    total += Number(productTotals[i].innerText.replace('RM ', ''));
  }
  totalPrice.innerText = 'RM ' + total.toFixed(2);
}

function updateSinglePrice(productRow) {
  const productName = productRow.querySelector('.product-name');
  const productPrice = productRow.querySelector('.product-price');
  const productQuantity = productRow.querySelector('.product-quantity');

  for(let i = 0; i < contentArr.length; i++){
    if(productName.innerText == contentArr[i].name){
      productPrice.innerText = 'RM ' + (Number(contentArr[i].price) * productQuantity.value).toFixed(2);
    }
  }

}

function updateProductRow() {
  const productElements = contentContainer.querySelectorAll('.content-row');
  for(let i = 0; i < productElements.length; i++){
    productElements[i].querySelector('.product-no').innerText = i + 1 + '.';
  }
}

restockHistory.addEventListener('click', ()=> {
  window.location.href = 'restock-history.html';
});

supplierNameInput.addEventListener('change', () => {
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierNameInput.value == supplierArr[i].supplier){
      supplierPhoneNumber.value = supplierArr[i].phoneNumber;
      supplierLocation.value = supplierArr[i].location;
    }
  }
  contentContainer.innerHTML = '';
});

returnIcon.addEventListener('click', () => {
  window.location.href = 'inventory.html';
});

window.onload = updateData();

function updateData() {
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierNameInput.value == supplierArr[i].name){
      supplierPhoneNumber.value = supplierArr[i].phoneNumber;
      supplierLocation.value = supplierArr[i].location;
    }
  }
}

document.addEventListener('click', (e) => {
  if(suggestedProductBox.childElementCount > 0 && !suggestedProductBox.contains(e.target) && !searchBar.contains(e.target)){
    suggestedProductBox.innerHTML = '';
  }
});

function saveData() {
  const contentRows = document.querySelectorAll('.content-row');
  const invoiceArr = [];
  for(let i = 0; i < contentRows.length; i++){
    invoiceArr.push({
      name:contentRows[i].querySelector('.product-name').innerText,
      quantity:contentRows[i].querySelector('.product-quantity').value,
      unit:contentRows[i].querySelector('.product-unit').innerText,
      price:contentRows[i].querySelector('.product-price').innerText
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