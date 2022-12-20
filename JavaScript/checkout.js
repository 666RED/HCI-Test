const decreaseButtons = document.querySelectorAll('.decrease-icon');
const increaseButtons = document.querySelectorAll('.increase-icon');
const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removeButtons = document.querySelectorAll('.remove-icon');  
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');
const quantityInputs = document.querySelectorAll('.quantity');
const purchaseButton = document.querySelector('.purchase-btn');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
const contentContainer = document.querySelector('.product-info');

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];
const tempArr = JSON.parse(localStorage.getItem('Inventory')) || [];

removeNoBtn.addEventListener('click', (e) => {  
  removePopupMenu.classList.remove('open-popup');
});

removeCancel.addEventListener('click', () => {
  removePopupMenu.classList.remove('open-popup');
});

decreaseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;

    const productQuantity = adjustQuantityRow.querySelector('.quantity');
    if(productQuantity.value === '1'){
      window.alert("The product quantity must be greater than 0")
    }else {
      productQuantity.value--;
    }
  });
});

increaseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;

    const productQuantity = adjustQuantityRow.querySelector('.quantity');
    productQuantity.value++;
  });
});

removeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;

    removePopupMenu.classList.add('open-popup');
    removeYesBtn.addEventListener('click', (e) => {
      removePopupMenu.classList.remove('open-popup');
      const productRow = adjustQuantityRow.parentElement;
      productRow.remove();
    });
  });
});

quantityInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    inputChanged = e.target;
    if(inputChanged.value <= 0){
      window.alert("Tha product quantity must be greater than 0");
      inputChanged.value = 1;
    }
  })
});

purchaseButton.addEventListener('click', () => {
  window.location.href = 'receipt.html';
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
    if(tempArr[i].name.toLowerCase().includes(text.value) && tempArr[i].name[0].toLowerCase() === text.value[0]){
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
  productName.classList.add('productName');
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

  for(let i = 0; i < contentArr.length; i++){
    if(productClicked.innerText == contentArr[i].name){
      productNo.innerText = contentContainer.childElementCount + 1 + '.';
      productName.innerText = contentArr[i].name;
      productNameRow.append(productName, removeIcon);
      productPrice.innerText = 'RM ' + Number(contentArr[i].price).toFixed(2);
      productTotal.innerText = 'RM ' + Number(contentArr[i].price).toFixed(2);
      container.append(productNo, productNameRow, productPrice, adjustQuantityRow, productTotal);
      contentContainer.appendChild(container);
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
}
