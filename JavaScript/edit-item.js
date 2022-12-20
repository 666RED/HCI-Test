const productName = document.querySelector('.product-name');
const productCost = document.querySelector('.product-cost');
const productPrice = document.querySelector('.product-price');
const productBarcode = document.querySelector('.product-barcode');
const productQuantity = document.querySelector('.product-quantity');
const deleteProductPopup = document.querySelector('.delete-product-pop-up');
const wholeScreen = document.querySelector('.whole-screen');
const productDeletedPopup = document.querySelector('.product-deleted-popup');
const doneBtn = document.querySelector('.done-btn');

const deleteButton = document.querySelector('.delete-btn');
const deleteYesBtn = document.querySelector('.delete-product-yes-btn');
const deleteNoBtn = document.querySelector('.delete-product-no-btn');
const deleteCancelBtn = document.querySelector('.delete-product-cancel-img');

const singleProductArr = JSON.parse(sessionStorage.getItem('Product'));
const productArr = JSON.parse(localStorage.getItem('Inventory'));

const displayProductDetail = () => {
  productName.value = singleProductArr[0].name;
  productCost.value = singleProductArr[0].cost.replace('RM ', '');
  productPrice.value = singleProductArr[0].price.replace('RM ', '');
  productBarcode.value = singleProductArr[0].barcode;
  productQuantity.value = singleProductArr[0].quantity;
}

window.onload = displayProductDetail();

deleteButton.addEventListener('click', () => {
  deleteProductPopup.classList.add('open-popup'); 
});

deleteYesBtn.addEventListener('click', () => {
  deleteProductPopup.classList.remove('open-popup');
  for(let i = 0; i < productArr.length; i++){
    if(productArr[i].name == singleProductArr[0].name){
      productArr.splice(i, 1);
      localStorage.setItem('Inventory', JSON.stringify(productArr));
      wholeScreen.classList.add('active');
      productDeletedPopup.classList.add('open-popup'); 
    }
  }
});  

doneBtn.addEventListener('click', () => {
  wholeScreen.classList.remove('active');
  productDeletedPopup.classList.remove('open-popup');
  sessionStorage.clear();
  window.location.href = 'inventory.html';
});

deleteNoBtn.addEventListener('click', closePopup);
deleteCancelBtn.addEventListener('click', closePopup);  

function closePopup() {
  deleteProductPopup.classList.remove('open-popup');
};