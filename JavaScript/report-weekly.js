const contentContainer = document.querySelector('.content-container');
const monthInput = document.querySelector('.month');
const monthlyCost = document.querySelector('.total-cost');
const monthlyPrice = document.querySelector('.total-price');
const monthlyProfit = document.querySelector('.total-profit');

// const dates = document.querySelectorAll('.date');

const weeklySalesArr = JSON.parse(localStorage.getItem('Weekly Sales')) || [];

monthInput.addEventListener('change', () => {
  contentContainer.innerHTML = '';
  monthlyCost.innerText = '';
  monthlyPrice.innerText = '';
  monthlyProfit.innerText = '';
  updateTable(monthInput.value);
});

// dates.forEach(date => {
//   date.addEventListener('click', () => {
//     window.location.href = 'weekly-sales.html';
//   })
// });

window.onload = displayMonthlyReport();

function displayMonthlyReport() {
  const month = getCurrentMonth();
  createElement(month);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function getCurrentMonth() {
  const d = new Date();
  const month = "0" + (d.getMonth() + 1);
  const year = d.getFullYear();
  monthInput.value = `${year}-${month.slice(-2)}`;
  return monthInput.value;
}

function updateTable(month) {
  createElement(month);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function createElement(month){
  for(let i = 0; i < weeklySalesArr.length; i++){
    if(month == `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}`){
      let totalCost = 0;
      let totalPrice = 0;
      let totalProfit = 0;
      for(let j = 0; j < weeklySalesArr[i].length - 1; j++){
        const currentArr = weeklySalesArr[i];
        const container = document.createElement('div');
        const dateNo = document.createElement('div');
        const date = document.createElement('div');
        const arrow = document.createElement('span');
        const dateCost = document.createElement('div');
        const datePrice = document.createElement('div');
        const dateProfit = document.createElement('div');

        dateNo.innerText = (j + 1) + '.';
        arrow.innerText = '->';
        if(j == 4){
          date.innerText = `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].beginDate} ${arrow.innerText} ${weeklySalesArr[i][4].endYear}-${weeklySalesArr[i][4].endMonth}-${currentArr[j].endDate}`;
        }else {
          date.innerText = `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].beginDate} ${arrow.innerText} ${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].endDate}`;
        }
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
            beginDate:currentArr[j].beginDate,
            endDate:currentArr[j].endDate,
            month,
            date:date.innerText,
            cost:dateCost.innerText,
            price:datePrice.innerText,
            profit:dateProfit.innerText
          }];
          sessionStorage.setItem('Date', JSON.stringify(dateArr));
          window.location.href = 'weekly-sales.html';
        });

        container.append(dateNo, date, dateCost, datePrice, dateProfit);
        contentContainer.appendChild(container);
      }
      console.log(totalProfit);
      monthlyCost.innerText = 'RM ' + Number(totalCost).toFixed(2);
      monthlyPrice.innerText = 'RM ' + Number(totalPrice).toFixed(2);
      monthlyProfit.innerText = 'RM ' + Number(totalProfit).toFixed(2);
    }
  }
}