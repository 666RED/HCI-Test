const editButtons = document.querySelectorAll('.edit-btn');
const productNames = document.querySelectorAll('.product-name');

const contentContainer = document.querySelector('.content-container');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
const category = document.querySelector('.category-box');

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];

const createAll = () => {
  for(let i = 0; i < contentArr.length; i++){
    const container = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productBarcode = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productCost = document.createElement('div');
    const priceAndEdit = document.createElement('div');
    const productPrice = document.createElement('div');
    const editButton = document.createElement('button');

    productNo.innerText = i + 1 + '.';
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
  }
};

const createByCategory = (category) => {
  let numOfElement = 1;
  for(let i = 0; i < contentArr.length; i++){
    if(category.value === contentArr[i].category){
      const container = document.createElement('div');
      const productNo = document.createElement('div');
      const productName = document.createElement('div');
      const productBarcode = document.createElement('div');
      const productQuantity = document.createElement('div');
      const productCost = document.createElement('div');
      const priceAndEdit = document.createElement('div');
      const productPrice = document.createElement('div');
      const editButton = document.createElement('button');

      productNo.innerText = numOfElement + '.';
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
      numOfElement++;
    }
  }
};

const displayInventory = () => {
  createAll();
  const priceAndEdit = document.querySelectorAll('.price-and-edit');
  if(contentContainer.offsetHeight >= 368){
    priceAndEdit.forEach(row => {
      row.style.width = '175px';
    });
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

  console.log(name);
  console.log(contentArr[0].name);

  for(let i = 0; i < contentArr.length; i++){
    if(name == contentArr[i].name){
      const supplierName = contentArr[i].supplierName;
      const supplierPhoneNumber = contentArr[i].supplierPhoneNumber;
      const supplierLocation = contentArr[i].supplierLocation;
      const category = contentArr[i].category;
      const unit = contentArr[i].unit;

      arr.push({
        name,
        cost,
        price,
        barcode,
        quantity,
        category,
        unit,
        supplierName,
        supplierPhoneNumber,
        supplierLocation
      });
      break;
    }
  }

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

    for(let i = 0; i < contentArr.length; i++){
    if(name == contentArr[i].name){
      const supplierName = contentArr[i].supplierName;
      const supplierPhoneNumber = contentArr[i].supplierPhoneNumber;
      const supplierLocation = contentArr[i].supplierLocation;
      const category = contentArr[i].category;
      const unit = contentArr[i].unit;

      arr.push({
        name,
        cost,
        price,
        barcode,
        quantity,
        category,
        unit,
        supplierName,
        supplierPhoneNumber,
        supplierLocation
      });
      break;
    }
  }

  sessionStorage.setItem('Product', JSON.stringify(arr));
  window.location.href = 'edit-item.html';
}

function goToEdit(e) {
  const productClicked = e.target;
  for(let i = 0; i < contentArr.length; i++){
    if(productClicked.innerText == contentArr[i].name){
      const productArr = [];
      productArr.push({
        name:contentArr[i].name,
        cost:contentArr[i].cost,
        price:contentArr[i].price,
        barcode:contentArr[i].barcode,
        quantity:contentArr[i].quantity,
        category:contentArr[i].category,
        unit:contentArr[i].unit,
        supplierName:contentArr[i].supplierName,
        supplierPhoneNumber:contentArr[i].supplierPhoneNumber,
        supplierLocation:contentArr[i].supplierLocation
      });
      sessionStorage.setItem('Product', JSON.stringify(productArr));
      window.location.href = 'edit-item.html';
    }
  }
}

searchBar.addEventListener('keyup', (e) => {
  searchProduct(e);
});

function searchProduct(e) {
  let text = e.target;
  suggestedProductBox.innerHTML = '';
  if(category.value == 'all'){
    for(let i = 0; i < contentArr.length; i++){
      const suggestedProduct = document.createElement('div'); 
      if(contentArr[i].name.toLowerCase().includes(text.value) && contentArr[i].name[0].toLowerCase() === text.value[0]){
        suggestedProductBox.style.display = 'block';
        suggestedProduct.classList.add('suggested-product');
        suggestedProduct.innerText = contentArr[i].name;
        suggestedProductBox.appendChild(suggestedProduct);

        suggestedProduct.addEventListener('click', goToEdit);
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == contentArr.length - 1){
        suggestedProductBox.style.display = 'none';
      }
    }
  }else{
    for(let i = 0; i < contentArr.length; i++){
      const suggestedProduct = document.createElement('div'); 
      if(contentArr[i].name.toLowerCase().includes(text.value) && contentArr[i].name[0].toLowerCase() === text.value[0] && contentArr[i].category == category.value){
        suggestedProductBox.style.display = 'block';
        suggestedProduct.classList.add('suggested-product');
        suggestedProduct.innerText = contentArr[i].name;
        suggestedProductBox.appendChild(suggestedProduct);

        suggestedProduct.addEventListener('click', goToEdit);
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == contentArr.length - 1){
        suggestedProductBox.style.display = 'none';
      }
    }
  }
}

category.addEventListener('change', (e) => {
  contentContainer.innerHTML = '';
  if(category.value == 'all'){
    createAll();
  }else {
    createByCategory(category);
  }
});