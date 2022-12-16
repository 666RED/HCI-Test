const decreaseButtons = document.querySelectorAll('.decrease-icon');
const increaseButtons = document.querySelectorAll('.increase-icon');
const removeYesBtn = document.querySelector('.remove-product-yes-btn');
const removeNoBtn = document.querySelector('.remove-product-no-btn');
const removePopupMenu = document.querySelector('.remove-product-pop-up');
const removeCancel = document.querySelector('.remove-product-cancel-img');

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

    if(productQuantity.innerText === '1'){
      removePopupMenu.classList.add('open-popup');
      removeYesBtn.addEventListener('click', (e) => {
        removePopupMenu.classList.remove('open-popup');
        const productRow = adjustQuantityRow.parentElement;
        productRow.remove();
      });
    }else {
      productQuantity.innerText--;
    }
  });
});

increaseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonClicked = e.target;
    const adjustQuantityRow = buttonClicked.parentElement;

    const productQuantity = adjustQuantityRow.querySelector('.quantity');
    productQuantity.innerText++;
  });
});