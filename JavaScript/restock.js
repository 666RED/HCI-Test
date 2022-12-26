const returnIcon = document.querySelector('.return-icon');
const contentContainer = document.querySelector('.content-container');
const productPrices = document.querySelectorAll('.product-price');

returnIcon.addEventListener('click', () => {
  window.location.href = 'inventory.html';
});

if(contentContainer.offsetHeight >= 256){
  productPrices.forEach(price => {
    price.style.width = '110px';
    price.style.paddingLeft = '18px';
  });
}