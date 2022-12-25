const contentContainer = document.querySelector('.content-container');
const dateProfits = document.querySelectorAll('.date-profit');

const dates = document.querySelectorAll('.date');

if(contentContainer.offsetHeight >= 360){
  dateProfits.forEach(profit => {
    profit.style.width = '207px';
    profit.style.paddingLeft = '20px';
  });
}

dates.forEach(date => {
  date.addEventListener('click', () => {
    window.location.href = 'monthly-sales.html';
  })
});