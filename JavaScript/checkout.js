const decreaseButtons = document.querySelectorAll('.decrease-icon');
const increaseButtons = document.querySelectorAll('.increase-icon');
const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removeButtons = document.querySelectorAll('.remove-icon');  
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');
const quantityInputs = document.querySelectorAll('.quantity');
const purchaseButton = document.querySelector('.purchase-btn');

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