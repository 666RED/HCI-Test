const contentContainer = document.querySelector('.content-container');
const dateCosts = document.querySelectorAll('.date-cost');
const datePrices = document.querySelectorAll('.date-price');
const dateProfits = document.querySelectorAll('.date-profit');

const dates = document.querySelectorAll('.date');

if(contentContainer.offsetHeight >= 360){
  dateProfits.forEach(cost => {
  cost.style.width = '207px';
  cost.style.paddingLeft = '20px';
  });
}

dates.forEach(date => {
  date.addEventListener('click', () => {
    window.location.href = 'weekly-sales.html';
  })
});