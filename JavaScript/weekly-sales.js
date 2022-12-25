const contentContainer = document.querySelector('.content-container');
const productProfits = document.querySelectorAll('.product-profit');
const returnIcon = document.querySelector('.return-icon');

if(contentContainer.offsetHeight >= 336){
  productProfits.forEach(profit => {
    profit.style.width = '143px';
    profit.style.paddingLeft = '20px';
  });
}

returnIcon.addEventListener('click', () => {
  window.location.href = 'report-weekly.html';
});