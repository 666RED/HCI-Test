const receiptNoText = document.querySelector('.receipt-info-no');
const receiptDate = document.querySelector('.receipt-info-date');
const receiptTime = document.querySelector('.receipt-info-time');
const productContainer = document.querySelector('.product-container');
const totalPrice = document.querySelector('.total-price');
const totalPayment = document.querySelector('.total-payment');
const totalChange = document.querySelector('.total-change');
const printAndSaveButton = document.querySelector('.print-and-save-btn');
const saveButton = document.querySelector('.save-btn');
const wholeContainer = document.querySelector('.whole-container');
const printAndSavePopup = document.querySelector('.print-and-save-popup');
const successfulPopup = document.querySelector('.successful-popup');
const doneButton = document.querySelector('.done-btn');

const d = new Date();

const inventoryArr = JSON.parse(localStorage.getItem('Inventory')) || [];
const productArr = JSON.parse(sessionStorage.getItem('Purchased Product'));
productArr[productArr.length - 1].date = 6;
productArr[productArr.length - 1].month = 12;

let dailySalesArr = JSON.parse(localStorage.getItem('Daily Sales')) || [];
let totalSalesArr = JSON.parse(localStorage.getItem('Total Sales')) || [];

window.onload = () => {
  determineDate();
  const receiptNo = dailySalesArr.length + 1; 
  receiptNoText.innerText = 'Receipt No: ' + receiptNo;
  receiptDate.innerText = 'Date: ' + d.toLocaleDateString();
  receiptTime.innerText = 'Time: ' + d.toLocaleTimeString();
  createProduct();
};

function createProduct() {
  for(let i = 0; i < productArr.length - 1; i++){
    const productRow = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productPrice = document.createElement('div');

    productRow.classList.add('product-row');
    productNo.classList.add('product-no');
    productName.classList.add('product-name');
    productQuantity.classList.add('product-quantity');
    productPrice.classList.add('product-price');

    productNo.innerText = i + 1 + '.';
    productName.innerText = productArr[i].name;
    productQuantity.innerText = productArr[i].quantity;
    productPrice.innerText = productArr[i].singlePrice;
    productRow.append(productNo, productName, productQuantity, productPrice);
    productContainer.appendChild(productRow);
  }
  totalPrice.innerText = 'RM ' + Number(productArr[productArr.length - 1].totalPrice).toFixed(2);
  totalPayment.innerText = productArr[productArr.length - 1].payment;
  totalChange.innerText = productArr[productArr.length - 1].change;
};

printAndSaveButton.addEventListener('click', () => {
  printAndSavePopup.classList.add('open-popup');
  wholeContainer.classList.add('active');
  setTimeout(() => {
    printAndSavePopup.classList.remove('open-popup');
    wholeContainer.classList.remove('active');
    window.print();
  }, 3000);
  setTimeout(() => {
    saveData();
    decreaseInventory();
    sessionStorage.clear();
    window.location.href = 'checkout.html';
  },5000);
});

saveButton.addEventListener('click', () => {
  wholeContainer.classList.add('active');
  successfulPopup.classList.add('open-popup');
});

doneButton.addEventListener('click', () => {
  wholeContainer.classList.remove('active');
  successfulPopup.classList.remove('open-popup');
  saveData();
  decreaseInventory();
  sessionStorage.clear();
  window.location.href = 'checkout.html';
});

function saveData() {
  dailySalesArr.push({productArr});
  localStorage.setItem('Daily Sales', JSON.stringify(dailySalesArr));
}

function decreaseInventory(){
  for(let i = 0; i < productArr.length; i++){
    for(let j = 0; j < inventoryArr.length; j++){
      if(productArr[i].name == inventoryArr[j].name){
        inventoryArr[j].quantity = Number(inventoryArr[j].quantity) - Number(productArr[i].quantity);
        break;
      }
    }
  }
  localStorage.setItem('Inventory', JSON.stringify(inventoryArr));
}

function determineDate() {
  if(dailySalesArr.length == 0){
    console.log('no product');
    return;
  }
  if(dailySalesArr[dailySalesArr.length - 1].productArr.at(-1).date != productArr[productArr.length - 1].date){
    console.log('push');
    dailySalesArr.push({
      currentDate:dailySalesArr[dailySalesArr.length - 1].productArr.at(-1).date,
      currentMonth:dailySalesArr[dailySalesArr.length - 1].productArr.at(-1).month,
      currentYear:dailySalesArr[dailySalesArr.length - 1].productArr.at(-1).year
    });
    totalSalesArr.push({dailySalesArr});
    localStorage.setItem('Total Sales', JSON.stringify(totalSalesArr));
    dailySalesArr = [];
  }
}