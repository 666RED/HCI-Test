const contentContainer = document.querySelector('.content-container');
const totalCost = document.querySelector('.total-cost');
const totalPrice = document.querySelector('.total-price');
const totalProfit = document.querySelector('.total-profit');

const dateCosts = document.querySelectorAll('.date-cost');
const datePrices = document.querySelectorAll('.date-price');
const dateProfits = document.querySelectorAll('.date-profit');

if(contentContainer.offsetHeight >= 360){
  dateProfits.forEach(cost => {
  cost.style.width = '207px';
  cost.style.paddingLeft = '20px';
  });
}