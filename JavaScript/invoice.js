const returnIcon = document.querySelector('.return-icon');
const supplierName = document.querySelector('.supplier-name');
const invoiceNo = document.querySelector('.invoice-no');
const placedDate = document.querySelector('.placed-date');
const receivedDate = document.querySelector('.received-date');
const supplierLocation = document.querySelector('.supplier-location');
const totalPrice = document.querySelector('.total-price');
const contentContainer = document.querySelector('.content-container');

const invoiceArr = JSON.parse(sessionStorage.getItem('Invoice')) || [];

returnIcon.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'restock-history.html';
}); 

window.onload = displayInvoice();

function displayInvoice() {
  const supplierInfo = invoiceArr.slice(-1)[0];
  supplierName.innerText = supplierInfo.supplierName;
  invoiceNo.innerText = supplierInfo.invoiceNo;
  placedDate.innerText = supplierInfo.placedDate;
  receivedDate.innerText = supplierInfo.receivedDate;
  supplierLocation.innerText = supplierInfo.supplierLocation;
  totalPrice.innerText = 'RM ' + Number(supplierInfo.restockFee).toFixed(2);

  for(let i = 0; i < invoiceArr.length - 1; i++){
    const container = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productUnit = document.createElement('div');
    const productPrice = document.createElement('div');

    productNo.innerText = (i + 1) + '.';
    const arr = invoiceArr[i].name.split(' ');
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    productName.innerText = arr.join(' ');
    productQuantity.innerText = invoiceArr[i].quantity;
    productUnit.innerText = invoiceArr[i].unit;
    productPrice.innerText = 'RM ' + invoiceArr[i].price;

    container.classList.add('content-row');
    productNo.classList.add('no');
    productName.classList.add('name');
    productQuantity.classList.add('quantity');
    productUnit.classList.add('unit');
    productPrice.classList.add('price');
    
    container.append(productNo, productName, productQuantity, productUnit, productPrice);
    contentContainer.appendChild(container);
  }
}