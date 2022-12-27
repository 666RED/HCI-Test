const returnIcon = document.querySelector('.return-icon');
const contentContainer = document.querySelector('.content-container');
const restockFees = document.querySelectorAll('.restock-fee');
const supplierInput = document.querySelector('.supplier');
const contentRows = document.querySelectorAll('.content-row');
// const invoice = document.querySelector('.invoice-no');

returnIcon.addEventListener('click', () => {
  window.location.href = 'restock.html';  
});

if(contentContainer.offsetHeight >= 336){
  restockFees.forEach(fee => {
    fee.style.width = '143px';
    fee.style.paddingLeft = '17px';
  });
}

window.onload = displayHistory();

function displayHistory() {
  
}

contentRows.forEach(row => {
  row.addEventListener('click', () => {
    window.location.href = 'invoice.html';
  });
});