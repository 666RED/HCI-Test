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

  editButton.addEventListener('click', editItem);

  productName.addEventListener('click', editItem2);

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
  button.addEventListener('click', editItem(e));
});

productNames.forEach(name => {
  name.addEventListener('click', editItem2(e));
});

function editItem(e) {
  const buttonClicked = e.target;
  const container = buttonClicked.parentElement.parentElement;

  const arr = [];

  const name = container.querySelector('.product-name').innerText;
  const cost = container.querySelector('.product-cost').innerText;
  const price = container.querySelector('.product-price').innerText;
  const barcode = container.querySelector('.product-barcode').innerText;
  const quantity = container.querySelector('.product-quantity').innerText;

  arr.push({
    name,
    cost,
    price,
    barcode,
    quantity
  });

  sessionStorage.setItem('Product', JSON.stringify(arr));
  window.location.href = 'edit-item.html';
}

function editItem2(e) {
  const buttonClicked = e.target;
  const container = buttonClicked.parentElement;

  const arr = [];

  const name = container.querySelector('.product-name').innerText;
  const cost = container.querySelector('.product-cost').innerText;
  const price = container.querySelector('.product-price').innerText;
  const barcode = container.querySelector('.product-barcode').innerText;
  const quantity = container.querySelector('.product-quantity').innerText;

  arr.push({
    name,
    cost,
    price,
    barcode,
    quantity
  });

  sessionStorage.setItem('Product', JSON.stringify(arr));
  window.location.href = 'edit-item.html';
}