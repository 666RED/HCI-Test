const contentContainer = document.querySelector('.content-container');
const monthInput = document.querySelector('.month');
const monthlyCost = document.querySelector('.total-cost');
const monthlyPrice = document.querySelector('.total-price');
const monthlyProfit = document.querySelector('.total-profit');

const monthlySalesArr = JSON.parse(localStorage.getItem('Monthly Sales')) || [];

monthInput.addEventListener('change', () => {
  contentContainer.innerHTML = '';
  monthlyCost.innerText = '';
  monthlyPrice.innerText = '';
  monthlyProfit.innerText = '';
  const yearInput = monthInput.value.slice(0, 4);
  updateTable(yearInput);
});

function getCurrentMonth() {
  const d = new Date();
  const month = "0" + (d.getMonth() + 1);
  const year = d.getFullYear();
  monthInput.value = `${year}-${month.slice(-2)}`;
}

window.onload= displayMontnlyReport();

function displayMontnlyReport() {
  getCurrentMonth();
  const yearInput = monthInput.value.slice(0, 4);
  createElement(yearInput);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function updateTable(year) {
  createElement(year);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function createElement(year){
  for(let i = 0; i < monthlySalesArr.length; i++){
    if(year == monthlySalesArr[i][0].currentYear){
      let totalCost = 0;
      let totalPrice = 0;
      let totalProfit = 0;

      for(let j = 0; j < monthlySalesArr[i].length; j++){
        const currentArr = monthlySalesArr[i];
        const container = document.createElement('div');
        const dateNo = document.createElement('div');
        const date = document.createElement('div')
        const dateCost = document.createElement('div');
        const datePrice = document.createElement('div');
        const dateProfit = document.createElement('div');

        dateNo.innerText = (j + 1) + '.';
        date.innerText = year + '-' + currentArr[0].currentMonth;
        dateCost.innerText = 'RM ' + Number(currentArr[j].totalCost).toFixed(2);
        datePrice.innerText = 'RM ' + Number(currentArr[j].totalPrice).toFixed(2);
        dateProfit.innerText = 'RM ' + Number(currentArr[j].totalProfit).toFixed(2);

        totalCost += currentArr[j].totalCost;
        totalPrice += currentArr[j].totalPrice;
        totalProfit += currentArr[j].totalProfit;

        container.classList.add('content-row');
        dateNo.classList.add('date-no');
        date.classList.add('date');
        dateCost.classList.add('date-cost');
        datePrice.classList.add('date-price');
        dateProfit.classList.add('date-profit');

        date.addEventListener('click', () => {
          const dateArr = [{
            date:date.innerText,
            cost:dateCost.innerText,
            price:datePrice.innerText,
            profit:dateProfit.innerText
          }];
          sessionStorage.setItem('Date', JSON.stringify(dateArr));
          window.location.href = 'monthly-sales.html';
        });

        container.append(dateNo, date, dateCost, datePrice, dateProfit);
        contentContainer.appendChild(container);
      }
      monthlyCost.innerText = 'RM ' + Number(totalCost).toFixed(2);
      monthlyPrice.innerText = 'RM ' + Number(totalPrice).toFixed(2);
      monthlyProfit.innerText = 'RM ' + Number(totalProfit).toFixed(2);
    }
  }
}