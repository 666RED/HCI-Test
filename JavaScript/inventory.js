const editButtons = document.querySelectorAll('.edit-btn');
const productNames = document.querySelectorAll('.product-name');

const contentContainer = document.querySelector('.inventory-main-content');

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];

const createProduct = (contentArr, i) => {

  const container = document.createElement('div');
  const productNo = document.createElement('div');
  const productName = document.createElement('div');
  const productBarcode = document.createElement('div');
  const productQuantity = document.createElement('div');
  const productCost = document.createElement('div');
  const priceAndEdit = document.createElement('div');
  const productPrice = document.createElement('div');
  const editButton = document.createElement('button');

  productNo.innerText = i + 1;
  productName.innerText = contentArr[i].name;
  productBarcode.innerText = contentArr[i].barcode;
  productQuantity.innerText = contentArr[i].quantity;
  productCost.innerText = 'RM ' + parseFloat(contentArr[i].cost).toFixed(2); 
  productPrice.innerText = 'RM ' + parseFloat(contentArr[i].price).toFixed(2);
  editButton.innerText = 'Edit';

  container.classList.add('content-row');
  productNo.classList.add('product-no');
  productName.classList.add('product-name');
  productBarcode.classList.add('product-barcode');
  productQuantity.classList.add('product-quantity');
  productCost.classList.add('product-cost');
  priceAndEdit.classList.add('price-and-edit');
  productPrice.classList.add('product-price');
  editButton.classList.add('edit-btn');

  editButton.addEventListener('click', () => {
    window.location.href = 'edit-item.html';
  });

  productName.addEventListener('click', () => {
    window.location.href = 'edit-item.html';
  });

  priceAndEdit.append(productPrice, editButton);
  container.append(productNo, productName, productBarcode, productQuantity, productCost, priceAndEdit);
  contentContainer.appendChild(container);
};

const displayInventory = () => {
  for(let i = 1; i <= contentArr.length; i++){
    createProduct(contentArr, i - 1);
  }
};

window.onload = displayInventory();

editButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    window.location.href = 'edit-item.html';
  })
});

productNames.forEach(name => {
  name.addEventListener('click', () => {
    window.location.href = 'edit-item.html';
  });
});