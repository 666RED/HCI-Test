const editButtons = document.querySelectorAll('.status-btn');
const productNames = document.querySelectorAll('.product-name');

const contentContainer = document.querySelector('.content-container');
const contentRows = document.querySelectorAll('.content-row');
const searchBar = document.querySelector('#search-bar');
const suggestedProductBox = document.querySelector('.suggested-product-box');
const category = document.querySelector('.category-box');
const restockButton = document.querySelector('.restock-btn');
const outOfStockPopup = document.querySelector('.out-of-stock-popup');
const okButton = document.querySelector('.ok-btn');

const contentArr = JSON.parse(localStorage.getItem('Inventory')) || [];

okButton.addEventListener('click', () => {
  outOfStockPopup.classList.remove('open-popup');
  localStorage.setItem('Timer', 1);
});

function removeTimer() {
  console.log('hello');
  localStorage.removeItem('Timer');
}

restockButton.addEventListener('click', () => {
  window.location.href = 'restock.html';
});

const createAll = () => {
  for(let i = 0; i < contentArr.length; i++){
    const container = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productBarcode = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productCost = document.createElement('div');
    const quantityAndEdit = document.createElement('div');
    const productPrice = document.createElement('div');
    const statusButton = document.createElement('button');

    productNo.innerText = i + 1 + '.';
    productName.innerText = contentArr[i].name;
    productBarcode.innerText = contentArr[i].barcode;
    productQuantity.innerText = contentArr[i].quantity;
    productCost.innerText = 'RM ' + parseFloat(contentArr[i].cost).toFixed(2); 
    productPrice.innerText = 'RM ' + parseFloat(contentArr[i].price).toFixed(2);
    if(Number(contentArr[i].notification) >= Number(contentArr[i].quantity)){
      statusButton.innerText = 'Low';
      statusButton.style.backgroundColor = 'red';
      statusButton.style.display = 'inline-block';
    }

    container.classList.add('content-row');
    productNo.classList.add('product-no');
    productName.classList.add('product-name');
    productBarcode.classList.add('product-barcode');
    productQuantity.classList.add('product-quantity');
    productCost.classList.add('product-cost');
    quantityAndEdit.classList.add('quantity-and-status');
    productPrice.classList.add('product-price');
    statusButton.classList.add('status-btn');

    quantityAndEdit.append(productQuantity, statusButton);
    container.append(productNo, productName, productBarcode, productCost, productPrice, quantityAndEdit);
    container.addEventListener('click', editItem2);
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
      const quantityAndEdit = document.createElement('div');
      const productPrice = document.createElement('div');
      const statusButton = document.createElement('button');

      productNo.innerText = numOfElement + '.';
      productName.innerText = contentArr[i].name;
      productBarcode.innerText = contentArr[i].barcode;
      productQuantity.innerText = contentArr[i].quantity;
      productCost.innerText = 'RM ' + parseFloat(contentArr[i].cost).toFixed(2); 
      productPrice.innerText = 'RM ' + parseFloat(contentArr[i].price).toFixed(2);
      if(Number(contentArr[i].notification) >= Number(contentArr[i].quantity)){
        statusButton.innerText = 'Low';
        statusButton.style.backgroundColor = 'red';
        statusButton.style.display = 'block';
      }

      container.classList.add('content-row');
      productNo.classList.add('product-no');
      productName.classList.add('product-name');
      productBarcode.classList.add('product-barcode');
      productQuantity.classList.add('product-quantity');
      productCost.classList.add('product-cost');
      quantityAndEdit.classList.add('quantity-and-status');
      productPrice.classList.add('product-price');
      statusButton.classList.add('status-btn');

      container.addEventListener('click', editItem2);

      quantityAndEdit.append(productQuantity, statusButton);
      container.append(productNo, productName, productBarcode, productCost, productPrice, quantityAndEdit);
      contentContainer.appendChild(container);
      numOfElement++;
    }
  }
};

const displayInventory = () => {
  createAll();
  const quantityAndEdit = document.querySelectorAll('.quantity-and-status');
  if(contentContainer.offsetHeight >= 368){
    quantityAndEdit.forEach(row => {
      row.style.width = '145px';
    });
  }
};

window.onload = () => {
  for(let i = 0; i < contentArr.length; i++){
    if(contentArr[i].notification >= contentArr[i].quantity && localStorage.getItem('Timer') == undefined){
      outOfStockPopup.classList.add('open-popup');
    }
  }
  displayInventory();
}

contentRows.forEach(row => {
  row.addEventListener('click', editItem2(e));
});

// function editItem(e) {
//   const buttonClicked = e.target;
//   const container = buttonClicked.parentElement.parentElement;

//   const arr = [];

//   const name = container.querySelector('.product-name').innerText;
//   const cost = container.querySelector('.product-cost').innerText;
//   const price = container.querySelector('.product-price').innerText;
//   const barcode = container.querySelector('.product-barcode').innerText;
//   const quantity = container.querySelector('.product-quantity').innerText;

//   for(let i = 0; i < contentArr.length; i++){
//     if(name == contentArr[i].name){
//       const supplierName = contentArr[i].supplierName;
//       const supplierPhoneNumber = contentArr[i].supplierPhoneNumber;
//       const supplierLocation = contentArr[i].supplierLocation;
//       const category = contentArr[i].category;
//       const unit = contentArr[i].unit;
//       const notification = contentArr[i].notification;

//       arr.push({
//         name,
//         cost,
//         price,
//         barcode,
//         quantity,
//         category,
//         unit,
//         supplierName,
//         supplierPhoneNumber,
//         supplierLocation,
//         notification
//       });
//       break;
//     }
//   }

//   sessionStorage.setItem('Product', JSON.stringify(arr));
//   window.location.href = 'edit-item.html';
// }

function editItem2(e) {
  const elementClicked = e.target;
  let container;
  if(elementClicked.className == 'product-quantity' || elementClicked.className == 'status-btn'){
    container = elementClicked.parentElement.parentElement;
  }else {
    container = elementClicked.parentElement;
  }
  console.log(container);

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
      const notification = contentArr[i].notification;

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
        supplierLocation,
        notification
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
        supplierLocation:contentArr[i].supplierLocation,
        notification:contentArr[i].notification
      });
      sessionStorage.setItem('Product', JSON.stringify(productArr));
      window.location.href = 'edit-item.html';
    }
  }
}

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
    for(let i = 0; i < contentArr.length; i++){
      let repeated = false;
      const suggestedProduct = document.createElement('div'); 
      if(contentArr[i].barcode.includes(text.value) && contentArr[i].barcode[0] == text.value[0]){
        const suggestedNames = suggestedProductBox.querySelectorAll('.suggested-product');
        for(let j = 0; j < suggestedNames.length; j++){
          if(suggestedNames[j].innerText == contentArr[i].name){
            repeated = true;
            break;
          }
        }
        if(!repeated){
          suggestedProductBox.style.display = 'block';
          suggestedProduct.classList.add('suggested-product');
          suggestedProduct.innerText = contentArr[i].name;
          suggestedProductBox.appendChild(suggestedProduct);

          suggestedProduct.addEventListener('click', goToEdit);
        }
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
    for(let i = 0; i < contentArr.length; i++){
      let repeated = false;
      const suggestedProduct = document.createElement('div'); 
      if(contentArr[i].barcode.includes(text.value) && contentArr[i].barcode[0] == text.value[0] && contentArr[i].category == category.value){
        const suggestedNames = suggestedProductBox.querySelectorAll('.suggested-product');
        for(let j = 0; j < suggestedNames.length; j++){
          if(suggestedNames[j].innerText == contentArr[i].name){
            repeated = true;
            break;
          }
        }
        if(!repeated){
          suggestedProductBox.style.display = 'block';
          suggestedProduct.classList.add('suggested-product');
          suggestedProduct.innerText = contentArr[i].name;
          suggestedProductBox.appendChild(suggestedProduct);

          suggestedProduct.addEventListener('click', goToEdit);
        }
      }else if(!suggestedProductBox.querySelector('.suggested-product') && i == contentArr.length - 1){
        suggestedProductBox.style.display = 'none';
      }
    }
  }
}

category.addEventListener('change', (e) => {
  contentContainer.innerHTML = '';
  searchBar.value = '';
  suggestedProductBox.innerHTML = '';
  if(category.value == 'all'){
    createAll();
  }else {
    createByCategory(category);
  }
});

document.addEventListener('click', (e) => {
  if(suggestedProductBox.childElementCount > 0 && !suggestedProductBox.contains(e.target) && !searchBar.contains(e.target)){
    suggestedProductBox.innerHTML = '';
  }
});