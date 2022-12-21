const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');
const purchaseButton = document.querySelector('.purchase-btn');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
const contentContainer = document.querySelector('.product-info');
const totalPrice = document.querySelector('.total-price');
const payment = document.querySelector('.payment');
const change = document.querySelector('.change');

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];
const tempArr = JSON.parse(localStorage.getItem('Inventory')) || [];

removeNoBtn.addEventListener('click', (e) => {  
  removePopupMenu.classList.remove('open-popup');
});

removeCancel.addEventListener('click', () => {
  removePopupMenu.classList.remove('open-popup');
});

purchaseButton.addEventListener('click', () => {
  
});

// for searching product

searchBar.addEventListener('keyup', (e) => {
  searchProduct(e);
});

function searchProduct(e) {
  let text = e.target;
  suggestedProductBox.innerHTML = '';
  for(let i = 0; i < tempArr.length; i++){
    const suggestedProduct = document.createElement('div'); 
    if(tempArr[i].name.toLowerCase().includes(text.value.toLowerCase()) && tempArr[i].name[0].toLowerCase() == text.value[0].toLowerCase()){
      suggestedProductBox.style.display = 'block';
      suggestedProduct.classList.add('suggested-product');
      suggestedProduct.innerText = tempArr[i].name;
      suggestedProductBox.appendChild(suggestedProduct);

      suggestedProduct.addEventListener('click', appendProduct);
    }else if(!suggestedProductBox.querySelector('.suggested-product') && i == tempArr.length - 1){
      suggestedProductBox.style.display = 'none';
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

  removeIcon.src = 'image/dustbin.png';
  decreaseIcon.src = 'image/minus.png';
  increaseIcon.src = 'image/plus.png';
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
      window.alert("The product quantity must be greater than 0")
    }else {
      productQuantity.value--;
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
    window.alert('Not enough');
    payment.value = '';
    change.innerText = '';
    return;
  }else { 
    change.innerText = 'RM ' + totalChange.toFixed(2);
    payment.value = 'RM ' + Number(payment.value).toFixed(2);
  }
}