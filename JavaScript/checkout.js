const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');
const checkoutButton = document.querySelector('.checkout-button');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
const contentContainer = document.querySelector('.product-info');
const totalPrice = document.querySelector('.total-price');
const payment = document.querySelector('.payment');
const change = document.querySelector('.change');
const barcodeScanner = document.querySelector('.barcode-scan-icon');
const connectedPopup = document.querySelector('.successful-popup');
const category = document.querySelector('.category-box');
const errorPopupMenu = document.querySelector('.error-pop-up');
const errorOkButton = document.querySelector('.error-ok-btn');
const errorCancelButton = document.querySelector('.error-cancel-img');
const errorMessage = document.querySelector('.error-message');
const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];
const tempArr = JSON.parse(localStorage.getItem('Inventory')) || [];

checkoutButton.addEventListener('click', () => {
  if(totalPrice.innerText == ''){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = 'No purchased product';
  }else if(payment.value == ''){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = 'Please enter the payment';
  }else {
    const purchasedArr = [];
    const productRows = contentContainer.querySelectorAll('.product-row');
    let totalCost = 0;
    let totalPrice = 0;
    for(let i = 0; i < productRows.length; i++){
      for(let j = 0; j < contentArr.length; j++){
        if(productRows[i].querySelector('.product-name').innerText == contentArr[j].name){
          totalCost += productRows[i].querySelector('.quantity').value * Number(contentArr[j].cost);
          totalPrice += productRows[i].querySelector('.quantity').value * Number(contentArr[j].price);
        }
      }
      purchasedArr.push({
        name:productRows[i].querySelector('.product-name').innerText,
        price:productRows[i].querySelector('.product-price').innerText,
        quantity:productRows[i].querySelector('.quantity').value,
        singlePrice:productRows[i].querySelector('.product-total').innerText,
      });
    }
    purchasedArr.push({
      totalPrice,
      totalCost,
      payment:payment.value,
      change:change.innerText,
      date:currentDate,
      month:currentMonth,
      year:currentYear
    });
    sessionStorage.setItem('Purchased Product', JSON.stringify(purchasedArr));
    window.location.href = 'receipt.html';  
  }
});

errorOkButton.addEventListener('click', () => {
  errorPopupMenu.classList.remove('open-popup');
});

errorCancelButton.addEventListener('click', () => {
  errorPopupMenu.classList.remove('open-popup');
});

barcodeScanner.addEventListener('click', () => {
  connectedPopup.classList.add('open-popup');
  const myTimeout = setTimeout(toBarcodeScannerPage, 3000);
});

function toBarcodeScannerPage() {
  window.location.href = 'barcode-scan.html';
};

removeNoBtn.addEventListener('click', (e) => {  
  removePopupMenu.classList.remove('open-popup');
});

removeCancel.addEventListener('click', () => {
  removePopupMenu.classList.remove('open-popup');
});

// for searching product

searchBar.addEventListener('keyup', (e) => {
  searchProduct(e);
});

searchBar.addEventListener('click', (e) => {
  searchProduct(e);
});

function searchProduct(e) {
  let text = e.target;
  suggestedProductBox.innerHTML = ''; 
  if(category.value == 'all'){
    for(let i = 0; i < tempArr.length; i++){
      const suggestedProduct = document.createElement('div'); 
      if(tempArr[i].name.toLowerCase().includes(text.value.toLowerCase()) && tempArr[i].name[0].toLowerCase() == text.value[0].toLowerCase() && Number(tempArr[i].quantity) > 0){
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
      if(tempArr[i].barcode.includes(text.value) && tempArr[i].barcode[0] == text.value[0] && Number(tempArr[i].quantity) > 0){
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
        }
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == tempArr.length - 1){
        suggestedProductBox.style.display = 'none';
      }
    }
  }else {
    for(let i = 0; i < tempArr.length; i++){
      const suggestedProduct = document.createElement('div'); 
      if(tempArr[i].name.toLowerCase().includes(text.value.toLowerCase()) && tempArr[i].name[0].toLowerCase() == text.value[0].toLowerCase() && tempArr[i].category == category.value && Number(tempArr[i].quantity) > 0){
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
      if(tempArr[i].barcode.includes(text.value) && tempArr[i].barcode[0] == text.value[0] && tempArr[i].category == category.value && Number(tempArr[i].quantity) > 0){
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
        }
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == tempArr.length - 1){
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
  const productPrice = document.createElement('div');
  const adjustQuantityRow = document.createElement('div');
  const decreaseIcon = document.createElement('img');
  const productQuantity = document.createElement('input');
  const increaseIcon = document.createElement('img');
  const productTotal = document.createElement('div');

  container.classList.add('product-row');
  productNo.classList.add('product-no');
  productNameRow.classList.add('product-name-row');
  productName.classList.add('product-name');
  removeIcon.classList.add('remove-icon');
  productPrice.classList.add('product-price');
  adjustQuantityRow.classList.add('adjust-quantity');
  decreaseIcon.classList.add('icon');
  productQuantity.classList.add('quantity');
  increaseIcon.classList.add('icon');
  productTotal.classList.add('product-total');

  removeIcon.src = '/image/dustbin.png';
  decreaseIcon.src = '/image/minus.png';
  increaseIcon.src = '/image/plus.png';
  productQuantity.setAttribute('type', 'number');
  productQuantity.value = 1;
  adjustQuantityRow.append(decreaseIcon, productQuantity, increaseIcon);

  for(let i = 0; i < tempArr.length; i++){
    if(productClicked.innerText == tempArr[i].name){
      productNo.innerText = contentContainer.childElementCount + 1 + '.';
      productName.innerText = tempArr[i].name;
      productNameRow.append(productName, removeIcon);
      productPrice.innerText = 'RM ' + Number(tempArr[i].price).toFixed(2);
      productTotal.innerText = 'RM ' + Number(tempArr[i].price).toFixed(2);
      container.append(productNo, productNameRow, productPrice, adjustQuantityRow, productTotal);
      contentContainer.appendChild(container);
      updateTotalPrice();
      searchBar.value = '';
      suggestedProductBox.innerHTML = '';
      payment.value = '';
      change.innerText = '';
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
    const adjustQuantityRow = buttonClicked.parentElement;

    const productRow = buttonClicked.parentElement.parentElement;
    const productQuantity = adjustQuantityRow.querySelector('.quantity');
    if(productQuantity.value === '1'){
      errorPopupMenu.classList.add('open-popup');
      errorMessage.innerText = "The product quantity must be greater than 0";
    }else {
      productQuantity.value--;
      payment.value = '';
      change.innerText = '';
      updateSinglePrice(productRow);
      updateTotalPrice();
    }
  });

  increaseIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;

    const productRow = buttonClicked.parentElement.parentElement;
    const productQuantity = adjustQuantityRow.querySelector('.quantity');
    productQuantity.value++;
    payment.value = '';
    change.innerText = '';
    updateSinglePrice(productRow);
    updateTotalPrice();
  });

  removeIcon.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;
    const restoredProductName = buttonClicked.parentElement.querySelector('.product-name');

    removePopupMenu.classList.add('open-popup');
    removeYesBtn.addEventListener('click', (e) => {
      removePopupMenu.classList.remove('open-popup');
      const productRow = adjustQuantityRow.parentElement;
      productRow.remove();
      contentArr.forEach(product => {
        if(product.name == restoredProductName.innerText){
          tempArr.push(product);
        }
      });
      updateProductRow();
      updateTotalPrice();
      payment.value = '';
      change.innerText = '';
      if(contentContainer.childElementCount == 0){
        totalPrice.innerText = '';
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

  if(contentContainer.offsetHeight >= 200){
    const productTotals = contentContainer.querySelectorAll('.product-total');
    productTotals.forEach(row => {
      row.style.width = '175px';
    });
  }
}

function updateProductRow() {
  const productElements = contentContainer.querySelectorAll('.product-row');
  for(let i = 0; i < productElements.length; i++){
    productElements[i].querySelector('.product-no').innerText = i + 1 + '.';
  }
}

function updateSinglePrice(productRow) {
  const productPrice = productRow.querySelector('.product-price');
  const productQuantity = productRow.querySelector('.quantity');
  const productTotal = productRow.querySelector('.product-total');

  const total = Number(productPrice.innerText.replace('RM ', '')) * productQuantity.value;
  productTotal.innerText = 'RM ' + total.toFixed(2);
}

function updateTotalPrice() {
  let total = 0;
  const productTotals = contentContainer.querySelectorAll('.product-total');
  for(let i = 0; i < productTotals.length; i++){
    total += Number(productTotals[i].innerText.replace('RM ', ''));
  }
  totalPrice.innerText = 'RM ' + total.toFixed(2);
}

payment.addEventListener('change', () => {
  updateChange();
});

payment.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    updateChange();
  }
})

function updateChange() {
  let totalChange;
  if(isNaN(payment)){
    payment.value = payment.value.replace('RM', '');
  }
  totalChange = payment.value - Number(totalPrice.innerText.replace('RM ', ''));
  if(totalChange < 0){
    errorPopupMenu.classList.add('open-popup');
    errorMessage.innerText = 'Payment is not enough';
    payment.value = '';
    change.innerText = '';
    return;
  }else { 
    change.innerText = 'RM ' + totalChange.toFixed(2);
    payment.value = 'RM ' + Number(payment.value).toFixed(2);
  }
}

document.addEventListener('click', (e) => {
  if(suggestedProductBox.childElementCount > 0 && !suggestedProductBox.contains(e.target) && !searchBar.contains(e.target)){
    suggestedProductBox.innerHTML = '';
  }
});

category.addEventListener('change', (e) => {
  searchBar.value = '';
  suggestedProductBox.innerHTML = '';
});

window.onload = () => {
  const restoredProductArr = JSON.parse(sessionStorage.getItem('Purchased Product')) || [];

  if(restoredProductArr.length != 0){
    for(let i = 0; i < restoredProductArr.length - 1; i++){
      const container = document.createElement('div');
      const productNo = document.createElement('div');
      const productNameRow = document.createElement('div');
      const productName = document.createElement('div');
      const removeIcon = document.createElement('img');
      const productPrice = document.createElement('div');
      const adjustQuantityRow = document.createElement('div');
      const decreaseIcon = document.createElement('img');
      const productQuantity = document.createElement('input');
      const increaseIcon = document.createElement('img');
      const productTotal = document.createElement('div');

      container.classList.add('product-row');
      productNo.classList.add('product-no');
      productNameRow.classList.add('product-name-row');
      productName.classList.add('product-name');
      removeIcon.classList.add('remove-icon');
      productPrice.classList.add('product-price');
      adjustQuantityRow.classList.add('adjust-quantity');
      decreaseIcon.classList.add('icon');
      productQuantity.classList.add('quantity');
      increaseIcon.classList.add('icon');
      productTotal.classList.add('product-total');

      removeIcon.src = '/image/dustbin.png';
      decreaseIcon.src = '/image/minus.png';
      increaseIcon.src = '/image/plus.png';
      productQuantity.setAttribute('type', 'number');
      adjustQuantityRow.append(decreaseIcon, productQuantity, increaseIcon);

      productNo.innerText = i + 1 + '.';
      productName.innerText = restoredProductArr[i].name;
      productNameRow.append(productName, removeIcon);
      productPrice.innerText = restoredProductArr[i].price;
      productQuantity.value = restoredProductArr[i].quantity;
      productTotal.innerText = restoredProductArr[i].singlePrice;
      container.append(productNo, productNameRow, productPrice, adjustQuantityRow, productTotal);
      contentContainer.appendChild(container);

      decreaseIcon.addEventListener('click', (e) => {
        const buttonClicked = e.target;
        const adjustQuantityRow = buttonClicked.parentElement;

        const productRow = buttonClicked.parentElement.parentElement;
        const productQuantity = adjustQuantityRow.querySelector('.quantity');
        if(productQuantity.value === '1'){
          errorPopupMenu.classList.add('open-popup');
          errorMessage.innerText = "The product quantity must be greater than 0";
        }else {
          productQuantity.value--;
          payment.value = '';
          change.innerText = '';
          updateSinglePrice(productRow);
          updateTotalPrice();
        }
      });

      increaseIcon.addEventListener('click', (e) => {
        const buttonClicked = e.target;
        const adjustQuantityRow = buttonClicked.parentElement;

        const productRow = buttonClicked.parentElement.parentElement;
        const productQuantity = adjustQuantityRow.querySelector('.quantity');
        productQuantity.value++;
        payment.value = '';
        change.innerText = '';
        updateSinglePrice(productRow);
        updateTotalPrice();
      });

      removeIcon.addEventListener('click', (e) => {
        const buttonClicked = e.target;
        const adjustQuantityRow = buttonClicked.parentElement;
        const restoredProductName = buttonClicked.parentElement.querySelector('.product-name');

        removePopupMenu.classList.add('open-popup');
        removeYesBtn.addEventListener('click', (e) => {
          removePopupMenu.classList.remove('open-popup');
          const productRow = adjustQuantityRow.parentElement;
          productRow.remove();
          contentArr.forEach(product => {
            if(product.name == restoredProductName.innerText){
              tempArr.push(product);
            }
          });
          updateProductRow();
          updateTotalPrice();
          payment.value = '';
          change.innerText = '';
          if(contentContainer.childElementCount == 0){
            totalPrice.innerText = '';
          }
        }, {once:true});
      });

      productQuantity.addEventListener('change', (e) => {
        const inputChanged = e.target;
        const container = inputChanged.parentElement.parentElement;
        if(inputChanged.value <= 0){
          window.alert("Tha product quantity must be greater than 0");
          inputChanged.value = 1;
        }
        updateSinglePrice(container);
        updateTotalPrice();
      });

      if(contentContainer.offsetHeight >= 200){
        const productTotals = contentContainer.querySelectorAll('.product-total');
        productTotals.forEach(row => {
          row.style.width = '175px';
        });
      }
    }
    totalPrice.innerText = 'RM ' + restoredProductArr[restoredProductArr.length - 1].totalPrice.toFixed(2);
    payment.value = restoredProductArr[restoredProductArr.length - 1].payment;
    change.innerText = restoredProductArr[restoredProductArr.length - 1].change;
    for(let i = 0; i < restoredProductArr.length; i++){
      for(let j = 0; j < tempArr.length; j++){
        if(tempArr[j].name == restoredProductArr[i].name){
          tempArr.splice(j, 1);
        }
      }
    }
  }
};  